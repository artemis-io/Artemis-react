/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { connect as ConnectVideo, Room } from "twilio-video";
import { Box } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { apiMed } from "../../services/api";
import RoomVideo from "../../components/Main/Room";
import Lobby from "../../components/Main/Lobby";

const VideoChat = () => {
  const { roomName } = useParams();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);

      try {
        const response = await apiMed.post("/twilio/video/token", {
          identity: user?.name,
          room: roomName,
        });

        ConnectVideo(response.data.token, {
          networkQuality: true,
          name: roomName,
          preferredVideoCodecs: ["H264", "VP8"],
          // preferredVideoCodecs: ["H264"],
        })
          .then((room) => {
            setConnecting(false);
            setRoom(room);
          })
          .catch((err) => {
            console.error(err);
            setConnecting(false);
          });
      } catch (error) {
        console.error(error);
        setConnecting(false);
      }
    },
    [roomName, user]
  );

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  return (
    <Box>
      {room ? (
        <RoomVideo
          roomName={roomName}
          username={user?.name}
          room={room}
          handleLogout={handleLogout}
        />
      ) : (
        <Lobby
          username={user?.name}
          roomName={roomName}
          handleSubmit={handleSubmit}
          connecting={connecting}
        />
      )}
    </Box>
  );
};

export default VideoChat;
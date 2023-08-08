/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { connect as ConnectVideo } from "twilio-video";

import { Container } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { apiMed } from "../../services/api";
import Room from "../../components/Main/Room";
import Lobby from "../../components/Main/Lobby";
import { useParams } from "react-router-dom";

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
        const response = await apiMed.post("api/twilio/video/token", {
          identity: user?.id,
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
    <Container maxW="xl" centerContent>
      {room ? (
        <Room roomName={roomName} room={room} handleLogout={handleLogout} />
      ) : (
        <Lobby
          username={user?.name}
          roomName={roomName}
          handleSubmit={handleSubmit}
          connecting={connecting}
        />
      )}
    </Container>
  );
};

export default VideoChat;

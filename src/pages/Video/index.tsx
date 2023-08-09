import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { apiMed } from "../../services/api";
import RoomVideo from "../../components/Main/Room";
import { useParams } from "react-router-dom";

import { Room as TwilioRoom } from "twilio-video";
import { connect as ConnectVideo } from "twilio-video";

const VideoChat = () => {
  const { roomName } = useParams();

  const { user } = useAuth();

  const [room, setRoom] = useState<TwilioRoom | null>(null);
  const [connecting, setConnecting] = useState(false);

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      setConnecting(true);

      try {
        const response = await apiMed.post("twilio/video/token", {
          identity: user?.id,
          room: roomName,
        });

        ConnectVideo(response.data.token, {
          networkQuality: true,
          name: roomName,
          preferredVideoCodecs: ["H264", "VP8"],
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
    setRoom((prevRoom: TwilioRoom | null) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub: any) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event: any) => {
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
        <RoomVideo
          roomName={roomName}
          username={user?.name}
          room={room}
          handleLogout={handleLogout}
        />
      ) : (
        <button onClick={handleSubmit} disabled={connecting}>
          {connecting ? "Connecting..." : "Join Video Chat"}
        </button>
      )}
    </Container>
  );
};

export default VideoChat;

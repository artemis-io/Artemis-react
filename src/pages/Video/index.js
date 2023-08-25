/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { connect as ConnectVideo } from "twilio-video";
import { Box } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { apiMed } from "../../services/api";
import RoomVideo from "../../components/Main/Room";
import Lobby from "../../components/Main/Lobby";
import { AUTH_TOKEN_STORAGE } from "../../shared/storage/config";

const VideoChat = () => {
  const [doctorId, setdoctorId] = useState("");
  const [patientId, setpatientId] = useState("");
  const { roomName } = useParams();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const item = localStorage.getItem(AUTH_TOKEN_STORAGE);

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
    [roomName, user, doctorId, patientId]
  );

  const findAppointment = useCallback(async () => {
    try {
      const response = await apiMed.get(`/appointment/${roomName}`, {
        headers: {
          Authorization: `Bearer ${item}`,
        },
      });
      console.log(response.data);
      if (!response.data.id_doctor || !response.data.id_patient) {
        console.error("idDoctor or idPatient is missing.");
        return;
      }

      setdoctorId(response.data.id_doctor);
      setpatientId(response.data.id_patient);
    } catch (error) {
      console.error(error);
    }
  }, [roomName, doctorId, patientId]);

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
          doctorId={doctorId}
          patientId={patientId}
          roomName={roomName}
          username={user?.name}
          room={room}
          handleLogout={handleLogout}
        />
      ) : (
        <Lobby
          findAppointment={findAppointment}
          role={user?.role}
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

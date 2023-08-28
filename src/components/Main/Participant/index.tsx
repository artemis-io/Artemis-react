import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import ControlsBar from "../Controls";

interface ParticipantProps {
  participant: any;
  handleLogout: () => void;
  patientId: string;
  doctorId: string;
  roomName: string | undefined;
}

const Participant: React.FC<ParticipantProps> = ({
  participant,
  handleLogout,
  doctorId,
  patientId,
  roomName,
}) => {
  console.log(doctorId);
  console.log(patientId);
  const [videoTracks, setVideoTracks] = useState<any[]>([]);
  const [audioTracks, setAudioTracks] = useState<any[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const trackpubsToTracks = (trackMap: Map<any, any>) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  const audioTrack = audioTracks.find((track) => track.kind === "audio");
  const videoTrack = videoTracks.find((track) => track.kind === "video");

  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      setIsAudioEnabled((prevIsAudioEnabled) => !prevIsAudioEnabled);
      audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
    }
  }, [audioTrack]);

  const toggleVideoEnabled = useCallback(() => {
    if (videoTrack) {
      setIsVideoEnabled((prevIsVideoEnabled) => !prevIsVideoEnabled);
      videoTrack.isEnabled ? videoTrack.disable() : videoTrack.enable();
    }
  }, [videoTrack]);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current!);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current!);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <Box textAlign="center" bg="transparent" p={1} mb={16}>
      <VStack>
        <Box textAlign="left">
          <Box
            maxW="sm"
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            borderColor="transparent"
          >
            <video
              ref={videoRef}
              autoPlay={true}
              style={{ width: "200px", height: "150px" }}
            />
          </Box>
          <Heading color="#fafafa" fontSize="16px" mt={1}>
            {doctorId}
          </Heading>
          <Heading color="#fafafa" fontSize="16px" mt={1}>
            {participant.identity}
          </Heading>
        </Box>

        <ControlsBar
        roomName={roomName}
          patientId={patientId}
          handleLogout={handleLogout}
          isAudioEnabled={isAudioEnabled}
          isVideoEnabled={isVideoEnabled}
          toggleAudioEnabled={toggleAudioEnabled}
          toggleVideoEnabled={toggleVideoEnabled}
        />

        <audio ref={audioRef} autoPlay={true} style={{ display: "none" }} />
      </VStack>
    </Box>
  );
};

export default Participant;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import ControlsBar from "../Controls";

interface ParticipantProps {
  participant: any;
  handleLogout: () => void;
}

const Participant: React.FC<ParticipantProps> = ({
  participant,
  handleLogout,
}) => {
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
      audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
      setIsAudioEnabled(!audioTrack.isEnabled);
    }
  }, [audioTrack]);

  const toggleVideoEnabled = useCallback(() => {
    if (videoTrack) {
      videoTrack.isEnabled ? videoTrack.disable() : videoTrack.enable();
      setIsVideoEnabled(!videoTrack.isEnabled);
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
    <Box textAlign="center" bg="#202124" p={4}>
      <VStack>
        <Heading as="h3" size="md" mb={2}>
          {participant.identity}
        </Heading>
        <Box p={4} bg="blue" borderRadius="lg">
          <video ref={videoRef} autoPlay={true} />
          <audio ref={audioRef} autoPlay={true} style={{ display: "none" }} />
        </Box>

        <ControlsBar
          handleLogout={handleLogout}
          isAudioEnabled={isAudioEnabled}
          isVideoEnabled={isVideoEnabled}
          toggleAudioEnabled={toggleAudioEnabled}
          toggleVideoEnabled={toggleVideoEnabled}
        />
      </VStack>
    </Box>
  );
};

export default Participant;

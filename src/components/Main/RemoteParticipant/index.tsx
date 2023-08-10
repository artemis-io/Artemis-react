import React, { useEffect, useRef, useState } from "react";
import { Box, Heading, VStack, Flex } from "@chakra-ui/react";

interface RemoteParticipantProps {
  participant: any;
}

const RemoteParticipant: React.FC<RemoteParticipantProps> = ({
  participant,
}) => {
  const [videoTracks, setVideoTracks] = useState<any[]>([]);
  const [audioTracks, setAudioTracks] = useState<any[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const trackpubsToTracks = (trackMap: Map<any, any>) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

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
    <Flex bg="#202124" p={1} mt={12}>
      <VStack>
        <Box>
          <Box
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            borderColor="#202124"
          >
            <video ref={videoRef} autoPlay={true} />
          </Box>
          <Heading color="#fafafa" fontSize="16px" mt={1}>
            {participant.identity}
          </Heading>
        </Box>

        <audio ref={audioRef} autoPlay={true} style={{ display: "none" }} />
      </VStack>
    </Flex>
  );
};

export default RemoteParticipant;

import { Center, Spinner } from "@chakra-ui/react";

export function LoadingCircle() {
  return (
    <Center flex={1} height="100vh">
      <Spinner size={"xl"} />
    </Center>
  );
}

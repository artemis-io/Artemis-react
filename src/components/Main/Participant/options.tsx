"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";

import { BsThreeDotsVertical, BsChatSquareQuote } from "react-icons/bs";

export default function ServerSecondaryOptions() {
  return (
    /**
     * You may move the Popover outside Flex.
     */
    <Flex justifyContent="center" mt={4}>
      <Popover placement="top" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="More server options"
            icon={<BsThreeDotsVertical />}
            variant="solid"
            w="fit-content"
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<BsChatSquareQuote />}
                justifyContent="space-between"
                fontWeight="normal"
                fontSize="sm"
              >
                Configurações
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}

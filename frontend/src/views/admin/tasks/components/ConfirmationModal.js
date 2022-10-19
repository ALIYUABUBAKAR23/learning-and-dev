import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  InputGroup,
  InputRightElement,
  Textarea,
  // Select,
  InputLeftAddon,
  HStack,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
// Custom components

// Assets
import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";
import axios from "axios";
import { handleWidgetChange2 } from "../../../../utility";
axios.defaults.withCredentials = true;

function ConfirmationModal(props) {
  const {
    taskId,
    deleteTask,
    onOpen,
    isOpen,
    onClose,
    setTaskToDelete,
    setTaskForDelete,
  } = props;

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="sm"
      onClose={() => {
        onClose();
        setTaskToDelete();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> CONFIRM DELETE </ModalHeader>
        <ModalCloseButton />
        <ModalBody>ARE YOU SURE YOU WANT TO DELETE THIS TASK?</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={() => {
              onClose();
              setTaskToDelete();
            }}
          >
            No
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              deleteTask(taskId);
            }}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;

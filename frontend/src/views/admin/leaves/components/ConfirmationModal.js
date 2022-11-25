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
    leaveId,
    deleteLeave,
    onOpen,
    isOpen,
    onClose,
    setLeaveToDelete,
  } = props;

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="sm"
      onClose={() => {
        onClose();
        setLeaveToDelete();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Confirm Delete </ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this leave?</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={() => {
              onClose();
              setLeaveToDelete();
            }}
          >
            No
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              deleteLeave(leaveId);
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

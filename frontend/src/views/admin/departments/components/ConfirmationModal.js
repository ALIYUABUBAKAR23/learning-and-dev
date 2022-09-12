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
    departmentId,
    deleteDepartment,
    onOpen,
    isOpen,
    onClose,
    setDepartmentToDelete,
    setDepartmentForDelete,
  } = props;

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="sm"
      onClose={() => {
        onClose();
        setDepartmentToDelete();
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
              setDepartmentToDelete();
            }}
          >
            No, it was a mistake
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              deleteDepartment(departmentId);
            }}
          >
            Yes, of course
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;

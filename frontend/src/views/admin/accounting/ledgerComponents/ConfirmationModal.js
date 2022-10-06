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
    ledgerId,
    deleteLedger,
    onOpen,
    isOpen,
    onClose,
    setLedgerToDelete,
  } = props;

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="sm"
      onClose={() => {
        onClose();
        //setLedgerToDelete();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Confirm Delete </ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this ledger?</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={() => {
              onClose();
            }}
          >
            No, it was a mistake
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              deleteLedger(ledgerId);
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

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import React from "react";
import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";
import axios from "axios";
axios.defaults.withCredentials = true;
  
function ConfirmationModal(props) {
  const {
    reportId,
    deleteReport,
    onOpen,
    isOpen,
    onClose,
    setReportToDelete,
} = props;

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="sm"
      onClose={() => {
         onClose();
         setReportToDelete();
        }}
    >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Confirm Delete </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this report?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="brand"
              mr={3}
              onClick={() => {
                onClose();
                setReportToDelete();
              }}
            >
              No
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                deleteReport(reportId);
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
  
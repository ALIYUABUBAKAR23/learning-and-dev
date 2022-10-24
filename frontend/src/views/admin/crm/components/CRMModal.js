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

function CustomerModal(props) {

  const {
    onSelect,
    userList,
    editCustomer,
    assignedTo,
    onChange,
    onOptionSelect,
    onSubmit,
    setCustomerToEdit,
    onOpen,
    isOpen,
    onClose,
  } = props;

  const [customerDetails, setCustomerDetails] = useState({});
  const [updatedCustomerDetails, setUpdatedCustomerDetails] = useState({});

  useEffect(() => {
    setCustomerDetails(editCustomer || "");
  }, [editCustomer]);

  useEffect(() => {
    setUpdatedCustomerDetails(customerDetails || editCustomer);
  }, [customerDetails]);

  const handleChange = handleWidgetChange2(
    setCustomerDetails,
    setUpdatedCustomerDetails,
    customerDetails,
    updatedCustomerDetails
  );

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="xl"
      onClose={() => {
        setCustomerToEdit(null);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editCustomer ? "Edit Customer" : "Create New Customer"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftAddon children="First Name" borderRadius="16px" />
              <Input
                name="first_name"
                placeholder="First Name"
                value={customerDetails?.first_name || ""}
                borderRadius="16px"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Middle Name" borderRadius="16px" />

              <Textarea
                name="middle_name"
                placeholder="Middle Name"
                value={customerDetails?.middle_name || ""}
                onChange={handleChange}
              />
              <InputRightElement
                borderRadius="16px"
                children={<CheckIcon color="green.500" />}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="last_name" borderRadius="16px" />

              <Textarea
                name="last_name"
                placeholder="Last Name"
                value={customerDetails?.last_name || ""}
                onChange={handleChange}
              />
              <InputRightElement
                borderRadius="16px"
                children={<CheckIcon color="green.500" />}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="date_of_birth" borderRadius="16px" />
              <Input
                name="date_of_birth"
                placeholder="Date of Birth"
                value={customerDetails?.date_of_birth || ""}
                borderRadius="16px"
                type="datetime-local"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Address" borderRadius="16px" />
              <Input
                name="address"
                placeholder="Start Date"
                value={customerDetails?.address || ""}
                onChange={handleChange}
              />
              <InputRightElement
                borderRadius="16px"
                children={<CalendarIcon color="green.500" />}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Occupation" borderRadius="16px" />
              <Input
                name="occupation"
                placeholder="Occupation"
                value={customerDetails?.occupation || ""}
                onChange={handleChange}
              />
              <InputRightElement
                borderRadius="16px"
                children={<CalendarIcon color="green.500" />}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Company" borderRadius="16px" />
              <Input
                name="company"
                placeholder="Company"
                value={customerDetails?.company || ""}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Phone Number" borderRadius="16px" />
              <Select
                name="phone_number"
                placeholder="Phone Number"
                value={customerDetails?.phone_number || ""}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Email" borderRadius="16px" />
              <Select
                name="email"
                placeholder="Email"
                value={customerDetails?.email || ""}
                onChange={handleChange}
              />
            </InputGroup>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={() => {
              setCustomerToEdit(null);
              onClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onSubmit(editCustomer ? "put" : "post", updatedCustomerDetails);
            }}
          >
            {editCustomer ? "Edit" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomerModal;

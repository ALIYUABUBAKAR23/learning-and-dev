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
import React from "react";
import Select from "react-select";
// Custom components

// Assets
import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";
import axios from "axios";
axios.defaults.withCredentials = true;

function ApplicationsModal(props) {
  
  const {
    onSelect,
    userList,
    assignedTo,
    onChange,
    onOptionSelect,
    onSubmit,
    onOpen,
    isOpen, 
    onClose
  } = props;

  const conditionOptions = [
    { label: "Excellent", value: "Excellent" },
    { label: "Good", value: "Good" },
    { label: "Bad", value: "Bad" },
  ];

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="xl"
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create A New application</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftAddon children="first name" borderRadius="16px" />
              <Input
                name="first name"
                placeholder="first Name"
                borderRadius="16px"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="last name" borderRadius="16px" />
              <Input
                name="name"
                placeholder="last name"
                borderRadius="16px"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
            <InputLeftAddon children="email" borderRadius="16px" />
            <Input name="email" placeholder="email" borderRadius="16px" type="date" onChange={onChange}/>
            <InputRightElement
              borderRadius="16px"
            />
          </InputGroup>
          <InputGroup>
          <InputLeftAddon children="phone number" borderRadius="16px" />
          <Select
            name="phone number"
            options={conditionOptions}
            onChange={onOptionSelect}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="address" borderRadius="16px" />
          <Select
            name="address"
            options={conditionOptions}
            onChange={onOptionSelect}
          />
        </InputGroup>
      <InputGroup>
      <InputLeftAddon children="city" borderRadius="16px" />
      <Input
        name="name"
        placeholder="city"
        borderRadius="16px"
        onChange={onChange}
      />
    </InputGroup>
    <InputGroup>
    <InputLeftAddon children="state" borderRadius="16px" />
    <Input
      name="name"
      placeholder="state"
      borderRadius="16px"
      onChange={onChange}
    />
  </InputGroup>
  <InputGroup>
  <InputLeftAddon children="postal code " borderRadius="16px" />
  <Input
    name="name"
    placeholder="postal code"
    borderRadius="16px"
    onChange={onChange}
  />
</InputGroup>
<InputGroup>
    <InputLeftAddon children="country" borderRadius="16px" />
    <Input
      name="name"
      placeholder="country"
      borderRadius="16px"
      onChange={onChange}
    />
</InputGroup>
<InputGroup>
    <InputLeftAddon children="resume" borderRadius="16px" />
    <Input
      name="name"
      placeholder="resume"
      borderRadius="16px"
      onChange={onChange}
    />
</InputGroup>
{/* <InputGroup>
    <InputLeftAddon children="project" borderRadius="16px" />
    <Input
      name="name"
      placeholder="project"
      borderRadius="16px"
      onChange={onChange}
    />
</InputGroup>
<InputGroup>
    <InputLeftAddon children="date" borderRadius="16px" />
    <Input
      name="date"
      placeholder="date"
      borderRadius="16px"
      onChange={onChange}
    />
</InputGroup> */}
{/* <InputGroup>
    <InputLeftAddon children="desired pay" borderRadius="16px" />
    <Input
      name="name"
      placeholder="desired pay"
      borderRadius="16px"
      onChange={onChange}
    />
</InputGroup>
<InputGroup>
    <InputLeftAddon children="website" borderRadius="16px" />
    <Input
      name="name"
      placeholder="website"
      borderRadius="16px"
      onChange={onChange}
    />
</InputGroup>
<InputGroup>
    <InputLeftAddon children="linkedin" borderRadius="16px" />
    <Input
      name="name"
      placeholder="linkedin"
      borderRadius="16px"
      onChange={onChange}
    />
</InputGroup>           */}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="brand" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onSubmit}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default ApplicationsModal;

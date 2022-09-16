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

function InventoryModal(props) {
  
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
        <ModalHeader>Create A New Inventory</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftAddon children="Name" borderRadius="16px" />
              <Input
                name="name"
                placeholder="Name"
                borderRadius="16px"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Type" borderRadius="16px" />
              <Input
                name="type"
                placeholder="Type"
                borderRadius="16px"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
            <InputLeftAddon children="Date of Purchase" borderRadius="16px" />
            <Input name="date_of_purchase" placeholder="Date of Purchase" borderRadius="16px" type="date" onChange={onChange}/>
            <InputRightElement
              borderRadius="16px"
            />
          </InputGroup>
          <InputGroup>
          <InputLeftAddon children="Purchase Condition" borderRadius="16px" />
          <Select
            name="purchase_condition"
            options={conditionOptions}
            onChange={onOptionSelect}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Current Condition" borderRadius="16px" />
          <Select
            name="current_condition"
            options={conditionOptions}
            onChange={onOptionSelect}
          />
        </InputGroup>
      <InputGroup>
      <InputLeftAddon children="Current Location" borderRadius="16px" />
      <Input
        name="current_location"
        placeholder="Current Location"
        borderRadius="16px"
        onChange={onChange}
      />
    </InputGroup>
    <InputGroup>
    <InputLeftAddon children="Model Number" borderRadius="16px" />
    <Input
      name="model_number"
      placeholder="Model Number"
      borderRadius="16px"
      onChange={onChange}
    />
  </InputGroup>
  <InputGroup>
  <InputLeftAddon children="Serial Number" borderRadius="16px" />
  <Input
    name="serial_number"
    placeholder="Serial Number"
    borderRadius="16px"
    onChange={onChange}
  />
</InputGroup>
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
export default InventoryModal;

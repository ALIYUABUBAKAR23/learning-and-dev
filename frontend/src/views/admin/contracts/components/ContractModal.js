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

function ContractModal(props) {
  const contractData = [
    { label: "Full-Time", value: "Full-Time" },
    { label: "Part-Time", value: "Part-Time" }, 
  ];

  
  const {
    onChange,
    onSubmit,
    isOpen, 
    onClose,
    onSelect,
    userList,
    onOptionSelect,
    } = props;

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="xl"
      onClose={onClose}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Create A New Contract</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>

            <InputGroup>
              <InputLeftAddon children="Contract Type" borderRadius="16px" />
              <Select
                name="contract_type"
                options={contractData}
                onChange={onOptionSelect}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Date Issued" borderRadius="16px" />
              <Input
                name="date_issued"
                placeholder="Set the date this contract was issued"
                type="date"
                onChange={onChange}
              />

            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Contract Length" borderRadius="16px" />

              <Input
                name="contract_length"
                placeholder="Set the length of this contract in months"
                type="number"
                onChange={onChange}
              />

        
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Contract Details" borderRadius="16px" />
              <Textarea
                name="contract_details"
                placeholder="Set Contract Details"
                borderRadius="16px"
                size='lg'

                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Contract Document" borderRadius="16px" />
              <Input
                name="contract_document"
                placeholder="Set Contract Document"
                borderRadius="16px"
                onChange={onChange}
              />
    
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="End Date" borderRadius="16px" />
              <Input
                name="end_date"
                placeholder="Set the end date of this contract"
                type="date"
                onChange={onChange}
              />
    
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="User" borderRadius="16px" />
              <Select
                name="user"
                options={userList}
                placeholder="Set User"
                borderRadius="16px"
                // onChange={onOptionSelect}
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




export default ContractModal;

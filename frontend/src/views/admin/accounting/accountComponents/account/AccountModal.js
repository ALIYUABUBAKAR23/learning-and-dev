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
  useColorModeValue,
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
import { handleWidgetChange2 } from "../../../../../utility";
axios.defaults.withCredentials = true;

function CreateModal(props) {

  const textColor = useColorModeValue("secondaryGray.900", "white");

  const accountTypeOptions = [
    { label: "Credit", value: "Cr" },
    { label: "Debit", value: "Dr" },
  ];

  const accountClassOptions = [
    { label: "Revenue", value: "Revenue" },
    { label: "Equity", value: "Equity" },
    { label: "Other Income", value: "Other Income" },
    { label: "Other Expense", value: "Other Expense" },
  ];

  const {
    onSelect,
    userList,
    editAccount,
    assignedTo,
    onChange,
    onOptionSelect,
    onSubmit,
    setAccountToEdit,
    onOpen,
    isOpen,
    onClose,
  } = props;

  const [accountDetails, setAccountDetails] = useState({});
  const [updatedAccountDetails, setUpdatedAccountDetails] = useState({});

  useEffect(() => {
    setAccountDetails(editAccount || "");
  }, [editAccount]);

  useEffect(() => {
    setUpdatedAccountDetails(accountDetails || editAccount);
  }, [accountDetails]);

  const handleChange = handleWidgetChange2(
    setAccountDetails,
    setUpdatedAccountDetails,
    accountDetails,
    updatedAccountDetails
  );

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="xl"
      onClose={() => {
        setAccountToEdit(null);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editAccount ? "Edit Account" : "Create New Account"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {/* Code field */}            
            <InputGroup>
              <InputLeftAddon children="Code" borderRadius="16px" />
              <Input
                name="code"
                type="number"
                placeholder="Code"
                value={accountDetails?.code || ""}
                borderRadius="16px"
                onChange={handleChange}
                color={textColor} 
              />
            </InputGroup>
            {/* Description field */}            
            <InputGroup>
              <InputLeftAddon children="Description" borderRadius="16px" />
              <Textarea
                name="description"
                placeholder="Enter A Brief Or Detailed Description Of The Account"
                defaultValue={accountDetails?.description || ""}
                onChange={handleChange}
              />
              <InputRightElement
                borderRadius="16px"
                children={<CheckIcon color="green.500" />}
              />
            </InputGroup>
            {/* Account Class field */}            
            <InputGroup>
              <InputLeftAddon children="account_class" borderRadius="16px" />
              <Select
                name="account_class"
                options={accountClassOptions}
                onChange={(option) => handleChange(option.value, "account_class")}
              />
            </InputGroup>
            {/* Account Type field */}            
            <InputGroup>
              <InputLeftAddon children="type" borderRadius="16px" />
              <Select
                name="type"
                options={accountTypeOptions}
                onChange={(option) => handleChange(option.value, "type")}
              />
            </InputGroup>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={() => {
              setAccountToEdit(null);
              onClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onSubmit(editAccount ? "put" : "post", updatedAccountDetails);
            }}
          >
            {editAccount ? "Edit" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateModal;

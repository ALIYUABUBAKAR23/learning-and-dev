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
  
  function TaskModal(props) {
    const RolesOptions = [
      { label: "HR", value: "HR" },
      { label: "Accountant", value: "Accountant" },
      { label: "Admin", value: "Admin" },
      { label: "Senior Engineer", value: "Senior_Engineer" },
    ];
    const {
      onSelect,
      userList,
      editTask,
      assignedTo,
      onChange,
      onOptionSelect,
      onSubmit,
      setTaskToEdit,
      onOpen,
      isOpen,
      onClose,
    } = props;
  
    const [userDetails, setUserDetails] = useState({});
    const handleChange = handleWidgetChange2(
      setUserDetails,
      userDetails,
    );
  
    return (
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size="xl"
        onClose={() => {
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"New User"} </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon children="First Name" borderRadius="16px" />
                <Input
                  name="first_name"
                  placeholder="First Name"
                  value={userDetails?.first_name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Last Name" borderRadius="16px" />
                <Input
                  name="last_name"
                  placeholder="Last Name"
                  value={userDetails?.last_name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Middle Name" borderRadius="16px" />
                <Input
                  name="middle_name"
                  placeholder="Middle Name"
                  value={userDetails?.middle_name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Email" borderRadius="16px" />
                <Input
                  name="email"
                  placeholder="Email"
                  value={userDetails?.email || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Phone" borderRadius="16px" />
                <Input
                  name="phone"
                  placeholder="Phone"
                  value={userDetails?.phone || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Roles" borderRadius="16px" />
                <Select
                  name="role"
                  value={RolesOptions[userDetails.role]}
                  options={RolesOptions}
                  onChange={(option) => handleChange(option, "role")}
                />
              </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="brand"
              mr={3}
              onClick={() => {
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() =>  console.log("Click")  }
            >
                Add new user
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default TaskModal;
  
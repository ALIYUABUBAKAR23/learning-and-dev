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
  
  function DepartmentModal(props) {
  
    const {
      onSelect,
      userList,
      editDepartment,
      headOfDepartment,
      onChange,
      onOptionSelect,
      onSubmit,
      setDepartmentToEdit,
      onOpen,
      isOpen,
      onClose,
    } = props;
  
    const [departmentDetails, setDepartmentDetails] = useState({});
    const [updatedDepartmentDetails, setUpdatedDepartmentDetails] = useState({});
  
    useEffect(() => {
      setDepartmentDetails(editDepartment || "");
    }, [editDepartment]);
  
    useEffect(() => {
      setUpdatedDepartmentDetails(departmentDetails || editDepartment);
    }, [departmentDetails]);
  
    const handleChange = handleWidgetChange2(
      setDepartmentDetails,
      setUpdatedDepartmentDetails,
      departmentDetails,
      updatedDepartmentDetails
    );
  
    return (
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size="xl"
        onClose={() => {
          setDepartmentToEdit(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editDepartment ? "Edit Department" : "Create New Department"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon children="Name" borderRadius="16px" />
                <Input
                  name="name"
                  placeholder="Name"
                  value={departmentDetails?.name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Description" borderRadius="16px" />
  
                <Textarea
                  name="description"
                  placeholder="Enter A Brief Or Detailed Description Of The Department"
                  value={departmentDetails?.description || ""}
                  onChange={handleChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CheckIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Head of Department" borderRadius="16px" />
                <HStack spacing={4}>
                {/* {headOfDepartment?.map((user, index) => (
                      <Tag size={'lg'} key={index} variant='solid' colorScheme='teal'>
                        {user.name}
                      </Tag>
                    ))}
                  </HStack> */}

                  {editDepartment?.headOfDepartment
                    ? editDepartment?.headOfDepartment.map((user, index) => (
                        <Tag
                          size={"lg"}
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {user.name}
                        </Tag>
                      ))
                    : headOfDepartment?.map((user, index) => (
                        <Tag
                          size={"lg"}
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {user.name}
                        </Tag>
                      ))}
                </HStack>
								<Select
                    name="head_of_department_id"
                    options={userList}
                    onChange={onOptionSelect}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
              </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="brand"
              mr={3}
              onClick={() => {
                setDepartmentToEdit(null);
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onSubmit(editDepartment ? "put" : "post", updatedDepartmentDetails);
              }}
            >
              {editDepartment ? "Edit" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default DepartmentModal;
  
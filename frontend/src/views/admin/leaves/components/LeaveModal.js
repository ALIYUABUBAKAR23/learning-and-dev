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
import { handleWidgetChange2 } from "../../../../utility";
axios.defaults.withCredentials = true;

function LeaveModal(props) { 

  const textColor = useColorModeValue("secondaryGray.900", "white");

  const approvalStatusOptions = [
    { label: "Waiting For Validation", value: "1" },
    { label: "Validated", value: "2" },
    { label: "Refused", value: "3" },
    { label: "Cancelled", value: "4" },
  ];

  const {
    onSelect,
    userList,
    editLeave,
    assignedTo,
    onChange,
    onOptionSelect,
    onSubmit,
    setLeaveToEdit,
    onOpen,
    isOpen,
    onClose,
  } = props;

  const [leaveDetails, setLeaveDetails] = useState({});
  const [updatedLeaveDetails, setUpdatedLeaveDetails] = useState({});
  const [requestingStaff, setRequestingStaff] = useState([])   

  useEffect(() => {
    setLeaveDetails(editLeave || "");
  }, [editLeave]);

  useEffect(() => {
    setUpdatedLeaveDetails(leaveDetails || editLeave);
  }, [leaveDetails]);

  const handleChange = handleWidgetChange2(
    setLeaveDetails,
    setUpdatedLeaveDetails,
    leaveDetails,
    updatedLeaveDetails
  );

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="xl"
      onClose={() => {
        setLeaveToEdit(null);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editLeave ? "Edit Leave" : "Create New Leave"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {/* Title field */}            
            <InputGroup>
              <InputLeftAddon children="Title" borderRadius="16px" />
              <Input
                name="title"
                type="text"
                placeholder="Title"
                value={leaveDetails?.title || ""}
                borderRadius="16px"
                onChange={handleChange}
                color={textColor} 
              />
            </InputGroup>
            {/* Reason field */}            
            <InputGroup>
              <InputLeftAddon children="Reason" borderRadius="16px" />
              <Textarea
                name="reason"
                placeholder="Enter the Reason for the Leave"
                defaultValue={leaveDetails?.reason || ""}
                onChange={handleChange}
              />
              <InputRightElement
                borderRadius="16px"
                children={<CheckIcon color="green.500" />}
              />
            </InputGroup>
            {/* Start Date field */}            
            <InputGroup>
              <InputLeftAddon children="start_date" borderRadius="16px" />
              <Input
                type='date'
                name="start_date"
                placeholder="Start Date"
                borderRadius="16px"
                defaultValue={leaveDetails?.start_date || ""}
                onChange={handleChange}
              />  
            </InputGroup>
            {/* End Date field */}            
            <InputGroup>
              <InputLeftAddon children="end_date" borderRadius="16px" />
              <Input
                type='date'
                name="end_date"
                placeholder="End Date"
                borderRadius="16px"
                defaultValue={leaveDetails?.end_date || ""}
                onChange={handleChange}
              />  
            </InputGroup>
            {/*Requesting Staff Field */}
            <InputGroup>
                <InputLeftAddon children="Requesting_Staff" borderRadius="16px" />
                <HStack spacing={4}>
                  {requestingStaff?.map((user, index) => (
                    <Tag size={'lg'} key={index} variant='solid' colorScheme='teal'>
                      {user.name}
                    </Tag>
                  ))}
                </HStack>
                <Select
                  options={userList}
                  isMulti
                  defaultValue={approvalStatusOptions[leaveDetails?.requestingStaff] || ""}
                  onChange={(option) => handleChange(option[0].id, "requesting_staff")}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </InputGroup>
            {/*Approval Status Field */}
            <InputGroup>
              <InputLeftAddon children="approval_status" borderRadius="16px" />
              <Select
                name="approval_status"
                options={approvalStatusOptions}
                defaultValue={approvalStatusOptions[leaveDetails?.approval_status] || ""}
                onChange={(option) => handleChange(option.value, "approval_status")}
              />
            </InputGroup>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={() => {
              setLeaveToEdit(null);
              onClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onSubmit(editLeave ? "put" : "post", updatedLeaveDetails);
            }}
          >
            {editLeave ? "Edit" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LeaveModal;

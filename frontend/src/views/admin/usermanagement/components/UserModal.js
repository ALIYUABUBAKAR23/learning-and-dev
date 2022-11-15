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
    const taskStatusOptions = [
      { label: "Open", value: "Open" },
      { label: "Pending", value: "Pending" },
      { label: "Suspended", value: "Suspended" },
      { label: "Postponed", value: "Postponed" },
      { label: "Completed", value: "Completed" },
      { label: "Incomplete", value: "Incomplete" },
      { label: "Cancelled", value: "Cancelled" },
    ];
  
    const taskPriorityOptions = [
      { label: "High", value: "High" },
      { label: "Medium", value: "Medium" },
      { label: "Low", value: "Low" },
    ];
  
    const STATUS = {
      Open: { label: "Open", value: "Open" },
      Pending: { label: "Pending", value: "Pending" },
      Suspended: { label: "Suspended", value: "Suspended" },
      Postponed: { label: "Postponed", value: "Postponed" },
      Completed: { label: "Completed", value: "Completed" },
      Incomplete: { label: "Incomplete", value: "Incomplete" },
      Cancelled: { label: "Cancelled", value: "Cancelled" },
    };
  
    const PRIORITY = {
      High: { label: "High", value: "High" },
      Medium: { label: "Medium", value: "Medium" },
      Low: { label: "Low", value: "Low" },
    };
  
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
  
    const [taskDetails, setTaskDetails] = useState({});
    const [updatedTaskDetails, setUpdatedTaskDetails] = useState({});
  
    useEffect(() => {
      setTaskDetails(editTask || "");
    }, [editTask]);
  
    useEffect(() => {
      setUpdatedTaskDetails(taskDetails || editTask);
    }, [taskDetails]);
  
    const handleChange = handleWidgetChange2(
      setTaskDetails,
      setUpdatedTaskDetails,
      taskDetails,
      updatedTaskDetails
    );
  
    return (
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size="xl"
        onClose={() => {
          setTaskToEdit(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editTask ? "Edit Task" : "Create New Task"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon children="Name" borderRadius="16px" />
                <Input
                  name="name"
                  placeholder="Name"
                  value={taskDetails?.name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Description" borderRadius="16px" />
  
                <Textarea
                  name="description"
                  placeholder="Enter A Brief Or Detailed Description Of The Task"
                  value={taskDetails?.description || ""}
                  onChange={handleChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CheckIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Comment" borderRadius="16px" />
  
                <Textarea
                  name="comment"
                  placeholder="Add A Comment About This Task"
                  value={taskDetails?.comment || ""}
                  onChange={handleChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CheckIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Task Assignee" borderRadius="16px" />
                <HStack spacing={4}>
                  {editTask?.assigned_to
                    ? editTask?.assigned_to.map((user, index) => (
                        <Tag
                          size={"lg"}
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {user.name}
                        </Tag>
                      ))
                    : assignedTo?.map((user, index) => (
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
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Assign Task To" borderRadius="16px" />
                <Select
                  options={userList}
                  isMulti
                  onChange={onSelect}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Start Date" borderRadius="16px" />
                <Input
                  name="start_date"
                  placeholder="Start Date"
                  value={taskDetails?.start_date || ""}
                  borderRadius="16px"
                  type="datetime-local"
                  onChange={handleChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Due Date" borderRadius="16px" />
                <Input
                  name="due_date"
                  placeholder="Due Date"
                  value={taskDetails?.due_date || ""}
                  borderRadius="16px"
                  type="datetime-local"
                  onChange={handleChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Status" borderRadius="16px" />
                <Select
                  name="status"
                  value={STATUS[taskDetails.status]}
                  options={taskStatusOptions}
                  onChange={(option) => handleChange(option, "status")}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Priority" borderRadius="16px" />
                <Select
                  name="priority"
                  value={PRIORITY[taskDetails.priority]}
                  options={taskPriorityOptions}
                  onChange={(option) => handleChange(option, "priority")}
                />
              </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="brand"
              mr={3}
              onClick={() => {
                setTaskToEdit(null);
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onSubmit(editTask ? "put" : "post", updatedTaskDetails);
              }}
            >
              {editTask ? "Edit" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default TaskModal;
  
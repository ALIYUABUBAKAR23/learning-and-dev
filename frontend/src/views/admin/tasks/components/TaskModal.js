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
    onClose
  } = props;

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="xl"
      onClose={() => { setTaskToEdit(null); onClose();}}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> 
          {editTask ? "Edit Task" : "Create New Task"} 
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftAddon children="Name" borderRadius="16px" />
              <Input
                name="name"
                placeholder="Name"
                value={editTask?.name}
                borderRadius="16px"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Description" borderRadius="16px" />

              <Textarea
                name="description"
                placeholder="Enter A Brief Or Detailed Description Of The Task"
                value={editTask?.description}
                onChange={onChange}
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
                value={editTask?.comment}
                onChange={onChange}
              />
              <InputRightElement
                borderRadius="16px"
                children={<CheckIcon color="green.500" />}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Task Assignee" borderRadius="16px" />
              <HStack spacing={4}>
                {editTask?.assigned_to ? (editTask?.assigned_to.map((user, index) => (
                  <Tag
                    size={"lg"}
                    key={index}
                    variant="solid"
                    colorScheme="teal"
                  >
                    {user.name}
                  </Tag>
                ))) : (assignedTo?.map((user, index) => (
                  <Tag
                    size={"lg"}
                    key={index}
                    variant="solid"
                    colorScheme="teal"
                  >
                    {user.name}
                  </Tag>
                )))}
              </HStack>
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
                value={editTask?.start_date}
                borderRadius="16px"
                type="datetime-local"
                onChange={onChange}
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
                value={editTask?.due_date}
                borderRadius="16px"
                type="datetime-local"
                onChange={onChange}
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
                value={{ label: editTask?.status , value: editTask?.status }}
                options={taskStatusOptions}
                onChange={onOptionSelect}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Priority" borderRadius="16px" />
              <Select
                name="priority"
                value={{ label: editTask?.priority , value: editTask?.priority }}
                options={taskPriorityOptions}
                onChange={onOptionSelect}
              />
            </InputGroup>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="brand" mr={3} onClick={() => { setTaskToEdit(null); onClose();}}>
            Close
          </Button>
          <Button variant="ghost" onClick={() => { editTask ? onSubmit('put') : onSubmit();}}>
            {editTask ? "Edit" : "Create"} 
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TaskModal;

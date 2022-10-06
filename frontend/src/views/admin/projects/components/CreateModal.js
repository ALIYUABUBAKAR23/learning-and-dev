import {
    Flex,
    Table,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Stack,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Textarea,
    // Select,
    InputLeftAddon,
    HStack,
    Tag,
  } from "@chakra-ui/react";
  import { Input } from "@chakra-ui/react";
  import React, { useEffect, useMemo, useState } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  import Select from 'react-select';
  // Custom components
  import Card from "../../../../components/card/Card";
  import Menu from "../../../../components/menu/ProjectTableMenu";
  
  // Assets
  import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
  import APIClient from "../../../../lib/APIClient";
  import { CalendarIcon, CheckIcon, PhoneIcon, PlusSquareIcon } from "@chakra-ui/icons";
  import { PersonIcon } from "../../../../components/icons/Icons";
  import axios from "axios";
  axios.defaults.withCredentials = true;
  import {baseUrl} from "../../../../utility/index";
  import Cookies from "js-cookie";
  import toast from 'react-hot-toast';
  
  export default function CreateModal(props) {

    const { isOpen, onClose, action} = props;


    const [formErrors, setFormErrors] = useState(null);
    const [projectData, setProjectData] = useState({});
    const [projectLead, setProjectLead] = useState([])
    const [userList, setUserList] = useState([])
    const [owner, setOwner] = useState([])    

    const onChange = (event) => {
      const { name, value } = event.target;
      const project = { ...projectData };
      project[name] = value;
      setProjectData(project);
      setFormErrors(null);
    };

    const onSelect = (event) => {
      console.log('see the event: ', event);
      var newState;
      if (event.length > 0) {
        event?.map((input)=> {
          newState = [...projectLead, {id: input.value ? input.value : null, name: input.label ? input.label : null}];
        });
      }else{
        newState = [];
      }
      setProjectLead(newState);
      setOwner(newState);
    };


    return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create A New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {/* Name field */}
              <InputGroup>
                <InputLeftAddon children="Name" borderRadius="16px" />
                <Input
                  name="name"
                  placeholder="Name"
                  borderRadius="16px"
                  onChange={onChange}
                />
              </InputGroup>
              {/* Description field */}
              <InputGroup>
                <InputLeftAddon children="Description" borderRadius="16px" />
                
                <Textarea name="description" placeholder='Enter A Brief Or Detailed Description Of The Task' onChange={onChange} />
                <InputRightElement
                  borderRadius="16px"
                  children={<CheckIcon color="green.500" />}
                />
              </InputGroup>
              {/* Project Lead field */}            
              <InputGroup>
                <InputLeftAddon children="Project Lead" borderRadius="16px" />
                <HStack spacing={4}>
                  {projectLead?.map((user, index) => (
                    <Tag size={'lg'} key={index} variant='solid' colorScheme='teal'>
                      {user.name}
                    </Tag>
                  ))}
                </HStack>
                <Select
                  options={userList}
                  isMulti
                  onChange={onSelect}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </InputGroup>
              {/* Expected Start Date field */}
              <InputGroup>
                <InputLeftAddon children="Expected Start Date" borderRadius="16px" />
                <Input name="expected_start_date" placeholder="Start Date" borderRadius="16px" type="date" onChange={onChange}/>
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              {/* Actual Start Date field */}
              <InputGroup>
                <InputLeftAddon children="Actual Start Date" borderRadius="16px" />
                <Input name="actual_start_date" placeholder="Start Date" borderRadius="16px" type="date" onChange={onChange}/>
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              {/* Expected End Date field */}
              <InputGroup>
                <InputLeftAddon children="Expected End Date" borderRadius="16px" />
                <Input name="expected_end_date" placeholder="Expected End Date" borderRadius="16px" type="date" onChange={onChange}/>
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              {/* Actual End Date field */}
              <InputGroup>
                <InputLeftAddon children="Actual End Date" borderRadius="16px" />
                <Input name="actual_end_date" placeholder="Actual End Date" borderRadius="16px" type="date" onChange={onChange}/>
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              {/* Actual Cost field */}
              <InputGroup>
                <InputLeftAddon children="Actual Cost" borderRadius="16px" />
                <Input name="actual_cost" placeholder="Actual Cost" borderRadius="16px" type="number" onChange={onChange}/>
              </InputGroup>
              {/*Estimated Cost field */}
              <InputGroup>
                <InputLeftAddon children="Estimated Cost" borderRadius="16px" />
                <Input name="estimated_cost" placeholder="Estimated Cost" borderRadius="16px" type="number" onChange={onChange}/>
              </InputGroup>              
              {/* Budget field */}
              <InputGroup>
                <InputLeftAddon children="Budget" borderRadius="16px" />
                <Input name="current_budget" placeholder="Budget" borderRadius="16px" type="number" onChange={onChange}/>
              </InputGroup>
              {/* Owner field */}            
              <InputGroup>
                <InputLeftAddon children="Owner" borderRadius="16px" />
                <HStack spacing={4}>
                  {owner?.map((user, index) => (
                    <Tag size={'lg'} key={index} variant='solid' colorScheme='teal'>
                      {user.name}
                    </Tag>
                  ))}
                </HStack>
                <Select
                  options={userList}
                  isMulti
                  onChange={onSelect}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </InputGroup>
              {/* Location field */}
              <InputGroup>
                <InputLeftAddon children="Location" borderRadius="16px" />
                <Textarea name="location" placeholder='Enter Location of project' onChange={onChange} />
                <InputRightElement
                  borderRadius="16px"
                  children={<CheckIcon color="green.500" />}
                />
              </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={action}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      );
  }
  
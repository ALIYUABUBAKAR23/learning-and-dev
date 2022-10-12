//Issue: projectDetails is undefined. 

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
  import { handleWidgetChange2 } from "../../../../utility";

  export default function EditModal(props) {

    const { 
      isOpen, 
      onClose, 
      targetProject,
      editProject,
      setProjectToEdit,
      onSelect,
      onChange,
      userList,
      onOptionSelect,
      onSubmit
    } = props;


    const [formErrors, setFormErrors] = useState(null);
    const [projectData, setProjectData] = useState({});
    const [projectLead, setProjectLead] = useState([])
    const [owner, setOwner] = useState([])  
    const [people, setPeople] = useState([])  

    const [projectDetails, setProjectDetails] = useState({});
    const [updatedProjectDetails, setUpdatedProjectDetails] = useState({});
  
    useEffect(() => {
      setProjectDetails(editProject);
    }, [editProject]);
  
    useEffect(() => {
      setUpdatedProjectDetails(projectDetails || editProject);
    }, [projectDetails]);
  
  
    const handleChange = handleWidgetChange2(
      setProjectDetails,
      setUpdatedProjectDetails,
      projectDetails,
      updatedProjectDetails
    );
/* 
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
      setPeople(newState);
    };


    const getProjects = () =>{
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          'authorization':`Token ${Cookies.get('token')}`,
        },
      };
  
      axios
        .get(`${baseUrl}business_analysis/projects`, config)
        .then((response) => {
          props.setProjectList(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
  
    const updateProject = (projectData) =>{
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
            'authorization':`Token ${Cookies.get('token')}`,
          },
        };
    
        axios
          .put(`${baseUrl}business_analysis/projects/${projectData.id}/`, projectData, {config})
          .then(() => {
            onClose();
            getProjects();
            toast.success(`Updated Successfully`);
          })
          .catch((error) => {
            console.log(error);
            toast.error('Project Not Edited!');
          });
  }
 */
    return (
      <Modal 
        closeOnOverlayClick={false} 
        isOpen={isOpen} 
        size="xl" 
        onClose={() => {
          setProjectToEdit(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {/* Name field */}
              <InputGroup>
                <InputLeftAddon children="Name" borderRadius="16px" />
                <Input
                  isRequired
                  name="name"
                  placeholder="Name"
                  borderRadius="16px"
                  onChange={handleChange}
                  //defaultValue ={projectDetails.name}
                />
              </InputGroup>
              {/* Description field */}
              <InputGroup>
                <InputLeftAddon children="Description" borderRadius="16px" />
                
                <Textarea 
                  isRequired
                  name="description" 
                  placeholder='Enter A Brief Or Detailed Description Of The Task' 
                  //defaultValue ={projectDetails.description}
                  onChange={handleChange}
                  />
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
                  isRequired
                  isMulti
                  onChange={onSelect}
                  className="basic-multi-select"
                  classNamePrefix="select"                  
                  //defaultValue={projectDetails.project_lead}
                />
              </InputGroup>
              {/* People field */}            
              <InputGroup>
                <InputLeftAddon children="People" borderRadius="16px" />
                <HStack spacing={4}>
                  {people?.map((user, index) => (
                    <Tag size={'lg'} key={index} variant='solid' colorScheme='teal'>
                      {user.name}
                    </Tag>
                  ))}
                </HStack>
                <Select
                  options={userList}
                  isRequired
                  isMulti
                  onChange={onSelect}
                  className="basic-multi-select"
                  classNamePrefix="select"                  
                  //defaultValue={projectDetails.people}
                />
              </InputGroup>
              {/* Expected Start Date field */}
              <InputGroup>
                <InputLeftAddon children="Expected Start Date" borderRadius="16px" />
                <Input 
                  isRequired
                  name="actual_start_date" placeholder="Start Date" 
                  borderRadius="16px" type="date" 
                  onChange={handleChange}
                  //defaultValue={projectDetails.expected_start_date}
                  />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              {/* Actual Start Date field */}
              <InputGroup>
                <InputLeftAddon children="Actual Start Date" borderRadius="16px" />
                <Input 
                  isRequired
                  name="expected_start_date" placeholder="Start Date" 
                  borderRadius="16px" type="date"                 
                  onChange={handleChange}
                  //defaultValue={projectDetails.actual_start_date}
                  />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              {/* Expected End Date field */}
              <InputGroup>
                <InputLeftAddon children="Expected End Date" borderRadius="16px" />
                <Input isRequired name="expected_end_date" placeholder="Expected End Date" 
                  borderRadius="16px" type="date" 
                  onChange={handleChange}
                  //defaultValue={projectDetails.expected_end_date}
                  />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              {/* Actual End Date field */}
              <InputGroup>
                <InputLeftAddon children="Actual End Date" borderRadius="16px" />
                <Input isRequired name="actual_end_date" placeholder="Actual End Date" 
                  borderRadius="16px" type="date" 
                  onChange={handleChange}
                  //defaultValue={projectDetails.actual_end_date}
                  />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              {/* Actual Cost field */}
              <InputGroup>
                <InputLeftAddon children="Actual Cost" borderRadius="16px" />
                <Input 
                  isRequired
                  name="actual_cost" placeholder="Actual Cost" borderRadius="16px" 
                  type="number" 
                  onChange={handleChange}
                  //defaultValue={projectDetails.actual_cost}
                  />
              </InputGroup>
              {/*Estimated Cost field */}
              <InputGroup>
                <InputLeftAddon children="Estimated Cost" borderRadius="16px" />
                <Input 
                  isRequired
                  name="estimated_cost" placeholder="Estimated Cost" borderRadius="16px" 
                  type="number" 
                  onChange={handleChange}
                  //defaultValue={projectDetails.estimated_cost}
                  />
              </InputGroup>              
              {/* Budget field */}
              <InputGroup>
                <InputLeftAddon children="Budget" borderRadius="16px" />
                <Input 
                  isRequired
                  name="current_budget" placeholder="Budget" borderRadius="16px" 
                  type="number" 
                  onChange={handleChange}
                  //defaultValue ={projectDetails.current_budget}
                  />
              </InputGroup>
              {/* Income field */}
              <InputGroup>
                <InputLeftAddon children="Income" borderRadius="16px" />
                <Input 
                  isRequired
                  name="income" placeholder="Income" borderRadius="16px" 
                  type="number" 
                  onChange={handleChange}
                  //defaultValue={projectDetails.income}
                  />
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
                  isRequired
                  options={userList}
                  isMulti
                  onChange={onSelect}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  //defaultValue ={projectDetails.owner}
                />
              </InputGroup>
              {/* Location field */}
              <InputGroup>
                <InputLeftAddon children="Location" borderRadius="16px" />
                <Textarea 
                  isRequired
                  name="location" placeholder='Enter Location of project' 
                  onChange={onChange}
                  //defaultValue ={projectDetails.location}
                  />
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
            <Button variant="ghost" 
                    onClick={() => {
                      onSubmit(projectDetails)
                    }}                    
            >Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      );
  }
  
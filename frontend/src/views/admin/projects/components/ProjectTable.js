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
  FormControl,
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
import { CalendarIcon, CheckIcon, PhoneIcon, PlusSquareIcon } from "@chakra-ui/icons";
import axios from "axios";
axios.defaults.withCredentials = true;
import {baseUrl} from "../../../../utility/index";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import CreateModal from "../components/CreateModal";

export default function ColumnsTable(props) {
  const { columnsData, tableData, setProjectList } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 10;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { isOpen, onOpen, onClose} = useDisclosure()
  const { isOpen: isCreateOpen , onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  
  const [projectData, setProjectData] = useState({});
  const [projectLead, setProjectLead] = useState([])
  const [owner, setOwner] = useState([])    
  const [people, setPeople] = useState([]) 

  //delete to menu 
  const [value, setValue] = React.useState("");  

  const [formErrors, setFormErrors] = useState(null);
  const [userList, setUserList] = useState([])
  
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
        console.log("check our projects: ", response.data);
        setProjectList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getUsers = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}users/`, config)
      .then((response) => {
        console.log("check our users: ", response.data);
        setUserList(response.data.map(option => ({ label: `${option.first_name} ${option.middle_name} ${option.last_name}`, value: option.id })))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createProject = (projectData) =>{

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .post(`${baseUrl}business_analysis/projects`, projectData, config)
      .then((response) => {
        onClose();
        getProjects();
        console.log("check our response:", response.data);
        toast.success(`${response.data.message}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Project Not created!');
      });
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    const project = { ...projectData };
    project[name] = value;
    setProjectData(project);
    setFormErrors(null);
  };

  const onOptionSelect = (event, action) => {
    console.log('see the event: ', event, action);
    const { label, value } = event;
    console.log('see the name, event : ', label, ' ,',value);
    const project = { ...projectData };
    project[action.name] = value;
    setProjectData(project);
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
    setPeople(newState);
  };

  const onSubmit = () => {
    //console.log("check our post:", projectData);
    const project = { ...projectData };
    //project['project_lead'] = [...projectLead];
    createProject(project);
  };


  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          My Projects
        </Text>
        <Button onClick={onOpen}>Create Project</Button>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  let targetP = {};

                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "OWNER" | "PROJECT LEAD") {
                    data = (
                      <Flex align="center">
                        <HStack spacing={4}>
                          {cell.value?.map((user, index) => (
                            <Tag size={'sm'} key={index} variant='solid' colorScheme='teal'>
                              {user.name}
                            </Tag>
                          ))}
                        </HStack>
                      </Flex>
                    );
                  }else if (cell.column.Header === "ACTIONS") {
                    targetP = cell.row.original
                    data = (
                      <Flex >
                        <Menu onDelete={onDeleteOpen} onEdit={onEditOpen}/>
                        <DeleteModal isOpen={isDeleteOpen} onClose={onDeleteClose} targetProject={targetP}  setProjectList={setProjectList}/>                      
                        <EditModal isOpen={isEditOpen} onClose={onEditClose} targetProject={targetP} setProjectList={setProjectList}/>                      
                      </Flex>
                    );                    
                  } else {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}

              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* <CreateModal isOpen={isCreateOpen} onClose={onCreateClose} action={onSubmit}/>                   */}
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
                  isRequired
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
              {/* Income field */}
              <InputGroup>
                <InputLeftAddon children="Income" borderRadius="16px" />
                <Input name="income" placeholder="Income" borderRadius="16px" type="number" onChange={onChange}/>
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
            <Button variant="ghost" onClick={onSubmit}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Card>
  );
}

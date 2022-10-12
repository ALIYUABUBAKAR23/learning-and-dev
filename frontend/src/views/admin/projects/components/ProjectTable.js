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
import CreateModal from "../components/ProjectModal";

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
  const { isOpen: isCreateOpen , onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  
  const [projectData, setProjectData] = useState({});
  const [projectLead, setProjectLead] = useState([])
  const [owner, setOwner] = useState([])    
  const [people, setPeople] = useState([]) 
  const [projectToEdit, setProjectToEdit] = useState();
  const [projectToDelete, setProjectToDelete] = useState();


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

  const createProject = (projectData)  =>{

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
        onCreateClose();
        getProjects();
        console.log("check our response:", response.data);
        toast.success(`${response.data.message}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Project Not created!');
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
        onEditClose();
        getProjects();
        toast.success(`Updated Successfully`);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Project Not Edited!');
      });
}

  const setEditProject = (projectData) => {
    console.log(projectData)
    setProjectToEdit(projectData);
    onEditOpen();
  };

  const setProjectForDelete = (projectData) => {
    setProjectToDelete(projectData.id);
    onDeleteOpen();
  };
  
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

  const onSubmitCreate = (projectData) => {
    const project = { ...projectData };
    createProject(project)
  };

  const onSubmitEdit = (projectData) => {
    const project = { ...projectData };
    updateProject(project)
  };

  useEffect(() => {
    getUsers();
    getProjects();
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
        <Button onClick={onCreateOpen}>Create Project</Button>
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
                    data = (
                      <Flex >
                        <Menu
                        editData={cell.row.original}
                        setProjectToEdit={setEditProject}
                        setProjectForDelete={setProjectForDelete}
                        onEdit={onEditOpen}
                        onDelete={onDeleteOpen}
                      />
                      {/*   <Menu onDelete={onDeleteOpen} onEdit={onEditOpen}/>
                       <DeleteModal isOpen={isDeleteOpen} onClose={onDeleteClose} targetProject={targetP}  setProjectList={setProjectList}/>                   
                        <EditModal isOpen={isEditOpen} onClose={onEditClose} targetProject={targetP} setProjectList={setProjectList}/>
                      */}
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


      <DeleteModal
        projectId={projectToDelete}
        setProjectToDelete={setProjectToDelete}
        onOpen={onDeleteOpen}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        setProjectList={setProjectList}
      />
      <EditModal 
        isOpen={isEditOpen} 
        onClose={onEditClose} 
        editProject={projectToEdit}
        setProjectToEdit={setEditProject}
        onSelect={onSelect}
        userList={userList}
        onSubmit={onSubmitEdit}
        onChange={onChange}
        onOptionSelect={onOptionSelect}
      />
      <CreateModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onOpen={onCreateOpen}
        onSelect={onSelect}
        userList={userList}
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmitCreate}
      />
      
      {/* <DeleteModal isOpen={isDeleteOpen} onClose={onDeleteClose} targetProject={targetP}  setProjectList={setProjectList}/>                    */}

    </Card>
  );
}

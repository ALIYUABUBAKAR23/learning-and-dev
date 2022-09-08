import {
    Flex,
    Table,
    Progress,
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
  import Menu from "../../../../components/menu/MainMenu";
  
  // Assets
  import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
  import APIClient from "../../../../lib/APIClient";
  import { CalendarIcon, CheckIcon, PhoneIcon, PlusSquareIcon } from "@chakra-ui/icons";
  import { PersonIcon } from "../../../../components/icons/Icons";
  import axios from "axios";
  axios.defaults.withCredentials = true;
  import {baseUrl} from "../../../../utility/index";
  import {baseUserUrl} from "../../../../utility/index";
  import Cookies from "js-cookie";
  import toast from 'react-hot-toast';
  
  export default function ColumnsTable(props) {
    const { columnsData, tableData, setDepartmentList } = props;
  
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [departmentData, setDepartmentData] = useState({});
    const [headOfDepartment, setHeadOfDepartment] = useState([])
    const [formErrors, setFormErrors] = useState(null);
    const [userList, setUserList] = useState([])
    
    const getDepartment = () =>{
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          'authorization':`Token ${Cookies.get('token')}`,
        },
      };
  
      axios
        .get(`${baseUrl}hr/departments`, config)
        .then((response) => {
          console.log("check our department: ", response.data);
          setDepartmentList(response.data)
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
  
    const createDepartment = (departmentData) =>{

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          'authorization':`Token ${Cookies.get('token')}`,
        },
      };
  
      axios
        .post(`${baseUrl}hr/departments`, departmentData, config)
        .then((response) => {
          onClose();
          getDepartment();
          console.log("check our response:", response.data);
          toast.success("department created successfully");
        })
        .catch((error) => {
          console.log(error);
          toast.error('Not created!');
        });
    }

  
    const onChange = (event) => {
      console.log('see the event: ', event);
      const { name, value } = event.target;
      console.log('see the name, event : ', name, ' ,',value);
      const department = { ...departmentData };
      department[name] = value;
      setDepartmentData(department);
      setFormErrors(null);
    };
  
    const onOptionSelect = (event, action) => {
      console.log('see the event: ', event, action);
      const { label, value } = event;
      console.log('see the name, event : ', label, ' ,',value);
      const department = { ...departmentData };
      department[action.name] = value;
      setDepartmentData(department);
    };
  
    // const onSelect = (event) => {
    //   console.log('see the event: ', event);
    //   var newState;
    //   if (event.length > 0) {
    //     event?.map((input)=> {
    //       newState = [...headOfDepartment, {id: input.value ? input.value : null, name: input.label ? input.label : null}];
    //     });
    //   }else{
    //     newState = [];
    //   }
    //   setHeadOfDepartment(newState);
    // };
  
    const onSubmit = () => {
    
      console.log("check our post:", departmentData);
      const department = { ...departmentData};
      createDepartment(department);
    };;
  
  
    useEffect(() => {
      getUsers();
    }, []);
    return (
      <Card
        direction="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "scroll" }}
      >
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Department
          </Text>
          <Button onClick={onOpen}>Create Department</Button>
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
                          <Flex align='center'>
                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                              {cell.value}
                            </Text>
                          </Flex>
                        );
                      } else if (cell.column.Header === "DESCRIPTION") {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        );
                      } else if (cell.column.Header === "HEAD OF DEPARTMENT") {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
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
                          borderColor='transparent'>
                          {data}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
             </Tbody>
        </Table>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} size="xl" onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Department</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <InputGroup>
                  <InputLeftAddon children="Name" borderRadius="16px" />
                  <Input
                    name="name"
                    placeholder="Name"
                    borderRadius="16px"
                    onChange={onChange}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Description" borderRadius="16px" />
                
                  <Textarea name="description" placeholder='Enter A Brief Or Detailed Description Of The Department' onChange={onChange} />
                  <InputRightElement
                    borderRadius="16px"
                    children={<CheckIcon color="green.500" />}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Head of Department" borderRadius="16px" />
                  <HStack spacing={4}>
                    {headOfDepartment?.map((user, index) => (
                      <Tag size={'lg'} key={index} variant='solid' colorScheme='teal'>
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
  
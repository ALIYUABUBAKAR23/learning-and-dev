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
  Select as SelectUI,
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
  const { columnsData, tableData, setTaskList } = props;

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
  const [staffData, setStaffData] = useState({});
  const [dept, setDept] = useState([])
  const [formErrors, setFormErrors] = useState(null);
  const [departmentList, setDepartmentList] = useState([])

  const staffStateOptions = [
    {label:"Abia", value:"Abia"},
    {label:"Adamawa", value:"Adamawa"},
    {label:"Akwa Ibom", value:"Akwa Ibom"},
    {label:"Anambra", value:"Anambra"},
    {label:"Bauchi", value:"Bauchi"},
    {label:"Bayelsa", value:"Bayelsa"},
    {label:"Benue", value:"Benue"},
    {label:"Borno", value:"Borno"},
    {label:"Cross River", value:"Cross River"},
    {label:"Delta", value:"Delta"},
    {label:"Ebonyi", value:"Ebonyi"},
    {label:"Edo", value:"Edo"},
    {label:"Ekiti", value:"Ekiti"},
    {label:"Enugu", value:"Enugu"},
    {label:"Gombe", value:"Gombe"},
    {label:"Imo", value:"Imo"},
    {label:"Imo", value:"Imo"},
    {label:"Jigawa", value:"Jigawa"},
    {label:"Kaduna", value:"Kaduna"},
    {label:"Kano", value:"Kano"},
    {label:"Katsina", value:"Katsina"},
    {label:"Kebbi", value:"Kebbi"},
    {label:"Kogi", value:"Kogi"},
    {label:"Kwara", value:"Kwara"},
    {label:"Lagos", value:"Lagos"},
    {label:"Nasarawa", value:"Nasarawa"},
    {label:"Niger", value:"Niger"},
    {label:"Ogun", value:"Ogun"},
    {label:"Ondo", value:"Ondo"},
    {label:"Osun", value:"Osun"},
    {label:"Oyo", value:"Oyo"},
    {label:"Plateau", value:"Plateau"},
    {label:"Rivers", value:"Rivers"},
    {label:"Sokoto", value:"Sokoto"},
    {label:"Taraba", value:"Taraba"},
    {label:"Yobe", value:"Yobe"},
    {label:"Zamfara", value:"Zamfara"},
  ]

  const staffSexOptions = [
    {label:"Male", value:"Male"},
    {label:"Female", value:"Female"},
  ]
  const maritalStatusOptions = [
    {label:"true", value:"true"},
    {label:"false", value:"false"},
  ]

  const getStaff = () =>{
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
        console.log("check our staff: ", response.data);
        setStaffList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getDepartments = () =>{
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
        console.log("check our departments: ", response.data);
        setDepartmentList(response.data.map(option => ({ label: `${option.name}`, value: option.id })))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createStaff = (staffData) =>{

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        // 'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .post(`${baseUserUrl}rest-auth/registration/`, staffData, config)
      .then((response) => {
        onClose();
        getStaff();
        console.log("check our response:", response.data);
        toast.success("user created successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error('Not created!');
      });
  }

  const deleteStaff = (id) => {
    
  }

  const onChange = (event) => {
    console.log('see the event: ', event);
    const { name, value } = event.target;
    console.log('see the name, event : ', name, ' ,',value);
    const staff = { ...staffData };
    staff[name] = value;
    setStaffData(staff);
    setFormErrors(null);
  };

  const onOptionSelect = (event, action) => {
    console.log('see the event: ', event, action);
    const { label, value } = event;
    console.log('see the name, event : ', label, ' ,',value);
    const staff = { ...staffData };
    staff[action.name] = value;
    setStaffData(staff);
  };

  const onSelect = (event) => {
    console.log('see the event: ', event);
    var newState;
    if (event.length > 0) {
      event?.map((input)=> {
        newState = [...dept, {id: input.value ? input.value : null, name: input.label ? input.label : null}];
      });
    }else{
      newState = [];
    }
    setDept(newState);
  };

  const onSubmit = () => {
    
    console.log("check our post:", staffData);
    const staff = { ...staffData };
    staff['department'] = [...dept];
    createStaff(staff);
  };


  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <Card
      direction="column"
      padding-bottom = "70px"
      padding-top = "25px"
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
          Staff
        </Text>
        <Button onClick={onOpen}>Create Staff</Button>
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
                    if (cell.column.Header === "FIRST NAME") {
                      data = (
                        <Flex align='center'>
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "MIDDLE NAME") {
                      data = (
                        <Flex align='center'>
                          <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value} 
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "LAST NAME") {
                      data = (
                        <Flex align='center'>
                          <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value} 
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "SEX") {
                      data = (
                        <Flex align="center">
                          <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value} 
                          </Text>
                        </Flex>
                    );
                    } else if (cell.column.Header === "DATE OF BIRTH") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "STATE OF ORIGIN") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "ADDRESS") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "PHONE NO") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "EMAIL") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "TWITTER") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "INSTAGRAM") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "LINKEDIN") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "STAFF ID") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "COMMENCEMENT DATE") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "SALARY") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "ROLE") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "DEPARTMENT") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "BANK") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "ACCOUNT NUMBER") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "SPOUSE NAME") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "MARITAL STATUS") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "ACTIONS") {
                      data = <Menu 
                      w='30px'
                      h='30px' />
                      // (
                      //   <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                      //     {cell.value}
                      //   </Text>
                      // );
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
          <ModalHeader>Create Staff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
            <InputGroup>
                  <InputLeftAddon children="Email" borderRadius="16px" />
                  <Input
                    name="email"
                    placeholder="Email"
                    borderRadius="16px"
                    onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Password" borderRadius="16px" />
                <Input
                  name="password1"
                  placeholder="Password"
                  borderRadius="16px"
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Retype Password" borderRadius="16px" />
                <Input
                  name="password2"
                  placeholder="Retype Password"
                  borderRadius="16px"
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="First Name" borderRadius="16px" />
                <Input
                  name="first_name"
                  placeholder="First Name"
                  borderRadius="16px"
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Middle Name" borderRadius="16px" />
                <Input
                  name="middle_name"
                  placeholder="Middle Name"
                  borderRadius="16px"
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Last Name" borderRadius="16px" />
                <Input
                  name="last_name"
                  placeholder="Last Name"
                  borderRadius="16px"
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Sex" borderRadius="16px" />
                <Select
                  name="sex"
                  options={staffSexOptions}
                  onChange={onOptionSelect}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Department" borderRadius="16px" />
                <HStack spacing={4}>
                  {dept?.map((department, index) => (
                    <Tag size={'lg'} key={index} variant='solid' colorScheme='teal'>
                      {department.name}
                    </Tag>
                  ))}
                </HStack>
                <Select
                  name = "department_id"
                  options={departmentList}
                  onChange={onOptionSelect}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Date of Birth" borderRadius="16px" />
                <Input 
                name="date_of_birth" 
                placeholder="Date of Birth" 
                borderRadius="16px" 
                type="date" 
                onChange={onChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="State of Origin" borderRadius="16px" />
                <Select
                  name="state_of_origin"
                  options={staffStateOptions}
                  onChange={onOptionSelect}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Phone Number" borderRadius="16px" />
                <Input 
                name="phone_number" 
                placeholder="Phone Number" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Address" borderRadius="16px" />
                <Input 
                name="address" 
                placeholder="Address" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Twitter" borderRadius="16px" />
                <Input 
                name="twitter" 
                placeholder="Twitter" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Instagram" borderRadius="16px" />
                <Input 
                name="tnstagram" 
                placeholder="Instagram" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="LinkedIn" borderRadius="16px" />
                <Input 
                name="linkedIn" 
                placeholder="LinkedIn" 
                borderRadius="16px"
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Staff ID" borderRadius="16px" />
                <Input 
                name="staff_id" 
                placeholder="Staff ID" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Commencement Date" borderRadius="16px" />
                <Input 
                name="commencement_date" 
                placeholder="Commencement Date" 
                borderRadius="16px" 
                type="date" 
                onChange={onChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Salary" borderRadius="16px" />
                <Input 
                name="salary" 
                placeholder="Salary" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Role" borderRadius="16px" />
                <Input 
                name="role" 
                placeholder="Role" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Bank" borderRadius="16px" />
                <Input 
                name="bank_name" 
                placeholder="Bank" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Account Number" borderRadius="16px" />
                <Input 
                name="bank_account" 
                placeholder="Bank" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Spouse Name" borderRadius="16px" />
                <Input 
                name="spouse_name" 
                placeholder="Spouse Name" 
                borderRadius="16px" 
                onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Marital Status" borderRadius="16px" />
                <Select
                name="is_married"
                options={maritalStatusOptions}
                onChange={onOptionSelect}
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

// import {
//     Flex,
//     Table,
//     Tbody,
//     Td,
//     Text,
//     Th,
//     Thead,
//     Tr,
//     useColorModeValue,
//   } from "@chakra-ui/react";
//   import React, { useMemo } from "react";
//   import {
//     useGlobalFilter,
//     usePagination,
//     useSortBy,
//     useTable,
//   } from "react-table";
  
//   // Custom components
//   import Card from "../../../../components/card/Card";
//   import Menu from "../../../../components/menu/MainMenu";
  
//   export default function ColumnsTable(props) {
//     const { columnsData, tableData } = props;
  
//     const columns = useMemo(() => columnsData, [columnsData]);
//     const data = useMemo(() => tableData, [tableData]);
  
//     const tableInstance = useTable(
//       {
//         columns,
//         data,
//       },
//       useGlobalFilter,
//       useSortBy,
//       usePagination
//     );
  
//     const {
//       getTableProps,
//       getTableBodyProps,
//       headerGroups,
//       page,
//       prepareRow,
//       initialState,
//     } = tableInstance;
//     initialState.pageSize = 5;
  
//     const textColor = useColorModeValue("secondaryGray.900", "white");
//     const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
//     return (
//       <Card
//       direction='column'
//       w='100%'
//       px='0px'
//       overflowX={{ sm: "scroll", lg: "scroll" }}>
//         <Flex px='25px' justify='space-between' mb='0px' align='centre'>
//           <Text
//             color={textColor}
//             fontSize='22px'
//             fontWeight='700'
//             lineHeight='100%'>
//             STAFF
//           </Text>
//           <Menu />
//         </Flex>
//         <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px' >
//           <Thead>
//             {headerGroups.map((headerGroup, index) => (
//               <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
//                 {headerGroup.headers.map((column, index) => (
//                   <Th
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     pe='10px'
//                     key={index}
//                     borderColor={borderColor}>
//                     <Flex
//                       justify='space-between'
//                       align='center'
//                       fontSize={{ sm: "10px", lg: "12px" }}
//                       color='gray.400'>
//                       {column.render("Header")}
//                     </Flex>
//                   </Th>
//                 ))}
//               </Tr>
//             ))}
//           </Thead>
//           <Tbody {...getTableBodyProps()}>
//             {page.map((row, index) => {
//               prepareRow(row);
//               return (
//                 <Tr {...row.getRowProps()} key={index}>
//                   {row.cells.map((cell, index) => {
//                     let data = "";
//                     if (cell.column.Header === "FIRST NAME") {
//                       data = (
//                         <Flex align='center'>
//                           <Text color={textColor} fontSize='sm' fontWeight='700'>
//                             {cell.value}
//                           </Text>
//                         </Flex>
//                       );
//                     } else if (cell.column.Header === "LAST NAME") {
//                       data = (
//                         <Flex align='center'>
//                           <Text
//                             me='10px'
//                             color={textColor}
//                             fontSize='sm'
//                             fontWeight='700'>
//                             {cell.value} 
//                           </Text>
//                         </Flex>
//                       );
//                     } else if (cell.column.Header === "SEX") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "DATE OF BIRTH") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "STATE OF ORIGIN") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           $ {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "ADDRESS") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "PHONE NO") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "EMAIL") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "TWITTER") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "INSTAGRAM") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "LINKEDIN") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "STAFF ID") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "COMMENCEMENT DATE") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "SALARY") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "ROLE") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     } else if (cell.column.Header === "DEPARTMENT") {
//                       data = (
//                         <Text color={textColor} fontSize='sm' fontWeight='700'>
//                           {cell.value}
//                         </Text>
//                       );
//                     }
//                     return (
//                       <Td
//                         {...cell.getCellProps()}
//                         key={index}
//                         fontSize={{ sm: "14px" }}
//                         minW={{ sm: "150px", md: "200px", lg: "auto" }}
//                         borderColor='transparent'>
//                         {data}
//                       </Td>
//                     );
//                   })}
//                 </Tr>
//               );
//             })}
//           </Tbody>
//         </Table>
//       </Card>
//     );
//   }
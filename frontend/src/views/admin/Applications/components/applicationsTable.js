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
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

export default function ColumnsTable(props) {
  const { columnsData, tableData, setApplicationsList } = props;

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

  const [applicationsData, setApplicationsData] = useState({});
  const [assignedTo, setAssignedTo] = useState([])
  const [formErrors, setFormErrors] = useState(null);
  const [userList, setUserList] = useState([])
  const [projectList, setProjectList] = useState([])

  const conditionOptions = [
    { label: "Excellent", value: "Excellent" },
    { label: "Good", value: "Good" },
    { label: "Bad", value: "Bad" },
  ];

  const getApplications = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}application`, config)
      .then((response) => {
        console.log("check our applications: ", response.data);
        setApplicationsList(response.data)
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
      .get(`${baseUrl}application`, config)
      .then((response) => {
        console.log("check our projects: ", response.data);
        setProjectList(response.data.map(option => ({ label: `${option.name}`, value: option.id})))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createApplications = (applicationsData) =>{

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .post(`${baseUrl}application/`, applicationsData, config)
      .then((response) => {
        onClose();
        getApplications();
        console.log("check our fss:", response.data);
        toast.success(`${response.data.message}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error('approved');
      });
  }

  const onChange = (event) => {
    console.log('see the event: ', event);
    const { name, value } = event.target;
    console.log('see the name, event : ', name, ' ,',value);
    const Applications = { ...applicationsData };
    Applications[name] = value;
    setApplicationsData(Applications);
    setFormErrors(null);
  };

  const onOptionSelect = (event, action) => {
    console.log('see the event: ', event, action);
    const { label, value } = event;
    console.log('see the name, event : ', label, ' ,',value);
    const Applications = { ...Applications };
    Applications[action.name] = value;
    setApplicationsData(Applications);
  };

  const onSelect = (event) => {
    console.log('see the event: ', event);
    var newState;
    if (event.length > 0) {
      event?.map((input)=> {
        newState = [...assignedTo, {id: input.value ? input.value : null, name: input.label ? input.label : null}];
      });
    }else{
      newState = [];
    }
    setAssignedTo(newState);
  };

  const onSubmit = () => {
    
    console.log("check our post:", applicationsData);
    const Applications = { ...applicationsData };
    createApplications(Applications);
  };

  useEffect(() => {
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
          Applications
        </Text>
        <Flex px="25px" justify="flex-end" mb="20px" align="center">
        <Button onClick={onOpen} colorScheme='blue'>Create applications</Button>
        </Flex>
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
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Approved"
                              ? "green.500"
                              : cell.value === "Disable"
                              ? "red.500"
                              : cell.value === "Error"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Approved"
                              ? MdCheckCircle
                              : cell.value === "Disable"
                              ? MdCancel
                              : cell.value === "Error"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "ACTIONS") {
                    data = (
                      <Menu />
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
      <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="xl"
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New applicant</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftAddon children="FIRST NAME" borderRadius="16px" />
              <Input
                name="first name"
                placeholder="first name"
                borderRadius="16px"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="last name" borderRadius="16px" />
              <Input
                name="LAST name"
                placeholder="last name"
                borderRadius="16px"
                type="text"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Email" borderRadius="16px" />
              <Input
                name="Email"
                placeholder="Email"
                borderRadius="16px"
                type="email"
                onChange={onChange}
              />
              <InputRightElement borderRadius="16px" />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="phone number" borderRadius="16px" />
              <Input
                name="phone number"
                placeholder="phone number"
                borderRadius="16px"
                type="number"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="address" borderRadius="16px" />
              <Input
                name="address"
                placeholder="address"
                borderRadius="16px"
                type="text"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="city" borderRadius="16px" />
              <Input
                name="city"
                placeholder="city"
                borderRadius="16px"
                type="text"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="date" borderRadius="16px" />
              <Input
                name="date"
                placeholder="date"
                borderRadius="16px"
                type="text"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="desired pay" borderRadius="16px" />
              <Input
                name="desired pay"
                placeholder="desired pay"
                borderRadius="16px"
                type="text"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Project" borderRadius="16px" />
              <HStack spacing={4}>
                {assignedTo?.map((project, index) => (
                  <Tag
                    size={"lg"}
                    key={index}
                    variant="solid"
                    colorScheme="teal"
                  >
                    {project.name}
                  </Tag>
                ))}
              </HStack>
              <Select
                options={projectList}
                isMulti
                onChange={onSelect}
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
          <Button variant="ghost" onClick={onSubmit}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
     
    </Card>
  );
}
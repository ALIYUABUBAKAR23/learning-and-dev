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
  const { columnsData, tableData, setInventoryList } = props;

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

  const [inventoryData, setInventoryData] = useState({});
  const [assignedTo, setAssignedTo] = useState([])
  const [formErrors, setFormErrors] = useState(null);
  const [userList, setUserList] = useState([])
  const [projectList, setProjectList] = useState([])

  const conditionOptions = [
    { label: "Excellent", value: "Excellent" },
    { label: "Good", value: "Good" },
    { label: "Bad", value: "Bad" },
  ];

  const getInventory = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}resources/inventory`, config)
      .then((response) => {
        console.log("check our inventory: ", response.data);
        setInventoryList(response.data)
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
      .get(`${baseUrl}business_analysis/projects`, config)
      .then((response) => {
        console.log("check our projects: ", response.data);
        setProjectList(response.data.map(option => ({ label: `${option.name}`, value: option.id})))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createInventory = (inventoryData) =>{

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .post(`${baseUrl}resources/inventory`, inventoryData, config)
      .then((response) => {
        onClose();
        getInventory();
        console.log("check our response:", response.data);
        toast.success(`${response.data.message}`);
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
    const inventory = { ...inventoryData };
    inventory[name] = value;
    setInventoryData(inventory);
    setFormErrors(null);
  };

  const onOptionSelect = (event, action) => {
    console.log('see the event: ', event, action);
    const { label, value } = event;
    console.log('see the name, event : ', label, ' ,',value);
    const inventory = { ...inventoryData };
    inventory[action.name] = value;
    setInventoryData(inventory);
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
    
    console.log("check our post:", inventoryData);
    const inventory = { ...inventoryData };
    createInventory(inventory);
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
          Inventory
        </Text>
        <Flex px="25px" justify="flex-end" mb="20px" align="center">
        <Button onClick={onOpen} colorScheme='blue'>Create Inventory</Button>
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
        <ModalHeader>Create A New Inventory</ModalHeader>
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
              <InputLeftAddon children="Type" borderRadius="16px" />
              <Input
                name="type"
                placeholder="Type"
                borderRadius="16px"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Date of Purchase" borderRadius="16px" />
              <Input
                name="date_of_purchase"
                placeholder="Date of Purchase"
                borderRadius="16px"
                type="date"
                onChange={onChange}
              />
              <InputRightElement borderRadius="16px" />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon
                children="Purchase Condition"
                borderRadius="16px"
              />
              <Select
                name="purchase_condition"
                options={conditionOptions}
                onChange={onOptionSelect}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon
                children="Current Condition"
                borderRadius="16px"
              />
              <Select
                name="current_condition"
                options={conditionOptions}
                onChange={onOptionSelect}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Current Location" borderRadius="16px" />
              <Input
                name="current_location"
                placeholder="Current Location"
                borderRadius="16px"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Model Number" borderRadius="16px" />
              <Input
                name="model_number"
                placeholder="Model Number"
                borderRadius="16px"
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Serial Number" borderRadius="16px" />
              <Input
                name="serial_number"
                placeholder="Serial Number"
                borderRadius="16px"
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

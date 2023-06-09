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
  const { columnsData, tableData, setItemList } = props;

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
  const [itemData, setItemData] = useState({});
  const [assignedTo, setAssignedTo] = useState([])
  const [formErrors, setFormErrors] = useState(null);
  const [inventoryList, setInventoryList] = useState([])


  const getItems = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}resources/item`, config)
      .then((response) => {
        console.log("check our items: ", response.data);
        setItemList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        setInventoryList(response.data.map(option => ({ label: `${option.name}`, value: option.id})))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createItem = (itemData) =>{

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .post(`${baseUrl}resources/item`, itemData, config)
      .then((response) => {
        onClose();
        getItems();
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
    const item = { ...itemData };
    item[name] = value;
    setItemData(item);
    setFormErrors(null);
  };

  const onOptionSelect = (event, action) => {
    console.log('see the event: ', event, action);
    const { label, value } = event;
    console.log('see the name, event : ', label, ' ,',value);
    const item = { ...itemData };
    item[action.name] = value;
    setItemData(item);
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
    
    console.log("check our post:", itemData);
    const item = { ...itemData };
    createItem(item);
  };


  useEffect(() => {
    getInventory();
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
         Items
        </Text>
        <Button onClick={onOpen} colorScheme='blue'>Add Items</Button>
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
                  } else if (cell.column.Header === "INVENTORY") {
                    data = (
                      <Flex align="center">
                        <HStack spacing={4}>
                          {cell.value?.map((inventory, index) => (
                            <Tag size={'sm'} key={index} variant='solid' colorScheme='teal'>
                              {inventory.name}
                            </Tag>
                          ))}
                        </HStack>
                      </Flex>
                    );
                  }else if (cell.column.Header === "ACTIONS") {
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
      <ModalHeader>Add a new Item</ModalHeader>
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
            
            <Textarea name="description" placeholder='Enter A Brief Or Detailed Description Of The Item' onChange={onChange} />
            <InputRightElement
              borderRadius="16px"
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
            <InputLeftAddon children="Date of Purchase" borderRadius="16px" />
            <Input name="date_of_purchase" placeholder="Date of Purchase" borderRadius="16px" type="date" onChange={onChange}/>
            <InputRightElement
              borderRadius="16px"
              children={<CalendarIcon color="green.500" />}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Cost" borderRadius="16px" />
            <Input
              name="cost"
              placeholder="Cost"
              borderRadius="16px"
              onChange={onChange}
            />
          </InputGroup>
          <InputGroup>
              <InputLeftAddon children="Inventory" borderRadius="16px" />
              <HStack spacing={4}>
                {assignedTo?.map((inventory, index) => (
                  <Tag
                    size={"lg"}
                    key={index}
                    variant="solid"
                    colorScheme="teal"
                  >
                    {inventory.name}
                  </Tag>
                ))}
              </HStack>
              <Select
                options={inventoryList}
                isMulti
                onChange={onSelect}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Purchase Quantity" borderRadius="16px" />
            <Input
              name="purchase_quantity"
              placeholder="Purchase Quantity"
              borderRadius="16px"
              onChange={onChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Quantity" borderRadius="16px" />
            <Input
              name="quantity"
              placeholder="Quantity"
              borderRadius="16px"
              onChange={onChange}
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

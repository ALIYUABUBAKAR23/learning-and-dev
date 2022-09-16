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
import ContractModal from "./ContractModal";



export default function ContractTable(props) {
  const { columnsData, contractData, setContractList } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => contractData, [contractData]);

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
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignedTo, setAssignedTo] = useState([])
  const [formErrors, setFormErrors] = useState(null);
  const [contractDataList, setContractDataList] = useState({});
  const [userList, setUserList] = useState([])

  const contractTypeData = [
    {label:"Full-Time", value:"Full-Time"},
    {label:"Part-Time", value:"Part-Time"},
  ]

  
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


  const getContracts = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}hr/contracts`, config)
      .then((response) => {
        console.log("check our contracts: ", response.data);
        setContractList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  const createContract = (contractData) =>{

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .post(`${baseUrl}hr/contracts`, contractData, config)
      .then((response) => {
        onClose();
        getContracts();
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
    const contract = { ...contractDataList };
    contract[name] = value;
    setContractDataList(contract);
    setFormErrors(null);
  };

  const onOptionSelect = (event, action) => {
    console.log('see the event: ', event, action);
    const { label, value } = event;
    console.log('see the name, event : ', label, ' ,',value);
    const contract = { ...contractDataList };
    contract[action.name] = value;
    setContractDataList(contract);
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
    
    console.log("check our post:", contractDataList);
    const contract = { ...contractDataList };
    createContract(contract);
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
          My Contracts
        </Text>
        <Button onClick={onOpen}>Create Contract</Button>
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
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
                  if (cell.column.Header === "CONTRACT TYPE") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE ISSUED") {
                    data = (
                      <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "CONTRACT LENGTH") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value} months 
                      </Text>
                    );
                  } else if (cell.column.Header === "CONTRACT DETAILS") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "CONTRACT DOCUMENT") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "END DATE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "USER ID") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "APPROVED BY ID") {
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
      <ContractModal 
        isOpen={isOpen} 
        onClose={onClose}
        onOpen={onOpen}
        onSelect={onSelect}
        userList={userList}
        assignedTo={assignedTo}
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
      />
    </Card>
  );
}

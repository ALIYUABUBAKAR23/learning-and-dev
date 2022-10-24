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
import Select from "react-select";
// Custom components
import Card from "../../../../components/card/Card";
import Menu from "./MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import APIClient from "../../../../lib/APIClient";
import {
  CalendarIcon,
  CheckIcon,
  PhoneIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import { PersonIcon } from "../../../../components/icons/Icons";
import axios from "axios";
axios.defaults.withCredentials = true;
import { baseUrl } from "../../../../utility/index";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import CustomerModal from "./CustomerModal";
import ConfirmationModal from "./ConfirmationModal";

export default function ColumnsTable(props) {
  const { columnsData, tableData, setCustomerList } = props;

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
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const [customerData, setCustomerData] = useState({});
  const [assignedTo, setAssignedTo] = useState([]);
  const [formErrors, setFormErrors] = useState(null);
  const [userList, setUserList] = useState([]);
  const [customerToEdit, setCustomerToEdit] = useState();
  const [customerToDelete, setCustomerToDelete] = useState();

  // const customerStatusOptions = [
  //   { label: "Open", value: "Open" },
  //   { label: "Pending", value: "Pending" },
  //   { label: "Suspended", value: "Suspended" },
  //   { label: "Postponed", value: "Postponed" },
  //   { label: "Completed", value: "Completed" },
  //   { label: "Incomplete", value: "Incomplete" },
  //   { label: "Cancelled", value: "Cancelled" },
  // ];

  // const customerPriorityOptions = [
  //   { label: "High", value: "High" },
  //   { label: "Medium", value: "Medium" },
  //   { label: "Low", value: "Low" },
  // ];

  const getCustomers = () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        authorization: `Token ${Cookies.get("token")}`,
      },
    };

    axios
      .get(`${baseUrl}customers/customers`, config)
      .then((response) => {
        console.log("check our customers: ", response.data);
        setCustomerList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getUsers = () => {
  //   const config = {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": Cookies.get("csrftoken"),
  //       authorization: `Token ${Cookies.get("token")}`,
  //     },
  //   };

  //   axios
  //     .get(`${baseUrl}users/`, config)
  //     .then((response) => {
  //       console.log("check our users: ", response.data);
  //       setUserList(
  //         response.data.map((option) => ({
  //           label: `${option.first_name} ${option.middle_name} ${option.last_name}`,
  //           value: option.id,
  //         }))
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const createCustomer = (customerData, httpVerb) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        authorization: `Token ${Cookies.get("token")}`,
      },
    };

    axios[httpVerb](`${baseUrl}customers/customers`, customerData, config)
      .then((response) => {
        onClose();
        getCustomers();
        setCustomerData();
        setCustomerToEdit();
        console.log("check our response:", response.data);
        toast.success(`${response.data.message}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not created!");
      });
  };

  const deleteCustomer = (customer_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        authorization: `Token ${Cookies.get("token")}`,
      },
      data: { customer_id: customer_id },
    };

    axios
      .delete(`${baseUrl}customers/customers`, config)
      .then((response) => {
        onCloseConfirm();
        getCustomers();
        console.log("Successfully deleted customer!", response.data);
        toast.success(`Successfully deleted customer!`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not deleted!");
      });
  };

  const setEditCustomer = (customerData) => {
    console.log("customer data: ", customerData);
    setCustomerToEdit(customerData);
    onOpen();
  };
  const setCustomerForDelete = (customerData) => {
    console.log("delete customer data id: ", customerData.id);
    setCustomerToDelete(customerData.id);
    onOpenConfirm();
  };
  const onChange = (event) => {
    console.log("see the event: ", event);
    const { name, value } = event.target;
    console.log("see the name, event : ", name, " ,", value);
    const customer = { ...customerData };
    customer[name] = value;
    setCustomerData(customer);
    setFormErrors(null);
  };

  const onOptionSelect = (event, action) => {
    console.log("see the event: ", event, action);
    const { label, value } = event;
    console.log("see the name, event : ", label, " ,", value);
    const customer = { ...customerData };
    customer[action.name] = value;
    setCustomerData(customer);
  };

  // const onSelect = (event) => {
  //   console.log("see the event: ", event);
  //   var newState;
  //   if (event.length > 0) {
  //     event?.map((input) => {
  //       newState = [
  //         ...assignedTo,
  //         {
  //           id: input.value ? input.value : null,
  //           name: input.label ? input.label : null,
  //         },
  //       ];
  //     });
  //   } else {
  //     newState = [];
  //   }
  //   setAssignedTo(newState);
  // };

  const formatData = (data) => {
    console.log("formatting...");
    console.log(data);
    const keys = Object.keys(data);

    keys.forEach((key) => {
      if (key === "priority") {
        data[key] = data[key].value;
      }
      if (key === "status") {
        data[key] = data[key].value;
      }
    });

    console.log(`our formatted data in formatData: \n ${data}`);
    return data;
  };

  const onSubmit = (httpVerb, customerData) => {
    let unFormattedCustomer = { ...customerData };
    let customer = formatData(unFormattedCustomer);
    customer["assigned_to"] = [...assignedTo];
    console.log("check our post:", customerData);
    createCustomer(customer, httpVerb);
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
          Customers
        </Text>
        <Button onClick={onOpen}>Create Customer</Button>
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
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "MIDDLE NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "LAST NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                      {cell.value}
                    </Text>
                    );
                  } else if (cell.column.Header === "DATE OF BIRTH") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "ADDRESS") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "OCCUPATION") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "COMPANY") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PHONE NUMBER") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "EMAIL") {
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
      <CustomerModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}  
        userList={userList}
        assignedTo={assignedTo}
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
        editCustomer={customerToEdit}
        setCustomerToEdit={setEditCustomer}
      />
      <ConfirmationModal
        customerId={customerToDelete}
        deleteCustomer={deleteCustomer}
        setCustomerToDelete={setCustomerToDelete}
        onOpen={onOpenConfirm}
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
      />
    </Card>
  );
}

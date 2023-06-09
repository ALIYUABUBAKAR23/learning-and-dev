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
  useDisclosure,
  Button,
  HStack
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
import { RiLogoutBoxLine, RiLoginBoxLine } from "react-icons/ri";
import {
  MdOutlineAssignmentLate,
  MdOutlineAssignmentInd,
  MdPendingActions,  
  MdOutlineAssignment,
  MdHourglassEmpty,
  MdCheckCircleOutline,
  MdBlock,
  MdRemoveCircleOutline
} from "react-icons/md";

import axios from "axios";
axios.defaults.withCredentials = true;
import { baseUrl } from "../../../../utility/index";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

//Modals
import LeaveModal from "./LeaveModal";
import ConfirmationModal from "./ConfirmationModal";

export default function ColumnsTable(props) {
  const { columnsData, tableData, setLeaveList } = props;

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
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const [leaveData, setLeaveData] = useState({});
  const [requestingStaff, setRequestingStaff] = useState([])   
  const [formErrors, setFormErrors] = useState(null);
  const [userList, setUserList] = useState([]);
  const [leaveToEdit, setLeaveToEdit] = useState();
  const [leaveToDelete, setLeaveToDelete] = useState();

  const getLeaves = () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        authorization: `Token ${Cookies.get("token")}`,
      },
    };

    axios
      .get(`${baseUrl}hr/leaves`, config)
      .then((response) => {
        console.log("check our leaves: ", response.data);
        setLeaveList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        authorization: `Token ${Cookies.get("token")}`,
      },
    };

    axios
      .get(`${baseUrl}users/`, config)
      .then((response) => {
        setUserList(
          response.data.map((option) => ({
            label: `${option?.first_name} ${option?.middle_name} ${option.last_name}`,
            id: option.id,
            value: {...option}
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Return user object based on id
  const findUser = (list, id) => {
    let user = list.find(user => user.id === id);
    return user
  }

  const createLeave = (leaveData, httpVerb) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization': `Token ${Cookies.get("token")}`,
      },
    };

    axios[httpVerb](`${baseUrl}hr/leaves`, leaveData, config)
      .then((response) => {
        onCloseCreate();
        getLeaves();
        setLeaveData();
        toast.success(`${response.data.message}`);
        setEditLeave(null)
        onCloseCreate();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not successful!");
      });
  };

  const deleteLeave = (leave_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        authorization: `Token ${Cookies.get("token")}`,
      },
      data: { leave_id: leave_id },
    };

    axios
      .delete(`${baseUrl}hr/leaves`, config)
      .then((response) => {
        onCloseConfirm();
        getLeaves();
        toast.success(`Successfully deleted leave!`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not deleted!");
      });
  };

  const setEditLeave = (leaveData) => {
    setLeaveToEdit(leaveData);
    onOpenCreate();
  };

  const setLeaveForDelete = (leaveData) => {
    setLeaveToDelete(leaveData.id);
    onOpenConfirm();
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    const leave = { ...leaveData };
    leave[name] = value;
    setLeaveData(leave);
    setFormErrors(null);
  };

  const onOptionSelect = (event, action) => {
    const { label, value, user } = event;
    console.log("see the name, event , user: ", label, " ,", user);
    const leave = { ...leaveData };
    console.log(action)
    leave[action.name] = user;
    setLeaveData(leave);
  };




  const onSubmit = (httpVerb, leaveData) => {
    let leave = { ...leaveData };
    createLeave(leave, httpVerb);
  };
  const approvalStatusOptions = [
    "Waiting",
    "Validated",
    "Refused",
    "Cancelled"
  ];
  
  useEffect(() => {
    getLeaves();
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
          Leaves
        </Text>
        <Button onClick={onOpenCreate} >Create Leave</Button>
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
                  if (cell.column.Header === "APPROVAL STATUS") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value == "1"
                              ? "red.500"
                              : cell.value == "2"
                              ? "green.500"
                              : cell.value == "3"
                              ? "red.300"
                              : cell.value == "4"
                              ? "green.200"
                              : null
                          }
                          as={
                            cell.value == "1"
                              ? MdHourglassEmpty
                              : cell.value == "2"
                              ? MdCheckCircleOutline
                              : cell.value == "3"
                              ? MdBlock
                              : cell.value == "4"
                              ? MdRemoveCircleOutline
                              : null
                          }
                        />
                        <Text 
                        color="gray.500"
                        fontSize="xs" fontWeight="700">
                          {approvalStatusOptions[cell.value - 1]}
                        </Text>

                      </Flex>
                    );

                  } else if (cell.column.Header === "REQUESTING STAFF") {
                    //user = findUser(userList,cell.row.original.requesting_staff_id).label
                    data = (
                        <Flex align="center">
                         <Text color={textColor} fontSize="sm" fontWeight="700">
                          ID: {cell.row.original.requesting_staff_id}
                        </Text>
                      </Flex>
                      );
                  } else if (cell.column.Header === "ACTIONS") {
                      data = (
                        <Menu
                          editData={cell.row.original}
                          setLeaveToEdit={setEditLeave}
                          setLeaveForDelete={setLeaveForDelete}
                          onOpen={onOpenCreate}
                          onOpenConfirm={onOpenConfirm}
                        />
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
    <LeaveModal
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        onOpen={onOpenCreate}
        userList={userList}
        requestingStaff={requestingStaff}
        setRequestingStaff = {setRequestingStaff}
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
        editLeave={leaveToEdit}
        setLeaveToEdit={setEditLeave}
      />
       <ConfirmationModal
        leaveId={leaveToDelete}
        deleteLeave={deleteLeave}
        setLeaveToDelete={setLeaveToDelete}
        onOpen={onOpenConfirm}
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
      />
    </Card>
  );
}

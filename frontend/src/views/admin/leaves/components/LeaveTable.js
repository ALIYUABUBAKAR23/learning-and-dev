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
  const [assignedTo, setAssignedTo] = useState([]);
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
            value: option.id,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createLeave = (leaveData, httpVerb) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        authorization: `Token ${Cookies.get("token")}`,
      },
    };

    axios[httpVerb](`${baseUrl}hr/leaves`, leaveData, config)
      .then((response) => {
        onCloseCreate();
        getLeaves();
        setLeaveData();
        toast.success(`${response.data.message}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not created!");
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
    const { label, value } = event;
    const leave = { ...leaveData };
    leave[action.name] = value;
    setLeaveData(leave);
  };

  const onSelect = (event) => {
    var newState;
    if (event.length > 0) {
      event?.map((input) => {
        newState = [
          ...assignedTo,
          {
            id: input.value ? input.value : null,
            name: input.label ? input.label : null,
          },
        ];
      });
    } else {
      newState = [];
    }
    setAssignedTo(newState);
  };

  const onSubmit = (httpVerb, leaveData) => {
    let leave = { ...leaveData };
    createLeave(leave, httpVerb);
  };

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
                  if (cell.column.Header === "TYPE") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Dr"
                              ? "red.500"
                              : cell.value === "Cr"
                              ? "green.500"
                              : null
                          }
                          as={
                            cell.value === "Cr"
                              ? RiLoginBoxLine
                              : cell.value === "Dr"
                              ? RiLogoutBoxLine
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "CODE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
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
        onSelect={onSelect}
        userList={userList}
        assignedTo={assignedTo}
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

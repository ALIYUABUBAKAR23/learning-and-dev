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
  
import Card from "../../../components/card/Card";
import Menu from "./MainMenu";

import { RiLogoutBoxLine, RiLoginBoxLine } from "react-icons/ri";

import axios from "axios";
axios.defaults.withCredentials = true;
import { baseUrl } from "../../../utility/index";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ReportModal from "./ReportModal";
import ConfirmationModal from "./ConfirmationModal";

export default function ReportTable(props) {
    const { columnsData, tableData, setReportList } = props;
  
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
    const [reportData, setReportData] = useState({});
    const [formErrors, setFormErrors] = useState(null);
    const [listReport, setListReport] = useState([]);
    const [reportToEdit, setReportToEdit] = useState();
    const [reportToDelete, setReportToDelete] = useState();
  
    const getReports = () => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
      };
  
      axios
        .get(`${baseUrl}hr/reports/`, config)
        .then((response) => {
          console.log("check our reports: ", response.data);
          setReportList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const createReport = (reportData, httpVerb) => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
      };
  
      axios[httpVerb](`${baseUrl}hr/reports/`, reportData, config)
        .then((response) => {
          onCloseCreate();
          getReports();
          setReportData();
          toast.success(`${response.data.message}`);
          setEditReport(null)
          onCloseCreate();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Not created!");
        });
    };
  

    // const updateReport = (reportData) => {
    //     const config = {
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //           "X-CSRFToken": Cookies.get("csrftoken"),
    //           authorization: `Token ${Cookies.get("token")}`,
    //         },
    //         data: { id: reportData.id},
    //       };
      
    //       axios
		//   .put(`${baseUrl}hr/reports/id/`, reportData, config)
		//   .then((response) => {
		// 	onCloseEdit();
		// 	getReports();
		// 	setReportData();
		// 	toast.success(`${response.data.message}`);
		//   })
		//   .catch((error) => {
		// 	console.log(error);
		// 	toast.error("Not updated!");
		//   });
	  // };


    const deleteReport = (report_id) => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
        data: { report_id: report_id },
      };
  
      axios
        .delete(`${baseUrl}hr/report/id`, config)
        .then((response) => {
          onCloseConfirm();
          getReports();
          toast.success(`Report Successfully deleted!`);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Not deleted!");
        });
    };
  
    const setEditReport = (reportData) => {
      setReportToEdit("Updating",reportData);
      onOpenCreate();
    };
  
    const setReportForDelete = (reportData) => {
      setReportToDelete(reportData.id);
      onOpenConfirm();
    };
  
    const onChange = (event) => {
      const { name, value } = event.target;
      const report = { ...reportData };
      report[name] = value;
      setReportData(report);
      setFormErrors(null);
    };
  
    const onOptionSelect = (event, action) => {
      const { label, value } = event;
      const report = { ...reportData };
      report[action.name] = value;
      setReportData(report);
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
  
    const onSubmit = (httpVerb, reportData) => {
      let report = { ...reportData };
      createReport(report, httpVerb);
    };
      
    // const onSubmitEdit = (editedReport) => {
    //   const report = {...editedReport};
    //   updateReport(report)
    // }

    useEffect(() => {
      getReports();
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
            Reports
          </Text>
          <Button onClick={onOpenCreate}>Create Report</Button>
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
                    if (cell.column.Header === "STATUS") {
                      data = (
                        <Flex align="center">
                          <Icon
                            w="24px"
                            h="24px"
                            me="5px"
                            color={
                              cell.value === "InActive"
                                ? "red.500"
                                : cell.value === "Active"
                                ? "green.500"
                                : null
                            }
                            as={
                              cell.value === "InActive"
                                ? RiLoginBoxLine
                                : cell.value === "Active"
                                ? RiLogoutBoxLine
                                : null
                            }
                          />
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "TITLE") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "ACTIONS") {
                      data = (
                        <Menu
                          editData={cell.row.original}
                          setReportToEdit={setEditReport}
                          setReportToDelete={setReportForDelete}
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
        <ReportModal
          isOpen={isOpenCreate}
          onClose={onCloseCreate}
          onOpen={onOpenCreate}
          onSelect={onSelect}
          onChange={onChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
          editReport={reportToEdit}
          setReportToEdit={setEditReport}
        />
        <ConfirmationModal
          reportId={reportToDelete}
          deleteReport={deleteReport}
          setReportToDelete={setReportToDelete}
          onOpen={onOpenConfirm}
          isOpen={isOpenConfirm}
          onClose={onCloseConfirm}
        />
      </Card>
    );
  }
  
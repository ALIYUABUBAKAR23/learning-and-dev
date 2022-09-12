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
  import {baseUserUrl} from "../../../../utility/index"
  import Cookies from "js-cookie";
  import toast from "react-hot-toast";
  import StaffModal from "./StaffModal";
  import ConfirmationModal from "./ConfirmationModal";
  
  export default function ColumnsTable(props) {
    const { columnsData, tableData, setStaffList } = props;
  
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
    const [staffData, setStaffData] = useState({});
    const [dept, setDept] = useState([]) 
    const [formErrors, setFormErrors] = useState(null);
    const [departmentList, setDepartmentList] = useState([]);
    const [staffToEdit, setStaffToEdit] = useState();
    const [staffToDelete, setStaffToDelete] = useState();
  
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
  
    const getStaff = () => {
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
          console.log("check our staffs: ", response.data);
          setStaffList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const getDepartments = () => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
      };
  
      axios
        .get(`${baseUrl}hr/departments`, config)
        .then((response) => {
          console.log("check our departments: ", response.data);
          setDepartmentList(
            response.data.map(option => ({ 
            label: `${option.name}`, 
            value: option.id 
          })))
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const createStaff = (staffData, httpVerb) => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
      };
  
      axios[httpVerb](`${baseUserUrl}rest-auth/registration/`, staffData, config)
        .then((response) => {
          onClose();
          getStaff();
          setStaffData();
          setStaffToEdit();
          console.log("check our response:", response.data);
          toast.success(`${response.data.message}`);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Not created!");
        });
    };
  
    const deleteStaff = (staff_id) => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
        data: { staff_id: staff_id },
      };
  
      axios
        .delete(`${baseUrl}rest-auth/registration/`, config)
        .then((response) => {
          onCloseConfirm();
          getStaffs();
          console.log("Successfully deleted staff!", response.data);
          toast.success(`Successfully deleted staff!`);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Not deleted!");
        });
    };
  
    const setEditStaff = (staffData) => {
      console.log("staff data: ", staffData);
      setStaffToEdit(staffData);
      onOpen();
    };
    const setStaffForDelete = (staffData) => {
      console.log("delete staff data id: ", staffData.id);
      setStaffToDelete(staffData.id);
      onOpenConfirm();
    };
    const onChange = (event) => {
      console.log("see the event: ", event);
      const { name, value } = event.target;
      console.log("see the name, event : ", name, " ,", value);
      const staff = { ...staffData };
      staff[name] = value;
      setStaffData(staff);
      setFormErrors(null);
    };
  
    const onOptionSelect = (event, action) => {
      console.log("see the event: ", event, action);
      const { label, value } = event;
      console.log("see the name, event : ", label, " ,", value);
      const staff = { ...staffData };
      staff[action.name] = value;
      setStaffData(staff);
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
        if (key === "state_of_origin") {
          data[key] = data[key].value;
        }
        if (key === "is_married") {
          data[key] = data[key].value;
        }
        if (key === "sex") {
          data[key] = data[key].value;
        }
      });
  
      console.log(`our formatted data in formatData: \n ${data}`);
      return data;
    };
  
    const onSubmit = (httpVerb, staffData) => {
      let unFormattedStaff = { ...staffData };
      let staff = formatData(unFormattedStaff);
      staff["department"] = [...dept];
      console.log("check our post:", staffData);
      createStaff(staff, httpVerb);
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
        overflowX={{ sm: "scroll", lg: "hidden" }}
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
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        
                      );
                    } else if (cell.column.Header === "MIDDLE NAME") {
                      data = (
                          <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value} 
                          </Text>
                        
                      );
                    } else if (cell.column.Header === "LAST NAME") {
                      data = (
                          <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value} 
                          </Text>
                        
                      );
                    } else if (cell.column.Header === "SEX") {
                      data = (
                        <Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value} 
                      </Text>
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
                    // } else if (cell.column.Header === "ASSIGNED TO") {
                    //   data = (
                    //     <Flex align="center">
                    //       <HStack spacing={4}>
                    //         {cell.value?.map((user, index) => (
                    //           <Tag
                    //             size={"sm"}
                    //             key={index}
                    //             variant="solid"
                    //             colorScheme="teal"
                    //           >
                    //             {user.name}
                    //           </Tag>
                    //         ))}
                    //       </HStack>
                    //     </Flex>
                    //   );
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
                      data = (
                        <Menu
                          editData={cell.row.original}
                          setStaffToEdit={setEditStaff}
                          setStaffForDelete={setStaffForDelete}
                          onOpen={onOpen}
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
        <StaffModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          departmentList={departmentList}
          onChange={onChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
          editStaff={staffToEdit}
          setStaffToEdit={setEditStaff}
        />
        <ConfirmationModal
          staffId={staffToDelete}
          deleteStaff={deleteStaff}
          setStaffToDelete={setStaffToDelete}
          onOpen={onOpenConfirm}
          isOpen={isOpenConfirm}
          onClose={onCloseConfirm}
        />
      </Card>
    );
  }
  
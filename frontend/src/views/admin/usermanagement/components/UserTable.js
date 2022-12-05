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
    Input,
    InputLeftAddon,
    HStack,
    Tag,
    } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import Select from 'react-select';
import Card from "../../../../components/card/Card";
import UserModal from "./UserModal"
import Menu from "../../../../components/menu/MainMenu";


export default function UserTable(props){
    const { columnsData, tableData, setUsersList } = props;
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
      const [userData, setUserData] = useState({});
      

      const onChange = (event) => {
        console.log('see the event: ', event);
        const { name, value } = event.target;
        console.log('see the name, event : ', name, ' ,',value);
        const item = { ...userData };
        item[name] = value;
        setUserData(item);
        setFormErrors(null);
      };
    return (
      <>
  
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
           Users
          </Text>
          <Button onClick={onOpen} colorScheme='blue'>Add User</Button>
        </Flex>
        <UserModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />

      </Card> 
      </>
    );
  }
    

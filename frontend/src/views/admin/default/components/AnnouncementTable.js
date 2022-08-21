import {
  Flex,
  Table,
  Checkbox,
  Icon,
  Box,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "../../../../components/card/Card";
import Menu from "../../../../components/menu/MainMenu";

//assets
import {AiFillFlag} from "react-icons/ai";
import {FaAsterisk} from "react-icons/fa";

export default function AnnouncementTable(props) {
  const { columnsData, tableData } = props;

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
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' align='center'>
        <Text
          color={textColor}
          fontSize='20px'
          fontWeight='700'
          lineHeight='100%'>
          Announcements
        </Text>
        <Menu />
      </Flex>
      <Flex px='25px'>
      <Text
            color='secondaryGray.600'
            fontSize='sm'
            fontWeight='500'
            mt='4px'
            me='12px'>
      General
      </Text>
      </Flex>
      <Box px='11px'>
        <Flex px='25px' py="10px" direction='column'>
          <Flex>
            <Icon w='12px' h='12px' as={FaAsterisk} color={textColor}></Icon>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='lg'
              textAlign='start'>
              Landing Page Design
            </Text>
          </Flex>
          <Flex px='2px'>
            <Icon w='20px' h='20px' as={AiFillFlag} color='#ee3f50'></Icon>
            <Text
              fontWeight='bold'
              color='secondaryGray.600'
              fontSize='sm'
              textAlign='start'>
              Priority: High
            </Text>
          </Flex>
        </Flex>
        <Flex px='25px' py="10px" direction='column'>
          <Flex>
            <Icon w='12px' h='12px' as={FaAsterisk} color={textColor}></Icon>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='lg'
              textAlign='start'>
              Landing Page Design
            </Text>
          </Flex>
          <Flex>
            <Icon w='20px' h='20px' as={AiFillFlag} color='#ee3f50'></Icon>
            <Text
              fontWeight='bold'
              color='secondaryGray.600'
              fontSize='sm'
              textAlign='start'>
              Priority: High
            </Text>
          </Flex>
        </Flex>
        <Flex px='25px' py="10px" direction='column'>
          <Flex>
            <Icon w='12px' h='12px' as={FaAsterisk} color={textColor}></Icon>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='lg'
              textAlign='start'>
              Submit new task by tomorrow
            </Text>
          </Flex>
          <Flex px='2px'>
            <Icon w='20px' h='20px' as={AiFillFlag} color='#eece50'></Icon>
            <Text
              fontWeight='bold'
              color='secondaryGray.600'
              fontSize='sm'
              textAlign='start'>
              Priority: Low
            </Text>
          </Flex>
        </Flex>
     </Box>
    </Card>
  );
}

import {
  Flex,
  Button,
  Icon,
  Box,
  Text,
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

//assets
import {AiOutlineFileAdd, AiOutlineFileWord} from "react-icons/ai";
import {VscFilePdf} from "react-icons/vsc";
import {BsFileEarmarkSpreadsheet} from "react-icons/bs";

export default function RecentReports(props) {
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
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );

  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify='space-between'
          w='100%'
          px='22px'
          py='18px'>
          <Text color={textColor} fontSize='xl' fontWeight='600'>
            Recent Reports
          </Text>
          <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
            >
            <Icon as={AiOutlineFileAdd} color={iconColor} w='24px' h='24px' />
          </Button>
        </Flex>
      <Box px='11px' direction="column">
        <Flex 
          mb='10px' 
          direction='row' 
          px='25px'
          mx='auto'
          _hover={bgItem}
          bg='transparent'
          boxShadow='unset'
          py='15px'          
          transition='0.2s linear'
          cursor='pointer'>
            <Icon w='30px' h='30px' as={VscFilePdf} color="#ff4900"></Icon>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='lg'
              px="10px"
              textAlign='start'>
              Landing.pdf
            </Text>
        </Flex>
        <Flex 
          mb='10px' 
          direction='row' 
          px='25px'
          mx='auto'
          _hover={bgItem}
          bg='transparent'
          boxShadow='unset'
          py='15px'
          transition='0.2s linear'
          cursor='pointer'>
            <Icon w='30px' h='30px' as={AiOutlineFileWord} color="#13bcef"></Icon>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='lg'
              px="10px"
              textAlign='start'>
              Landing.doc
            </Text>
        </Flex>
        <Flex
          mb='10px' 
          direction='row' 
          px='25px'
          mx='auto'
          _hover={bgItem}
          bg='transparent'
          boxShadow='unset'
          py='15px'          
          transition='0.2s linear'
          cursor='pointer'>
            <Icon w='30px' h='30px' as={BsFileEarmarkSpreadsheet} color="#11d954"></Icon>
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='lg'
              px="10px"
              textAlign='start'>
              Landing.xls
            </Text>
        </Flex>
      </Box>
    </Card>
  );
}

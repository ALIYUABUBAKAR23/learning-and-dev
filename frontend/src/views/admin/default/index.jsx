/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "../../../assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "../../../components/calendar/MiniCalendar";
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import { React, useEffect, useState } from "react";
import CheckTable from "../../admin/default/components/CheckTable";
import ComplexTable from "../../admin/default/components/ComplexTable";
import RecentReports from "../../admin/default/components/RecentReports";
import SharedReports from "../../admin/default/components/SharedReports";
import AnnouncementTable from "../../admin/default/components/AnnouncementTable";
import DailyTraffic from "../../admin/default/components/DailyTraffic";
import PieCard from "../../admin/default/components/PieCard";
import Tasks from "../../admin/default/components/Tasks";
import ActivityGraph from "../../admin/default/components/ActivityGraph";
import WeeklyRevenue from "../../admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "../../admin/default/variables/columnsData";
import tableDataCheck from "../../admin/default/variables/tableDataCheck.json";
import tableDataComplex from "../../admin/default/variables/tableDataComplex.json";
import axios from "axios";
import APIClient from "../../../lib/APIClient";
//assets
import {
  MdOutlineAssignmentLate,
  MdOutlineAssignmentInd,
  MdPendingActions,  
  MdOutlineAssignment
} from "react-icons/md";
import {
  BiTask,
  BiTaskX,
} from "react-icons/bi"

export default function UserReports() {
  // Chakra Color Mode
  const [user, setUser] = useState({
    username: "",
    password: "",
    error: "",
    isAuthenticated: false,
  });
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
        //green
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #119554 0%, #11d954 100%)'
              icon={<Icon w='32px' h='32px' as={BiTask} color='white' />}
            />
          }
          name='Completed Tasks'
          value='6'
        />
        <MiniStatistics
        //red
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #a30000 0%, #ff4900 100%)'
              icon={<Icon w='32px' h='32px' as={BiTaskX} color='white' />}
            />
          }
          name='Cancelled Tasks'
          value='6'
        />
        <MiniStatistics
        //yellow
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #c6b654 0%, #e8d054 100%)'
              icon={<Icon w='32px' h='32px' as={MdPendingActions} color='white' />}
            />
          }
          name='Pending Tasks'
          value='6'
        />
        <MiniStatistics
        //grey
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #5a575a 0%, #c9c7c5 100%)'
              icon={<Icon w='32px' h='32px' as={MdOutlineAssignmentLate} color='white' />}
            />
          }
          name='Postponed Tasks'
          value='6'
        />
        <MiniStatistics
        //blue
          startContent={
            <Flex mt='10px'>
              <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #1306ef 0%, #13bcef 100%)'
              icon={<Icon w='32px' h='32px' as={MdOutlineAssignmentInd} color='white' />}
            />
            </Flex>
          }
          endContent={
            <Flex>
              <FormLabel htmlFor='balance'>
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Assigned by Lutor'
          value='2'
        />
        <MiniStatistics
        //pink
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #cc89a8 0%, #eac2d6 100%)'
              icon={<Icon w='32px' h='32px' as={MdOutlineAssignment} color='white' />}
            />
          }
          name='Total Tasks'
          value='18'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <ActivityGraph />
        <Tasks />      
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
          <AnnouncementTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
      <RecentReports
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      <SharedReports
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
    </Box>
  );
}

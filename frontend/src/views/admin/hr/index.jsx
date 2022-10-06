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
import { Button, ButtonGroup } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, SimpleGrid } from "@chakra-ui/react";
import StaffTable from "../hr/components/StaffTable";
import {
  columnsDataStaff,
} from "./variables/columnsData";
import tableDataStaff from "../hr/variables/tableDataStaff.json";
import React, { useEffect, useState} from "react";
import StaffModal from './components/StaffModal';
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";


export default function HR() {
// Chakra Color Mode
  // const [openModal, setOpenModal] = useState(false);
  const [staffList, setStaffList] = useState([])
  
  const setList = (data) => {
    setStaffList(data);
  };

  const getStaff = () =>{
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
        console.log("check our staff: ", response.data);
        setStaffList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getStaff();
  }, [setStaffList]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
          mb='20px'
          // columns={{ sm: 1, md: 2 }}
          // spacing={{ base: "20px", xl: "20px", top: "20px" }}
        >
        <StaffTable
          columnsData={columnsDataStaff}
          tableData={staffList}
          setStaffList={setList}
        />
        {/* <Button 
        classname="createModalBtn" 
        onClick={() => {setOpenModal(true);}} 
        rightIcon={<AddIcon />} 
        colorScheme='blue' 
        variant='solid'
        >
          Create Staff
        </Button>
        {openModal && <NewModal closeModal={setOpenModal} />} */}
      </SimpleGrid>
    </Box>

  );
}

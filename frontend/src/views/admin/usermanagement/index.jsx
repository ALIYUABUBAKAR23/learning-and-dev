import React, { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { columnsDataUsers } from './variables/columnsData';
import UserTable from "./components/UserTable";

export default function Settings (){
    const [usersList, setUsersList] = useState([])
    
    const setList = (data) => {
        setUsersList(data);
      }; 

    return(
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        >
        <UserTable
          columnsData={columnsDataUsers}
          tableData={usersList}
          setItemList={setList}
        />
      </SimpleGrid>
    </Box>
    )
}
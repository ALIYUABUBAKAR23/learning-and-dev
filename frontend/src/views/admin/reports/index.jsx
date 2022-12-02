import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import {  columnsReportData } from "../dataTables/variables/columnsData";
import ReportTable from "./ReportTable";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";


export default function Settings() {
    const [reportList, setReportList] = useState([]) 

return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
     <SimpleGrid
      mb='20px'
      >
      <ReportTable
        columnsData={ columnsReportData }
        tableData={reportList}
        setReportList={setReportList}
      />
    </SimpleGrid>
    
  </Box>

);
}
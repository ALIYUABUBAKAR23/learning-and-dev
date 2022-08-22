
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import ColumnsTable from "../resources/components/ColumnsTable";
import {
  columnsDataColumns,
} from "../resources/variables/columnsData";
import tableDataColumns from "../resources/variables/tableDataColumns.json";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
       
      </SimpleGrid>
    </Box>
  );
}

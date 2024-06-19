// import React from "react";
// import Navbar from "./../Navbar";

// export default function History() {
//   return (
//     <div>
//       <Navbar />
//       <div className="history-page">History</div>
//     </div>
//   );
// }

import Navbar from "./../Navbar";
import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

export default function CustomizedTables() {
  const [data, setData] = useState({});
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URI}/api/v1/history`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authToken: localStorage.getItem("token"),
          },
          credentials: "include",
          body: JSON.stringify({}),
        }
      );

      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center", fontSize: "30px" }}>History</h2>
      <div className="history-table" style={{ width: "90vw", margin: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Searched Keyword</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.history &&
                data.history.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.query}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.searchedAt}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

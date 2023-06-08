import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import PatientList from "./patient-list";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../../utils/constant";
import moment from "moment";
import "./reception-dashboard.css";
import TextField from "@mui/material/TextField";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import SearchBar from "material-ui-search-bar";

export default function ReceptionistDashboardTest() {

  const [filterText, setFilterText] = useState("");
  const [rows,setRow]= useState([]);

  const filteredData = rows.filter((item) =>
    item.patientName.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };

  
  useEffect(() => {
    console.log("API_URL : " + API_URL);

    axios
      .get(API_URL + "/patientRegistration/listPatient")

      .then((response) => {
        console.log(response.data);
        setRow(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="reception-table-outer-div">
      <TextField sx={{size:'10px',margin:'50px 0 50px 0',background:'white',width:'40%'}}
        value={filterText}
        onChange={handleFilter}
        label="Search Name"
        placeholder="Search Name"
        variant="outlined"
      />
        <div className="reception-table-inner-div">
          
          <TableContainer sx={{ borderRadius: "30px" }} component={Paper}>
            <Table
              sx={{ minWidth: 400 }}
              size="small"
              aria-label="a dense table"
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            >
              <TableHead>
                <TableRow sx={{ background: "#4545453e" }}>
                  <TableCell align="center">MRN</TableCell>
                  <TableCell align="center">PATIENT NAME</TableCell>
                  <TableCell align="center">WARD</TableCell>
                  <TableCell align="center">ROOM NO</TableCell>
                  <TableCell align="center">BED</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">ADMISSION DATE</TableCell>
                  <TableCell align="center">PRIMARY DOC</TableCell>

                </TableRow>
              </TableHead>
              <TableBody sx={{ background: "#f1f1f1b6" }}>
                {filteredData.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell
                      sx={{
                        fontStyle: "oblique",
                        fontSize: "15px",
                        fontWeight: "fontWeightMedium",
                      }}
                      align="center"
                      component="a"
                      href={`/patientRegistration/${row._id}`}
                    >
                      {row.mrn}{" "}
                    </TableCell>

                    <TableCell align="center">{row.patientName}</TableCell>
                    <TableCell align="center">{row.ward}</TableCell>
                    <TableCell align="center">{row.room}</TableCell>
                    <TableCell align="center">{row.bed}</TableCell>

                    {row.status === "ADMITTED" ? (
                      <TableCell sx={{ color: "white" }} align="center">
                        <p className="admitted-status-div">{row.status} </p>
                      </TableCell>
                    ) : (
                      <TableCell sx={{ color: "white" }} align="center">
                        <p className="discharged-status-div">{row.status} </p>
                      </TableCell>
                    )}

                    <TableCell align="center">
                      {moment(row.admissionDate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell align="center">{row.primaryDoctor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

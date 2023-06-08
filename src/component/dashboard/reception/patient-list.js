import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "../../../css/patient-table.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { API_URL } from "../../../utils/constant";

const columns = [
  {
    name: "MRN",
    selector: (row) => row._id,
    width: "10%",

    cell: (row) => (
      <Button
        variant="text"
        underline="always"
        component={Link}
        to={`/patientRegistration/${row._id}`}
        sx={{
          color: "black",
          font: "inherit",
          padding: "0",
          textDecoration: "underline",
        }}
      >
        {row.mrn}
      </Button>
    ),
  },
  {
    name: "Patient Name",
    selector: (row) => row.patientName,
    width: "23%",
  },
  {
    name: "Age",
    selector: (row) => row.age,
    width: "5%",
  },
  {
    name: "Ward",
    selector: (row) => row.ward,
    width: "15%",
  },
  {
    name: "Room",
    selector: (row) => row.room,
    width: "15%",
  },
  {
    name: "Bed",
    selector: (row) => row.bed,
    width: "10%",
  },
  {
    name: "Admission Dt",
    selector: (row) => row.admissionDate,
    width: "12%",
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "10%",
    sortable: true,
    cell: (row) => (
      <div
        className={`status-admitted ${
          row.status === "Admitted" ? "" : "status-discharged"
        }`}
      >
        {row.status}
      </div>
    ),
  },
];

const tableStyles = {
  table: {
    style: {
      marginBottom: "16px",
      fontFamily: "Source Serif Pro",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#647B89",
      color: "#ffffff",
      borderRadius: "15px 15px 0px 0px",
    },
  },
  headCells: {
    style: {
      fontSize: "18px",
      fontWeight: "bold",
    },
  },

  rows: {
    style: {
      fontSize: "16px",
      //backgroundColor: 'transparent'

      backgroundColor: "#DAF2FF",
      //backgroundColor: 'lightblue', // Apply the custom background color
      //color: 'white', // Apply the custom text color
    },
    // Style the rows on hover
    highlightOnHoverStyle: {
      //backgroundColor: 'blue', // Apply the custom background color on hover
    },
  },
};

/*(const conditionalRowStyles = [
  {
    when: (row) => row.status === 'Admitted',
    style: {
      backgroundColor: 'lightblue',
    },
  },
];*/

const PatientList = () => {
  const [filterText, setFilterText] = useState("");

  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("API_URL : " + API_URL);

    axios
      .get(API_URL + "/patientRegistration/listPatient")

      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredData = data.filter((item) =>
    item.patientName.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        value={filterText}
        onChange={handleFilter}
      />

      <TextField
        value={filterText}
        onChange={handleFilter}
        label="Search Name"
        placeholder="Search Name"
        variant="standard"
        /*  {...register("patientName", {
                  required: {
                    value: true,
                    message: "Patient Name is required",
                  },
                })}
                //error={!!errors.patientName}
                //helperText={errors?.patientName?.message} */
      />

      <DataTable
        columns={columns}
        data={filteredData}
        //selectableRows
        fixedHeader
        customStyles={tableStyles}
        //        conditionalRowStyles={conditionalRowStyles}
        pagination
      ></DataTable>
    </div>
  );
};

export default PatientList;

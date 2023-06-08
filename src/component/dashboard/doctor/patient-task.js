import axios from "axios";
import { API_URL } from "../../../utils/constant";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./patient-task.css";
import Typography from "@mui/material/Typography";
import moment from "moment";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import {
  bloodGrpList,
  medicineTypeList,
  medicineList,
} from "../../master/master-list";
import Autocomplete from "@mui/material/Autocomplete";
import TaskComponent from "./task-component";

export default function PatientTask() {
  const [patientData, setPatientData] = useState();
  const [primaryDoctorList, setPrimaryDoctorList] = useState([]);
  const [diseaseList, setDiseaseList] = useState([]);
  // const [medicineList, setmedicineList] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const getPatientData = async () => {
      const response = await axios.get(
        API_URL + `/patientRegistration/getPatient/${id}`
      );
      console.log(response);
      setValue("primaryDoctor", response.data.primaryDoctor);
      setValue("weight", response.data.weight);
      setValue("height", response.data.height);
      setValue("bloodGrp", response.data.bloodGrp);
      setValue("symtoms", response.data.symtoms);
      setValue("disease", response.data.disease);
      setValue("ward", response.data.ward);
      setValue("room", response.data.room);
      setValue("bed", response.data.bed);
      setValue(
        "admissionDate",
        moment(response.data.admissionDate).format("YYYY-MM-DD")
      );
      setPatientData(response.data);
    };
    getPatientData();
  }, []);

  useEffect(() => {
    const getPrimaryDoctorList = async () => {
      try {
        const response = await axios.get(API_URL + "/user/listActiveDoctor");
        setPrimaryDoctorList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPrimaryDoctorList();

    const getDiseaseList = async () => {
      try {
        const response = await axios.get(API_URL + "/disease/listDisease");
        setDiseaseList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDiseaseList();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const onsubmit = async (data) => {
    console.log(data);
    const newPatientdata = { newPatient: data };
    console.log(newPatientdata.newPatient);
    console.log(id);

    try {
      axios
        .put(API_URL + `/patientRegistration/updatePatient/${id}`, {
          newPatient: data,
        })
        .then((res) => {
          console.log("patient details updated successfully");
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {patientData ? (
        <>
          <div className="patientdata-background-div">
            <div className="patientdata-outer-div">
              <h4 style={{ fontSize: "3vh", font: "icon" }}>
                Patient Personal Details :
              </h4>
              <div className="patientdata-inner-left-div">
                <h3 style={{ fontSize: "3vh", font: "icon" }}>
                  {patientData.patientName}
                  <br />
                  {patientData.mrn}
                  <br />
                  {patientData.contactNo}
                </h3>
              </div>
              <div className="patientdata-inner-left-div">
                <h3 style={{ fontSize: "3vh", font: "icon" }}>
                  {patientData.ward} /{patientData.room}/{patientData.bed}
                  <br />
                  {patientData.sex}/{patientData.maritalStatus}
                  <br />
                  {patientData.country}/{patientData.state}/{patientData.city}
                </h3>
              </div>
            </div>
            <div className="patientdata-inner-div">
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="patient-reg-details-div">
                  <h2>Clinical Details</h2>
                  <Stack spacing={2} direction="row">
                    <TextField
                      fullWidth
                      id="primaryDoctor"
                      label="Primary Doctor *"
                      placeholder="Joe Doe"
                      variant="standard"
                      select
                      {...register("primaryDoctor", {
                        required: {
                          value: true,
                          message: "primary Doctor is required",
                        },
                      })}
                      value={watch("primaryDoctor") || ""}
                      error={!!errors.primaryDoctor}
                      helperText={errors?.primaryDoctor?.message}
                    >
                      {primaryDoctorList.length > 0
                        ? primaryDoctorList.map((option) => (
                            <MenuItem key={option._id} value={option.firstName}>
                              {option.firstName}
                            </MenuItem>
                          ))
                        : []}
                    </TextField>

                    <TextField
                      fullWidth
                      className="patient-reg-text-field"
                      id="weight"
                      variant="standard"
                      label="Weight"
                      placeholder="50kg"
                      {...register("weight")}
                      value={watch("weight") || ""}
                    />

                    <TextField
                      fullWidth
                      className="patient-reg-text-field"
                      id="height"
                      label="Height"
                      variant="standard"
                      placeholder="50cm"
                      {...register("height")}
                      value={watch("height") || ""}
                    />

                    <TextField
                      className="patient-reg-text-field"
                      fullWidth
                      id="bloodGrp"
                      select
                      label="Blood Grp *"
                      variant="standard"
                      {...register("bloodGrp", {
                        required: {
                          value: true,
                          message: " Blood Group is required",
                        },
                      })}
                      value={watch("bloodGrp") || ""}
                      error={!!errors.bloodGroup}
                      helperText={errors?.bloodGroup?.message}
                    >
                      {bloodGrpList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>

                  <Stack spacing={2} direction="row">
                    <TextField
                      className="patient-reg-text-field"
                      fullWidth
                      id="symtoms"
                      label="Symtoms *"
                      variant="standard"
                      {...register("symtoms")}
                      value={watch("symtoms") || ""}
                    />

                    <TextField
                      className="patient-reg-text-field"
                      id="disease"
                      fullWidth
                      label="Disease *"
                      variant="standard"
                      select
                      {...register("disease", {
                        required: {
                          value: true,
                          message: "disease is required",
                        },
                      })}
                      value={watch("disease") || ""}
                      error={!!errors.disease}
                      helperText={errors?.disease?.message}
                    >
                      {diseaseList.length > 0
                        ? diseaseList.map((option) => (
                            <MenuItem
                              key={option.diseaseName}
                              value={option.diseaseName}
                            >
                              {option.diseaseName}
                            </MenuItem>
                          ))
                        : []}
                    </TextField>
                  </Stack>

                  <Stack spacing={3} direction="row">
                    <TextField
                      className="patient-reg-text-field"
                      id="ward"
                      fullWidth
                      label="Ward *"
                      variant="standard"
                      {...register("ward")}
                      value={watch("ward") || ""}
                    />

                    <TextField
                      id="room"
                      fullWidth
                      label="Room *"
                      variant="standard"
                      {...register("room")}
                      value={watch("room") || ""}
                    />

                    <TextField
                      id="bed"
                      fullWidth
                      label="Bed *"
                      variant="standard"
                      {...register("bed")}
                      value={watch("bed") || ""}
                    />
                  </Stack>

                  <Stack spacing={2} direction="row">
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id="admissionDate"
                      type="date"
                      variant="standard"
                      label="Admission Date *"
                      {...register("admissionDate")}
                      value={watch("admissionDate") || ""}
                    />
                  </Stack>
                </div>

                <div className="signup-btn">
                  <Button
                    sx={{
                      borderRadius: 20,
                      backgroundColor: "#7EDD6F",
                      justifyContent: "center",
                      paddingLeft: "60px",
                      paddingRight: "60px",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Register Now
                  </Button>
                </div>
              </form>
            </div>
            <TaskComponent id={id}/>        
          </div>
        </>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </>
  );
}

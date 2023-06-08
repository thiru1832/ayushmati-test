import { useForm } from "react-hook-form";
import moment from 'moment';
import {
  genderList,
  maritalStatusList,
  stateList,
  countryList,
  townCityList,
  bloodGrpList,
} from "../../master/master-list";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../utils/constant";
import "./patient-registration.css";
import { useEffect } from "react";
import { useState } from "react";

function PatienRegistration() {
  const [primaryDoctorList, setPrimaryDoctorList] = useState([]);
  const [diseaseList, setDiseaseList] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {

      const getPatientData = async ()=>{
        const response = await axios.get(API_URL + `/patientRegistration/getPatient/${id}`)
        console.log(response.data)
        setValue('patientName',response.data.patientName)
        setValue('dateOfBirth',moment(response.data.dateOfBirth).format('YYYY-MM-DD'))
        setValue('sex',response.data.sex)
        setValue('maritalStatus',response.data.maritalStatus)
        setValue('contactNo',response.data.contactNo)
        setValue('emergContactNo',response.data.emergContactNo)
        setValue('country',response.data.country)
        setValue('state',response.data.state)
        setValue('city',response.data.city)
        setValue('addresponses',response.data.addresponses)
        setValue('primaryDoctor',response.data.primaryDoctor)
        setValue('weight',response.data.weight)
        setValue('height',response.data.height)
        setValue('bloodGrp',response.data.bloodGrp)
        setValue('symtoms',response.data.symtoms)
        setValue('disease',response.data.disease)
        setValue('ward',response.data.ward)
        setValue('room',response.data.room)
        setValue('bed',response.data.bed)
        setValue('admissionDate',moment(response.data.admissionDate).format('YYYY-MM-DD'))

      }
      getPatientData();
     
      }
    },[]);

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
    setValue
  } = useForm();


  const onsubmit = async (data) =>{
    console.log(data)
    const newPatientdata = {newPatient:data}
    console.log(newPatientdata.newPatient)
    console.log(id)

    try {
      if (!id) {
        axios
          .post(API_URL+`/patientRegistration/createPatient`, {
            newPatient: newPatientdata.newPatient,
          })
          .then((res) => {
            if (res.status === 201) {
              console.log("patient details created successfully")
              navigate("/receptionist");
            } else {
              Promise.reject();
            }
          });
      } else {
        axios
          .put(
            API_URL+`/patientRegistration/updatePatient/${id}`,
            { newPatient: data}
          )
          .then((res) => {
            console.log("patient details updated successfully")
            navigate("/receptionist");
          });

      }
    } catch (err) {
      console.error(err);
    }
   
    
  }


  return (
    <>
      <div className="patient-reg-outer-div">
        <div className="patient-reg-inner-div">
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="patient-reg-details-div">
              <h2>Personal Details</h2>
              <Stack spacing={2} direction="row">
                <TextField
                  className="patient-reg-text-field"
                  id="patientName"
                  label="Patient Name *"
                  placeholder="Joe Doe"
                  variant="standard"
                  
                  fullWidth
                  {...register("patientName", {
                    required: {
                      value: true,
                      message: "Patient Name is required",
                    },
                  })}
                  value={watch('patientName')|| ''}
                  error={!!errors.patientName}
                  helperText={errors?.patientName?.message}
                />

                <TextField
                  id="dateOfBirth"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  fullWidth
                  variant="standard"
                  label="Date Of Birth *"
                  className="patient-reg-text-field"
                  {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: "Date Of Birth is required",
                    },
                  })}
                  value={watch('dateOfBirth')|| ''}
                  error={!!errors.dateOfBirth}
                  helperText={errors?.dateOfBirth?.message}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  id="sex"
                  select
                  label="Sex *"
                  variant="standard"
                  className="patient-reg-text-field"
                  fullWidth
                  {...register("sex", {
                    required: {
                      value: true,
                      message: "Gender is required",
                    },
                  })}
                  value={watch('sex')|| ''}
                  error={!!errors.sex}
                  helperText={errors?.sex?.message}
                >
                  {genderList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="maritalStatus"
                  className="patient-reg-text-field"
                  select
                  fullWidth
                  label="Marital Status *"
                  variant="standard"
                  {...register("maritalStatus", {
                    required: {
                      value: true,
                      message: "Marital Status is required",
                    },
                  })}
                  value={watch('maritalStatus')|| ''}
                  error={!!errors.maritalStatus}
                  helperText={errors?.maritalStatus?.message}
                >
                  {maritalStatusList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack spacing={2} direction="row">
                <TextField
                  className="patient-reg-text-field"
                  id="contactNo"
                  label="Contact No *"
                  variant="standard"
                  fullWidth
                  {...register("contactNo", {
                    required: {
                      value: true,
                      message: "Contact No. is required",
                    },
                  })}
                  value={watch('contactNo')|| ''}
                  error={!!errors.contactNo}
                  helperText={errors?.contactNo?.message}
                />

                <TextField
                  className="patient-reg-text-field"
                  id="emergContactNo"
                  label="Emrg. Contact No *"
                  variant="standard"
                  placeholder="9012348651"
                  fullWidth
                  {...register("emergContactNo")}
                  value={watch('emergContactNo')|| ''}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <TextField
                  className="patient-reg-text-field"
                  fullWidth
                  id="country"
                  select
                  label="Country"
                  variant="standard"
                  {...register("country")}
                  value={watch('country')|| ''}
                >
                  {countryList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="state"
                  className="patient-reg-text-field"
                  select
                  label="State"
                  fullWidth
                  variant="standard"
                  {...register("state")}
                  value={watch('state')|| ''}
                >
                  {stateList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack spacing={2} direction="row">
                <TextField
                  className="patient-reg-text-field"
                  id="city"
                  select
                  label="Town/City"
                  fullWidth
                  variant="standard"
                  {...register("city")}
                  value={watch('city')|| ''}
                >
                  {townCityList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="pincode"
                  label="Pincode"
                  placeholder="000123"
                  variant="standard"
                  fullWidth
                  {...register("pincode")}
                  value={watch('pincode')|| ''}
                />
              </Stack>

              <TextField
                id="address"
                label="Address"
                placeholder="Joe Doe"
                variant="standard"
                fullWidth
                {...register("address")}
                value={watch('address')|| ''}
              />
            </div>
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
                  value={watch('primaryDoctor')|| ''}
                  error={!!errors.primaryDoctor}
                  helperText={errors?.primaryDoctor?.message}
                >
                  {primaryDoctorList.length > 0 ? (
                primaryDoctorList.map((option) => (
                  <MenuItem key={option._id} value={option.firstName}>
                    {option.firstName}
                  </MenuItem>
                ))
              ) : (
                []
              )}
                </TextField>

                <TextField
                  fullWidth
                  className="patient-reg-text-field"
                  id="weight"
                  variant="standard"
                  label="Weight"
                  placeholder="50kg"
                  {...register("weight")}
                  value={watch('weight')|| ''}
                />

                <TextField
                  fullWidth
                  className="patient-reg-text-field"
                  id="height"
                  label="Height"
                  variant="standard"
                  placeholder="50cm"
                  {...register("height")}
                  value={watch('height')|| ''}
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
                  value={watch('bloodGrp')|| ''}
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
                  value={watch('symtoms')|| ''}
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
                  value={watch('disease')|| ''}
                  error={!!errors.disease}
                  helperText={errors?.disease?.message}
                >
                 {diseaseList.length > 0 ? (
                diseaseList.map((option) => (
                  <MenuItem key={option.diseaseName} value={option.diseaseName}>
                    {option.diseaseName}
                  </MenuItem>
                ))
              ) : (
                []
              )}
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
                  value={watch('ward')|| ''}
                />

                <TextField
                  id="room"
                  fullWidth
                  label="Room *"
                  variant="standard"
                  {...register("room")}
                  value={watch('room')|| ''}
                />

                <TextField
                  id="bed"
                  fullWidth
                  label="Bed *"
                  variant="standard"
                  {...register("bed")}
                  value={watch('bed')|| ''}
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
                  value={watch('admissionDate')|| ''}
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
      </div>
    </>
  );
}

export default PatienRegistration;

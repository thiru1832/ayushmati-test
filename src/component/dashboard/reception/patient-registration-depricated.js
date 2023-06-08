import { useForm } from "react-hook-form";
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
import NavigationBar from "../../navgation/navigation-bar";
import "../../authenticate/sign-up.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../../utils/constant';

function PatientRegistration() {
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emergContactNo, setEmergContactNo] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  const [primaryDoctor, setPrimaryDoctor] = useState();
  const [primaryDoctorList, setPrimaryDoctorList] = useState([]);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodGrp, setBloodGrp] = useState("");
  const [symtoms, setSymtoms] = useState("");
  const [disease, setDisease] = useState("");
  const [diseaseList, setDiseaseList] = useState([]);
  const [ward, setWard] = useState("");
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");

  const {id}  = useParams();
  //const { '*': id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
      
      axios.get(API_URL+`/patientRegistration/getPatient/${id}`)
        .then((res) => {
          setPatientID(id);
          setPatientName(res.data.patientName);
          console.log(patientName)

           console.log('res.data.patientName :: ' + res.data.patientName ); 
           


          setDateOfBirth(res.data.dateOfBirth);
          
          setSex(res.data.sex);
          setMaritalStatus(res.data.maritalStatus);
          setContactNo(res.data.contactNo);
          setEmergContactNo(res.data.emergContactNo);
          setCountry(res.data.country);
          setState(res.data.state);
          setCity(res.data.city);
          setPincode(res.data.pincode);
          setAddress(res.data.address);
          setPrimaryDoctor(res.data.primaryDoctor);
          setWeight(res.data.weight);
          setHeight(res.data.height);
          setBloodGrp(res.data.bloodGrp);
          setSymtoms(res.data.symtoms);
          setDisease(res.data.disease);
          setWard(res.data.ward);
          setRoom(res.data.ward);
          setBed(res.data.ward);
          setAdmissionDate(res.data.admissionDate);
        });
    } else {
      console.log('new patient registration........ test....................');
    }

    const getPrimaryDoctorList = async () => {
      try {
        const response = await axios.get(API_URL+"/user/listActiveDoctor"); 
        setPrimaryDoctorList(response.data);
        console.log(primaryDoctorList)
      } catch (error) {
        console.error(error);
      }
    };
    getPrimaryDoctorList();

    const getDiseaseList = async () => {
      try {
        const response = await axios.get(API_URL+"/disease/listDisease");
        setDiseaseList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDiseaseList();
  }, [id]);


  useEffect(() => {
  //  fetchData();
  
  console.log('test.........................................');

  }, []);

  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  /*const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onsubmit = (data) => {
    data.preventDefault();

    console.log('on submit called...');
    const {id , value} = data.target;
    if(id === "patientName"){
        //setFirstName(value);


    console.log(value);

    }

    console.log(patientName);
  };
  */


  function handleSubmit(event) {
    event.preventDefault();
     
    const newPatient = {
      patientName,
      dateOfBirth,
      sex,
      maritalStatus,
      contactNo,
      emergContactNo,
      country,
      state,
      city,
      pincode,
      address,
      primaryDoctor,
      weight,
      height,
      bloodGrp,
      symtoms,
      disease,
      ward,
      room,
      bed,
      admissionDate,
    };
    console.log(newPatient)
    try {
      if (patientID === "") {
        axios
          .post(API_URL+`/patientRegistration/createPatient`, {
            newPatient: newPatient,
          })
          .then((res) => {
            if (res.status === 201) {
              setPatientID(res.data.patientID);

              navigate("/receptionist");
            } else {
              Promise.reject();
            }
          });
      } else {
        axios
          .put(
            API_URL+`/patientRegistration/updatePatient/${patientID}`,
            { newPatient: newPatient }
          )
          .then((res) => {
            navigate("/receptionist");
          });

        // Handle the response as needed
      }
    } catch (err) {
      console.error(err);
      // Handle error, such as displaying an error message
    }
  }


  

  return (
    <>
      <div className="common-backgroud">
        <h2>Personal Details</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4} direction="row">
            <TextField
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              label="Patient Name *"
              placeholder="Joe Doe"
              variant="standard"
              /*{...register("patientName", {
                  required: {
                    value: true,
                    message: "Patient Name is required",
                  },
                })}
                error={!!errors.patientName}
                helperText={errors?.patientName?.message}*/
            />

            <TextField
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              type="date"
              variant="standard"
              label="Date Of Birth *"
              //placeholder="DD/MM/YYYY"

              //onChange={e => setDateOfBirth(e.target.value)}
              //value={dateOfBirth}
              //InputLabelProps={{
              //  shrink: false,
              //}}

              /* {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Date Of Birth is required",
                  },
                })} 

                //error={!!errors.dateOfBirth}
                //helperText={errors?.dateOfBirth?.message}*/
            />

            <TextField
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              select
              label="Sex *"
              variant="standard"
              defaultValue=""
              /*{...register("sex", {
                    required: {
                      value: true,
                      message: "Gender is required",
                    },
                  })}
                  error={!!errors.sex}
                  helperText={errors?.sex?.message}*/
            >
              {genderList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="maritalStatus"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              select
              label="Marital Status *"
              variant="standard"
              defaultValue=""
              /*{...register("maritalStatus", {
                    required: {
                      value: true,
                      message: "Marital Status is required",
                    },
                  })}
                  //error={!!errors.maritalStatus}
                  //helperText={errors?.maritalStatus?.message}*/
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
              id="contactNo"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              label="Contact No *"
              variant="standard"
              defaultValue=""
              /*{...register("contactNo", {
                  required: {
                    value: true,
                    message: "Contact No. is required",
                  },
                })}
                error={!!errors.contactNo}
                helperText={errors?.contactNo?.message}*/
            />

            <TextField
              id="emergContactNo"
              value={emergContactNo}
              onChange={(e) => setEmergContactNo(e.target.value)}
              label="Emrg. Contact No *"
              variant="standard"
              defaultValue=""
              /*{...register("emergContactNo", {
                  required: {
                    value: true,
                    message: "Emrg. Contact No. is required",
                  },
                })}
                //error={!!errors.emergContactNo}
                //helperText={errors?.emergContactNo?.message}*/
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <TextField
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              select
              label="Country"
              variant="standard"
              defaultValue=""
              //{...register("country")}
            >
              {countryList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              select
              label="State"
              variant="standard"
              defaultValue=""
              //{...register("state")}
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
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              select
              label="Town/City"
              variant="standard"
              defaultValue=""
              //{...register("townCity")}
            >
              {townCityList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              label="Pincode"
              placeholder="000123"
              variant="standard"
              //{...register("pincode")}
            />
          </Stack>

          <TextField
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Address"
            placeholder="Joe Doe"
            variant="standard"
            fullWidth
          />

          <Stack spacing={4} direction="row">
            <TextField
              id="primaryDoctor"
              value={primaryDoctor}
              onChange={(e) => setPrimaryDoctor(e.target.value)}
              label="Primary Doctor *"
              placeholder="Joe Doe"
              variant="standard"
              defaultValue=""
              select
              /*  {...register("patientName", {
                        required: {
                          value: true,
                          message: "Patient Name is required",
                        },
                      })}
                      //error={!!errors.patientName}
                      //helperText={errors?.patientName?.message} */
            >
              {primaryDoctorList.length > 0 ? (
                primaryDoctorList.map((option) => (
                  <MenuItem key={option._id} value={option.firstName}>
                    {option.firstName}
                  </MenuItem>
                ))
              ) : (
                <></>
              )}
            </TextField>

            <TextField
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              variant="standard"
              label="Weight"
              //placeholder="DD/MM/YYYY"

              //onChange={e => setDateOfBirth(e.target.value)}
              //value={dateOfBirth}
              //InputLabelProps={{
              //  shrink: false,
              //}}

              /* {...register("dateOfBirth", {
                        required: {
                          value: true,
                          message: "Date Of Birth is required",
                        },
                      })} 

                      //error={!!errors.dateOfBirth}
                      //helperText={errors?.dateOfBirth?.message}*/
            />

            <TextField
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              label="Height"
              variant="standard"
              defaultValue=""
              /*{...register("sex", {
                        required: {
                          value: true,
                          message: "Gender is required",
                        },
                      })}
                      error={!!errors.sex}
                      helperText={errors?.sex?.message}*/
            />

            <TextField
              id="bloodGrp"
              value={bloodGrp}
              onChange={(e) => setBloodGrp(e.target.value)}
              select
              label="Blood Grp *"
              variant="standard"
              defaultValue=""
              /*{...register("maritalStatus", {
                        required: {
                          value: true,
                          message: "Marital Status is required",
                        },
                      })}
                      //error={!!errors.maritalStatus}
                      //helperText={errors?.maritalStatus?.message}*/
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
              id="symtoms"
              value={symtoms}
              onChange={(e) => setSymtoms(e.target.value)}
              label="Symtoms *"
              variant="standard"
              defaultValue=""
              /*{...register("contactNo", {
                      required: {
                        value: true,
                        message: "Contact No. is required",
                      },
                    })}
                    error={!!errors.contactNo}
                    helperText={errors?.contactNo?.message}*/
            />

            <TextField
              id="disease"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              label="Disease *"
              variant="standard"
              defaultValue=""
              select
              /*{...register("emergContactNo", {
                      required: {
                        value: true,
                        message: "Emrg. Contact No. is required",
                      },
                    })}
                    //error={!!errors.emergContactNo}
                    //helperText={errors?.emergContactNo?.message}*/
            >
              {diseaseList.length > 0 ? (
                diseaseList.map((option) => (
                  <MenuItem key={option.diseaseName} value={option.diseaseName}>
                    {option.diseaseName}
                  </MenuItem>
                ))
              ) : (
                <></>
              )}
            </TextField>
          </Stack>

          <Stack spacing={3} direction="row">
            <TextField
              id="ward"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              select
              label="Ward *"
              variant="standard"
              defaultValue=""
              //{...register("country")}
            />

            <TextField
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              select
              label="Room *"
              variant="standard"
              defaultValue=""
              //{...register("state")}
            />

            <TextField
              id="bed"
              value={bed}
              onChange={(e) => setBed(e.target.value)}
              select
              label="Bed *"
              variant="standard"
              defaultValue=""
              //{...register("state")}
            />
          </Stack>

          <Stack spacing={2} direction="row">
            <TextField
              id="admissionDate"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
              type="date"
              variant="standard"
              label="Admission Date *"
            />
          </Stack>

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
    </>
  );
}

export default PatientRegistration;

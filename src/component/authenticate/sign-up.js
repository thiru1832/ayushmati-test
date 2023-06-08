import { useForm } from "react-hook-form";
import {
  stateList,
  countryList,
  roleList,
  townCityList,
} from "../master/master-list";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../navgation/navigation-bar";
import "./sign-up.css";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [hospitalList, setHospitalList] = useState([]);
  const [isRegister,setIsRegister] = useState(false)


  const navigate = useNavigate();

  useEffect(() => {
    const getHospitalList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/registration/listHospital"
        );
        console.log(response.data);

        setHospitalList(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    getHospitalList();
  }, []);



  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onsubmit = async (data) => {
    console.log(data);
    const path = "http://localhost:8080/authenticate/signup";
    const body = {
      emailID: data.emailId,
      password: data.password,
      hospitalName: data.hospital,
      docID_empID: data.userID,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    const obj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(path, obj);
      const res = await response.json();
      console.log(res);
      if (res){
        setIsRegister(true)

        setTimeout(() => {
          navigate("/login")
        }, 2000);
      }
      else{
        setIsRegister(false)
      }

    } catch (error) {
      console.error(error);
    }
  };

  console.log(hospitalList);

  return (
    <>
      <NavigationBar />
      <div className="signup-outer-div">
        <div className="signup-inner-div">
          <Box
            sx={{
              "& .MuiTextField-root": { p: "10px", width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="form-control">
                <h1 className="login-text">SIGNUP</h1>
              </div>
              <div className="sign-up-elements-div">
                <TextField
                  className="signup-text-field"
                  id="outlined-required"
                  label="Hospital Name *"
                  placeholder="Apollo Hospital"
                  variant="standard"
                  select
                  {...register("hospital", {
                    required: {
                      value: true,
                      message: "Hospital Name is required",
                    },
                  })}
                >

                  {hospitalList.length > 0 ? (
                    hospitalList.map((option) => (
                      <MenuItem key={option.hospitalName} value={option.hospitalName}>
                        {option.hospitalName}
                      </MenuItem>
                    ))
                  ) : (
                    <></>
                  )}

                </TextField>
              </div>

              <Stack spacing={2} direction="row">
                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="outlined-select-currency"
                    select
                    label="Role *"
                    variant="standard"
                    defaultValue=""
                    {...register("role", {
                      required: {
                        value: true,
                        message: "Role is required",
                      },
                    })}
                    error={!!errors.role}
                    helperText={errors?.role?.message}
                  >
                    {roleList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="User-Number-Id"
                    label="Doctor lisence No/Employee Id*"
                    placeholder="APH123456"
                    variant="standard"
                    {...register("userID", {
                      required: {
                        value: true,
                        message: "User Number is required",
                      },
                    })}
                    error={!!errors.userID}
                    helperText={errors?.userID?.message}
                  />
                </div>
              </Stack>

              <Stack spacing={2} direction="row">
                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="First-Name-Id"
                    label="First Name *"
                    placeholder="Virat"
                    variant="standard"
                    {...register("firstName", {
                      required: {
                        value: true,
                        message: "First Name is required",
                      },
                    })}
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                  />
                </div>

                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="Last-Name-Id"
                    label="Last Name"
                    placeholder="Kholi"
                    variant="standard"
                    {...register("lastName")}
                  />
                </div>
              </Stack>

              <Stack spacing={2} direction="row">
                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="Country-ID"
                    select
                    label="Country"
                    variant="standard"
                    defaultValue=""
                    {...register("country")}
                  >
                    {countryList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="State-ID"
                    select
                    label="State"
                    variant="standard"
                    defaultValue=""
                    {...register("state")}
                  >
                    {stateList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </Stack>

              <Stack spacing={2} direction="row">
                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="Town-City-ID"
                    select
                    label="Town/City"
                    variant="standard"
                    defaultValue=""
                    {...register("townCity")}
                  >
                    {townCityList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="Pincode-Id"
                    label="Pincode"
                    placeholder="000123"
                    variant="standard"
                    {...register("pincode")}
                  />
                </div>
              </Stack>

              <div className="sign-up-elements-div">
                <TextField
                  className="signup-text-field"
                  id="Email-Id"
                  label="Email Id *"
                  placeholder="abc123@gmail.com"
                  variant="standard"
                  {...register("emailId", {
                    required: {
                      value: true,
                      message: "Email ID is required",
                    },
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Enter valid email id",
                    },
                  })}
                  error={!!errors.emailId}
                  helperText={errors?.emailId?.message}
                />
              </div>

              <Stack spacing={2} direction="row">
                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="Password-Id"
                    label="Password *"
                    type="password"
                    variant="standard"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "password is required",
                      },
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                  />
                </div>

                <div className="sign-up-elements-div">
                  <TextField
                    className="signup-text-field"
                    id="Confirm-Password-Id"
                    label="Comfirm Password *"
                    type="password"
                    variant="standard"
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "password is required",
                      },
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "Password should match";
                        }
                      },
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors?.confirmPassword?.message}
                  />
                </div>
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
                  SIGN UP NOW
                </Button>
              </div>

              <div className="form-control">
                <Link className="signup-link" to="/login">
                  {" "}
                  Already a member?lets login!
                </Link>
              </div>
            </form>

            {isRegister && <div>User is registered successfully</div>}
          </Box>
        </div>
      </div>
    </>
  );
}

export default Signup;

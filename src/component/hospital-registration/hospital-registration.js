import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function HospitalRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "40ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="signup-div">
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="form-control">
            <TextField
              id="outlined-required"
              label="Hospital Name *"
              placeholder="Apollo Hospital"
              variant="standard"
              {...register("hospital", {
                required: {
                  value: true,
                  message: "Hospital Name is required",
                },
              })}
              error={!!errors.hospital}
              helperText={errors?.hospital?.message}
            />
          </div>

          <div className="form-control">
            <TextField
              id="outlined-required"
              label="Hospital Registration No *"
              placeholder="Apollo Hospital"
              variant="standard"
              {...register("hospital", {
                required: {
                  value: true,
                  message: "Hospital Name is required",
                },
              })}
              error={!!errors.hospital}
              helperText={errors?.hospital?.message}
            />
          </div>

          

          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "#7EDD6F",
            }}
            variant="contained"
            type="submit"
          >
           Register Now
          </Button>
        </form>
      </div>
    </Box>
  );
}

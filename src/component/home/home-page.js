import "./home-page.css";
import nurseImage from "../../images/nurse.png";
import Button from "@mui/material/Button";
import NavigationBar from "../navgation/navigation-bar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <NavigationBar />
      <div className="homediv">
        <div className="innerdiv1">
          <div className="text1">
            <h1>The Best Online Solution for Nursing And Patient Care.</h1>
          </div>
          <div className="text2">
            <ul>
              <li>
                Identifying patients' care requirements, focus on their needs
                and act on them.
              </li>
              <li>
                Nurturing a compassionate environment by providing psychological
                support.
              </li>
              <li>Resolving or reporting on patients' needs or problems.</li>
            </ul>
            <Button
              component={Link}
              to={"/contactus"}
              variant="contained"
              sx={{
                color: "white",
                fontSize: "20px",
                margin: "4px",
                alignItems: "center",
                flexGrow: 1,
                font: "inherit",
                borderRadius: 8,
              }}
            >
              schedule a call
            </Button>
          </div>
        </div>

        <div className="innerdiv2">
          <img id="nurseImage" src={nurseImage} alt="This is nurse"></img>
        </div>
      </div>
    </>
  );
}

export default HomePage;

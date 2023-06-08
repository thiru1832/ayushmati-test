import HomePage from "./component/home/home-page";
import Signup from "./component/authenticate/sign-up"
import Login from "./component/authenticate/login"
import NoRoute from "./component/no-route";
import AboutUs from "./component/aboutUs/about-us";
import ContactUs from "./component/contactUs/contact-us";
import ReceptionistDashboard from "./component/dashboard/reception/reception-dashboard";
import PatientRegistration from "./component/dashboard/reception/patient-registration";
import DoctorDashboard from "./component/dashboard/doctor/doctor-dashboard";
import NurseDashboard from "./component/dashboard/nurse/nurse-dashboard";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import wrapper from "./component/layoutHOC/layout";
import PatientRegistrationTest from "./component/dashboard/reception/patient-registration";
import ReceptionistDashboardTest from "./component/dashboard/reception/reception-dashboard";
import PatientTask from "./component/dashboard/doctor/patient-task";



function App() {

  const ReceptionistDashboardWrapper = wrapper(ReceptionistDashboard);
  const PatientRegistrationWrapper = wrapper(PatientRegistration);
  const DoctorDashboardWrapper = wrapper(DoctorDashboard);
  const PatientTaskWrapper = wrapper(PatientTask);

  return(
  <>
  <Router>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path = "/aboutus" element={<AboutUs/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      <Route path="/receptionist" element={<ReceptionistDashboardWrapper/>}/>
      <Route path="/doctor" element={<DoctorDashboardWrapper/>}/>
      <Route path="/patientRegistration" element={<PatientRegistrationWrapper />} />
      <Route path="/patientRegistration/:id" element={<PatientRegistrationWrapper />} />
      <Route path= "/patientTaskUpdate/:id" element={<PatientTaskWrapper/>}/>
      {/* <Route path="/receptionistDashboard" element = {<ReceptionistDashboardTestWrapper/>}/> */}
      {/* <Route path="/patientRegistrationTest" element ={<PatientRegistrationTest/>} />
      <Route path="/patientRegistrationTest/:id" element={<PatientRegistrationTest />} /> */}
      <Route path="*" element = {<NoRoute/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App;

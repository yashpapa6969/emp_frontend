import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components/Home";
import Login from "./components/Login";
import { selectIsLoggedIn } from "./store/slice/authSlice";
import ErrorPage from "./components/ErrorPage";
import UserInfo from "./components/UserInfo";
import GetAllManager from "./components/GetAllManager";
import GetAllEmp from "./components/GetAllEmp";
import GetAllClient from "./components/GetAllClient";
import CreateEmp from "./components/CreateEmp";
import CreateClient from "./components/CreateClient";
import CreateProject from "./components/CreateProject";
import CreateLead from "./components/CreateLead";
import AppLayout from "./layouts/AppLayout";
import { useState } from "react";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const refreshPage = () => {
  //   window.location.reload();
  // };

  const [activeSideabarLink, setActiveSideabarLink] = useState('');
 

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/home" element={
            <AppLayout activeSideabarLink={"Dashboard"} setActiveSideabarLink={setActiveSideabarLink}>
              <Home />
            </AppLayout>
          } />
          <Route path="/UserInfo" element={
            <AppLayout activeSideabarLink={"UserInfo"} setActiveSideabarLink={setActiveSideabarLink}>
              <UserInfo />
            </AppLayout>
          } />
          <Route path="/getAllManager" element={
            <AppLayout activeSideabarLink={"getAllManager"} setActiveSideabarLink={setActiveSideabarLink}>
              <GetAllManager />
            </AppLayout>
          } />
          <Route path="/getAllEmp" element={
            <AppLayout activeSideabarLink={"getAllEmp"} setActiveSideabarLink={setActiveSideabarLink}>
              <GetAllEmp />
            </AppLayout>
          } />
          <Route path="/getAllClient" element={
            <AppLayout activeSideabarLink={"getAllClient"} setActiveSideabarLink={setActiveSideabarLink}>
              <GetAllClient />
            </AppLayout>
          } />
          <Route path="/createEmp" element={
            <AppLayout activeSideabarLink={"CreateEmp"} setActiveSideabarLink={setActiveSideabarLink}>
              <CreateEmp />
            </AppLayout>
          } />
          <Route path="/createClient" element={
            <AppLayout activeSideabarLink={"CreateClient"} setActiveSideabarLink={setActiveSideabarLink}>
              <CreateClient />
            </AppLayout>
          } />
          <Route path="/createLead" element={
            <AppLayout activeSideabarLink={"CreateClient"} setActiveSideabarLink={setActiveSideabarLink}>
              <CreateLead />
            </AppLayout>
          } />
          <Route path="/createProject" element={
            <AppLayout activeSideabarLink={"CreateProject"} setActiveSideabarLink={setActiveSideabarLink}>
              <CreateProject />
            </AppLayout>
          } />
          <Route path="/*" element={<Navigate to="/home" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

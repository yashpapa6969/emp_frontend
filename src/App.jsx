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

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/UserInfo" element={<UserInfo />} />
          <Route path="/getAllManager" element={<GetAllManager />} />
          <Route path="/getAllEmp" element={<GetAllEmp />} />
          <Route path="/getAllClient" element={<GetAllClient />} />
          <Route path="/createEmp" element={<CreateEmp />} />
          <Route path="/createClient" element={<CreateClient />} />
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

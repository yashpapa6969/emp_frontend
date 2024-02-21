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


function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {isLoggedIn ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/UserInfo" element={<UserInfo />} />
          <Route path="/getAllManager" element={<GetAllManager />} />
          <Route path="/getAllEmp" element={<GetAllEmp />} />
          <Route path="/getAllClient" element={<GetAllClient />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/error" />} />
      )}
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

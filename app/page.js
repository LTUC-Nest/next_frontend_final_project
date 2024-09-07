"use client";
import LoginForm from "./components/auth/LoginForm";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import AdminDashboard from "./components/adminDashbord/adminDashbord";
import UserDashborde from "./components/userDashbord/userDashbord";
import { jwtDecode } from "jwt-decode";
import UserDashboard from "./components/userDashbord/userDashbord";
export default function Home() {
  const { tokens, logout } = useContext(AuthContext);

  // if the tokens  are releated to the admin >> admin dashbord
  // if the tokens  are releated to the user  >> user dashbord

  if (tokens) {
    const decodedTokens = jwtDecode(tokens.access);
    const is_superuser = decodedTokens.is_superuser;

    if (is_superuser) {
      return (
        <>
       
          {/* <AdminDashboard /> */}
          <UserDashboard />
        </>
      );
    } else {
      return (
        <>
          <h1 onClick={logout}>X</h1>
          <UserDashborde />
        </>
      );
    }
  } else {
    return (
      <>
        <LoginForm />
      </>
    );
  }
}

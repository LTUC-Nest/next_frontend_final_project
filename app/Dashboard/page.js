"use client";

import LoginForm from "../components/login/LoginForm";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import AdminDashboard from "@/app/components/AdminDashboard/AdminDashboard";
import UserDashborde from "@/app/components/UserDashboard/UserDashbord";
import { jwtDecode } from "jwt-decode";


export default function Dashbord() {
  const { tokens, logout } = useContext(AuthContext);

  // if the tokens  are releated to the admin >> admin dashbord
  // if the tokens  are releated to the user  >> user dashbord

  if (tokens) {
    const decodedTokens = jwtDecode(tokens.access);
    const is_superuser = decodedTokens.is_superuser;

    if (is_superuser) {
      return (
        <>
          <AdminDashboard className='animate__animated animate__bounceInUp bg-bg-light dark:bg-bg-dark'/>
        </>
      );
    } else {
      return (
        <>
          <UserDashborde className='animate__animated animate__bounceInUp bg-bg-light dark:bg-bg-dark'/>
        </>
      );
    }
  } else {
    return (
      <>
        <LoginForm className='animate__animated animate__bounceInUp bg-bg-light dark:bg-bg-dark'/>
      </>
    );
  }
}
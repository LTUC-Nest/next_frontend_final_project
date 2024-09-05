"use client";

import LoginForm from "../components/login/LoginForm";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import AdminDashboard from "@/app/components/AdminDashbord/AdminDashboard";
import UserDashborde from "@/app/components/UserDashbord/UserDashbord";
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
          <AdminDashboard />
        </>
      );
    } else {
      return (
        <>
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
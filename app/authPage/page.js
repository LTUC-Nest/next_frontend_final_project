"use client";
import LoginForm from "../components/auth/LoginForm"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import AdminDashboard from "../components/adminDashbord/adminDashbord"
import { jwtDecode } from "jwt-decode"
import Header from "../components/home/header";
import UserDashborde from "../components/userDashbord/userDashbord";
export default function AuthPage(){
  const {tokens,logout} = useContext(AuthContext)
  
  if (tokens) {
    const decodedTokens = jwtDecode(tokens.access);
    const is_superuser = decodedTokens.is_superuser;
    if (is_superuser){
      return (
        <>
          <AdminDashboard/>
        </>
      );
    } else{
      return (
        <>
          <UserDashborde />
        </>
      );
    }
  }else{
    return (
      <>
        <Header/>
        <LoginForm/>
      </>
    )
  }

}
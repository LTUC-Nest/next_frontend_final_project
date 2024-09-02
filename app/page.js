"use client";
import LoginForm from "./components/auth/LoginForm";
import Header from "./components/Header";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Dashbord from "./components/dashbord";
export default function Home() {
  const {tokens,logout} = useContext(AuthContext)
  

  // if the tokens  are releated to the admin >> admin dashbord
  // if the tokens  are releated to the user  >> user dashbord 

  if (tokens){
    return(
      <>
            <h1 onClick={logout}>X</h1>
            <Dashbord/>
      </>

    )
  }
  return (
    <>

      <LoginForm />
    </>
  );
}

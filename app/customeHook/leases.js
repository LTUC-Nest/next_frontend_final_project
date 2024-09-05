import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import useSWR from "swr";


export default function useResourcesLeases(){
  const apiEndPoint = 'http://127.0.0.1:8000/api/v1/leaseAgreement/'
  const {tokens} = useContext(AuthContext);
  const {data,err,mutate} = useSWR([apiEndPoint,tokens],fetchResource);

  // Utility Function
  function config(){
    return {
      headers : {
        'Content-Type' : 'Application/json',
        'Authorization' : 'Bearer ' + tokens.access

      }
    }

  
  }

  

  async function fetchResource(){
    if (!tokens){
      return
    }
    try{
      const res = await fetch(apiEndPoint,config())
      const jsonRes = res.json()
      console.log(jsonRes)
      return jsonRes
    } catch(err){
      console.log(`error fetch data, ${err}`)
    }
  }

  async function deleteResource(id){
    if (!tokens){
      return
    }
    try{
      console.log(id)
      const url = apiEndPoint+id
      const options = config()
      options.method = 'DELETE'
      await fetch(url,options)
      console.log(options)
      mutate()
    } catch(err){
      console.log(err)
    }
  }

  async function createResource(petInfo){
    if (!tokens){
      return
    }
    try{
      const options = config()
      const url = 'http://127.0.0.1:8000/api/v1/leaseAgreement/create/';
      options.method = 'POST'
      options.body = JSON.stringify(petInfo)
      await fetch(url,options)
      mutate()

    }catch(err){
      console.log(err)
    }
  }

  return {
    fetchedLeasesData : data,
    deleteLeaseData : deleteResource,
    createdLeaseData : createResource, 
    loading: tokens && !err && !data,
    error : err

  }
}

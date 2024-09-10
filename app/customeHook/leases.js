import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import useSWR from "swr";


export default function useResourcesLeases(){
  const apiEndPoint = 'https://djang-backend-final-project.onrender.com/api/v1/leaseAgreement/names/'
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
      const url = "https://djang-backend-final-project.onrender.com/api/v1/leaseAgreement/"+id
      const options = config()
      options.method = 'DELETE'
      await fetch(url,options)
      console.log(options)
      mutate()
    } catch(err){
      console.log(err)
    }
  }

  async function createResource(leaseInfo){
    if (!tokens){
      return
    }
    try{
      const options = config()
      const url = 'https://djang-backend-final-project.onrender.com/api/v1/leaseAgreement/create/';
      options.method = 'POST'
      options.body = JSON.stringify(leaseInfo)
      await fetch(url,options)
      mutate()

    }catch(err){
      console.log(err)
    }
  }

  async function updateResource(leaseId,leaseInfo){
    if (!tokens){
      return
    } try{
      const options = config()
      const url = `https://djang-backend-final-project.onrender.com/api/v1/leaseAgreement/${leaseId}`
      options.method = 'PUT'
      options.body = JSON.stringify(leaseInfo)
      await fetch(url,options)
      mutate()
    } catch(err){
      console.log('error happend during modifying the data')
    }
  }

  async function retrieveResource(id){
    if (!tokens){
      return
    } try{
      const url = `https://djang-backend-final-project.onrender.com/api/v1/leaseAgreement/${id}`
      const res = await fetch(url,config())
      const jsonRes = res.json()
      console.log(jsonRes)
      return jsonRes
    } catch(err){
      console.log('error happend during retrieving the data')
    }
  }
  return {
    fetchedLeasesData : data,
    deleteLeaseData : deleteResource,
    createdLeaseData : createResource, 
    updatedLeaseData : updateResource,
    retrieveLeaseData : retrieveResource,
    loading: tokens && !err && !data,
    error : err

  }
}

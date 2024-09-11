import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import useSWR from "swr";

// Define the hook
export default function ComplaintsResources() {
  const apiEndPoint = 'https://djang-backend-final-project.onrender.com/api/v1/complaints/';
  const { tokens } = useContext(AuthContext);
  const { data, err, mutate } = useSWR([apiEndPoint, tokens], fetchResource);

  // Utility Function for config
  function config() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokens.access,
      },
    };
  }

  // Fetch Resource Function
  async function fetchResource() {
    if (!tokens) {
      return;
    }
    try {
      const res = await fetch(apiEndPoint, config());
      const jsonRes = await res.json();
      return jsonRes;
    } catch (err) {
      console.log(`Error fetching data: ${err}`);
    }
  }

  // Delete Resource Function
  async function deleteResource(id) {
    if (!tokens) {
      return;
    }
    try {
      const url = `${apiEndPoint}${id}`;
      const options = config();
      options.method = 'DELETE';
      await fetch(url, options);
      mutate();
    } catch (err) {
      console.log(err);
    }
  }

  // Create Resource Function
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function createResource(complaintInfo) {
    if (!tokens) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const options = config();
      const url = `${apiEndPoint}create/`;
      options.method = 'POST';
      options.body = JSON.stringify(complaintInfo);

      const res = await fetch(url, options);

      if (res.ok) {
        setSuccess(true);
        mutate();
      } else {
        const errorData = await res.json();
        setError(errorData);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  // PATCH Resource Function
  async function patchResource(id, field, value) {
    if (!tokens) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const url = apiEndPoint+id;
      const options = config();
      options.method = 'PATCH';
      options.body = JSON.stringify({ [field]: value });

      const res = await fetch(url, options);

      if (res.ok) {
        setSuccess(true);
        mutate();
      } else {
        const errorData = await res.json();
        setError(errorData);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return {
    fetchedComplaintsData: data || [],
    deleteComplaintData: deleteResource,
    createdComplaintData: createResource,
    patchedComplaintData: patchResource,
    loading: tokens && !err && !data,
    error: err,
    success,
  };
}
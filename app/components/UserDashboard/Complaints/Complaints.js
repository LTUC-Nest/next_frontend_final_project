import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/authContext";
import ComplaintsResources from "@/app/customHook/ComplaintsResources";
import ComplaintForm from "./ComplaintForm";
import ComplaintHistory from "./ComplaintHistory";
import { jwtDecode } from "jwt-decode";

export default function Complaints() {
  const { fetchedComplaintsData, createdComplaintData, loading, error } = ComplaintsResources();
  const { tokens } = useContext(AuthContext);
  const decodeTokens = jwtDecode(tokens.access);
  const token_username = decodeTokens.username;

  const [complaintsMessage, setComplaintsMessage] = useState([]);

  useEffect(() => {
    if (Array.isArray(fetchedComplaintsData)) {
      setComplaintsMessage(fetchedComplaintsData);
    } else {
      setComplaintsMessage([]);
    }
  }, [fetchedComplaintsData]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-bg-light text-text-dark">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-bg-light text-text-dark">Error loading complaints: {error.message}</div>;

  return (
    <div className="">
      <ComplaintForm createdComplaintData={createdComplaintData} />
      <ComplaintHistory complaintsMessage={complaintsMessage} token_username={token_username} />
    </div>
  );
}

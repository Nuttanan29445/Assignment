import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiceInfo } from "../types/riceInfo";
import EditForm from "../components/EditForm";

const EditResult = () => {
  const { id } = useParams<{ id: string }>();
  const [riceData, setRiceData] = useState<RiceInfo | null>(null);

  useEffect(() => {
    const fetchInspectionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/history/${id}`);
        setRiceData(response.data[0]);
      } catch (error) {
        console.error("Error fetching inspection data:", error);
      }
    };
    fetchInspectionData();
  }, [id]);
  if (!riceData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="pt-24 bg-[#F1F8E8] min-h-screen">
      <EditForm data={riceData} />
    </div>
  );
};

export default EditResult;

import { useState, useEffect } from "react";
import CreateInspectionForm from "../components/CreateInspectionForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Standard } from "../types/standard";

interface FormData {
  name: string;
  standard: Standard | null;
  file: File | null;
  note: string;
  price: number;
  samplingPoints: {
    FrontEnd: boolean;
    BackEnd: boolean;
    Other: boolean;
  };
  dateTimeOfSampling: string;
}

const CreateInspection = () => {
  const navigate = useNavigate();
  const [standards, setStandards] = useState<Standard[]>([]);
  const [errors, setErrors] = useState<{ name?: string; standard?: string }>(
    {}
  );

  useEffect(() => {
    const LoadStandards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/standard");
        setStandards(response.data);
      } catch (error) {
        console.error("Error fetching standards:", error);
      }
    };
    LoadStandards();
  }, []);

  const handleFormSubmit = async (formData: FormData) => {
    const newErrors: { name?: string; standard?: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.standard) newErrors.standard = "Standard is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("standard", JSON.stringify(formData.standard));
    if (formData.file) formDataToSend.append("file", formData.file);
    formDataToSend.append("note", formData.note);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append(
      "samplingPoints",
      JSON.stringify(formData.samplingPoints)
    );
    formDataToSend.append("dateTimeOfSampling", formData.dateTimeOfSampling);
    try {
      const response = await axios.post(
        "http://localhost:3000/history",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/result/${response.data.inspectionId}`);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="h-screen bg-[#F1F8E8] flex items-center justify-center">
      <CreateInspectionForm
        standards={standards}
        errors={errors}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default CreateInspection;

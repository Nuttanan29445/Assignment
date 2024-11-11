import { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiceInfo } from "../types/riceInfo";
import { getCurrentDateTime } from "../services/getCurrentDate";

interface FormData {
  note: string;
  price: number;
  samplingPoint: {
    FrontEnd: boolean;
    BackEnd: boolean;
    Other: boolean;
  };
  dateTimeOfSampling: string;
}

interface EditFormProps {
  data: RiceInfo;
}

const EditForm = ({ data }: EditFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    note: data.note,
    price: data.price,
    samplingPoint: {
      FrontEnd: data.samplingPoint.includes("FrontEnd"),
      BackEnd: data.samplingPoint.includes("BackEnd"),
      Other: data.samplingPoint.includes("Other"),
    },
    dateTimeOfSampling: new Date(data.dateTimeOfSampling)
      .toISOString()
      .slice(0, 16),
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        samplingPoint: {
          ...prevData.samplingPoint,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const samplingPointsArray = Object.keys(formData.samplingPoint)
      .filter(
        (key) => formData.samplingPoint[key as keyof FormData["samplingPoint"]]
      )
      .map((key) => key);

    const submissionData = {
      ...formData,
      samplingPoint: samplingPointsArray,
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/history/${data.inspectionId}`,
        submissionData
      );
      navigate(`/result/${response.data.inspectionId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-slate-50 p-4 md:p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          Edit Inspection
        </h1>

        <TextField
          label="Note"
          name="note"
          placeholder="Please Holder"
          variant="outlined"
          fullWidth
          value={formData.note}
          onChange={handleChange}
        />

        <TextField
          label="Price"
          name="price"
          variant="outlined"
          fullWidth
          value={formData.price}
          onChange={handleChange}
        />

        <div>
          <label>Sampling Point</label>
          <div className="flex gap-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.samplingPoint.FrontEnd}
                  onChange={handleChange}
                  name="FrontEnd"
                />
              }
              label="Front End"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.samplingPoint.BackEnd}
                  onChange={handleChange}
                  name="BackEnd"
                />
              }
              label="Back End"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.samplingPoint.Other}
                  onChange={handleChange}
                  name="Other"
                />
              }
              label="Other"
            />
          </div>
        </div>

        <TextField
          label="Date/Time of Sampling"
          name="dateTimeOfSampling"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
          value={formData.dateTimeOfSampling}
          onChange={handleChange}
          inputProps={{ max: getCurrentDateTime() }}
        />

        <div className="flex gap-2 justify-end">
          <button className="px-3 border border-[#5F6F65]  text-[#5F6F65] rounded-lg">
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 bg-[#5F6F65] text-white rounded-lg hover:bg-[#363f39]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;

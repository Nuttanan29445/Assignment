import { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Standard } from "../types/standard";
import { getCurrentDateTime } from "../services/getCurrentDate";
import { useNavigate } from "react-router-dom";

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

interface InspectionFormProps {
  standards: Standard[];
  errors: { name?: string; standard?: string };
  onSubmit: (formData: FormData) => void;
}

const CreateInspectionForm = ({
  standards,
  errors,
  onSubmit,
}: InspectionFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    standard: null,
    file: null,
    note: "",
    price: 0,
    samplingPoints: {
      FrontEnd: false,
      BackEnd: false,
      Other: false,
    },
    dateTimeOfSampling: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        samplingPoints: {
          ...prevData.samplingPoints,
          [name]: checked,
        },
      }));
    } else if (name === "price") {
      const floatPrice = parseFloat(value);
      if (floatPrice >= 0 && floatPrice <= 100000) {
        setFormData((prevData) => ({
          ...prevData,
          price: parseFloat(floatPrice.toFixed(2)),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleStandardChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedStandard = standards.find(
      (standard) => standard.id === event.target.value
    );
    setFormData((prevData) => ({
      ...prevData,
      standard: selectedStandard || null,
    }));
  };

  const handleCancle = () => {
    navigate("/");
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-lg bg-slate-50 p-4 md:p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center">
          Create Inspection
        </h1>

        <TextField
          label="Name*"
          name="name"
          placeholder="Please Holder"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Standard*"
          name="standard"
          placeholder="Please Select Standard"
          variant="outlined"
          select
          fullWidth
          value={formData.standard?.id || ""}
          onChange={handleStandardChange}
          error={!!errors.standard}
          helperText={errors.standard}
        >
          {standards.map((standard) => (
            <MenuItem key={standard.id} value={standard.id}>
              {standard.name}
            </MenuItem>
          ))}
        </TextField>
        <input
          type="file"
          name="file"
          accept=".json"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              file: e.target.files ? e.target.files[0] : null,
            }))
          }
          required
        />
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
          type="number"
          fullWidth
          value={formData.price}
          onChange={handleChange}
          inputProps={{
            min: 0,
            max: 100000,
            step: "0.01",
          }}
        />

        <div>
          <label>Sampling Point</label>
          <div className="flex gap-2 sm:gap-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.samplingPoints.FrontEnd}
                  onChange={handleChange}
                  name="FrontEnd"
                />
              }
              label="Front End"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.samplingPoints.BackEnd}
                  onChange={handleChange}
                  name="BackEnd"
                />
              }
              label="Back End"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.samplingPoints.Other}
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
          <button
            className="px-4 py-2 border border-[#5F6F65] text-[#5F6F65] rounded-lg hover:bg-gray-100"
            onClick={handleCancle}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#5F6F65] text-white rounded-lg hover:bg-[#363f39]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInspectionForm;

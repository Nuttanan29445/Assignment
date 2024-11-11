import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RiceInfo } from "../types/riceInfo";
import TableResult from "../components/TableResult";
import { formatDate } from "../services/formatDate";

const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  const onClickEdit = () => {
    navigate(`/edit/${riceData?.inspectionId}`);
  };
  const onClickBack = () => {
    navigate(`/create`);
  };

  if (!riceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 pt-24 bg-[#F1F8E8] min-h-screen">
      <div className=""></div>
      <h1 className="text-3xl font-bold mb-4 text-center">Inspection Data</h1>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <div className="mb-4 flex items-center md:items-start flex-col gap-2">
          <img
            src={riceData.imageURL}
            alt="Rice Sample"
            className="w-[250px] max-w-md rounded-md"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClickBack}
              className="px-2 py-1 bg-[#55AD9B] text-white rounded"
            >
              Back
            </button>
            <button
              onClick={onClickEdit}
              className="px-2 bg-[#55AD9B] text-white rounded"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="p-2 bg-slate-200 flex flex-col gap-2 rounded-md h-full">
          {/* container1 */}
          <div className="p-2 bg-white flex gap-32 rounded-md justify-center md:justify-start">
            <div className="flex flex-col gap-2">
              <Detail
                header="Create Date - Time"
                detail={formatDate(riceData.createdAt)}
              />
              <Detail header="Standard" detail={riceData.standard} />
              <Detail
                header="Update Date - Time"
                detail={formatDate(riceData.updatedAt)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Detail header="Inspection ID" detail={riceData.inspectionId} />
              <Detail header="Total Sample" detail={riceData.totalSample} />
            </div>
          </div>
          {/* container2 */}
          <div className="p-2 bg-white flex gap-32 rounded-md justify-center md:justify-start">
            <div className="flex flex-col gap-2">
              <Detail header="Note" detail={riceData.note} />
              <Detail
                header="Date/Time of Sampling"
                detail={formatDate(riceData.dateTimeOfSampling)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Detail header="Price" detail={riceData.price} />
              <Detail
                header="Sampling Point"
                detail={riceData.samplingPoint.join(", ")}
              />
            </div>
          </div>
          {/* container3 */}
          <div className="p-2 bg-white rounded-md">
            <h2 className="text-lg font-semibold mb-2">Composition</h2>
            <TableResult data={riceData.composition} />
          </div>
          <div className="p-2 bg-white rounded-md">
            <h2 className="text-lg font-semibold mb-2">Defect Rice</h2>
            <TableResult data={riceData.defectRice} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface detailProps {
  header: string;
  detail: string | number;
}

const Detail = ({ header, detail }: detailProps) => {
  return (
    <div>
      <div className="text-gray-500 font-semibold text-sm">{header}</div>
      <div className="font-medium text-sm">{detail}</div>
    </div>
  );
};

export default ResultPage;

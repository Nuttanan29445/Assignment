import { useNavigate } from "react-router-dom";
import { RiceInfo, Config } from "../types/riceInfo";
import { Fragment } from "react";

interface TableProp {
  datas: RiceInfo[];
  config: Config<RiceInfo>[];
  keyFn: (data: RiceInfo) => string;
}

const Table = ({ datas, config, keyFn }: TableProp) => {
  const navigate = useNavigate();

  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return (
      <th key={column.label}>
        <div className="ml-2 py-3 flex items-center font-bold text-sm text-white">
          {column.label}
        </div>
      </th>
    );
  });

  const renderedRows = datas.map((data, index) => {
    const renderedCells = config.map((column) => {
      return (
        <td
          key={column.label}
          className="p-2 font-semibold text-[#000000ad] max-w-44 break-words"
        >
          {column.render(data)}
        </td>
      );
    });

    const handleRowClick = (e: React.MouseEvent) => {
      // Prevent navigation if the click was on a checkbox
      if ((e.target as HTMLElement).tagName === "INPUT") {
        return;
      }
      navigate(`/result/${data.inspectionId}`);
    };

    return (
      <tr
        key={keyFn(data)}
        className={`border-b ${
          index % 2 === 0 ? "bg-white" : "bg-white"
        } cursor-pointer`}
        onClick={handleRowClick}
      >
        {renderedCells}
      </tr>
    );
  });

  return (
    <table className="table-auto border-spacing-2 w-full border">
      <thead>
        <tr className="bg-[#55AD9B]">{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
};

export default Table;

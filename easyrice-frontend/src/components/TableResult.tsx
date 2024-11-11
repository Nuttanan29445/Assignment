import { Composition, DefectRice } from "../types/riceInfo";

interface TableResultProps {
  data: Composition[] | DefectRice[];
}

const TableResult: React.FC<TableResultProps> = ({ data }) => {
  const isComposition = (
    item: Composition | DefectRice
  ): item is Composition => {
    return (item as Composition).lengthRange !== undefined;
  };

  return (
    <table className="w-full md:w-[500px]">
      <thead>
        <tr className="border-b-2 border-gray-300">
          <th className="py-1 font-bold text-gray-500 text-sm text-left">
            Name
          </th>
          {isComposition(data[0]) && (
            <th className="py-1 font-bold text-gray-500 text-sm text-left w-[80px]">
              Length
            </th>
          )}
          <th className="py-1 font-bold text-gray-500 text-sm text-right w-[80px]">
            Actual
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item._id}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="py-1 text-xs font-medium text-black text-left">
              {item.name}
            </td>
            {isComposition(item) && (
              <td className="py-1 text-xs font-medium text-black text-left w-[80px]">
                {item.lengthRange}
              </td>
            )}
            <td className="py-1 text-xs font-medium text-green-500 text-right w-[80px]">
              {item.actualPercentage}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableResult;

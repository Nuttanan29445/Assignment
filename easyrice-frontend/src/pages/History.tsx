import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Config, RiceInfo } from "../types/riceInfo";
import Table from "../components/Table";
import Search from "../components/Search";
import InputDate from "../components/inputDate";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../services/formatDate";

interface SearchProps {
  id: string;
  dateFrom: string;
  dateTo: string;
}

const History = () => {
  const [history, setHistory] = useState<RiceInfo[]>([]);
  const [searchText, setSearchText] = useState<SearchProps>({
    id: "",
    dateFrom: "",
    dateTo: "",
  });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const LoadData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/history`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching inspection data:", error);
      }
    };
    LoadData();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSearchText((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const onClickCreateInspection = () => {
    navigate(`/create`);
  };

  const handleDeleteRows = async () => {
    try {
      await axios.delete("http://localhost:3000/history", {
        data: { ids: selectedRows },
      });

      const filteredData = history.filter(
        (item) => !selectedRows.includes(item._id)
      );
      setHistory(filteredData);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting selected rows:", error);
    }
  };

  const handleClearFilter = async () => {
    setSearchText({
      id: "",
      dateFrom: "",
      dateTo: "",
    });

    try {
      const response = await axios.get(`http://localhost:3000/history`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching History:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchText.id) {
        const response = await axios.get(
          `http://localhost:3000/history/${searchText.id}`
        );
        setHistory(response.data);
      } else {
        let filteredData = history;
        if (searchText.dateTo && searchText.dateFrom) {
          const dateFrom = new Date(searchText.dateFrom);
          const dateTo = new Date(searchText.dateTo);
          filteredData = filteredData.filter(
            (item) =>
              new Date(item.createdAt) >= dateFrom &&
              new Date(item.createdAt) <= dateTo
          );
        } else if (searchText.dateFrom && !searchText.dateTo) {
          const dateFrom = new Date(searchText.dateFrom);
          filteredData = filteredData.filter(
            (item) => new Date(item.createdAt) >= dateFrom
          );
        } else if (searchText.dateTo && !searchText.dateFrom) {
          const dateTo = new Date(searchText.dateTo);
          filteredData = filteredData.filter(
            (item) => new Date(item.createdAt) <= dateTo
          );
        }
        setHistory(filteredData);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const configTable: Config<RiceInfo>[] = [
    {
      label: "",
      render: (item: RiceInfo) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(item._id)}
          onChange={(e) => {
            e.stopPropagation();
            handleSelectRow(item._id);
          }}
          className="w-[10px] h-[10px] transform scale-150"
        />
      ),
    },
    {
      label: "Create Date - Time",
      render: (item: RiceInfo) => formatDate(item.createdAt),
    },
    {
      label: "Inspection ID",
      render: (item: RiceInfo) => item.inspectionId,
    },
    {
      label: "Name",
      render: (item: RiceInfo) => item.name,
    },
    {
      label: "Standard",
      render: (item: RiceInfo) => item.standard,
    },
    {
      label: "Note",
      render: (item: RiceInfo) =>
        item.note.length > 25 ? `${item.note.slice(0, 25)}...` : item.note,
    },
  ];

  const keyFn = (item: RiceInfo) => item._id;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(history.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="px-16 pb-12 pt-24 flex flex-col items-center gap-2 bg-[#F1F8E8] min-h-screen">
      <div className="h-full w-full md:w-[80%] max-w-5xl flex flex-col gap-2">
        <button
          onClick={onClickCreateInspection}
          className="p-2 bg-[#55AD9B] hover:bg-[#34695f] text-white rounded w-36"
        >
          Create Inspection
        </button>
        <div className="flex flex-col w-full gap-4 bg-white p-5 rounded-lg">
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <div className="flex-1">
              <div className="text-sm pl-1 font-medium">Search with ID</div>
              <Search
                value={searchText.id}
                onChange={handleSearchChange}
                name="id"
                placeholder="Search with Inspection ID"
                disabled={!!searchText.dateFrom || !!searchText.dateTo}
              />
            </div>
            <div className="flex-1">
              <div className="text-sm pl-1 font-medium">Date From</div>
              <InputDate
                value={searchText.dateFrom}
                onChange={handleSearchChange}
                name="dateFrom"
                disabled={!!searchText.id}
              />
            </div>
            <div className="flex-1">
              <div className="text-sm pl-1 font-medium">Date To</div>
              <InputDate
                value={searchText.dateTo}
                onChange={handleSearchChange}
                name="dateTo"
                disabled={!!searchText.id}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div
              className="text-red-700  cursor-pointer underline"
              onClick={handleClearFilter}
            >
              Clear Filter
            </div>
            <button
              onClick={handleSearch}
              className="p-2 bg-[#55AD9B] hover:bg-[#34695f] text-white rounded w-52"
            >
              Search
            </button>
          </div>
        </div>
        {selectedRows.length > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDeleteRows}
              className="p-2 bg-red-500 hover:bg-red-800 text-white rounded w-36"
            >
              Delete
            </button>
            <div className="text-sm font-medium">
              Selected items: {selectedRows.length} items
            </div>
          </div>
        ) : null}

        <Table datas={currentItems} keyFn={keyFn} config={configTable} />

        <div className="flex items-center mt-4 gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 bg-[#55AD9B] hover:bg-[#34695f] text-white rounded disabled:opacity-50 text-sm font-medium"
          >
            Prev
          </button>
          <div className="text-sm font-medium">
            {currentPage} of {totalPages}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 bg-[#55AD9B] hover:bg-[#34695f] text-white rounded disabled:opacity-50 text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;

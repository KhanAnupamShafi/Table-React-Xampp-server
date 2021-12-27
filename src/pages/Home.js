import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import Search from "../components/SearchTable/Search";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 0,
  textAlign: "center",

  // change background colour if dragging
  background: isDragging ? "lightblue" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Home = () => {
  const [tableLists, setTableLists] = useState([]);
  const [rowsUpdateSuccess, setRowsUpdateSuccess] = useState(null);
  const [reorderStat, setReorderStat] = useState({});
  const [order, setOrder] = useState("asc");

  const [filter, setFilter] = useState({ num: "", name: "", date: "" });

  const searchArray = [
    { filter: filter.num, placeholder: "Search by id", type: "num" },
    { filter: filter.name, placeholder: "Search by name", type: "name" },
    {
      filter: filter.message,
      placeholder: "Search by message",
      type: "message",
    },
    { filter: filter.date, placeholder: "Search by date", type: "date" },
  ];
  const onFilterChange = (value, type) => {
    const newState = {
      ...filter,
      [type]: value,
    };
    console.log(newState);
    const fd = tableLists?.data?.rows.filter((e) => {
      return (
        e.id.toString().includes(newState.num.toLowerCase()) &&
        e.name.toLowerCase().includes(newState.name.toLowerCase()) &&
        e.created_at.toLowerCase().includes(newState.date.toLowerCase())
      );
    });
    setFilter(newState);

    setTableLists({ ...tableLists, data: { ...tableLists.data, rows: fd } });
  };

  // console.log(tableLists);

  useEffect(() => {
    fetch("http://localhost/api/list.php")
      .then((data) => data.json())
      .then((result) => {
        setTableLists(result);
      });
  }, []);

  const onDragEnd = (result) => {
    //
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      tableLists?.data?.rows,
      result.source.index,
      result.destination.index
    );

    fetch("http://localhost/api/reorder.php")
      .then((data) => data.json())
      .then((result) => {
        // console.log(result);
        if (result.status === "success") {
          setRowsUpdateSuccess(true);
        } else setRowsUpdateSuccess(false);
        setReorderStat(result);
        setTableLists({
          ...tableLists,
          data: { ...tableLists.data, rows: items },
        });
      });

    // setTableLists({ ...tableLists, data: { ...tableLists.data, rows: items } });
  };

  /* --------------------------------- sorting -------------------------------- */
  const sorting = (col) => {
    setRowsUpdateSuccess(null);
    //

    if (order === "asc") {
      const sorted = [...tableLists.data.rows].sort((a, b) =>
        typeof (a[col] === "number")
          ? a[col] > b[col]
            ? 1
            : -1
          : a[col].toLowerCase() > b[col].toLowerCase()
          ? 1
          : -1
      );
      setTableLists({
        ...tableLists,
        data: { ...tableLists.data, rows: sorted },
      });
      setOrder("dsc");
    }
    if (order === "dsc") {
      const sorted = [...tableLists.data.rows].sort((a, b) =>
        typeof (a[col] === "number")
          ? a[col] < b[col]
            ? 1
            : -1
          : a[col].toLowerCase() < b[col].toLowerCase()
          ? 1
          : -1
      );
      setTableLists({
        ...tableLists,
        data: { ...tableLists.data, rows: sorted },
      });
      setOrder("asc");
    }
  };

  return (
    <div className="w-full antialiased  bg-gray-200">
      <div>
        <h2 className="text-3xl font-semibold leading-tight">Table Lists</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {tableLists?.data?.headers.map((tableData, index) => {
          return (
            <table key={index} className="table-auto w-full">
              {/* Table Header */}

              <thead className="text-lg text-gray-400 bg-gray-50 rounded-sm">
                <tr>
                  {Object.keys(tableData).map(function (key) {
                    return !tableData[key].hidden ? (
                      <th
                        onClick={() => tableData[key].sortable && sorting(key)}
                        key={key}
                        className="p-2 bg-slate-800 cursor-pointer text-white hover:bg-violet-400 active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300"
                      >
                        <div className="font-semibold text-center">
                          {tableData[key].title}
                          {tableData[key].sortable && (
                            <button type="button" disabled>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </th>
                    ) : (
                      <th key={key} className="p-2">
                        <div className="font-semibold text-center"></div>
                      </th>
                    );
                  })}
                </tr>
                {/* <SearchTable
                  tableData={tableData}
                  setSearchTerm={setSearchTerm}
                  setIsActive={setIsActive}
                /> */}
                <tr>
                  {searchArray.map((obj, i) => {
                    return (
                      <td key={i}>
                        <Search
                          filter={obj.filter}
                          handleFilterChange={onFilterChange}
                          placeholder={obj.placeholder}
                          searchType={obj.type}
                        />
                      </td>
                    );
                  })}
                </tr>
              </thead>
              {/* Table body */}

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <tbody
                      className="text-sm font-medium divide-y divide-gray-100"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {/* Row */}
                      <>
                        {tableLists?.data?.rows.map(function (rowData, index) {
                          return (
                            <Draggable
                              key={rowData.id}
                              draggableId={rowData.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <tr
                                  key={rowData.id}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  {Object.keys(tableData)
                                    .map((key) => {
                                      const item = Object.keys(rowData).find(
                                        (item) => item === key
                                      );

                                      if (item) {
                                        return !tableData[key].hidden ? (
                                          <td
                                            key={Math.random()}
                                            className="p-2 font-large"
                                          >
                                            <div className="font-semibold text-center">
                                              {key === "id" ? (
                                                <div>
                                                  <div className="text-center text-lg">
                                                    {rowData[item]}
                                                  </div>
                                                  <Link
                                                    to={`/getform/${rowData?.id}`}
                                                  >
                                                    <span className="cursor-pointer text-right text-sm px-2 font-medium bg-gray-500 bg-opacity-10 hover:bg-sky-300 text-gray-800 rounded py-0.5">
                                                      Update
                                                    </span>
                                                  </Link>
                                                </div>
                                              ) : (
                                                <div className="text-center text-lg">
                                                  {rowData[item]}
                                                </div>
                                              )}
                                            </div>
                                          </td>
                                        ) : (
                                          <td
                                            key={Math.random()}
                                            className="p-2"
                                          >
                                            <div className="font-semibold text-center"></div>
                                          </td>
                                        );
                                      } else
                                        return (
                                          <td
                                            key={Math.random()}
                                            className="p-2"
                                          >
                                            <div className="font-semibold text-center"></div>
                                          </td>
                                        );
                                    })
                                    .filter((item) => {
                                      return item !== undefined;
                                    })}
                                </tr>
                              )}
                            </Draggable>
                          );
                        })}
                      </>

                      {/* Row */}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </DragDropContext>
            </table>
          );
        })}
      </div>

      {/* /* --------------------------------- //alert -------------------------------- */}
      {rowsUpdateSuccess === true ? (
        <div role="alert">
          <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
            {reorderStat?.status}
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
            {reorderStat.messages && <p>{reorderStat.messages.join(`\r\n`)}</p>}
          </div>
        </div>
      ) : rowsUpdateSuccess === false ? (
        <div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            {reorderStat?.status}
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            {reorderStat.messages && <p>{reorderStat.messages.join(`\r\n`)}</p>}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;

import "./health-pagination.styles.scss";

import img from "../../assets/measurement-min.png";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "general-components/card.component";
import { useNavigate } from "react-router-dom";

const HealthPagination = (props) => {
  const { records } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  console.log(records.length);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(records.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(records.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, records]);
  console.log(pageCount);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % records.length;
    setItemOffset(newOffset);
  };

  const profileHandler = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="grid">
        {currentItems.map((record) => {
          return (
            <Card>
              <img className="card-img" src={img} alt="measurements" />
              <h2>
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="card-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                }
                Measurement Name: {record.measurementName}
              </h2>
              <h2>
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="card-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
                Value: {record.value}
              </h2>
              <h2>
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="card-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                Date: {record.date}
              </h2>
            </Card>
          );
        })}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination margins"
        pageLinkClassName="page-num"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
        activeLinkClassName="active"
      />
    </>
  );
};

export default HealthPagination;

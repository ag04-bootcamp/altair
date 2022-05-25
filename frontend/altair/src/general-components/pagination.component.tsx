import "./pagination.styles.scss";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  const { profiles } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  console.log(profiles.length);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(profiles.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(profiles.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, profiles]);
  console.log(pageCount);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % profiles.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="grid-profiles">
        {currentItems.map((profile) => {
          return (
            <div key={profile.id} className="profile-container">
              <h3>Profile</h3>
              <h2>Weight: {profile.weight}</h2>
              <h2>Height: {profile.height}</h2>
              <h2>Personal Observation: {profile.personalObservation}</h2>
              <h2>
                Date: {profile.date[2]}.{profile.date[1]}.{profile.date[0]}.
              </h2>
            </div>
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
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
        activeLinkClassName="active"
      />
    </>
  );
};

export default Pagination;

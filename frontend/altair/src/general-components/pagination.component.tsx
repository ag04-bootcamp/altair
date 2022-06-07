import "./pagination.styles.scss";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "./card.component";
import { useNavigate } from "react-router-dom";

const Pagination = (props) => {
  const { profiles } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const navigate = useNavigate();
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

  const profileHandler = () => {
    navigate("/profile");
  };

  return (
    <>
      {currentItems.length === 0 && (
        <div className="center-card">
          <Card>
            <h2>No previous profiles.</h2>
            <p>Consider adding new profile</p>
            <p className="arrow-down">↓</p>

            <button className="startColor start" onClick={profileHandler}>
              New Profile
            </button>
          </Card>
        </div>
      )}

      <div className="grid-profiles">
        {currentItems.map((profile) => {
          return (
            <div key={profile.id} className="profile-container">
              <h3>Profile</h3>
              <h2>Weight: {profile.weight}</h2>
              <h2>Height: {profile.height}</h2>
              <h2>Personal Observation: {profile.personalObservation}</h2>
              <h2>Date: {profile.date} </h2>
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
        containerClassName="pagination margins"
        pageLinkClassName="page-num"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
        activeLinkClassName="active"
      />
    </>
  );
};

export default Pagination;

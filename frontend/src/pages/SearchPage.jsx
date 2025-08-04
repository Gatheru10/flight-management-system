import React from "react";
import SearchForm from "../components/SearchForm";

const SearchPage = () => {
  return (
    <div className="booking-page-container py-5">
      <div className="container">
        <h2 className="mb-4 fw-bold">Refine Your Search</h2>
        <SearchForm />
      </div>
    </div>
  );
};

export default SearchPage;

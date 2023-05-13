import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css"
import MetaData from "../layout/MetaData";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  
  const searchSubmitHandler = (e) => {
    console.log(keyword);
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE"/>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;

import { TextField } from "@mui/material";
import React from "react";
import "./search.scss";

const Search = () => {
  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        variant="outlined"
        className="search-field"
      />
    </div>
  );
};

export default Search;

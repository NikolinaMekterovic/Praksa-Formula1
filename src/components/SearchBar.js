import React from "react";
import { useState } from "react";

const SearchBar = (props) => {

   const [inputText, setInputText] = useState("");

   const handleChangeInputValue = (e) => {
      setInputText(e.target.value);
      props.handleSearch(inputText);
   }

   return (
      <div>
         <div className="searchBarStyle">
            <label htmlForm="search-form">
               <input
                  type="search"
                  name="search-form"
                  id="search-form"
                  className="searchInput"
                  placeholder="Search..."
                  value={inputText}
                  onChange={handleChangeInputValue} />
            </label>
         </div>
      </div>
   )
}

export default SearchBar;
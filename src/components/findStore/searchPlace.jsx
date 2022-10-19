// SearchPlace.js

import React, { useState } from "react";
import MapContainer from "./mapContainer";
import styles from "./findStore.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    setPlace("서울 바디프랜드");
  }, []);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(`${inputText} 바디프랜드`);
    setInputText("");
  };

  return (
    <div className={styles.searchPlace}>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchBtn1} />
        <input
          className={styles.searchPlaceInput}
          placeholder="검색 지역 입력"
          onChange={onChange}
          value={inputText}
        />
        <button className={styles.searchBtn2} type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
      <MapContainer searchPlace={place} />
    </div>
  );
};

export default SearchPlace;

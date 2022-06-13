import React from "react";
import { useState } from "react";
import styles from "./postcode.module.css";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useRef } from "react";

const Postcode = ({ props, isSubmitted, onAddress }) => {
  const [isbtnClicked, setIsBtnClicked] = useState(false);
  const findAdress = () => {
    setIsBtnClicked(true);
  };

  const zonecodeRef = useRef();
  const addressRef = useRef();

  const handleChange = (e) => {
    let detailAddress = "";
    if (e.target.id === "detailAddress") {
      detailAddress = e.target.value;
    }
    onAddress({
      zonecode: zonecodeRef.current.value,
      address: addressRef.current.value,
      detailAddress,
    });
  };

  const handleComplete = (data) => {
    let zonecode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.userSelectedType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    } else {
      fullAddress = data.jibunAddress;
    }

    zonecodeRef.current.value = zonecode;
    addressRef.current.value = fullAddress;
  };

  return (
    <div className={styles.postcode}>
      <h2>주소</h2>
      <div className={styles.findInput}>
        <input
          onChange={handleChange}
          ref={zonecodeRef}
          type="text"
          id="postcode"
          placeholder="우편번호"
          disabled
        />
        <input
          className={styles.findBtn}
          type="button"
          onClick={findAdress}
          value="주소 검색"
        />
      </div>
      <input
        onChange={handleChange}
        ref={addressRef}
        type="text"
        id="address"
        placeholder="주소"
        disabled
      />
      <input
        onChange={handleChange}
        type="text"
        id="detailAddress"
        placeholder="상세주소"
      />
      {isbtnClicked && (
        <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
      )}
    </div>
  );
};
export default Postcode;

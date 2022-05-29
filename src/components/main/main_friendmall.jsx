import styles from "./main_friendmall.module.css";
import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { dbService } from "../../service/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

const Main_friendmall = () => {
  //파이어베이스 스토리지 이미지 가져오기
  //   // Create a reference to the file we want to download
  //   const storage = getStorage();
  //   const starsRef = ref(storage, "images/jb.png");

  //   // Get the download URL
  //   getDownloadURL(starsRef)
  //     .then((url) => {
  //       // Insert url into an <img> tag to "download"
  //     })
  //     .catch((error) => {
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case "storage/object-not-found":
  //           // File doesn't exist
  //           break;
  //         case "storage/unauthorized":
  //           // User doesn't have permission to access the object
  //           break;
  //         case "storage/canceled":
  //           // User canceled the upload
  //           break;

  //         // ...

  //         case "storage/unknown":
  //           // Unknown error occurred, inspect the server response
  //           break;
  //       }
  //     });

  // 의자 데이터 로드
  const [chairs, setChairs] = useState("");
  const getChairs = async () => {
    const q = query(collection(dbService, "chair"));
    onSnapshot(q, (snapshot) => {
      const chairArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChairs(chairArr);
    });
  };

  useEffect(() => {
    getChairs();
  }, []);

  console.log(chairs);
  return (
    <>
      {chairs && (
        <>
          <div className={styles.titleContianer}>
            <h2 className={styles.title}>프랜드몰</h2>
            <p>10년 더 건강하게 바디프랜드</p>
            <button>더보기+</button>
          </div>
          <div className={styles.itemsContainer}>
            <ul className={styles.items}>
              {chairs.map((chair) => (
                <li className={styles.item} key={chair.id}>
                  <div className={styles.imgbox}>
                    <img
                      className={styles.img}
                      src={chair.item.imgURL}
                      alt=""
                    />
                  </div>
                  <h3 className={styles.name}>{chair.item.name}</h3>
                  <div className={styles.itemInfo}>
                    <p>
                      {chair.item.price.toLocaleString()}
                      <span> 원</span>
                      <span> / 구매가</span>
                    </p>
                    <p>
                      {chair.item.rentPrice.toLocaleString()}
                      <span> 원</span>
                      <span> / 렌탈가(월)</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Main_friendmall;

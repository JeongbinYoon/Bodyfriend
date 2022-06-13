import React, { useRef, useState, useEffect } from "react";
import { dbService, storageService } from "../../../service/firebase";
import {
  collection,
  addDoc,
  orderBy,
  limit,
  startAt,
  startAfter,
  endAt,
  onSnapshot,
  query,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import adminStyles from "../admin.module.css";
import styles from "./admin_product.module.css";
import Admin_products_item from "./admin_products_item";

const Admin_prodcut = ({ userId }) => {
  // 의자 데이터 로드
  let first;
  let pageSize = 10;
  const [pageNow, setPageNow] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const prevBtnClick = () => {
    getChairs();
    setPageNow(pageNow > 1 ? pageNow - 1 : 1);
  };
  const nextBtnClick = () => {
    let totalPage = Math.floor(totalCount / pageSize) + 1;
    setPageNow(totalPage > pageNow ? pageNow + 1 : totalPage);
    let first = query(
      collection(dbService, "chair"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    let next;
    onSnapshot(first, (snapshot) => {
      let last = snapshot.docs[snapshot.docs.length - 1];
      console.log(last);
      next = query(
        collection(dbService, "chair"),
        orderBy("createdAt", "desc"),
        startAfter(last.data().createdAt),
        limit(pageSize)
      );
      onSnapshot(next, (snapshot) => {
        const chairArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChairs(chairArr);
      });
      // first = next;
    });
  };

  const [chairs, setChairs] = useState("");
  const getChairs = () => {
    let total = query(collection(dbService, "chair"));
    onSnapshot(total, (snapshot) => {
      setTotalCount(snapshot.docs.length);
    });

    first = query(
      collection(dbService, "chair"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    onSnapshot(first, (snapshot) => {
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

  // 이미지 선택
  const fileInput = useRef();
  const [fileName, setFileName] = useState();
  const [attachment, setAttachment] = useState("");
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    setFileName(theFile.name.split(".")[0]);

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 파일 미리보기 지우기
  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = null;
  };

  // Submit
  const formRef = useRef();
  const itemNameRef = useRef();
  const itemPriceRef = useRef();
  const itemRentPriceRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = "";
    // 사진이 있는 경우 Storage에 등록
    if (attachment !== "") {
      const attachmentRef = ref(
        storageService,
        `product/${itemNameRef.current.value}`
      );
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentURL = await getDownloadURL(response.ref);
    }

    const item = {
      name: itemNameRef.current.value,
      price: Number(itemPriceRef.current.value),
      rentPrice: Number(itemRentPriceRef.current.value),
      imgURL: attachmentURL,
    };

    // db 업로드
    await addDoc(collection(dbService, "chair"), {
      item,
      createdAt: Date.now(),
      creatorId: userId,
    });

    // input 초기화
    onClearAttachment();
    const inputList = formRef.current.childNodes;
    [...inputList].map((input) => {
      if (input.type !== "submit") {
        input.value = null;
      }
    });
  };

  // console.log(chairs);
  return (
    <>
      <section className={adminStyles.section}>
        <div className={adminStyles.sectionHeader}>
          <h2 className={adminStyles.sectionTitle}>등록 제품</h2>
        </div>
        <div
          className={`${adminStyles.sectionBody} ${styles.productContainer}`}
        >
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>선택</th>
                <th>이미지</th>
                <th>제품명</th>
                <th>가격</th>
                <th>렌탈가</th>
                <th className={styles.hide}>날짜</th>
                <th className={styles.hide}>작성자</th>
              </tr>
            </thead>
            <tbody>
              {chairs
                ? chairs.map((chair) => (
                    <Admin_products_item item={chair} key={chair.id} />
                  ))
                : null}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="2">제품 수</td>
                <td>{totalCount}</td>
                <td colSpan="3">
                  페이지
                  {`${pageNow} / ${Math.floor(totalCount / pageSize) + 1}`}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className={styles.btns}>
            <button className={styles.prevBtn} onClick={prevBtnClick}>
              이전
            </button>
            <button className={styles.nextBtn} onClick={nextBtnClick}>
              다음
            </button>
          </div>
        </div>
      </section>
      <form ref={formRef} onSubmit={onSubmit}>
        <input ref={itemNameRef} type="text" placeholder="제품명" />
        <input ref={itemPriceRef} type="number" placeholder="가격" />
        <input ref={itemRentPriceRef} type="number" placeholder="렌트가" />
        <input
          ref={fileInput}
          onChange={onFileChange}
          type="file"
          accept="image/*"
        />
        {attachment && (
          <div>
            <img src={attachment} alt="" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
        <input type="submit" value="등록" />
      </form>
    </>
  );
};

export default Admin_prodcut;

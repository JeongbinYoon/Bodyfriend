import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

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

  // 이미지 선택 미리보기
  const fileInput1 = useRef();
  const fileInput2 = useRef();
  const [fileName, setFileName] = useState();
  const [attachment1, setAttachment1] = useState("");
  const [attachment2, setAttachment2] = useState("");
  const fileArr = [];
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
      setAttachment1(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 상제정보 이미지 다중 선택 미리보기
  const onDetailFilesChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files;
    // setFileName(theFile.name.split(".")[0]);

    [...theFile].map((file) => {
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        fileArr.push(result);
        setAttachment2(fileArr);
      };
      reader.readAsDataURL(file);
    });
  };

  // 파일 미리보기 지우기
  const onClearAttachment = (e) => {
    if (e.target.className === "clear1Btn") {
      setAttachment1("");
      fileInput1.current.value = null;
    } else if (e.target.className === "clear2Btn") {
      setAttachment2("");
      fileInput2.current.value = null;
    }
  };

  // Submit
  const formRef = useRef();
  const itemNameRef = useRef();
  const itemPriceRef = useRef();
  const itemRentPriceRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachment1URL = "";
    let attachment2URL = "";
    let attachment2URLArr = [];
    // 사진이 있는 경우 Storage에 등록
    if (attachment1 !== "") {
      const attachment1Ref = ref(
        storageService,
        `product/${itemNameRef.current.value}/${itemNameRef.current.value}`
      );
      const response = await uploadString(
        attachment1Ref,
        attachment1,
        "data_url"
      );
      attachment1URL = await getDownloadURL(response.ref);
    }

    if (attachment2.length > 0) {
      for (let i = 0; i < attachment2.length; i++) {
        const attachment2Ref = ref(
          storageService,
          `product/${itemNameRef.current.value}/${itemNameRef.current.value} 상세이미지${i}`
        );
        const response = await uploadString(
          attachment2Ref,
          attachment2[i],
          "data_url"
        );
        attachment2URL = await getDownloadURL(response.ref);
        attachment2URLArr.push(attachment2URL);
      }
    }

    const item = {
      name: itemNameRef.current.value,
      price: Number(itemPriceRef.current.value),
      rentPrice: Number(itemRentPriceRef.current.value),
      imgURL: attachment1URL,
      detailImgURL: attachment2URLArr,
    };

    // db 업로드
    await addDoc(collection(dbService, "chair"), {
      item,
      createdAt: Date.now(),
      creatorId: userId,
    });

    // input 초기화
    setAttachment1("");
    setAttachment2("");
    const inputList = formRef.current.childNodes;
    [...inputList].map((input) => {
      if (input.type !== "submit") {
        input.value = null;
      }
    });
  };

  // 색상 Input 추가
  const [inputs, setInputs] = useState([]);
  const colorRef = useRef();
  const addInput = (e) => {
    e.preventDefault();
    const newInputs = [];
    newInputs.push(
      <div id={inputs.length} key={newInputs.length} className={styles.color}>
        <input type="text" />
        <button onClick={minusInput} className={styles.colorDeleteBtn}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    );
    setInputs([...inputs, newInputs]);
    console.log(inputs);
  };

  // 색상 Input 제거
  const minusInput = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // console.log(inputs);
  }, [inputs]);
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

      <section className={adminStyles.section}>
        <div className={adminStyles.sectionHeader}>
          <h2 className={adminStyles.sectionTitle}>제품 등록하기</h2>
        </div>
        <div className={adminStyles.sectionBody}>
          <form
            className={styles.addProductForm}
            ref={formRef}
            onSubmit={onSubmit}
          >
            <div>
              <label htmlFor="name">제품명: </label>
              <input
                ref={itemNameRef}
                type="text"
                placeholder="제품명"
                id="name"
              />
            </div>
            <div>
              <label htmlFor="price">가격: </label>
              <input
                ref={itemPriceRef}
                type="number"
                placeholder="가격"
                id="price"
              />
            </div>
            <div>
              <label htmlFor="rentPrice">렌탈가: </label>
              <input
                ref={itemRentPriceRef}
                type="number"
                placeholder="렌탈가"
                id="rentPrice"
              />
            </div>

            {/* 이미지 선택 */}
            <div className={styles.selectMainImg}>
              <p>메인 이미지</p>
              <>
                <label className={styles.selectImgLabel} htmlFor="selectImg">
                  +
                </label>
                <input
                  id="selectImg"
                  className={styles.selectImg}
                  ref={fileInput1}
                  onChange={onFileChange}
                  type="file"
                  accept="image/*"
                />
              </>
            </div>

            {attachment1 && (
              <div>
                <img src={attachment1} alt="#" width="50px" height="50px" />
                <button className="clear1Btn" onClick={onClearAttachment}>
                  Clear
                </button>
              </div>
            )}

            <div className={styles.selectMainImg}>
              <p>상세 이미지</p>
              <>
                <label className={styles.selectImgLabel} htmlFor="selectImg2">
                  +
                </label>
                <input
                  ref={fileInput2}
                  id="selectImg2"
                  className={styles.selectImg}
                  onChange={onDetailFilesChange}
                  type="file"
                  accept="image/*"
                  multiple
                />
              </>
            </div>

            {attachment2 && (
              <div>
                {attachment2.map((file) => (
                  <img src={file} alt="#" width="50px" height="50px" />
                ))}
                <button className="clear2Btn" onClick={onClearAttachment}>
                  Clear
                </button>
              </div>
            )}
            <div className={styles.colorSelect}>
              <p>색상: </p>
              <div ref={colorRef} className={styles.color}>
                <input type="text" />
                <button onClick={addInput} className={styles.colorMoreBtn}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              {inputs.map((input) => input)}
            </div>
            <input type="submit" value="등록" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Admin_prodcut;

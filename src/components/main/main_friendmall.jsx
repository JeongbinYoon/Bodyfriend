import styles from "./main_friendmall.module.css";

const Main_friendmall = ({ chairs }) => {
  console.log(chairs);
  return (
    <>
      <div>
        <h2>프랜드몰</h2>
        <p>10년 더 건강하게 바디프랜드</p>
        <button>더보기+</button>
      </div>
      <div>
        <ul>
          {chairs.map((chair) => (
            <li key={chair.id}>
              <div>
                <img className={styles.chairImg} src={chair.imgURL} alt="" />
                <h3>{chair.name}</h3>
                <span></span>
                <span></span>
              </div>
            </li>
          ))}
          <li>as</li>
        </ul>
      </div>
    </>
  );
};

export default Main_friendmall;

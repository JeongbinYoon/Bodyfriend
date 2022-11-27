import styles from "./introduce.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function Introduce() {
  const onQrCode = (e) => {
    e.target.classList.add(`${styles.active}`);
  };
  const outQrCode = (e) => {
    e.target.classList.remove(`${styles.active}`);
  };
  return (
    <div id={styles.introduce}>
      <section id={styles.banner}>
        <div className={styles.description}>
          <h1 className={styles.logo}>
            <img src="./images/bf_logo.png" alt="bodyfriend logo" />
          </h1>
          <p>
            사용자 중심의 편리한 이용 환경을 제공하고
            <br />
            렌탈 서비스 기능 개선과 사용자 분석을 위한 솔루션 제안
          </p>
        </div>

        <div className={styles.phoneImgs}>
          <img src="./images/bodyfriendApp01.png" alt="목업 이미지1" />
          <img src="./images/bodyfriendApp02.png" alt="목업 이미지2" />
          <img src="./images/bodyfriendChair.png" alt="의자 이미지" />
          <img
            onMouseEnter={onQrCode}
            onMouseOut={outQrCode}
            src="./images/qrcode.png"
            alt="qrcode"
          />
          <div className={styles.textani}>
            <p>
              <FontAwesomeIcon icon={faAngleUp} />
            </p>
            <p>바로가기</p>
          </div>
        </div>

        {/* <div className={styles.popup}>
            
        </div> */}
      </section>
      <section id={styles.developeNeeds}>
        <h2 className={styles.title}>Develope Needs</h2>
        <p>
          현재 바디프랜드의 경우 이동하는 페이지마다 정보를 로드하는 시간이 길어
          사용성이 저하됨. <br />또 애플리케이션 사용자를 분석하여 데이터 통계를
          내는 것이 미흡하고 <br />
          사용자가 서비스를 이용하는 데에 불편함이 있어 렌탈 시스템의 개선이
          필요
        </p>
      </section>
      <section id={styles.technologyStack}>
        <h2 className={styles.title}>Technology Stack</h2>
        <div className={styles.techs}>
          <div className={styles.tech}>
            <img src="./images/Typescript.png" alt="기술스택 1" />
            <span className={styles.techName}>Language</span>
            <span>사용자와 상호작용하는 기능을 구현 할 수 있는 언어</span>
          </div>
          <div className={styles.tech}>
            <img src="./images/React.png" alt="기술스택 2" />
            <span className={styles.techName}>Frontend</span>
            <span>SPA 개발에 사용된 자바스크립트 라 이브러리</span>
          </div>
          <div className={styles.tech}>
            <img src="./images/postCSS.png" alt="기술스택 3" />
            <span className={styles.techName}>CSS</span>
            <span>리액트 컴포넌트별 CSS 모듈화를 위 한 CSS 전처리기</span>
          </div>
          <div className={styles.tech}>
            <img src="./images/Recoil.png" alt="기술스택 4" />
            <span className={styles.techName}>State</span>
            <span>
              리액트의 전역상태 데이터 관리에 필 요한 상태관리 라이브러리
            </span>
          </div>
          <div className={styles.tech}>
            <img src="./images/firebase.png" alt="기술스택 5" />
            <span className={styles.techName}>Authentication</span>
            <span>회원가입과 로그인처리를 위한 안전 한 사용자 인증 시스템</span>
          </div>
          <div className={styles.tech}>
            <img src="./images/MySQL.png" alt="기술스택 6" />
            <span className={styles.techName}>Database</span>
            <span>데이터 처리에 필요한 오픈소스 데이 터베이스</span>
          </div>
        </div>
      </section>
      <section id={styles.asistobe}>
        <h2 className={styles.title}>AS-IS TO-BE</h2>
        <img src="./images/asistobe.png" alt="as is to be" />
      </section>
      <section id={styles.task}>
        <h2 className={styles.title}>Contents</h2>
        <img src="./images/task.png" alt="as is to be" />
      </section>
    </div>
  );
}
export default Introduce;

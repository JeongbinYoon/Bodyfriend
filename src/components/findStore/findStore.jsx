/* global kakao */
import { useEffect } from "react";
import Header from "../header/header";
import styles from "./findStore.module.css";
const { kakao } = window;
function FindStore() {
  useEffect(() => {
    // 마커를 담을 배열입니다
    var markers = [];

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);
  }, []);

  return (
    <div>
      <Header title="전시장 찾기" />

      <div
        id="map"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      ></div>
    </div>
  );
}
export default FindStore;

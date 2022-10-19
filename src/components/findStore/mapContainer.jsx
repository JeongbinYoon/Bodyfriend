import { useEffect } from "react";
import styles from "./findStore.module.css";
/* global kakao */
const { kakao } = window;
function MapContainer({ searchPlace }) {
  useEffect(() => {
    console.log(searchPlace);
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    // 마커에 클릭이벤트를 등록
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        console.log(place);
        console.log(place.place_url);
        infowindow.setContent(
          `<div style="white-space:nowrap;height: fit-content; padding: 5px;font-size: 14px;">
            <span style="display:inline-box; margin-right:20px"><b style="color:#B4875E">장소: </b></span><span>${place.place_name}</span><br/>
            <span style="display:inline-box; margin-right:9px"><b style="color:#B4875E">연락처: </b></span><span>${place.phone}</span><br/>
            <span style="display:inline-box; margin-right:20px"><b style="color:#B4875E">주소: </b></span><span>${place.road_address_name}</span><br/>
            <span style="display:inline-box; margin-right:20px"><b style="color:#B4875E">지번: </b></span><span>${place.address_name}</span><br/>
            <p style="text-align:right; margin-top:5px"><a href=${place.place_url} style="color:#B4875E">상세보기 &gt</a></p>
            </div>`
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);
  return (
    <div
      id="myMap"
      className={styles.myMap}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    ></div>
  );
}
export default MapContainer;

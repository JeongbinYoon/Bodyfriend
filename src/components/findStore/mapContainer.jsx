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
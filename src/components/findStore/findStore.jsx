import Header from "../header/header";
import styles from "./findStore.module.css";
import MapContainer from "./mapContainer";
import SearchPlace from "./searchPlace";
function FindStore() {
  return (
    <div>
      <Header title="전시장 찾기" />
      <SearchPlace />
    </div>
  );
}
export default FindStore;

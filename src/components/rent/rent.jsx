import { dbService } from "../../service/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const Rent = (props) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState("");
  //   const [rentItem, setRentItem] = useState([]);

  const getNweets = async () => {
    const q = query(collection(dbService, "nweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
    console.log(nweets);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setNweet("");
  };
  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        느윗!
      </button>
    </div>
  );
};

export default Rent;

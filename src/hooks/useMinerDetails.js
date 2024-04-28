import { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase"; // Ensure you have this import if db is not globally available
import { collection, query, where, getDocs } from "firebase/firestore";

const useMinerDetails = (userId) => {
  const [minerDetails, setMinerDetails] = useState([]);


  useEffect(() => {
    if (!userId) {
      setError(new Error("No user ID provided"));
      return;
    }

  

    fetchMinerDetails();
  }, [userId]);

  return { minerDetails, loading, error };
};

export default useMinerDetails;

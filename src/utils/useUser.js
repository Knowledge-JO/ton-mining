import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { app } from "../../Firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useFirebaseUser = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid; // Get userId from user object
        console.log("User ID:", userId);
        const db = getFirestore(app);
        const docRef = doc(db, "users", userId);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              console.log("User data:", userData);
              setUser({ userId, ...userData }); // Include userId in the user data object
            } else {
              console.log("User document not found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error.message);
          });
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user };
};

export default useFirebaseUser;

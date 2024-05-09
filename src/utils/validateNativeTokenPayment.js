import { createMiner } from "@/utils/updatedb";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { fromNano } from "ton-core";

const validateTonTonPayment = async (
  getBalance,
  setUserBalance,
  updateUserWithAmount
) => {
  const docRef = doc(db, "users", user.userId);
  const userQs = await getDoc(docRef);
  if (userQs.exists()) {
    const userData = userQs.data();
    const oldBalance = userData.oldUserBalance;
    const unverifiedPaidAmount = userData.unverifiedAmount;
    const oldPower = userData.oldPower;
    const oldCost = userData.oldCost;
    console.log("user data ok", userData, oldBalance, unverifiedPaidAmount);
    if (oldBalance && unverifiedPaidAmount) {
      console.log("data intact", oldBalance, unverifiedPaidAmount);
      await verifyTx(
        unverifiedPaidAmount,
        oldBalance,
        oldPower,
        oldCost,
        user.userId,
        getBalance,
        setUserBalance,
        updateUserWithAmount
      );
    }
  }
};

const verifyTx = async (
  paidAmount,
  oldBalance,
  power,
  cost,
  userId,
  getBalance,
  setUserBalance,
  updateUserWithAmount
) => {
  const intervalId = setInterval(async () => {
    let bal = await getBalance();
    if (!bal) return;
    bal = Number(fromNano(bal));
    if (bal <= oldBalance - paidAmount) {
      clearInterval(intervalId);
      const newBal = bal;
      setUserBalance(newBal);
      await createMiner(power, cost, userId);
      await updateUserWithAmount(userId, "", "", "", "");
    }
    console.log(bal);
  }, 2000);
  setTimeout(() => clearInterval(intervalId), 1800000);
};

async function updateUserWithAmount(
  userId,
  amount,
  oldUserBalance,
  oldPower,
  oldCost
) {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log("updating db", userId);
    await updateDoc(userRef, {
      unverifiedAmount: String(amount),
      oldUserBalance: String(oldUserBalance),
      oldPower: String(oldPower),
      oldCost: String(oldCost),
    });
  }
}

export { validateTonTonPayment, updateUserWithAmount };

import { db, auth } from "./firebase.js";
import { doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const DB_KEY = "expense_transactions";

export function getTransactions() {
  return JSON.parse(localStorage.getItem(DB_KEY)) || [];
}

export async function saveTransactions(transactions) {
  localStorage.setItem(DB_KEY, JSON.stringify(transactions));
  
  // Cloud Sync
  if (auth.currentUser && navigator.onLine) {
    try {
      const userRef = doc(db, "transactions", auth.currentUser.uid);
      await setDoc(userRef, { data: transactions, lastSynced: Date.now() }, { merge: true });
      console.log("☁️ Data Synced to Cloud");
    } catch (err) {
      console.error("Cloud Sync Error:", err);
    }
  }
}

// Initial Sync from Cloud on Login
export async function syncFromCloud() {
  if (auth.currentUser && navigator.onLine) {
    try {
      // 1. Sync Transactions
      const userRef = doc(db, "transactions", auth.currentUser.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const cloudData = snap.data().data || [];
        const localData = getTransactions();
        
        // Merge logic: Simple "Union by ID"
        const merged = [...cloudData];
        localData.forEach(lt => {
          if (!merged.find(ct => ct.id === lt.id)) merged.push(lt);
        });
        
        localStorage.setItem(DB_KEY, JSON.stringify(merged));
        console.log("🔄 Merged Transactions from Cloud");
      }

      // 2. Sync User Settings (Budget)
      const settingsRef = doc(db, "users", auth.currentUser.uid);
      const settingsSnap = await getDoc(settingsRef);
      if (settingsSnap.exists()) {
        const data = settingsSnap.data();
        if (data.monthlyBudget) {
          localStorage.setItem("monthlyBudget", data.monthlyBudget);
          console.log("🔄 Merged Budget from Cloud");
        }
      }

      window.dispatchEvent(new Event("transactionAdded"));
    } catch (err) {
      console.warn("Could not sync from cloud", err);
    }
  }
}


export function addTransaction(txn) {
  const transactions = getTransactions();
  transactions.unshift(txn);
  saveTransactions(transactions);
}

export function deleteTransaction(id) {
  const transactions = getTransactions().filter(t => t.id !== id);
  saveTransactions(transactions);
}


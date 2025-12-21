import { getTransactions, addTransaction } from "./db.js";

export function addManualTransactionFromUI() {
  const amount = Number(document.getElementById("amount")?.value || 0);
  const type = document.getElementById("type")?.value || "expense";
  const category = document.getElementById("category")?.value || "Other";
  const note = document.getElementById("note")?.value || "";
  const sourceEl = document.getElementById("source");
  const source = sourceEl?.value || "cash";
  const sourceLabel = sourceEl ? sourceEl.options[sourceEl.selectedIndex].text : "Cash";

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  const now = Date.now();
  const txn = {
    id: `txn_${now}`,
    amount,
    type,
    category,
    note,
    source,
    sourceLabel,
    timestamp: now,
    date: new Date(now).toISOString().split("T")[0]
  };

  addTransaction(txn);
  
  // Custom alert/feedback
  const btn = document.getElementById("addTxnBtn");
  const originalText = btn ? btn.textContent : "Add Transaction";
  if (btn) {
    btn.textContent = "Added! ✅";
    btn.style.background = "#10b981";
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
    }, 2000);
  }

  // Clear inputs
  document.getElementById("amount").value = "";
  document.getElementById("note").value = "";

  // Notify system (app.js and home.js will catch this)
  window.dispatchEvent(new Event("transactionAdded"));
}


export function calculateSummary() {
  const txns = getTransactions();
  let income = 0, expense = 0;
  txns.forEach(t => {
    if (t.type === "income") income += Number(t.amount) || 0;
    else expense += Number(t.amount) || 0;
  });
  return { income, expense, balance: income - expense };
}

export function getAllTransactions() {
  return getTransactions();
}

// Backwards-compatible global for existing inline buttons
window.addManualTransaction = addManualTransactionFromUI;


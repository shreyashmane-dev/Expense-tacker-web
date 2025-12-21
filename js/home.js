import { calculateSummary } from "./transactions.js";

function updateSummary() {
  const { income, expense, balance } = calculateSummary();

  const incEl = document.getElementById("income");
  const expEl = document.getElementById("expense");
  const balEl = document.getElementById("balance");

  if (incEl) incEl.innerText = "₹" + income.toLocaleString();
  if (expEl) expEl.innerText = "₹" + expense.toLocaleString();
  if (balEl) balEl.innerText = "₹" + balance.toLocaleString();

  // Budget Progress
  const budget = Number(localStorage.getItem("monthlyBudget") || 0);
  const budgetStatus = document.getElementById("budgetStatus");
  const budgetProgress = document.getElementById("budgetProgress");
  const budgetHint = document.getElementById("budgetHint");

  if (budgetStatus && budgetProgress) {
    if (budget > 0) {
      const percent = Math.min((expense / budget) * 100, 100);
      budgetStatus.innerText = `₹${expense.toLocaleString()} / ₹${budget.toLocaleString()}`;
      budgetProgress.style.width = percent + "%";
      
      if (percent >= 100) {
        budgetProgress.style.background = "#ef4444"; // Red for over budget
        budgetHint.innerText = "⚠️ You have exceeded your monthly budget!";
        budgetHint.style.color = "#ef4444";
      } else if (percent > 80) {
        budgetProgress.style.background = "#f59e0b"; // Orange for warning
        budgetHint.innerText = "🚨 Careful, you're near your budget limit.";
        budgetHint.style.color = "#f59e0b";
      } else {
        budgetProgress.style.background = "linear-gradient(90deg, #38bdf8, #2563eb)";
        budgetHint.innerText = "✅ You are well within your budget.";
        budgetHint.style.color = "#64748b";
      }
    } else {
      budgetStatus.innerText = "No Budget Set";
      budgetProgress.style.width = "0%";
      budgetHint.innerText = "Set a monthly budget in Profile settings.";
    }
  }
}


window.addEventListener('DOMContentLoaded', () => {
  updateSummary();

  // Wire Add Transaction button
  const addBtn = document.getElementById('addTxnBtn');
  if (addBtn) {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.addManualTransaction) window.addManualTransaction();
      else {
        import('./transactions.js').then(m => {
          if (m.addManualTransactionFromUI) m.addManualTransactionFromUI();
        }).catch(() => {});
      }
    });
  }
});

// React to changes
window.addEventListener("transactionAdded", updateSummary);


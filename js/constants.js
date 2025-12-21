export const CATEGORIES = [
  "Food",
  "Bills",
  "Travel",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "UPI",
  "Salary",
  "Gift",
  "Other"
];

export const PAYMENT_MODES = [
  "Cash",
  "UPI",
  "Bank Transfer",
  "Debit Card",
  "Credit Card",
  "Net Banking"
];

export function getCategoryIcon(cat) {
  const icons = {
    "Food": "🍔",
    "Bills": "💡",
    "Travel": "🚗",
    "Shopping": "🛍️",
    "Entertainment": "🎬",
    "Health": "🏥",
    "Education": "📚",
    "UPI": "📱",
    "Salary": "💰",
    "Gift": "🎁",
    "Other": "📦"
  };
  return icons[cat] || "📦";
}

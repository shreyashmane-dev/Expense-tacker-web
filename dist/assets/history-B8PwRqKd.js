import{g as v}from"./navbar-gesture-B7OxCqBy.js";import"./firebase-CCPgoP9_.js";import"https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";import"https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";import"https://cdn.jsdelivr.net/npm/chart.js@4.4.1/+esm";const a={phonepe:"/assets/icons/phonepe.svg",gpay:"/assets/icons/gpay.svg",paytm:"/assets/icons/paytm.svg",cash:"/assets/icons/cash.svg",bank:"/assets/icons/bank.svg",card:"/assets/icons/card.svg"},g={phonepe:"PhonePe",gpay:"Google Pay",paytm:"Paytm",cash:"Cash",bank:"Bank",card:"Card"};function y(t){return(typeof t=="number"?new Date(t):new Date(t)).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function d(){const t=document.getElementById("historyList"),s=document.getElementById("transactionsUl"),u=document.getElementById("filterSource"),p=v();if(!t&&!s)return;const m=u?.value||"all",n=m==="all"?p:p.filter(e=>e.source===m);t&&(n.length===0?t.innerHTML="<p>No transactions yet</p>":t.innerHTML=n.map(e=>{const c=a[e.source]||a.cash,r=e.timestamp?y(e.timestamp):e.date||"",l=e.type==="expense"?"#dc2626":"#16a34a",o=e.type==="expense"?"-":"+",i=e.sourceLabel||g[e.source]||e.source||"Cash";return`
          <div class="list-item">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="${c}" alt="${i}" style="width:40px; height:40px; border-radius:8px; object-fit:cover;" />
              <div>
                <strong>₹${e.amount} • ${e.category}</strong><br>
                <small style="color:#64748b">${i} • ${r} ${e.note?"• "+e.note:""}</small>
              </div>
            </div>
            <div style="color:${l}; font-weight:700">
              ${o}₹${e.amount}
            </div>
          </div>
        `}).join("")),s&&(n.length===0?s.innerHTML="<li>No transactions yet</li>":s.innerHTML=n.slice(0,8).map(e=>{const c=a[e.source]||a.cash,r=e.type==="expense"?"#dc2626":"#16a34a",l=e.type==="expense"?"-":"+",o=e.sourceLabel||g[e.source]||e.source||"Cash",i=e.timestamp?y(e.timestamp):e.date||"";return`
          <li style="display:flex; justify-content:space-between; align-items:center; padding:8px 0;">
            <div style="display:flex; gap:10px; align-items:center">
              <img src="${c}" alt="${o}" style="width:34px; height:34px; border-radius:8px; object-fit:cover;" />
              <div>
                <div style="font-weight:700">₹${e.amount} • ${e.category}</div>
                <div style="font-size:12px; color:#64748b">${o} • ${i}</div>
              </div>
            </div>
            <div style="color:${r}; font-weight:700">${l}₹${e.amount}</div>
          </li>
        `}).join(""))}window.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("filterSource");d(),t&&t.addEventListener("change",()=>d())});window.addEventListener("transactionAdded",d);

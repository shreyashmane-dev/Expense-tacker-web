import"./firebase-CCPgoP9_.js";import"./navbar-gesture-B7OxCqBy.js";import{g as o}from"./home-C2dY39wA.js";import"https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";import"https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";import"https://cdn.jsdelivr.net/npm/chart.js@4.4.1/+esm";function r(e){return{Food:"🍔",Bills:"💡",Travel:"🚗",Shopping:"🛍️",Entertainment:"🎬",Health:"🏥",Education:"📚",UPI:"📱",Salary:"💰",Gift:"🎁",Other:"📦"}[e]||"📦"}function i(){const e=document.getElementById("transactionsUl");if(!e)return;const n=o();if(!n.length){e.innerHTML='<li class="empty">No transactions yet</li>';return}e.innerHTML=n.slice(0,10).map(t=>`
      <li>
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="font-size:24px; width:40px; height:40px; background:#f1f5f9; border-radius:10px; display:flex; align-items:center; justify-content:center;">
             ${r(t.category)}
          </div>
          <div class="left"><strong>${t.category}</strong><br><small>${t.note||""} • ${t.date}</small></div>
        </div>
        <div class="right ${t.type}" style="font-weight:bold;">${t.type==="expense"?"-":"+"}₹${t.amount.toLocaleString()}</div>
      </li>
    `).join("")}document.addEventListener("DOMContentLoaded",i);window.addEventListener("transactionAdded",i);

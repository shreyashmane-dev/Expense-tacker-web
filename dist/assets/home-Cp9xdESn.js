import"./firebase-ClHfoL4X.js";import"./app-DWn9OCw_.js";import{g as i}from"./home-3O2bPKV9.js";import"https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";import"https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";import"./index-36fcbc82-Dp9LjbeE.js";document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("transactionsUl");if(!n)return;const e=i();if(!e.length){n.innerHTML='<li class="empty">No transactions yet</li>';return}n.innerHTML=e.map(t=>`
      <li>
        <div class="left"><strong>${t.category}</strong><br><small>${t.note||""} • ${t.date}</small></div>
        <div class="right ${t.type}">${t.type==="expense"?"-":"+"}₹${t.amount}</div>
      </li>
    `).join("")});

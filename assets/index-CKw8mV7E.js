(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();document.addEventListener("DOMContentLoaded",()=>{const u=document.getElementById("searchInput"),a=document.getElementById("searchButton"),r=document.getElementById("results"),c=document.getElementById("bookDetails"),o=document.getElementById("loading"),s="https://www.googleapis.com/books/v1/volumes";I(),a.addEventListener("click",i),u.addEventListener("keypress",t=>{t.key==="Enter"&&i()}),i("javascript");async function i(t){const e=t||u.value.trim();if(e){k(),y(),L();try{const n=await f(e);n.length>0?p(n):E()}catch(n){w(n)}finally{b()}}}async function f(t){const e=await fetch(`${s}?q=${encodeURIComponent(t)}&maxResults=12`);if(!e.ok)throw new Error("Network response was not ok");return(await e.json()).items||[]}function p(t){t.forEach(e=>{const n=g(e);r.appendChild(n)})}function g(t){var d;const e=document.createElement("div");e.className="book-card";const n=t.volumeInfo,l=n.title||"Untitled",h=n.authors?n.authors.join(", "):"Unknown author",m=((d=n.imageLinks)==null?void 0:d.thumbnail)||"https://via.placeholder.com/150x200?text=No+Cover";return e.innerHTML=`
      <img src="${m}" alt="${l}" onerror="this.src='https://via.placeholder.com/150x200?text=No+Cover'">
      <h3>${l}</h3>
      <p>${h}</p>
    `,e.addEventListener("click",()=>v(t)),e}function v(t){var d;const e=t.volumeInfo,n=e.title||"Untitled",l=e.authors?e.authors.join(", "):"Unknown author",h=((d=e.imageLinks)==null?void 0:d.thumbnail)||"https://via.placeholder.com/300x400?text=No+Cover",m=e.description?`${e.description.slice(0,200)}...`:"No description available";c.innerHTML=`
      <div class="book-detail-content">
        <div class="book-cover">
          <img src="${h}" alt="${n}" onerror="this.src='https://via.placeholder.com/300x400?text=No+Cover'">
        </div>
        <div class="book-info">
          <h2>${n}</h2>
          <p><strong>Author:</strong> ${l}</p>
          ${e.publishedDate?`<p><strong>Published:</strong> ${e.publishedDate}</p>`:""}
          <p><strong>Description:</strong> ${m}</p>
          <a href="${e.infoLink}" target="_blank" rel="noopener">View on Google Books</a>
        </div>
      </div>
      <button class="back-button">Back to results</button>
    `,c.classList.remove("hidden"),r.classList.add("hidden"),document.querySelector(".back-button").addEventListener("click",()=>{c.classList.add("hidden"),r.classList.remove("hidden")})}function k(){o.classList.remove("hidden")}function b(){o.classList.add("hidden")}function y(){r.innerHTML=""}function L(){c.classList.add("hidden")}function E(){r.innerHTML='<p class="no-results">No books found. Try a different search.</p>'}function w(t){console.error("Error:",t),r.innerHTML=`
      <p class="error-message">
        Error loading books. Please try again later.
        <button class="retry-button">Retry</button>
      </p>
    `,document.querySelector(".retry-button").addEventListener("click",i)}function I(){const t=document.createElement("button");t.className="theme-toggle",t.textContent="🌓",t.addEventListener("click",$),document.querySelector(".header").appendChild(t),localStorage.getItem("darkMode")==="true"&&document.body.classList.add("dark-mode")}function $(){document.body.classList.toggle("dark-mode"),localStorage.setItem("darkMode",document.body.classList.contains("dark-mode"))}});

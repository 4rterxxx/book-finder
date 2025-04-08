(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const u=document.getElementById("searchInput"),a=document.getElementById("searchButton"),s=document.getElementById("results"),c=document.getElementById("bookDetails"),t=document.getElementById("loading"),r="https://www.googleapis.com/books/v1/volumes";initTheme(),a.addEventListener("click",i),u.addEventListener("keypress",n=>{n.key==="Enter"&&i()}),i("javascript");async function i(n){const e=n||u.value.trim();if(e){b(),y(),L();try{const o=await f(e);o.length>0?m(o):E()}catch(o){w(o)}finally{k()}}}async function f(n){const e=await fetch(`${r}?q=${encodeURIComponent(n)}&maxResults=12`);if(!e.ok)throw new Error("Network response was not ok");return(await e.json()).items||[]}function m(n){n.forEach(e=>{const o=v(e);s.appendChild(o)})}function v(n){var d;const e=document.createElement("div");e.className="book-card";const o=n.volumeInfo,l=o.title||"Untitled",h=o.authors?o.authors.join(", "):"Unknown author",p=((d=o.imageLinks)==null?void 0:d.thumbnail)||"https://via.placeholder.com/150x200?text=No+Cover";return e.innerHTML=`
      <img src="${p}" alt="${l}" onerror="this.src='https://via.placeholder.com/150x200?text=No+Cover'">
      <h3>${l}</h3>
      <p>${h}</p>
    `,e.addEventListener("click",()=>g(n)),e}function g(n){var d;const e=n.volumeInfo,o=e.title||"Untitled",l=e.authors?e.authors.join(", "):"Unknown author",h=((d=e.imageLinks)==null?void 0:d.thumbnail)||"https://via.placeholder.com/300x400?text=No+Cover",p=e.description?`${e.description.slice(0,200)}...`:"No description available";c.innerHTML=`
      <div class="book-detail-content">
        <div class="book-cover">
          <img src="${h}" alt="${o}" onerror="this.src='https://via.placeholder.com/300x400?text=No+Cover'">
        </div>
        <div class="book-info">
          <h2>${o}</h2>
          <p><strong>Author:</strong> ${l}</p>
          ${e.publishedDate?`<p><strong>Published:</strong> ${e.publishedDate}</p>`:""}
          <p><strong>Description:</strong> ${p}</p>
          <a href="${e.infoLink}" target="_blank" rel="noopener">View on Google Books</a>
        </div>
      </div>
      <button class="back-button">Back to results</button>
    `,c.classList.remove("hidden"),s.classList.add("hidden"),document.querySelector(".back-button").addEventListener("click",()=>{c.classList.add("hidden"),s.classList.remove("hidden")})}function b(){t.classList.remove("hidden")}function k(){t.classList.add("hidden")}function y(){s.innerHTML=""}function L(){c.classList.add("hidden")}function E(){s.innerHTML='<p class="no-results">No books found. Try a different search.</p>'}function w(n){console.error("Error:",n),s.innerHTML=`
      <p class="error-message">
        Error loading books. Please try again later.
        <button class="retry-button">Retry</button>
      </p>
    `,document.querySelector(".retry-button").addEventListener("click",i)}});

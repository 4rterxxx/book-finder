(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();document.addEventListener("DOMContentLoaded",()=>{const l=document.getElementById("searchInput"),a=document.getElementById("searchButton"),r=document.getElementById("results"),i=document.getElementById("bookDetails"),o=document.getElementById("loading"),n="https://www.googleapis.com/books/v1/volumes";I(),l.value="javascript",a.addEventListener("click",c),l.addEventListener("keypress",t=>{t.key==="Enter"&&c()}),c();async function c(){const t=l.value.trim();if(!t){f("Введите запрос для поиска");return}b(),k(),E();try{const e=await p(t);e.length>0?g(e):f("Книги не найдены. Попробуйте другой запрос.")}catch(e){$(e)}finally{y()}}async function p(t){const e=await fetch(`${n}?q=${encodeURIComponent(t)}&maxResults=12`);if(!e.ok)throw new Error("Ошибка сети");return(await e.json()).items||[]}function g(t){t.forEach(e=>{const s=L(e);r.appendChild(s)})}function L(t){var d;const e=document.createElement("div");e.className="book-card";const s=t.volumeInfo,u=s.title||"Без названия",h=s.authors?s.authors.join(", "):"Автор неизвестен",m=((d=s.imageLinks)==null?void 0:d.thumbnail)||"https://via.placeholder.com/150x200?text=Обложка+отсутствует";return e.innerHTML=`
      <img src="${m}" alt="${u}" onerror="this.src='https://via.placeholder.com/150x200?text=Обложка+отсутствует'">
      <h3>${u}</h3>
      <p>${h}</p>
    `,e.addEventListener("click",()=>v(t)),e}function v(t){var d;const e=t.volumeInfo,s=e.title||"Без названия",u=e.authors?e.authors.join(", "):"Автор неизвестен",h=((d=e.imageLinks)==null?void 0:d.thumbnail)||"https://via.placeholder.com/300x400?text=Обложка+отсутствует",m=e.description?`${e.description.slice(0,200)}...`:"Описание отсутствует";i.innerHTML=`
      <div class="book-detail-content">
        <div class="book-cover">
          <img src="${h}" alt="${s}" onerror="this.src='https://via.placeholder.com/300x400?text=Обложка+отсутствует'">
        </div>
        <div class="book-info">
          <h2>${s}</h2>
          <p><strong>Авторы:</strong> ${u}</p>
          ${e.publishedDate?`<p><strong>Опубликовано:</strong> ${e.publishedDate}</p>`:""}
          <p><strong>Описание:</strong> ${m}</p>
          <a href="${e.infoLink}" target="_blank" rel="noopener">Ссылка на Google Books</a>
        </div>
      </div>
      <button class="back-button">Обратно к результатам</button>
    `,i.classList.remove("hidden"),r.classList.add("hidden"),document.querySelector(".back-button").addEventListener("click",()=>{i.classList.add("hidden"),r.classList.remove("hidden")})}function b(){o.classList.remove("hidden"),o.textContent="Поиск книг..."}function y(){o.classList.add("hidden")}function k(){r.innerHTML=""}function E(){i.classList.add("hidden")}function f(t="Книги не найдены"){r.innerHTML=`<p class="no-results">${t}</p>`}function $(t){console.error("Ошибка:",t),r.innerHTML=`
      <p class="error-message">
        Ошибка при загрузке данных. Пожалуйста, попробуйте позже.
        <button class="retry-button">Повторить</button>
      </p>
    `,document.querySelector(".retry-button").addEventListener("click",c)}function I(){const t=document.createElement("button");t.className="theme-toggle",t.textContent="🌓",t.addEventListener("click",w),document.querySelector(".header").appendChild(t),localStorage.getItem("darkMode")==="true"&&document.body.classList.add("dark-mode")}function w(){document.body.classList.toggle("dark-mode"),localStorage.setItem("darkMode",document.body.classList.contains("dark-mode"))}});

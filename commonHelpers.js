import{a as w,i as m,S as k}from"./assets/vendor-0Fq3u7cb.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const L="45339856-2e70ead6ce9cf82bdbbd89c7e",E="https://pixabay.com/api/",v=15;let S=()=>{m.show({message:"Fill search field",position:"topRight",backgroundColor:"rgb(250,128,114)",messageColor:"rgb(255,255,255)"})},C=()=>{m.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"rgb(250,128,114)",messageColor:"rgb(255,255,255)"})};async function y(e,r,o,i,t){if(e===null||e===""){S(),t();return}try{const s=await w.get(E,{params:{key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:v,page:r},headers:{Accept:"application/json"}});s.data.hits.length>0?o(s.data):C()}catch(s){i(s)}finally{t()}}let P=new k("ul.results a",{captionsData:"alt",captionDelay:250});function q(e){return`<li class="result-item">
        <a class="result-link"
          href="${e.largeImageURL}">
          <img class="result-image"
            src="${e.webformatURL}"
            alt="${e.tags}" />
          <ul class="statistic">
            <li class="statistic-item">
              <span class="likes-title">Likes</span>
              <span class="likes-number">${e.likes}</span>
            </li>
            <li class="statistic-item">
              <span class="likes-title">Views</span>
              <span class="likes-number">${e.views}</span>
            </li>
            <li class="statistic-item">
              <span class="likes-title">Comments</span>
              <span class="likes-number">${e.comments}</span>
            </li>
            <li class="statistic-item">
              <span class="likes-title">Downloads</span>
              <span class="likes-number">${e.downloads}</span>
            </li>
          </ul>
        </a>
      </li>`}function f(e){const r=e.map(i=>q(i)).join("");document.querySelector("ul.results").insertAdjacentHTML("afterbegin",r),P.refresh()}const g=document.querySelector(".search"),a=document.getElementById("load-more");let d=document.querySelector("div.loader-panel"),l=1,c="",n=0,u=0;function h(){m.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"rgb(250,128,114)",messageColor:"rgb(255,255,255)"})}function b(){const e=document.querySelector(".result-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}g.addEventListener("submit",async e=>{e.preventDefault();const r=g.elements["search-query"].value.trim();if(r!==c){c=r,l=1,n=0,u=0;const o=document.querySelectorAll("li.result-item");o&&o.length>0&&o.forEach(i=>i.remove())}a.style.display="none",d.style.display="block",await y(c,l,o=>{f(o.hits),n+=o.hits.length,u=o.totalHits,l++,n<u?a.style.display="block":h(),b()},o=>console.error(o),()=>d.style.display="none")});a.addEventListener("click",async()=>{d.style.display="block",a.style.display="none",await y(c,l,e=>{f(e.hits),n+=e.hits.length,l++,n<u?a.style.display="block":h(),b()},e=>console.error(e),()=>d.style.display="none")});
//# sourceMappingURL=commonHelpers.js.map

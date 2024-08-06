import{a as L,i as u,S as P}from"./assets/vendor-8cd2069d.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const b="22615360-5cbe46b430b53ed17aa097d2d",w="https://pixabay.com/api/",E={key:b,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};function y(a,n=1){const o=new URLSearchParams({...E,page:n,q:a});return L.get(`${w}?${o}`).then(r=>r.data)}const m=document.querySelector(".gallery");function f(a){const n=a.map(({largeImageURL:o,webformatURL:r,likes:e,views:t,tags:i,comments:l,downloads:d})=>`
    <li class="gallery-item">
        <a class="gallery-link" href="${o}">
            <img
                class="gallery-image"
                src="${r}"
                data-source="${o}"
                alt="${i}"
            />
        </a>
        <div class="stats">
          <div>Likes<span>${e}</span></div>
          <div>Views<span>${t}</span></div>
          <div>Comments<span>${l}</span></div>
          <div>Downloads<span>${d}</span></div>
        </div>
    </li>
  `).join("");m.insertAdjacentHTML("beforeend",n)}function M(){m.innerHTML=""}u.settings({position:"topRight",progressBar:!1,messageColor:"#FFFFFF",icon:"",close:!1});document.addEventListener("DOMContentLoaded",()=>{const a=new P(".gallery a",{captionsData:"alt",captionDelay:250}),n=document.querySelector(".btn"),o=document.getElementById("loadMore"),r=document.querySelector(".search"),e=document.querySelector(".loader"),t="Sorry, there are no images matching your search query. Please try again!",i="We're sorry, there are no more posts to load";let l=1,d=15,h=null,c="";const g=async()=>{if(c=r.value.trim(),c!==""){M(),l=1,e.style.display="block",o.style.display="none";try{const s=await y(c,l);if(s.hits.length===0)throw new Error(t);h=s.totalHits,f(s.hits),a.refresh(),r.value="",o.style.display="block"}catch{p(t)}finally{e.style.display="none"}}},v=async()=>{l+=1;try{l===Math.ceil(h/d)&&(o.style.display="none",u.info({message:i}));const s=await y(c,l);if(s.hits.length===0)throw new Error(t);f(s.hits),a.refresh()}catch{p(t)}finally{e.style.display="none"}},p=s=>{u.error({message:s}),r.value=""};n.addEventListener("click",g),o.addEventListener("click",v)});
//# sourceMappingURL=commonHelpers.js.map

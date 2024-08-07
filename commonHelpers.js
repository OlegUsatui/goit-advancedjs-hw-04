import{a as E,i as p,S as M}from"./assets/vendor-8cd2069d.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const S="22615360-5cbe46b430b53ed17aa097d2d",$="https://pixabay.com/api/",F={key:S,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};async function g(n,r=1){const o=new URLSearchParams({...F,page:r,q:n});return(await E.get(`${$}?${o}`)).data}const b=document.querySelector(".gallery");function v(n){const r=n.map(({largeImageURL:o,webformatURL:s,likes:e,views:t,tags:a,comments:i,downloads:u})=>`
    <li class="gallery-item">
        <a class="gallery-link" href="${o}">
            <img
                class="gallery-image"
                src="${s}"
                data-source="${o}"
                alt="${a}"
            />
        </a>
        <div class="stats">
          <div>Likes<span>${e}</span></div>
          <div>Views<span>${t}</span></div>
          <div>Comments<span>${i}</span></div>
          <div>Downloads<span>${u}</span></div>
        </div>
    </li>
  `).join("");b.insertAdjacentHTML("beforeend",r)}function q(){b.innerHTML=""}p.settings({position:"topRight",progressBar:!1,messageColor:"#FFFFFF",icon:"",close:!1});document.addEventListener("DOMContentLoaded",()=>{const n=new M(".gallery a",{captionsData:"alt",captionDelay:250}),r=document.querySelector(".search-bar"),o=document.getElementById("loadMore"),s=document.querySelector(".search"),e=document.querySelector(".loader"),t="Sorry, there are no images matching your search query. Please try again!",a="We're sorry, there are no more posts to load";let i=1,u=15,y=null,d="";const L=async l=>{if(l.preventDefault(),d=s.value.trim(),d!==""){q(),i=1,e.style.display="block",o.style.display="none";try{const{hits:c,totalHits:P}=await g(d,i),f=c;if(y=P,f.length===0)throw new Error(t);v(f),n.refresh(),s.value="",o.style.display="block",h()}catch{m(t)}finally{e.style.display="none"}}},w=async()=>{i+=1;try{i===Math.ceil(y/u)&&(o.style.display="none",p.info({message:a}));const{hits:l}=await g(d,i),c=l;if(c.length===0)throw new Error(t);v(c),n.refresh(),h()}catch{m(t)}finally{e.style.display="none"}},h=()=>{window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})},m=l=>{p.error({message:l}),s.value=""};r.addEventListener("submit",L),o.addEventListener("click",w)});
//# sourceMappingURL=commonHelpers.js.map

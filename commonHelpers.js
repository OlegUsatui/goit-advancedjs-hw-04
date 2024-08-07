import{a as S,i as y,S as E}from"./assets/vendor-8cd2069d.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const M="22615360-5cbe46b430b53ed17aa097d2d",$="https://pixabay.com/api/",F={key:M,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};async function g(a,r=1){const o=new URLSearchParams({...F,page:r,q:a});return(await S.get(`${$}?${o}`)).data}const b=document.querySelector(".gallery");function v(a){const r=a.map(({largeImageURL:o,webformatURL:s,likes:e,views:t,tags:i,comments:l,downloads:u})=>`
    <li class="gallery-item">
        <a class="gallery-link" href="${o}">
            <img
                class="gallery-image"
                src="${s}"
                data-source="${o}"
                alt="${i}"
            />
        </a>
        <div class="stats">
          <div>Likes<span>${e}</span></div>
          <div>Views<span>${t}</span></div>
          <div>Comments<span>${l}</span></div>
          <div>Downloads<span>${u}</span></div>
        </div>
    </li>
  `).join("");b.insertAdjacentHTML("beforeend",r)}function q(){b.innerHTML=""}y.settings({position:"topRight",progressBar:!1,messageColor:"#FFFFFF",icon:"",close:!1});document.addEventListener("DOMContentLoaded",()=>{const a=new E(".gallery a",{captionsData:"alt",captionDelay:250}),r=document.querySelector(".search-bar"),o=document.getElementById("loadMore"),s=document.querySelector(".search"),e=document.querySelector(".loader"),t="Sorry, there are no images matching your search query. Please try again!",i="We're sorry, there are no more posts to load";let l=1,u=15,p=null,d="";const L=async n=>{if(n.preventDefault(),d=s.value.trim(),d!==""){q(),l=1,e.style.display="block",o.style.display="none";try{const{hits:c,totalHits:P}=await g(d,l),f=c;if(p=P,f.length===0)throw new Error(t);v(f),a.refresh(),s.value="",o.style.display="block",h()}catch{m(t)}finally{e.style.display="none"}}},w=async()=>{l+=1;try{l===Math.ceil(p/u)&&(o.style.display="none",y.info({message:i}));const{hits:n}=await g(d,l),c=n;if(c.length===0)throw new Error(t);v(c),a.refresh(),h()}catch{m(t)}finally{e.style.display="none"}},h=()=>{const n=document.querySelector(".gallery-item");if(n){const c=n.getBoundingClientRect().height;window.scrollBy({top:c*2,behavior:"smooth"})}},m=n=>{y.error({message:n}),s.value=""};r.addEventListener("submit",L),o.addEventListener("click",w)});
//# sourceMappingURL=commonHelpers.js.map

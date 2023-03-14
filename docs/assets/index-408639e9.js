(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function l(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=l(t);fetch(t.href,n)}})();function g(e,...o){return e.map((l,s)=>{const n=typeof o[s]<"u"?o[s]:"";return`${l}${n}`})}function u(e){return e.join("")}function w(){const e=new URL(location.href).searchParams;return{threshold:Number(e.get("threshold")||0),marginTop:Number(e.get("marginTop")||-20),marginBot:Number(e.get("marginBot")||-20),marginLeft:Number(e.get("marginLeft")||-10),marginRight:Number(e.get("marginRight")||-10)}}function d(e,o=""){if(!e)throw new Error(`assert: ${o} (${e})`)}const i=w(),A={threshold:!1,marginTop:"marginBot",marginBot:"marginTop",marginLeft:"marginRight",marginRight:"marginLeft"},f=document.querySelector("#app"),p=[...Array(12).keys()].slice(1).map(e=>e*10);function R(e){return u(g`<div class="flex-row">
      ${u(p.map(()=>N(e)))}
    </div>`)}function N(e){return u(g` <div class="box box-height-${e} box-width-${e}">
      ${e}
      <div class="intersection-box intersection-box--top"></div>
      <div class="intersection-box intersection-box--bot"></div>
      <div class="intersection-box intersection-box--left"></div>
      <div class="intersection-box intersection-box--right"></div>
    </div>`)}const O=u(p.map(e=>R(e))),P=u(g`
    <fieldset>
      <legend>Intersection Threshold</legend>
      <input
        type="range"
        value="${i.threshold}"
        min="0"
        max="1"
        step="0.1"
        name="threshold"
        oninput="this.nextElementSibling.value = this.value"
      />
      <output>${i.threshold}</output>
    </fieldset>
    <fieldset>
      <legend>Margin top</legend>
      <input
        type="range"
        value="${i.marginTop}"
        min="-49"
        max="49"
        step="1"
        name="marginTop"
        oninput="this.nextElementSibling.value = this.value + '%'"
      />
      <output>${i.marginTop}%</output>
    </fieldset>

    <fieldset>
      <legend>Margin right</legend>
      <input
        type="range"
        value="${i.marginRight}"
        min="-49"
        max="49"
        step="1"
        name="marginRight"
        oninput="this.nextElementSibling.value = this.value + '%'"
      />
      <output>${i.marginRight}%</output>
    </fieldset>

    <fieldset>
      <legend>Margin bottom</legend>
      <input
        type="range"
        value="${i.marginBot}"
        min="-49"
        max="49"
        step="1"
        name="marginBot"
        oninput="this.nextElementSibling.value = this.value+ '%'"
      />
      <output>${i.marginBot}%</output>
    </fieldset>

    <fieldset>
      <legend>Margin left</legend>
      <input
        type="range"
        value="${i.marginLeft}"
        min="-49"
        max="49"
        step="1"
        name="marginLeft"
        oninput="this.nextElementSibling.value = this.value + '%'"
      />
      <output>${i.marginLeft}%</output>
    </fieldset>
  `),T=u(g`<h1>IntersectionObserver visualizer</h1>
    <p>
      Visualize the
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
        >IntersectionObserver</a
      >
      with this playground. Check
      <a
        href="https://github.com/AndersCan/intersection-observer-visual-aid#readme"
        >the repo for</a
      >
      more info.
    </p>
    <p>Note: Changing margin left and right has not been added</p>`);f.innerHTML=T+P+O;f.addEventListener("change",e=>{const o=e.target,l=o.name,s=Number(o.value),t=A[l],n=document.querySelector(`[name=${t}]`);try{d(t),d(n);const r=Number(n.value);(s+r>=100||s+r<=-100)&&console.warn(`${l} + ${t} is overflowing 100 or -100: setting ${t} to zero`)}catch{}i[l]=s,h(i)});let m;h(i);function h(e){const o=document.querySelector("#floater"),{marginTop:l,marginBot:s,marginLeft:t,marginRight:n,threshold:r}=e;m&&m.disconnect(),m=new IntersectionObserver(a=>{for(const c of a){const S=c.target.classList,L=c.isIntersecting?"add":"remove";S[L]("box--visible")}},{root:null,rootMargin:`${l}% ${n}% ${s}% ${t}%`,threshold:[r]}),o.style.top=`${-l}%`,o.style.height=`${100+s+l}%`,console.log("hasdf"),o.style.left=`${t*-1}%`,o.style.width=`${100+t+n}%`;const b=Array.from(document.querySelectorAll(".box")||[]);for(const a of b)m.observe(a);const v=Array.from(document.querySelectorAll(".intersection-box.intersection-box--top")||[]);for(const a of v){const c=r*100;a.style.height=`${c}%`}const y=Array.from(document.querySelectorAll(".intersection-box.intersection-box--bot")||[]);for(const a of y){const c=r*100;a.style.top=`${100-c}%`}const x=Array.from(document.querySelectorAll(".intersection-box.intersection-box--left")||[]);for(const a of x){const c=r*100;a.style.width=`${c}%`}const $=Array.from(document.querySelectorAll(".intersection-box.intersection-box--right")||[]);for(const a of $){const c=r*100;a.style.width=`${c}%`,a.style.left=`${100-c}%`}}

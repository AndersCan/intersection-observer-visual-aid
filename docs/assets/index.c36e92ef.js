const w=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}};w();function g(t,...n){return t.map((i,r)=>{const o=typeof n[r]!="undefined"?n[r]:"";return`${i}${o}`})}function d(t){return t.join("")}function $(){const t=new URL(location.href).searchParams;return{threshold:Number(t.get("threshold")||0),marginTop:Number(t.get("marginTop")||-20),marginBot:Number(t.get("marginBot")||-20),marginLeft:0,marginRight:0}}function u(t,n=""){if(!t)throw new Error(`assert: ${n} (${t})`)}const a=$(),k={threshold:!1,marginTop:"marginBot",marginBot:"marginTop",marginLeft:"marginRight",marginRight:"marginLeft"},p=document.querySelector("#app"),L=[...Array(12).keys()].slice(1).map(t=>t*10),S=d(L.map(t=>d(g`<div class="block">
        <div class="box box-${t}">
          ${t}vh
          <div class="intersection-box intersection-box--top"></div>
          <div class="intersection-box intersection-box--bot"></div>
        </div>
      </div>`))),T=d(g` <fieldset>
      <legend>Intersection Threshold</legend>
      <input
        type="range"
        value="${a.threshold}"
        min="0"
        max="1"
        step="0.1"
        name="threshold"
        oninput="this.nextElementSibling.value = this.value"
      />
      <output>${a.threshold}</output>
    </fieldset>
    <fieldset>
      <legend>Margin top</legend>
      <input
        type="range"
        value="${a.marginTop}"
        min="-49"
        max="49"
        step="1"
        name="marginTop"
        oninput="this.nextElementSibling.value = this.value + '%'"
      />
      <output>${a.marginTop}%</output>
    </fieldset>

    <fieldset>
      <legend>Margin bottom</legend>
      <input
        type="range"
        value="${a.marginBot}"
        min="-49"
        max="49"
        step="1"
        name="marginBot"
        oninput="this.nextElementSibling.value = this.value+ '%'"
      />
      <output>${a.marginBot}%</output>
    </fieldset>`),A=d(g`<h1>IntersectionObserver visulizer</h1>
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
    <p>Note: Changing margin left and right has not been added</p>`);p.innerHTML=A+T+S;p.addEventListener("change",t=>{const n=t.target,i=n.name,r=Number(n.value),e=k[i],o=document.querySelector(`[name=${e}]`);try{u(e),u(o);const s=Number(o.value);(r+s>=100||r+s<=-100)&&console.warn(`${i} + ${e} is overflowing 100 or -100: setting ${e} to zero`)}catch{}a[i]=r,m(a)});let h;m(a);function m(t){const n=document.querySelector("#floater"),{marginTop:i,marginBot:r,marginLeft:e,marginRight:o,threshold:s}=t;h&&h.disconnect(),h=new IntersectionObserver(l=>{for(const c of l){const v=c.target.classList,y=c.isIntersecting?"add":"remove";v[y]("box--visible")}},{root:null,rootMargin:`${i}% ${o}% ${r}% ${e}%`,threshold:[s]}),n.style.top=`${-i}%`,n.style.height=`${100+r+i}%`;const b=Array.from(document.querySelectorAll(".box")||[]);for(const l of b)h.observe(l);const f=Array.from(document.querySelectorAll(".intersection-box.intersection-box--top")||[]);for(const l of f){const c=s*100;l.style.height=`${c}%`}const x=Array.from(document.querySelectorAll(".intersection-box.intersection-box--bot")||[]);for(const l of x){const c=s*100;l.style.top=`${100-c}%`}}

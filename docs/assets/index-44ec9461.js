(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function l(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=l(t);fetch(t.href,n)}})();function p(e,...o){return e.map((l,s)=>{const n=typeof o[s]<"u"?o[s]:"";return`${l}${n}`})}function u(e){return e.join("")}function A(){const e=new URL(location.href).searchParams;return{threshold:Number(e.get("threshold")||0),time:Number(e.get("time")||0),marginTop:Number(e.get("marginTop")||-20),marginBot:Number(e.get("marginBot")||-20),marginLeft:Number(e.get("marginLeft")||-10),marginRight:Number(e.get("marginRight")||-10)}}function d(e,o=""){if(!e)throw new Error(`assert: ${o} (${e})`)}const r=A(),N={threshold:!1,time:!1,marginTop:"marginBot",marginBot:"marginTop",marginLeft:"marginRight",marginRight:"marginLeft"},g=document.querySelector("#app"),f=[...Array(12).keys()].slice(1).map(e=>e*10);function E(e){return u(p`<div class="flex-row">
      ${u(f.map(()=>O(e)))}
    </div>`)}function O(e){return u(p` <div class="box box-height-${e} box-width-${e}">
      <div class="inner-box"></div>
      <div class="intersection-box intersection-box--top"></div>
      <div class="intersection-box intersection-box--bot"></div>
      <div class="intersection-box intersection-box--left"></div>
      <div class="intersection-box intersection-box--right"></div>
      <span class="box-text">${e}</span>
    </div>`)}const P=u(f.map(e=>E(e))),R=u(p`
    <fieldset>
      <legend>Intersection Threshold</legend>
      <output>${r.threshold}</output>
      <input
        type="range"
        value="${r.threshold}"
        min="0"
        max="1"
        step="0.1"
        name="threshold"
        oninput="this.previousElementSibling.value = this.value"
      />
    </fieldset>
    <fieldset>
      <legend>Margin top</legend>
      <output>${r.marginTop}%</output>
      <input
        type="range"
        value="${r.marginTop}"
        min="-49"
        max="49"
        step="1"
        name="marginTop"
        oninput="this.previousElementSibling.value = this.value + '%'"
      />
    </fieldset>

    <fieldset>
      <legend>Margin right</legend>
      <output>${r.marginRight}%</output>
      <input
        type="range"
        value="${r.marginRight}"
        min="-49"
        max="49"
        step="1"
        name="marginRight"
        oninput="this.previousElementSibling.value = this.value + '%'"
      />
    </fieldset>

    <fieldset>
      <legend>Margin bottom</legend>
      <output>${r.marginBot}%</output>
      <input
        type="range"
        value="${r.marginBot}"
        min="-49"
        max="49"
        step="1"
        name="marginBot"
        oninput="this.previousElementSibling.value = this.value+ '%'"
      />
    </fieldset>

    <fieldset>
      <legend>Margin left</legend>
      <output>${r.marginLeft}%</output>
      <input
        type="range"
        value="${r.marginLeft}"
        min="-49"
        max="49"
        step="1"
        name="marginLeft"
        oninput="this.previousElementSibling.value = this.value + '%'"
      />
    </fieldset>

    <fieldset>
      <legend>Extra: Time in viewport</legend>
      <label>Note: Not part of the IntersectionObserver spec</label>
      <output>${r.time}s</output>
      <input
        type="range"
        value="${r.marginLeft}"
        min="0"
        max="10"
        step="1"
        name="time"
        oninput="this.previousElementSibling.value = this.value + 's'"
      />
    </fieldset>
  `),T=u(p`<h1>IntersectionObserver visualizer</h1>
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
    <p>Note: Changing margin left and right has not been added</p>`);g.innerHTML=T+R+P;g.addEventListener("change",e=>{const o=e.target,l=o.name,s=Number(o.value),t=N[l],n=document.querySelector(`[name=${t}]`);try{d(t),d(n);const i=Number(n.value);(s+i>=100||s+i<=-100)&&console.warn(`${l} + ${t} is overflowing 100 or -100: setting ${t} to zero`)}catch{}r[l]=s,h(r)});let m;h(r);function h(e){const o=document.querySelector("#floater"),{marginTop:l,marginBot:s,marginLeft:t,marginRight:n,threshold:i}=e;m&&m.disconnect(),m=new IntersectionObserver(a=>{for(const c of a){const L=c.target.classList,w=c.isIntersecting?"add":"remove";L[w]("box--visible")}},{root:null,rootMargin:`${l}% ${n}% ${s}% ${t}%`,threshold:[i]});var b=document.documentElement.style;b.setProperty("--duration",`${r.time}s`),o.style.top=`${-l}%`,o.style.height=`${100+s+l}%`,o.style.left=`${t*-1}%`,o.style.width=`${100+t+n}%`;const v=Array.from(document.querySelectorAll(".box")||[]);for(const a of v)m.observe(a);const y=Array.from(document.querySelectorAll(".intersection-box.intersection-box--top")||[]);for(const a of y){const c=i*100;a.style.height=`${c}%`}const x=Array.from(document.querySelectorAll(".intersection-box.intersection-box--bot")||[]);for(const a of x){const c=i*100;a.style.top=`${100-c}%`}const $=Array.from(document.querySelectorAll(".intersection-box.intersection-box--left")||[]);for(const a of $){const c=i*100;a.style.width=`${c}%`}const S=Array.from(document.querySelectorAll(".intersection-box.intersection-box--right")||[]);for(const a of S){const c=i*100;a.style.width=`${c}%`,a.style.left=`${100-c}%`}}

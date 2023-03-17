(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();function g(e,...n){return e.map((o,i)=>{const r=typeof n[i]<"u"?n[i]:"";return`${o}${r}`})}function u(e){return e.join("")}function E(){const e=new URL(location.href).searchParams;return{threshold:Number(e.get("threshold")||0),time:Number(e.get("time")||0),marginTop:Number(e.get("marginTop")||-20),marginBot:Number(e.get("marginBot")||-20),marginLeft:Number(e.get("marginLeft")||-10),marginRight:Number(e.get("marginRight")||-10)}}function d(e,n=""){if(!e)throw new Error(`assert: ${n} (${e})`)}const s=E(),O={threshold:!1,time:!1,marginTop:"marginBot",marginBot:"marginTop",marginLeft:"marginRight",marginRight:"marginLeft"},h=document.querySelector("#app"),b=[...Array(12).keys()].slice(1).map(e=>e*10);function A(e){return u(g`<div class="flex-row">
      ${u(b.map(()=>P(e)))}
    </div>`)}function P(e){return u(g` <div class="box box-height-${e} box-width-${e}">
      <div class="inner-box"></div>
      <div class="intersection-box intersection-box--top"></div>
      <div class="intersection-box intersection-box--bot"></div>
      <div class="intersection-box intersection-box--left"></div>
      <div class="intersection-box intersection-box--right"></div>
      <span class="box-text">${e}</span>
    </div>`)}const R=u(b.map(e=>A(e))),N=u(g`
    <fieldset>
      <legend>Intersection Threshold</legend>
      <output>${s.threshold}</output>
      <input
        type="range"
        value="${s.threshold}"
        min="0"
        max="1"
        step="0.1"
        name="threshold"
        data-unit=" "
        oninput="this.previousElementSibling.value = this.value"
      />
    </fieldset>
    <fieldset>
      <legend>Margin top</legend>
      <output>${s.marginTop}%</output>
      <input
        type="range"
        value="${s.marginTop}"
        min="-49"
        max="49"
        step="1"
        name="marginTop"
        data-unit="%"
        oninput="this.previousElementSibling.value = this.value + this.dataset.unit"
      />
    </fieldset>

    <fieldset>
      <legend>Margin right</legend>
      <output>${s.marginRight}%</output>
      <input
        type="range"
        value="${s.marginRight}"
        min="-49"
        max="49"
        step="1"
        name="marginRight"
        data-unit="%"
        oninput="this.previousElementSibling.value = this.value + this.dataset.unit"
      />
    </fieldset>

    <fieldset>
      <legend>Margin bottom</legend>
      <output>${s.marginBot}%</output>
      <input
        type="range"
        value="${s.marginBot}"
        min="-49"
        max="49"
        step="1"
        name="marginBot"
        data-unit="%"
        oninput="this.previousElementSibling.value = this.value+ '%'"
      />
    </fieldset>

    <fieldset>
      <legend>Margin left</legend>
      <output>${s.marginLeft}%</output>
      <input
        type="range"
        value="${s.marginLeft}"
        min="-49"
        max="49"
        step="1"
        name="marginLeft"
        data-unit="%"
        oninput="this.previousElementSibling.value = this.value + this.dataset.unit"
      />
    </fieldset>

    <fieldset>
      <legend>Extra: Time in viewport</legend>
      <label>Note: Not part of the IntersectionObserver spec</label>
      <output>${s.time}s</output>
      <input
        type="range"
        value="${s.time}"
        min="0"
        max="10"
        step="1"
        name="time"
        data-unit="s"
        oninput="this.previousElementSibling.value = this.value + this.dataset.unit"
      />
    </fieldset>
  `),T=u(g`<h1 class="main-heading">IntersectionObserver visualizer</h1>
    <p>
      Visualization of the
      <a
        class="link"
        href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
        >IntersectionObserver</a
      >. Check
      <a
        class="link"
        href="https://github.com/AndersCan/intersection-observer-visual-aid#readme"
        >the repo for</a
      >
      more info.
    </p> `);h.innerHTML=T+N+R;h.addEventListener("change",e=>{const n=e.target,o=n.name,i=Number(n.value),t=O[o],r=document.querySelector(`[name=${t}]`);try{d(t),d(r);const m=Number(r.value);(i+m>=100||i+m<=-100)&&console.warn(`${o} + ${t} is overflowing 100 or -100: setting ${t} to zero`)}catch{}s[o]=i,f(s);const l=I(location.href,s);history.pushState(s,"",l)});window.addEventListener("popstate",e=>{Object.keys(e.state).forEach(n=>{const o=e.state[n];s[n]=o;const i=document.querySelector(`input[name="${n}"]`);d(i),d(i.dataset.unit),d(i.previousElementSibling),i.value=o,i.previousElementSibling.value=o+i.dataset.unit}),f(s)});let p;f(s);function f(e){const n=document.querySelector("#floater"),{marginTop:o,marginBot:i,marginLeft:t,marginRight:r,threshold:l}=e;p&&p.disconnect(),p=new IntersectionObserver(a=>{for(const c of a){const L=c.target.classList,w=c.isIntersecting?"add":"remove";L[w]("box--visible")}},{root:null,rootMargin:`${o}% ${r}% ${i}% ${t}%`,threshold:[l]});var m=document.documentElement.style;m.setProperty("--duration",`${s.time}s`),n.style.top=`${-o}%`,n.style.height=`${100+i+o}%`,n.style.left=`${t*-1}%`,n.style.width=`${100+t+r}%`;const v=Array.from(document.querySelectorAll(".box")||[]);for(const a of v)p.observe(a);const y=Array.from(document.querySelectorAll(".intersection-box.intersection-box--top")||[]);for(const a of y){const c=l*100;a.style.height=`${c}%`}const x=Array.from(document.querySelectorAll(".intersection-box.intersection-box--bot")||[]);for(const a of x){const c=l*100;a.style.top=`${100-c}%`}const $=Array.from(document.querySelectorAll(".intersection-box.intersection-box--left")||[]);for(const a of $){const c=l*100;a.style.width=`${c}%`}const S=Array.from(document.querySelectorAll(".intersection-box.intersection-box--right")||[]);for(const a of S){const c=l*100;a.style.width=`${c}%`,a.style.left=`${100-c}%`}}function I(e,n){const o=new URL(e),i=q(n);return Object.entries(i).forEach(([t,r])=>{o.searchParams.set(t,r)}),o.toString()}function q(e){return Object.keys(e).reduce((n,o)=>(n[o]=`${e[o]}`,n),{})}

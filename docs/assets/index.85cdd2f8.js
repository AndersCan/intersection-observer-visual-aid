const y=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}};y();function g(o,...n){return o.map((r,i)=>{const t=typeof n[i]!="undefined"?n[i]:"";return`${r}${t}`})}function d(o){return o.join("")}function w(){const o=new URL(location.href).searchParams;return{threshold:Number(o.get("threshold")||0),marginTop:Number(o.get("marginTop")||0),marginBot:Number(o.get("marginBot")||0),marginLeft:0,marginRight:0}}const s=w(),$={threshold:"threshold",marginTop:"marginBot",marginBot:"marginTop",marginLeft:"marginRight",marginRight:"marginLeft"},u=document.querySelector("#app"),S=[...Array(12).keys()].slice(1).map(o=>o*10),k=d(S.map(o=>d(g`<div class="block">
        <div class="box box-${o}">
          ${o}vh
          <div class="intersection-box intersection-box--top"></div>
          <div class="intersection-box intersection-box--bot"></div>
        </div>
      </div>`))),L=d(g` <fieldset>
      <legend>Intersection Threshold</legend>
      <input
        type="range"
        value="${s.threshold}"
        min="0"
        max="1"
        step="0.1"
        name="threshold"
        oninput="this.nextElementSibling.value = this.value"
      />
      <output>${s.threshold}</output>
    </fieldset>
    <fieldset>
      <legend>Margin top</legend>
      <input
        type="range"
        value="${s.marginTop}"
        min="-99"
        max="99"
        step="1"
        name="marginTop"
        oninput="this.nextElementSibling.value = this.value + '%'"
      />
      <output>${s.marginTop}%</output>
    </fieldset>

    <fieldset>
      <legend>Margin bottom</legend>
      <input
        type="range"
        value="${s.marginBot}"
        min="-99"
        max="99"
        step="1"
        name="marginBot"
        oninput="this.nextElementSibling.value = this.value+ '%'"
      />
      <output>${s.marginBot}%</output>
    </fieldset>`),T=d(g`<h1>IntersectionObserver visulizer</h1>
    <p>
      Better understand the
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
        >IntersectionObserver</a
      >
      with this playground.
    </p>
    <p>
      Elements entering and exiting the "virtual viewport" will change
      background color.
    </p>
    <p>
      Change the margin sliders to move the viewport. You can also change the
      threshold slider to decide how much an element must intersect with the
      viewport before being determined as visible.
    </p>
    <p>
      Please note that using a threshold other than 0 will often not work well
      for large elements and small screens/viewports. Set the threshold to 1 and
      scroll to the bottom to see this in action.
      <i>
        (Spoiler: Elements that are larger than the users screen will never
        reach an intersection of 1)</i
      >
    </p>`);u.innerHTML=T+L+k;u.addEventListener("change",o=>{const n=o.target,r=n.name,i=Number(n.value);s[r]=i;const e=$[r],t=document.querySelector(`[name=${e}]`),a=Number(t.value);i+a>=100&&(console.warn(`${r} + ${e} is greater than 100 - setting ${e} to zero`),s[e]=0,t.value="0"),p(s)});let h;p(s);function p(o){const n=document.querySelector("#floater"),{marginTop:r,marginBot:i,marginLeft:e,marginRight:t,threshold:a}=o;h&&h.disconnect(),h=new IntersectionObserver(l=>{for(const c of l){const x=c.target.classList,v=c.isIntersecting?"add":"remove";x[v]("box--visible")}},{root:null,rootMargin:`${r}% ${t}% ${i}% ${e}%`,threshold:[a]}),n.style.top=`${-r}%`,n.style.height=`${100+i+r}%`;const m=Array.from(document.querySelectorAll(".box")||[]);for(const l of m)h.observe(l);const b=Array.from(document.querySelectorAll(".intersection-box.intersection-box--top")||[]);for(const l of b)l.style.height=`${a*100}%`;const f=Array.from(document.querySelectorAll(".intersection-box.intersection-box--bot")||[]);for(const l of f){const c=a*100;l.style.top=`${100-c}%`}}

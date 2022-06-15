const v=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}};v();function d(o,...n){return o.map((r,i)=>{const t=typeof n[i]!="undefined"?n[i]:"";return`${r}${t}`})}function h(o){return o.join("")}const l={intersectionThreshold:0,marginTop:20,marginBot:20,marginLeft:0,marginRight:0},x={intersectionThreshold:"intersectionThreshold",marginTop:"marginBot",marginBot:"marginTop",marginLeft:"marginRight",marginRight:"marginLeft"},u=document.querySelector("#app"),y=[...Array(12).keys()].slice(1).map(o=>o*10),w=h(y.map(o=>h(d`<div class="block">
        <div class="box box-${o}">${o}vh</div>
      </div>`))),$=h(d` <fieldset>
      <legend>Intersection Threshold</legend>
      <input
        type="range"
        value="0"
        min="0"
        max="1"
        step="0.1"
        name="intersectionThreshold"
        oninput="this.nextElementSibling.value = this.value"
      />
      <output>0</output>
    </fieldset>
    <fieldset>
      <legend>Margin top</legend>
      <input
        type="range"
        value="25"
        min="0"
        max="99"
        step="1"
        name="marginTop"
        oninput="this.nextElementSibling.value = this.value"
      />
      <output>25</output>
    </fieldset>

    <fieldset>
      <legend>Margin bottom</legend>
      <input
        type="range"
        value="25"
        min="0"
        max="99"
        step="1"
        name="marginBot"
        oninput="this.nextElementSibling.value = this.value"
      />
      <output>25</output>
    </fieldset>`),k=h(d`<h1>IntersectionObserver visulizer</h1>
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
    </p>`);u.innerHTML=k+$+w;u.addEventListener("change",o=>{const n=o.target,r=n.name,i=Number(n.value);l[r]=i;const e=x[r],t=document.querySelector(`[name=${e}]`),s=Number(t.value);i+s>=100&&(console.warn(`${r} + ${e} is greater than 100 - setting ${e} to zero`),l[e]=0,t.value="0"),m(l)});let a;m(l);function m(o){const n=document.querySelector("#floater"),{marginTop:r,marginBot:i,marginLeft:e,marginRight:t,intersectionThreshold:s}=o;a&&a.disconnect(),a=new IntersectionObserver(c=>{for(const g of c){const f=g.target.classList,b=g.isIntersecting?"add":"remove";f[b]("box--visible")}},{root:null,rootMargin:`-${r}% ${t}% -${i}% ${e}%`,threshold:[s]}),n.style.top=`${r}%`,n.style.height=`${100-i-r}%`;const p=Array.from(document.querySelectorAll(".box")||[]);for(const c of p)a.observe(c)}

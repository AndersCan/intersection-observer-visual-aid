import "./reset.css";
import "./style.css";
import "./box.scss";
import "./floating-viewport.scss";

import { html, render } from "./helpers";
import { getInitialState } from "./get-initial-state";
import { assert } from "./assert";

export interface StateProps {
  threshold: number;
  time: number;
  marginTop: number;
  marginBot: number;
  marginLeft: number;
  marginRight: number;
}

const state = getInitialState();

const oppositeMap = {
  threshold: false,
  time: false,
  marginTop: "marginBot",
  marginBot: "marginTop",
  marginLeft: "marginRight",
  marginRight: "marginLeft",
} as const;

const app = document.querySelector<HTMLDivElement>("#app")!;
const sizes = [...Array(12).keys()].slice(1).map((key) => {
  return key * 10;
});

function renderRow(size: number) {
  return render(
    html`<div class="flex-row">
      ${render(
        sizes.map(() => {
          return renderBox(size);
        })
      )}
    </div>`
  );
}

function renderBox(size: number) {
  return render(
    html` <div class="box box-height-${size} box-width-${size}">
      <div class="inner-box"></div>
      <div class="intersection-box intersection-box--top"></div>
      <div class="intersection-box intersection-box--bot"></div>
      <div class="intersection-box intersection-box--left"></div>
      <div class="intersection-box intersection-box--right"></div>
      <span class="box-text">${size}</span>
    </div>`
  );
}

const boxes = render(
  sizes.map((size) => {
    return renderRow(size);
  })
);

const formHtml = render(
  html`
    <fieldset>
      <legend>Intersection Threshold</legend>
      <output>${state.threshold}</output>
      <input
        type="range"
        value="${state.threshold}"
        min="0"
        max="1"
        step="0.1"
        name="threshold"
        oninput="this.previousElementSibling.value = this.value"
      />
    </fieldset>
    <fieldset>
      <legend>Margin top</legend>
      <output>${state.marginTop}%</output>
      <input
        type="range"
        value="${state.marginTop}"
        min="-49"
        max="49"
        step="1"
        name="marginTop"
        oninput="this.previousElementSibling.value = this.value + '%'"
      />
    </fieldset>

    <fieldset>
      <legend>Margin right</legend>
      <output>${state.marginRight}%</output>
      <input
        type="range"
        value="${state.marginRight}"
        min="-49"
        max="49"
        step="1"
        name="marginRight"
        oninput="this.previousElementSibling.value = this.value + '%'"
      />
    </fieldset>

    <fieldset>
      <legend>Margin bottom</legend>
      <output>${state.marginBot}%</output>
      <input
        type="range"
        value="${state.marginBot}"
        min="-49"
        max="49"
        step="1"
        name="marginBot"
        oninput="this.previousElementSibling.value = this.value+ '%'"
      />
    </fieldset>

    <fieldset>
      <legend>Margin left</legend>
      <output>${state.marginLeft}%</output>
      <input
        type="range"
        value="${state.marginLeft}"
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
      <output>${state.time}s</output>
      <input
        type="range"
        value="${state.marginLeft}"
        min="0"
        max="10"
        step="1"
        name="time"
        oninput="this.previousElementSibling.value = this.value + 's'"
      />
    </fieldset>
  `
);
const description = render(
  html`<h1>IntersectionObserver visualizer</h1>
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
    <p>Note: Changing margin left and right has not been added</p>`
);

app.innerHTML = description + formHtml + boxes;

app.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;
  const name = target.name as keyof StateProps;
  const value = Number(target.value);

  const oppositeKey = oppositeMap[name];
  const oppositeEl = document.querySelector(
    `[name=${oppositeKey}]`
  ) as HTMLInputElement;

  try {
    assert(oppositeKey);
    assert(oppositeEl);

    const oppositeValue = Number(oppositeEl.value);
    if (value + oppositeValue >= 100 || value + oppositeValue <= -100) {
      console.warn(
        `${name} + ${oppositeKey} is overflowing 100 or -100: setting ${oppositeKey} to zero`
      );
    }
  } catch (err) {
    // its ok
  }

  state[name] = value;
  observe(state);
});

let io: IntersectionObserver | undefined = undefined;

observe(state);
function observe(props: StateProps) {
  const floater = document.querySelector<HTMLDivElement>("#floater")!;

  const { marginTop, marginBot, marginLeft, marginRight, threshold } = props;

  if (io) {
    io.disconnect();
  }

  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const classList = entry.target.classList;
        const addOrRemove = entry.isIntersecting ? "add" : "remove";
        classList[addOrRemove]("box--visible");
      }
    },
    {
      root: null,
      rootMargin: `${marginTop}% ${marginRight}% ${marginBot}% ${marginLeft}%`,
      threshold: [threshold],
    }
  );

  var style = document.documentElement.style;
  style.setProperty("--duration", `${state.time}s`);

  // top is equal to `top`
  floater.style.top = `${-marginTop}%`;
  // height
  floater.style.height = `${100 + marginBot + marginTop}%`;

  floater.style.left = `${marginLeft * -1}%`;
  floater.style.width = `${100 + marginLeft + marginRight}%`;

  // const boxes = Array.from(document.querySelectorAll(".box-110") || []);
  const boxes = Array.from(document.querySelectorAll(".box") || []);
  for (const box of boxes) {
    io.observe(box);
  }

  const interSectionboxesTop = Array.from(
    document.querySelectorAll(".intersection-box.intersection-box--top") || []
  ) as HTMLDivElement[];

  for (const box of interSectionboxesTop) {
    const tPercent = threshold * 100;
    box.style.height = `${tPercent}%`;
  }

  const interSectionboxesBot = Array.from(
    document.querySelectorAll(".intersection-box.intersection-box--bot") || []
  ) as HTMLDivElement[];

  for (const box of interSectionboxesBot) {
    const tPercent = threshold * 100;
    box.style.top = `${100 - tPercent}%`;
  }

  const interSectionboxesLeft = Array.from(
    document.querySelectorAll(".intersection-box.intersection-box--left") || []
  ) as HTMLDivElement[];

  for (const box of interSectionboxesLeft) {
    const tPercent = threshold * 100;
    box.style.width = `${tPercent}%`;
  }

  const interSectionboxesRight = Array.from(
    document.querySelectorAll(".intersection-box.intersection-box--right") || []
  ) as HTMLDivElement[];

  for (const box of interSectionboxesRight) {
    const tPercent = threshold * 100;
    box.style.width = `${tPercent}%`;
    box.style.left = `${100 - tPercent}%`;
  }
}

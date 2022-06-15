import "./reset.css";
import "./style.css";
import "./box.scss";
import "./floating-viewport.scss";

import { html, render } from "./helpers";

const state: ObserveProps = {
  intersectionThreshold: 0,
  marginTop: 20,
  marginBot: 20,
  marginLeft: 0,
  marginRight: 0,
};

const oppositeMap = {
  intersectionThreshold: "intersectionThreshold",
  marginTop: "marginBot",
  marginBot: "marginTop",
  marginLeft: "marginRight",
  marginRight: "marginLeft",
} as const;

const app = document.querySelector<HTMLDivElement>("#app")!;
const heights = [...Array(12).keys()].slice(1).map((key) => {
  return key * 10;
});

const boxes = render(
  heights.map((height) => {
    return render(
      html`<div class="block">
        <div class="box box-${height}">${height}vh</div>
      </div>`
    );
  })
);

const formHtml = render(
  html` <fieldset>
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
    </fieldset>`
);
const description = render(
  html`<h1>IntersectionObserver visulizer</h1>
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
    </p>`
);

app.innerHTML = description + formHtml + boxes;

app.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;
  const name = target.name as keyof ObserveProps;
  const value = Number(target.value);

  state[name] = value;

  const oppositeKey = oppositeMap[name];
  const opposite = document.querySelector(
    `[name=${oppositeKey}]`
  ) as HTMLInputElement;

  const oppositeValue = Number(opposite.value);
  if (value + oppositeValue >= 100) {
    console.warn(
      `${name} + ${oppositeKey} is greater than 100 - setting ${oppositeKey} to zero`
    );
    state[oppositeKey] = 0;
    opposite.value = "0";
  }

  observe(state);
});

interface ObserveProps {
  intersectionThreshold: number;
  marginTop: number;
  marginBot: number;
  marginLeft: number;
  marginRight: number;
}
let io: IntersectionObserver | undefined = undefined;

observe(state);
function observe(props: ObserveProps) {
  const floater = document.querySelector<HTMLDivElement>("#floater")!;

  const {
    marginTop,
    marginBot,
    marginLeft,
    marginRight,
    intersectionThreshold,
  } = props;

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
      rootMargin: `-${marginTop}% ${marginRight}% -${marginBot}% ${marginLeft}%`,
      threshold: [intersectionThreshold],
    }
  );
  // top is equal to `-top`
  floater.style.top = `${marginTop}%`;
  // height
  floater.style.height = `${100 - marginBot - marginTop}%`;

  // const boxes = Array.from(document.querySelectorAll(".box-110") || []);
  const boxes = Array.from(document.querySelectorAll(".box") || []);
  for (const box of boxes) {
    io.observe(box);
  }
}
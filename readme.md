# intersection-observer-visual-aid

Playground for visualising what the IntersectionObserver is doing. Created to highlight the issues shown under [examples](#examples)

➡️ [Playground](https://anderscan.github.io/intersection-observer-visual-aid/?marginTop=-40&marginBot=-40&threshold=0.2)

## Basics

> You should have a general understanding of what the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) does, but you might be fine reading just this.

In most cases, the `IntersectionObserver` is used to tell us when an element is in the viewport. The default behaviour is to report an element as visible when just `1px` of an element is visible. This is often not what we want, so we have to tweak what should be determined as "visible".

We do this by changing the `threshold` and the `rootMargin` options [(docs)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#rootmargin)

## Playground

![screenshot of playground](/screenshot.png)

The playground contains a _"virtual viewport"_ that can be changed by modifying the margins. Positive margins increase the size while negative reduce.

The box elements that enter the virtual viewport, after scrolling, will change background color to signal that they are now visible.

By changing the `threshold` we can decide how much of an element must be within the viewport before being visible. This area is shown on the boxes as _grayed out_. A threshold of 1 requires the entire element to be inside the viewport.

## Examples

- [Default values](https://anderscan.github.io/intersection-observer-visual-aid/?marginTop=0&marginBot=0&threshold=0)
  Shows the `IntersectionObserver` with default values. Here an element with `1px` inside the viewport is considered visible.

- [Small viewport with high threshold](https://anderscan.github.io/intersection-observer-visual-aid/?marginTop=-40&marginBot=-40&threshold=1)
  See what happens when we have a small viewport with max threshold
  > Spoiler: Elements that are larger than the viewport will never reach an intersection of 1.

## Support & bug reports

Spot a bug or require support? [Please comment here.](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

const floatingShapes = document.querySelectorAll(".gradient-shape");

export function initHeroAnimation() {
  if (!floatingShapes.length) {
    return;
  }

  floatingShapes.forEach((shape, index) => {
    const amplitude = 20 + index * 5;
    const duration = 8000 + index * 1200;

    setInterval(() => {
      shape.animate(
        [
          { transform: "translateY(0px)", opacity: 0.8 },
          { transform: `translateY(-${amplitude}px)`, opacity: 1 },
          { transform: "translateY(0px)", opacity: 0.8 }
        ],
        {
          duration,
          iterations: 1,
          easing: "ease-in-out"
        }
      );
    }, duration);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimation();
});

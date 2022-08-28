import { World } from './world/World';

function main() {
  const container = document.querySelector<HTMLElement>("#root");
  if (!container)
    throw new Error("Root not found!");
  const world = new World(container);

  window.addEventListener('resize', world.onResize.bind(world), false)

  function animate () {
    requestAnimationFrame(animate);
    world.update();
    world.render();
  }

  window.addEventListener("keydown", (ev) => {
    world.keydown(ev.key);
  })
  world.onResize();
  animate();
}

main();
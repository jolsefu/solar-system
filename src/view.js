import { gsap } from "gsap";

import presets from "./presets.json";

camera = document.querySelector("#camera").object3D;

export function animateCameraToStart() {
  gsap.to(camera.position, {
    x: presets.sideview.position.x,
    y: presets.sideview.position.y,
    z: presets.sideview.position.z,
    duration: 2,
    ease: "power3.out",
  });
}

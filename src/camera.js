import { gsap } from "gsap";

import presets from "./presets.json";

document.addEventListener("DOMContentLoaded", addListeners);


camera = document.querySelector("#camera").object3D;

function addListeners() {
  document.querySelector("#start-btn").onclick = () => {

    document.querySelector(".main-menu").style.display = "none";

    animateCameraToStart();
  }
}

function animateCameraToStart() {
  gsap.to(camera.position, {
    x: presets.sideview.position.x,
    y: presets.sideview.position.y,
    z: presets.sideview.position.z,
    duration: 2,
    ease: "power3.out",
  });
}

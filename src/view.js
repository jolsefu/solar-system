import { gsap } from "gsap";

import presets from "./presets.json";

const cameraEl = document.querySelector("#camera");
const camera = cameraEl.object3D;



function animateCamera(camera, preset) {
  /**
   *
   * For animating the camera to a certain positon w/ rotation.
   *
   */

  // For camera rotation
  // const camera = document.querySelector("#camera");
  // camera.addEventListener("loaded", () => {
  //   let pitch = -90;
  //   let yaw = 0;

  //   camera.components['look-controls'].pitchObject.rotation.set((Math.PI / 180) * pitch, 0, 0);
  //   camera.components['look-controls'].yawObject.rotation.set(0, (Math.PI / 180) * yaw, 0);
  // });

  // POSITION
  gsap.to(camera.position, {
    x: preset.position.x,
    y: preset.position.y,
    z: preset.position.z,
    duration: 2,
    ease: "power3.out",
  });

  // ROTATION

  // Camera's pitch (along the vertical axis)
  gsap.to(cameraEl.components["look-controls"].pitchObject.rotation, {
    x: (Math.PI / 180) * preset.rotation.pitch,
    y: 0,
    z: 0,
    duration: 2,
    ease: "power3.out",
  });

  // Camera's yaw (along the horizontal axis)
  gsap.to(cameraEl.components["look-controls"].yawObject.rotation, {
    x: 0,
    y: (Math.PI / 180) * preset.rotation.yaw,
    z: 0,
    duration: 2,
    ease: "power3.out",
  });
}

export function animateCameraToStart() {
  animateCamera(camera, presets.sideview);
}

export function animateCameraToBirdView() {
  animateCamera(camera, presets.birdview);
}

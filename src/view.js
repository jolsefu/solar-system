import { gsap } from "gsap";

import presets from "./presets.json";

const cameraEl = document.querySelector("#camera");
const camera = cameraEl.object3D;


// cameraEl.setAttribute('look-controls', {enabled: false});


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

export function animateCameraToDefault() {
  animateCamera(camera, presets.default);
}

export function animateCameraToSideView() {
  animateCamera(camera, presets.sideview);
}

export function animateCameraToTopView() {
  animateCamera(camera, presets.topview);
}

let trackingPlanet = null;
let trackingAnimation = null;

export function trackPlanet(planetId) {
  /**
   *
   * Track planet by using GSAP's ticker
   *
   */


  // Stop any existing tracking
  if (trackingAnimation) {
    gsap.ticker.remove(trackingAnimation);
    trackingAnimation = null;
  }

  const planetEl = document.querySelector(`#${planetId}`);
  if (!planetEl) {
    console.error(`Planet ${planetId} not found`);
    return;
  }

  trackingPlanet = planetEl.object3D;

  // Function to update camera position to follow planet
  function updateCameraTracking() {
    if (!trackingPlanet) return;

    const planetPos = new THREE.Vector3();
    trackingPlanet.getWorldPosition(planetPos);

    // Calculate offset for camera (distance from planet)
    const cameraPos = new THREE.Vector3(
      planetPos.x,
      planetPos.y + 20,
      planetPos.z
    );

    // Animate camera to new position
    gsap.to(camera.position, {
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      duration: 0.1,
      ease: "none",
    });

    // Look directly down at the planet's position
    const pitch = -90;
    gsap.to(cameraEl.components["look-controls"].pitchObject.rotation, {
      x: (Math.PI / 180) * pitch,
      duration: 0.1,
      ease: "none",
    });
  }

  // Use GSAP ticker to update every frame
  trackingAnimation = gsap.ticker.add(updateCameraTracking);
}

export function stopTrackingPlanet() {
  /**
   *
   * For stoping the function to track a planet
   * after clicking another camera preset or
   * planet button.
   *
   */

  if (trackingAnimation) {
    gsap.ticker.remove(trackingAnimation);
    trackingAnimation = null;
  }

  trackingPlanet = null;
}

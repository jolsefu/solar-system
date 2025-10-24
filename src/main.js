import "aframe";
import * as view from "./view.js";



document.addEventListener("DOMContentLoaded", start);



function start() {
  /**
   *
   * Code to run after DOM has been loaded.
   * - addListeners(): Add listeners for each button of the UI.
   * - addCameraListeners(): Add listeners for each button inside the
   * camera preset view dropdown.
   * - addPlanetListeners(): Add listeners for each planet button in
   * the dropdown.
   * - addPlanetToggleListener(): Add listener for each "Go to [ Planet ]" button.
   * - enableCameraDebug(): For debugging the camera's position and rotation.
   * - restorePlanetState(): For restoring the previous state after clicking the
   * "Back to Solar System" button.
   *
   */


  addListeners();
  addCameraListeners();
  addPlanetListeners();
  addPlanetToggleListener();
  enableCameraDebug();
  restorePlanetState();
}

function addListeners() {
  /**
   *
   * Listeners for each main UI menu buttons.
   *
   */


  // Start button
  const start_btn = document.querySelector("#start-btn");
  start_btn.addEventListener("click", beginDefaultState);

  // Sidebar toggle
  const sidebar = document.querySelector("#sidebar");
  const sidebarToggle = document.querySelector("#sidebar-toggle");

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    sidebarToggle.classList.toggle("sidebar-open");
  });
}

function addCameraListeners() {
  /**
   *
   * Listeners for every camera preset inside
   * the sidebar menu.
   *
   */

  // Views dropdown
  const viewsBtn = document.querySelector("#views-dropdown-btn");
  const viewsDropdown = document.querySelector("#views-dropdown");

  viewsBtn.addEventListener("click", () => {
    viewsDropdown.classList.toggle("open");
  });

  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const viewName = btn.dataset.view;

      view.stopTrackingPlanet();

      view.animateCameraTo(viewName);
    });
  });
}

function addPlanetListeners() {
  /**
   *
   * Listeners for each planet's button inside
   * the sidebar menu.
   *
   */

  // Planets dropdown
  const planetsBtn = document.querySelector("#planets-dropdown-btn");
  const planetsDropdown = document.querySelector("#planets-dropdown");

  planetsBtn.addEventListener("click", () => {
    planetsDropdown.classList.toggle("open");
  });

  // Planet button handlers
  document.querySelectorAll(".planet-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const planet = btn.dataset.planet;

      // Start tracking the selected planet
      view.trackPlanet(planet);
    });
  });
}

function addPlanetToggleListener() {
  /**
   *
   * Listener for the "Go to [Planet]" button that appears
   * when tracking a planet
   *
   */

  const planetToggle = document.querySelector("#planet-toggle");
  let currentPlanet = null;

  // Update currentPlanet when a planet button is clicked
  document.querySelectorAll(".planet-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPlanet = btn.dataset.planet;
    });
  });

  planetToggle.addEventListener("click", () => {
    if (currentPlanet) {
      // Save the current planet state before navigating
      localStorage.setItem('trackingPlanet', currentPlanet);

      // Navigate to the planet's environment page
      window.location.href = `/planets/${currentPlanet}.html`;
    }
  });
}

/**
 *
 * Main UI Functions
 *
 */

function beginDefaultState() {
  /**
   *
   * Enable the start of the program.
   * - Go to default camera view.
   * - Hide main menu and show sidebar.
   *
   */


  const main_menu = document.querySelector(".main-menu");
  const sidebar = document.querySelector("#sidebar");
  const sidebarToggle = document.querySelector("#sidebar-toggle");

  main_menu.style.display = "none";
  sidebar.classList.toggle("open");

  sidebarToggle.style.display = "flex";
  sidebarToggle.classList.toggle("sidebar-open");
}

function restorePlanetState() {
  /**
   *
   * Restore the planet tracking state when returning
   * from a planet environment page
   *
   */

  const trackingPlanet = localStorage.getItem('trackingPlanet');

  if (trackingPlanet) {
    // Hide main menu and show sidebar
    const main_menu = document.querySelector(".main-menu");
    const sidebar = document.querySelector("#sidebar");
    const sidebarToggle = document.querySelector("#sidebar-toggle");

    main_menu.style.display = "none";
    sidebar.classList.add("open");
    sidebarToggle.style.display = "flex";
    sidebarToggle.classList.add("sidebar-open");

    // Wait for A-Frame scene to be loaded
    const scene = document.querySelector('a-scene');
    if (scene.hasLoaded) {
      view.trackPlanet(trackingPlanet);
    } else {
      scene.addEventListener('loaded', () => {
      view.trackPlanet(trackingPlanet);
      });
    }

    // Clear the stored state
    localStorage.removeItem('trackingPlanet');
  }
}

/**
 *
 * Debug Functions
 *
 */

function enableCameraDebug() {
  /**
   *
   * Enable debug mode that prints camera position and rotation
   * whenever the camera moves
   *
   */

  const cameraEl = document.querySelector("#camera");

  // Wait for camera to be loaded
  cameraEl.addEventListener("loaded", () => {
    const camera = cameraEl.object3D;
    const lookControls = cameraEl.components["look-controls"];

    let lastPosition = { x: 0, y: 0, z: 0 };
    let lastRotation = { pitch: 0, yaw: 0 };

    // Check camera state every frame
    setInterval(() => {
      const currentPos = camera.position;
      const pitchRad = lookControls.pitchObject.rotation.x;
      const yawRad = lookControls.yawObject.rotation.y;

      // Convert radians to degrees
      const pitch = pitchRad * (180 / Math.PI);
      const yaw = yawRad * (180 / Math.PI);

      // Check if position or rotation changed (with small threshold to avoid noise)
      const posChanged =
        Math.abs(currentPos.x - lastPosition.x) > 0.01 ||
        Math.abs(currentPos.y - lastPosition.y) > 0.01 ||
        Math.abs(currentPos.z - lastPosition.z) > 0.01;

      const rotChanged =
        Math.abs(pitch - lastRotation.pitch) > 0.1 ||
        Math.abs(yaw - lastRotation.yaw) > 0.1;

      if (posChanged || rotChanged) {
        console.log("Camera Debug:");
        console.log(`  Position: x=${currentPos.x.toFixed(2)}, y=${currentPos.y.toFixed(2)}, z=${currentPos.z.toFixed(2)}\n  Rotation: pitch=${pitch.toFixed(2)}°, yaw=${yaw.toFixed(2)}°`);
        console.log("---");

        // Update last known values
        lastPosition = { x: currentPos.x, y: currentPos.y, z: currentPos.z };
        lastRotation = { pitch, yaw };
      }
    }, 100); // Check every 100ms
  });
}

// Make a planet clickable
// AFRAME.registerComponent("clickable", {
//   init: function () {
//     this.el.addEventListener("click", function (event) {
//       console.log("Entity clicked!", event.target);
//     });
//   },
// });

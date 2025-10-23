import "aframe";
import * as view from "./view.js";



document.addEventListener("DOMContentLoaded", start);



function start() {
  /**
   *
   * Code to run after DOM has been loaded.
   * - addListeners(): Add listeners for each button of the UI.
   *
   */


  addListeners();
  addCameraListeners();
  addPlanetListeners();
  addPresetListeners();
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

  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const viewName = btn.dataset.view;

      view.stopTrackingPlanet();

      if (viewName === "default") {
        view.animateCameraToDefault();
      } else if (viewName === "sideview") {
        view.animateCameraToSideView();
      } else if (viewName === "topview") {
        view.animateCameraToTopView();
      }
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

function addPresetListeners() {
  /**
   *
   * Listeners for each button inside
   * the camera presets section of the sidebar.
   *
   */

  // Views dropdown
  const viewsBtn = document.querySelector("#views-dropdown-btn");
  const viewsDropdown = document.querySelector("#views-dropdown");

  viewsBtn.addEventListener("click", () => {
    viewsDropdown.classList.toggle("open");
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


// Make a planet clickable
// AFRAME.registerComponent("clickable", {
//   init: function () {
//     this.el.addEventListener("click", function (event) {
//       console.log("Entity clicked!", event.target);
//     });
//   },
// });

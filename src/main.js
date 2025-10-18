import "aframe";
import "aframe-html-shader";

import * as view from "./view.js";

document.addEventListener("DOMContentLoaded", addListeners);

AFRAME.registerComponent("clickable", {
  init: function () {
    this.el.addEventListener("click", function (event) {
      console.log("Entity clicked!", event.target);
    });
  },
});

function addListeners() {
  document.querySelector("#start-btn").onclick = () => {

    document.querySelector(".main-menu").style.display = "none";

    view.animateCameraToStart();
  }
}

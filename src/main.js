import "aframe";
import "aframe-html-shader";

AFRAME.registerComponent("clickable", {
  init: function () {
    this.el.addEventListener("click", function (event) {
      console.log("Entity clicked!", event.target);
    });
  },
});

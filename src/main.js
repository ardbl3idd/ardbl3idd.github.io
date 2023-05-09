import { createApp } from "vue";
import "animate.css";
import App from "./App.vue";
import "./assets/main.css";
import "animate.css";
createApp(App).mount("#app");
// function previewFile(input) {
//   var file = $("input[type=file]").get(0).files[0];

//   if (file) {
//     var reader = new FileReader();

//     reader.onload = function () {
//       $("#previewImg").attr("src", reader.result);
//     };

//     reader.readAsDataURL(file);
//   }
// }

import html2canvas from "html2canvas";
function download(url) {
  var a = $("<a style='display:none' id='js-downloder'>")
    .attr("href", url)
    .attr("download", "zdjecie_profilowe.png")
    .appendTo("body");

  a[0].click();

  a.remove();
}

function saveCapture(element) {
  html2canvas(element).then(function (canvas) {
    download(canvas.toDataURL("image/png"));
  });
}

$("#btnDownload").click(function () {
  var element = document.querySelector("#filter");
  saveCapture(element);
});

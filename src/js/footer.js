import $ from "jquery";
import "@/less/footer.less";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../img/timg.jpg";
$(function () {
  let footer = `<footer> 底部@copy
  <img src=${img} /></footer>`;

  $("body").append(footer);
  console.log("footer", 22222);
});

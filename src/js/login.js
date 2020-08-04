import $ from "jquery";
import "@/less/login.less";

$(function () {
  $("#login").click(() => {
    $.ajax({
      type: "POST",
      url: "/api/token",
      data: {
        grant_type: "password",
        username: $("#username").val(),
        password: $("#password").val(),
      },
      success: function (res) {
        localStorage.access_token = res.access_token;
        location.href = "/index.html";
      },
    });
  });
});

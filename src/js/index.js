import "./header.js";
import "./footer.js";
import $ from "jquery";

$(function () {
  //   $("header").load("/header.html");
  // $("footer").load("/footer.html");
  $(".addTable").click(() => {});
  $(".collapse").collapse();
  $.ajax({
    type: "get",
    url: "/api/api/check_qas/getcheck_qas?searchKey=&cancel_flg=true",
    data: {},
    beforeSend: function (XMLHttpRequest) {
      XMLHttpRequest.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.access_token}`
      );
    },
    success: function (res) {
      console.log(res);
    },
  });
});

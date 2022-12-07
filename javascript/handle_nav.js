// document.addEventListener("DOMContentLoaded", () => {
//   const nav = document.querySelector("nav");
//   if ((nav.className = "hide")) return (nav.className = "display");
//   nav.className = "hide";
// });
const log_user_out = () => {
  document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  // document.cookie = "is_active=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "/login.html";
};
//

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector(".harmburger_container").onclick = () => {
    const nav = document.querySelector("nav");
    if ((nav.className = "hide")) return (nav.className = "display");
    nav.className = "hide";
  };

  document.querySelector(".hide_container").onclick = () => {
    document.querySelector("nav").className = "hide";
  };



  document.querySelector(".user_icon_drop_low_btn").onclick=()=>{
    if(document.querySelector(".box-container.hide")){
      document.querySelector("#box-container").className =
        "box-container display";
    }else{
       document.querySelector("#box-container").className =
         "box-container hide";
    }
  };

   document.querySelector("#logout").onclick = () => log_user_out();

});

const look_for_admin = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "/admin";
};

// let user_is_active = look_for_user("is_active");
// if (user_is_active != "true") {
//   if (window.location.href.includes("inactive.html")) {
//   } else {
//     window.location.href = "/inactive.html";
//   }

//   // }
// }

((cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return look_for_admin("admin");
      // return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "/admin";
})("admin_token");

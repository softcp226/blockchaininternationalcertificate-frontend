// const fetch_user = async (data) => {
//   try {
//     const response = await fetch("/api/user/fetch", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     alert(error.message);
//   }
// };

const setText = (user) => {
  document.querySelectorAll("#user_icon").forEach((passport) => {
    passport.src = user.Passport;
  });
  document.querySelector("#user_name_txt").innerHTML = `${user.Name.substring(
    0,
    user.Name.indexOf(" "),
  )}...`;

  document.querySelector(".bal").innerHTML = `$${user.balance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
};

const getCookie = (cname) => {
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
  window.location.href = "/login.html";
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/user/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
    } else {
      setText(result.message);
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
})();

const show_input_error = (input) => (input.style.border = "2px solid red");

function setCookie(admin, token) {
  // alert("called")
  console.log(admin);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `admin=${admin} ; ${expires}`;
  document.cookie = `admin_token=${token} ; ${expires}`;
   window.location.replace("/admin/dashboard.html");
}

const handle_admin_login = async (form) => {
  document.querySelector("#submit").innerHTML = "proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/admin/login",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#submit").innerHTML = "Try Again";
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      return;
    }
    document.querySelector("#submit").innerHTML = "Success";
    setCookie(result.message.admin, result.token);
  } catch (error) {
    document.querySelector("#submit").innerHTML = "Try Again";
    document.querySelector("#errMessage").innerHTML = error.message;
  }
};



document.querySelector("#submit").onclick = () => {
    // 
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  if (!email.value) return show_input_error(email);
  if (!password.value) return show_input_error(password);
  event.preventDefault();
  handle_admin_login({Email:email.value,Password:password.value})
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "2px solid #eee";
    input.style.backgroundColor = "#eee";
    document.querySelector("#errMessage").innerHTML = "";
  };
});

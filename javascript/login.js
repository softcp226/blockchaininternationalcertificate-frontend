function setCookie(user, token) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token=${token} ; ${expires}`;
  let navigate;
  const params = new URLSearchParams(window.location.search);
  for (const param of params) {
    navigate = param[0];
  }
  if (navigate) return window.location.replace(navigate);
  window.location.replace("/dashboard.html");
}
const show_input_error = (input) => (input.style.border = "2px solid red");
const handle_submitform = async (data) => {
  document.querySelector("#submit").value = "proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalexchange.glitch.me/api/user/login",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#submit").value = "Try Again";
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      return;
    }
    document.querySelector("#submit").value = "Success";
    setCookie(result.message.user, result.token);
  } catch (error) {
    document.querySelector("#submit").value = "Try Again";
    document.querySelector("#errMessage").innerHTML = error.message;
  }
};

document.querySelector("#submit").onclick = () => {
  event.preventDefault();
  const Email = document.querySelector("#email");

  const Password = document.querySelector("#password");

  if (!Email.value) return show_input_error(Email);

  if (!Password.value) return show_input_error(Password);
  if (Password.value.length < 8) {
    document.querySelector("#errMessage").innerHTML =
      "password must be atleast 8 characters long";
    show_input_error(Password);
    return;
  }
  handle_submitform({ Email: Email.value, Password: Password.value });
};

document.querySelectorAll("input").forEach((input) => {
  input.onchange = () => {
    input.style.border = "2px solid #eee";
    input.style.backgroundColor = "#eee";
    document.querySelector("#errMessage").innerHTML = "";

    document.querySelectorAll("input").forEach((input) => {
      input.style.border = "1px solid #ebebeb";
    });
  };
});

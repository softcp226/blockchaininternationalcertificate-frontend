function setCookie(user, token) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token=${token} ; ${expires}`;
  // let navigate;
  // const params = new URLSearchParams(window.location.search);
  // for (const param of params) {
  //   navigate = param[0];
  // }
  // if (navigate) return window.location.replace(navigate);
  window.location.replace("/dashboard.html");
}

const handle_formSubmit = async (formdata) => {
  document.querySelector("#submit").value = "Proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/newUser/register",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formdata),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").value = "Try Again";
      return;
    }
    document.querySelector("#submit").value = "Success";
    setCookie(result.message.user, result.token);
  } catch (error) {
    document.querySelector("#submit").innerHTML = "Try again";
    document.querySelector("#errMessage").value = error.message;
  }
};

const show_input_error = (input) => (input.style.border = "2px solid red");
document.querySelector("#submit").onclick = () => {
  event.preventDefault();

  const Name = document.querySelector("#name");
  const Email = document.querySelector("#email");
  // const Photo = document.querySelector("#photo");
  const Password = document.querySelector("#password");
  const Re_password = document.querySelector("#re_password");

  if (!Name.value) return show_input_error(Name);
  if (!Email.value) return show_input_error(Email);
  // if (!Photo.files[0]) return show_input_error(Photo);
  if (!Password.value) return show_input_error(Password);
  if (Password.value.length < 8) {
    document.querySelector("#errMessage").innerHTML =
      "password must be atleast 8 characters long";
    show_input_error(Password);
    return;
  }

  if (!Re_password.value) return show_input_error(Re_password);
  if (Password.value != Re_password.value) {
    show_input_error(Password);
    show_input_error(Re_password);
    document.querySelector("#errMessage").innerHTML = "password must match";
    return;
  }

  // const formdata = new FormData();
  // formdata.append("Name", Name.value);
  // formdata.append("Email", Email.value);
  // // formdata.append("Photo", Photo.files[0]);
  // formdata.append("Password", Password.value);

  // handle_formSubmit(formdata);
  handle_formSubmit({ Name: Name.value, Email:Email.value,Password:Password.value});
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

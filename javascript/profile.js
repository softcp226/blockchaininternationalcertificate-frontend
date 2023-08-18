const handle_updateuser = async (form) => {
  //   console.log(form);
  document.querySelector("#update").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/user/update",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      document.querySelector("#update").innerHTML = "Try Again";
      return;
    }
    document.querySelector("#update").innerHTML = "Success";
    // setCookie(result.message.user, result.token);
  } catch (error) {
    document.querySelector("#update").innerHTML = "Try again";
    document.querySelector("#errMessage").innerHTML = error.message;
  }
};

const updatepassword = async (form) => {
  //   console.log(form);
  document.querySelector("#change").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/user/update/update_password",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage2").innerHTML = result.errMessage;
      document.querySelector("#change").innerHTML = "Try Again";
      return;
    }
    document.querySelector("#change").innerHTML = "Success";
    // setCookie(result.message.user, result.token);
  } catch (error) {
    document.querySelector("#change").innerHTML = "Try again";
    document.querySelector("#errMessage2").innerHTML = error.message;
  }
};
const show_input_error = (input) => (input.style.border = "2px solid red");

const setText = (user) => {
  //   alert("called");
  document.querySelector("#name").value = user.Name;
  document.querySelector("#email").value = user.Email;

  // document.querySelector(".bal").innerHTML = `$${user.balance
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
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

document.querySelector("#update").onclick = () => {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  if (!name.value) return show_input_error(name);
  if (!email.value) return show_input_error(email);
  const user = getCookie("user");
  const token = getCookie("token");
  handle_updateuser({
    user,
    token,
    Email: email.value,
    Name: name.value,
  });
};

document.querySelector("#change").onclick = () => {
  const password = document.querySelector("#password");
  const new_password = document.querySelector("#new_password");
  const retype_password = document.querySelector("#retype_password");

  if (!password.value) return show_input_error(password);
  if (!new_password.value) return show_input_error(new_password);
  if (!retype_password.value) return show_input_error(retype_password);
  const handle_updateuser = async (form) => {
    //   console.log(form);
    document.querySelector("#update").innerHTML = "Proccessing...";
    try {
      const response = await fetch(
        "https://blockchaininternationalcertificate-backend.glitch.me/api/user/update",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.error) {
        document.querySelector("#errMessage").innerHTML = result.errMessage;
        document.querySelector("#update").innerHTML = "Try Again";
        return;
      }
      document.querySelector("#update").innerHTML = "Success";
      // setCookie(result.message.user, result.token);
    } catch (error) {
      document.querySelector("#update").innerHTML = "Try again";
      document.querySelector("#errMessage").innerHTML = error.message;
    }
  };

  const handle_updatepassword = async (form) => {
    //   console.log(form);
    document.querySelector("#update").innerHTML = "Proccessing...";
    try {
      const response = await fetch(
        "https://blockchaininternationalcertificate-backend.glitch.me/api/user/update/update_password",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const result = await response.json();
      console.log(result);
      if (result.error) {
        document.querySelector("#errMessage").innerHTML = result.errMessage;
        document.querySelector("#update").innerHTML = "Try Again";
        return;
      }
      document.querySelector("#update").innerHTML = "Success";
      // setCookie(result.message.user, result.token);
    } catch (error) {
      document.querySelector("#update").innerHTML = "Try again";
      document.querySelector("#errMessage").innerHTML = error.message;
    }
  };
  // const show_input_error = (input) => (input.style.border = "2px solid red");

  const setText = (user) => {
    //   alert("called");
    document.querySelector("#name").value = user.Name;
    document.querySelector("#email").value = user.Email;

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

  document.querySelector("#update").onclick = () => {
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    if (!name.value) return show_input_error(name);
    if (!email.value) return show_input_error(email);
    const user = getCookie("user");
    const token = getCookie("token");
    handle_updateuser({
      user,
      token,
      Email: email.value,
      Name: name.value,
    });
  };

  document.querySelector("#change").onclick = () => {
    const password = document.querySelector("#password");
    const new_password = document.querySelector("#new_password");
    const retype_password = document.querySelector("#retype_password");

    if (!password.value) return show_input_error(password);
    if (!new_password.value) return show_input_error(new_password);
    if (!retype_password.value) return show_input_error(retype_password);

    if (new_password.value != retype_password.value)
      return (document.querySelector(".errMessage2").innerHTML =
        "password must match");
    if (new_password.value.length < 8)
      return (document.querySelector(".errMessage2").innerHTML =
        "password must be atleast 8 characters long");

    const user = getCookie("user");
    const token = getCookie("token");
    updatepassword({
      user,
      token,
      password: password.value,
      new_password: new_password.value,
    });
  };
};

document.querySelectorAll("input").forEach((input) => {
  input.onchange = () => {
    input.style.border = "2px solid #eee";
    input.style.backgroundColor = "#eee";
    document.querySelector("#errMessage").innerHTML = "";
    document.querySelector("#errMessage2").innerHTML = "";
    document.querySelectorAll("input").forEach((input) => {
      input.style.border = "1px solid #ebebeb";
    });
  };
});

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

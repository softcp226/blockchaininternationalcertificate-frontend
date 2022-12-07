const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

(() => {
  const reset_token = getParam();
  if (!reset_token) return (window.location.href = "/login.html");
})();

const change_password = async (user_form) => {
  document.querySelector("#submit").innerHTML = "proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalexchange.glitch.me/api/user/password/change",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user_form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try again";
      return;
    } else {
      document.querySelector("#submit").innerHTML = "Success";
      window.location.href = "/login.html";
    }
  } catch (err) {
    // console.log(err);
    document.querySelector("#submit").innerHTML = "Try again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

document.querySelector("#submit").onclick = () => {
  let pwd = document.querySelector("#password");
  let confirm_new_pwd = document.querySelector("#retype_password");
  
  if (!pwd.value) return (pwd.style.border = "1.5px solid red");
  if (!confirm_new_pwd.value)return (confirm_new_pwd.style.border = "1.5px solid red");
  if (pwd.value != confirm_new_pwd.value)return (document.querySelector(".errMessage").innerHTML ="password must match");
  if (pwd.value.length < 8)return (document.querySelector(".errMessage").innerHTML ="password must be atleast 8 characters long");


  change_password({
    reset_token: getParam(),
    password: pwd.value,
  });
  //   if (!message.value) return (message.style.border = "1.5px solid red");
  //   submit_message({ token, user, message: message.value });
  // };
  // document.querySelector("#message").onkeyup = () => {
  //   document.querySelector("#message").style.border = "1.5px solid #fff";
};

document.querySelectorAll("input").forEach(
  (input) =>
    (input.onchange = () => {
      input.style.border = "2px solid #fff";
      document.querySelector(".errMessage").innerHTML = "";
    }),
);

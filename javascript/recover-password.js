const handle_formSubmit = async (Email) => {
    console.log(Email)
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/user/password/recover",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Email),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try Again";
      return;
    }
    document.querySelector("#submit").innerHTML = "Success";
    // setCookie(result.message.user, result.token);
  } catch (error) {
    document.querySelector("#submit").innerHTML = "Try again";
    document.querySelector("#errMessage").innerHTML = error.message;
  }
};

const show_input_error = (input) => (input.style.border = "2px solid red");
document.querySelector("#submit").onclick = () => {
  const Email = document.querySelector("#email");
  if (!Email.value) return show_input_error(Email);

  handle_formSubmit({Email:Email.value});
};

document.querySelectorAll("input").forEach((input) => {
  input.onchange = () => {
    input.style.border = "2px solid #eee";
    input.style.backgroundColor = "#eee";
    document.querySelector("#errMessage").innerHTML = "";

 
  };
});

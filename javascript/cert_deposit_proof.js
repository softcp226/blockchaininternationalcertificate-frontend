const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

const handle_submit_deposit_proof = async (form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalexchange.glitch.me/api/user/cert_deposit/proof/submit",
      {
        method: "POST",
        //   headers: { "content-type": "application/json" },
        body: form,
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
    window.location.href = `success.html`;
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
    document.querySelector("#submit").innerHTML = "Try Again";
  }
};
document.querySelector("#submit").onclick = () => {
  const proof = document.querySelector("#photo");
  if (!proof.files[0]) return (proof.style.border = "2px solid red");
  const user = getCookie("user");
  const token = getCookie("token");
  deposit_reqID = getParam();
  const formdata = new FormData();
  formdata.append("user", user);
  formdata.append("token", token);
  formdata.append("deposit_reqID", deposit_reqID);
  formdata.append("proof", proof.files[0]);

  handle_submit_deposit_proof(formdata);
};

document.querySelectorAll("input").forEach((input) => {
  input.onchange = () => {
    input.style.border = "2px solid #eee";
    input.style.backgroundColor = "#eee";
    document.querySelector("#errMessage").innerHTML = "";
  };
});

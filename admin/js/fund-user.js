const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

function getCookie(cname) {
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
  window.location.replace("/admin");
}

const handle_deposit = async (form) => {
  document.querySelector("#submit").innerHTML = "processing...";
  try {
    const response = await fetch("/api/admin/fund_user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try again";
      return;
    }
    document.querySelector("#submit").innerHTML = "success";
    window.location.href = "/admin/dashboard.html";
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#submit").innerHTML = "Try again";
    console.log(err);
  }
};

document.querySelector("#submit").onclick = () => {
  const final_balance = document.querySelector("#final_balance");
 

  if (!final_balance.value)
    return (final_balance.style.border = "2px solid red");


  const admin = getCookie("admin");
  const token = getCookie("admin_token");
  const deposit_request = getParam();
  handle_deposit({
    admin: admin,
    token: token,
    user: getParam(),
    amount: final_balance.value,
  });
};
document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "2px solid #fff";
  };
});

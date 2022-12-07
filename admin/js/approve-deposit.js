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
    const response = await fetch("/api/admin/deposit/approve", {
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
  const deposit_amount = document.querySelector("#amount");

  if (!deposit_amount.value)
    return (deposit_amount.style.border = "2px solid red");

  const admin = getCookie("admin");
  const token = getCookie("admin_token");
  const deposit_request = getParam();
  handle_deposit({
    admin: admin,
    token: token,
    deposit_req:deposit_request,
    deposit_amount: deposit_amount.value,
  });
};
document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "2px solid #fff";
  };
});

const setText=(message)=>{
    const amount = document.querySelector("#amount");
    amount.value=message.amount
}

(async () => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  let deposit_req=getParam()
  try {
    const response = await fetch("/api/admin/deposit/findOne", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, admin, deposit_req }),
    });
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);

    setText(result.message);
  } catch (err) {
    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();

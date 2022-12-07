let amount = 0;

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



const handle_certificate_type = (certificate_type) => {
  switch (certificate_type) {
    case "basic yield certificate":
      amount = 1250;
      document.querySelector(".amt").innerHTML = `Amount:$1,250`;
      break;

    case "premium yield certificate":
      amount = 3250;
      document.querySelector(".amt").innerHTML = `Amount:$3,250`;
      break;

    case "ultimate yield certificate":
      amount = 7250;
      document.querySelector(".amt").innerHTML = `Amount:$7,250`;
      break;

    default:
      document.querySelector(
        ".amt",
      ).innerHTML = `Select certicate type to seee price`;
      break;
  }
};

const show_input_error = (input) => (input.style.border = "2px solid red");

const handle_submit_form = async (form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch("/api/admin/certificate/issue", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try Again";
      return;
    }
    document.querySelector("#submit").innerHTML = "Success";
    window.location.href = `/admin/dashboard.html`;
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
    document.querySelector("#submit").innerHTML = "Try Again";
  }
};

document.querySelector("#submit").onclick = () => {
  const first_name = document.querySelector("#first_name");
  const last_name = document.querySelector("#last_name");
  const country = document.querySelector("#country");
  const certificate_type = document.querySelector("#certificate_type");

  if (!first_name.value) return show_input_error(first_name);
  if (!last_name.value) return show_input_error(last_name);
  if (!country.value) return show_input_error(country);
  if (!certificate_type.value) return show_input_error(certificate_type);
//   const user = getCookie("admin");
//   const token = getCookie("token");
let admin = getCookie("admin");
const user = getParam();
let token = getCookie("admin_token");
    
  handle_submit_form({
    admin,
    user,
    token,
    first_name: first_name.value,
    last_name: last_name.value,
    country: country.value,
    amount: amount,
    certificate_type: certificate_type.value,
  });
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

document.querySelector("#certificate_type").onchange = () => {
  const certificate_type = document.querySelector("#certificate_type");
  // console.log(certificate_type.value);
  certificate_type.style.border = "2px solid #eee";
  certificate_type.style.backgroundColor = "#eee";
  handle_certificate_type(certificate_type.value);
};

document.querySelector("#country").onchange = () => {
  const country = document.querySelector("#country");
  country.style.backgroundColor = "#eee";
  country.style.border = "2px solid #eee";
};

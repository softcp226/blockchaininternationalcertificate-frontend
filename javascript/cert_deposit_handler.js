const show_input_error = (input) => (input.style.border = "2px solid red");



const handle_pay_with_available_balance= async (form) => {
  document.querySelector("#pay").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalexchange.glitch.me/api/user/certificate/pay",
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
      document.querySelector("#pay").innerHTML = "Try Again";
      return;
    }
    document.querySelector("#pay").innerHTML = "Success";
    window.location.href = `/success.html`;
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
    document.querySelector("#pay").innerHTML = "Try Again";
  }
};


const handle_submit_cert_deposit = async (form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalexchange.glitch.me/api/user/certificate/deposit",
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
      document.querySelector("#submit").innerHTML = "Try Again";
      return;
    }
    document.querySelector("#submit").innerHTML = "Success";
    window.location.href = `/certificate-dp-proof.html?${result.message._id}`;
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
    document.querySelector("#submit").innerHTML = "Try Again";
  }
};

let wallet = "";
const handle_payment_method = (payment_method) => {
  //   const amount = document.querySelector("#amount");
  switch (payment_method) {
    case "BITCOIN":
      wallet = "bc1qvntrr2pumypd78xp72kvkkx59c686pdu30k8cj";
      document.querySelector(
        ".wallet-div",
      ).innerHTML = `Send Bitcoin worth ${handle_addcoma(
        amount,
      )} to this wallet: <b>bc1qvntrr2pumypd78xp72kvkkx59c686pdu30k8cj</b> and click "i have made payment" to submit payment screenshot/evidence of payment `;
      break;

    case "ETHEREUM":
      wallet = "0x08C99F5e12A9C25059081926c2EeEeC2C6621e5E";
      document.querySelector(
        ".wallet-div",
      ).innerHTML = `Send Ethereum worth  ${handle_addcoma(
        amount,
      )} to this wallet: <b>0x08C99F5e12A9C25059081926c2EeEeC2C6621e5E</b> and click "i have made payment" to submit screenshot/evidence of payment`;
      break;

    case "PAYEER":
      break;

    case "PERFECT MONEY":
      wallet = "U37551138";
      document.querySelector(".wallet-div").innerHTML = `Send  ${handle_addcoma(
        amount,
      )} to this Perfect money wallet id: <b>U37551138</b> and click "i have made payment" to submit screenshot/evidence of payment `;

      break;

    case "USDT":
      wallet = "TRMh9ayrWtNx1CtEugN9yRHP4EnwHVyNPB";
      document.querySelector(
        ".wallet-div",
      ).innerHTML = `Send USDT worth ${handle_addcoma(
        amount,
      )} to this wallet USDT wallet address: <b>TRMh9ayrWtNx1CtEugN9yRHP4EnwHVyNPB</b> and click "i have made payment" to submit screenshot/evidence of payment`;
      break;

    default:
      document.querySelector("#wallet-div").innerHTML =
        "Select Payment Method to see how to make payment";
      break;
  }
};

document.querySelector("#submit").onclick = () => {
  const payment_method = document.querySelector("#payment_method");
  if (!payment_method.value) return show_input_error(payment_method);

  const token=getCookie("token")
  const user=getCookie("user")
  
  handle_submit_cert_deposit({
    token,
    user,
    payment_method: payment_method.value,
    certificate: certificate_ID,
    amount,

  });
};

document.querySelector("#pay").onclick = () => {
  // const payment_method = document.querySelector("#payment_method");
  // if (!payment_method.value) return show_input_error(payment_method);

  const token = getCookie("token");
  const user = getCookie("user");

  handle_pay_with_available_balance({
    token,
    user,
    // payment_method: payment_method.value,
    certificate: certificate_ID,
    amount,
  });
};


document.querySelector("#payment_method").onchange = () => {
  const payment_method = document.querySelector("#payment_method");
  payment_method.style.border = "2px solid #eee";
  payment_method.style.backgroundColor = "#eee";
  handle_payment_method(payment_method.value);
};

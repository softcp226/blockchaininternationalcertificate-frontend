const show_input_error = (input) => (input.style.border = "2px solid red");

const handle_deposit_form = async (form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/user/deposit/request",
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
    window.location.href = `/deposit-proof.html?${result.message._id}`;
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
    document.querySelector("#submit").innerHTML = "Try Again";
  }
};

let wallet = "";
const handle_payment_method = (payment_method) => {
  const amount = document.querySelector("#amount");
  switch (payment_method) {
    case "BITCOIN":
      wallet = "bc1qdgh9rguh5x4grhtcj3erradjq7lmjtqjjalma2";
      document.querySelector(
        ".wallet-div",
      ).innerHTML = `Send Bitcoin worth  $${amount.value
        .toString()
        .replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ",",
        )}.0 to this wallet: <b>bc1qdgh9rguh5x4grhtcj3erradjq7lmjtqjjalma2</b> and click "i have made payment" to submit payment screenshot/evidence of payment `;
      break;

    case "ETHEREUM":
      wallet = "0x00cf62c8BF655B6733A90BA986607B661aa20534";
      document.querySelector(
        ".wallet-div",
      ).innerHTML = `Send Ethereum worth  $${amount.value.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ",",
      )}.0 to this wallet: <b>0x00cf62c8BF655B6733A90BA986607B661aa20534</b> and click "i have made payment" to submit screenshot/evidence of payment`;
      break;

    // case "PAYEER":
    //   break;

    // case "PERFECT MONEY":
    //   wallet = "U37551138";
    //   document.querySelector(
    //     ".wallet-div",
    //   ).innerHTML = `Send $${amount.value.replace(
    //     /\B(?=(\d{3})+(?!\d))/g,
    //     ",",
    //   )}.0 to this Perfect money wallet id: <b>U37551138</b> and click "i have made payment" to submit screenshot/evidence of payment `;

    //   break;

    case "USDT":
      wallet = "TC8We4GC3QvzVFmXekpjH8FohvXjzkLTDB";
      document.querySelector(
        ".wallet-div",
      ).innerHTML = `Send USDT worth  $${amount.value.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ",",
      )}.0 to this wallet: <b>TC8We4GC3QvzVFmXekpjH8FohvXjzkLTDB</b> and click "i have made payment" to submit screenshot/evidence of payment`;
      break;
    case "":
      document.querySelector("#wallet-div").innerHTML =
        "Select Payment Method to see how to make payment";
      break;
    default:
      document.querySelector("#wallet-div").innerHTML =
        "Select Payment Method to see how to make payment";
      break;
  }
};

document.querySelector("#submit").onclick = () => {
  const amount = document.querySelector("#amount");
  const purpose_of_deposit = document.querySelector("#purpose_of_deposit");
  const payment_method = document.querySelector("#payment_method");

  if (!amount.value) return show_input_error(amount);
  if (!purpose_of_deposit.value) return show_input_error(purpose_of_deposit);
  if (!payment_method.value) return show_input_error(payment_method);
  const token = getCookie("token");
  const user = getCookie("user");
  console.log(token, user);
  handle_deposit_form({
    token,
    user,
    amount: amount.value,
    purpose_of_deposit: purpose_of_deposit.value,
    payment_method: payment_method.value,
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

document.querySelector("#purpose_of_deposit").onchange = () => {
  const purpose_of_deposit = document.querySelector("#purpose_of_deposit");
  // console.log(purpose_of_deposit.value);
  purpose_of_deposit.style.border = "2px solid #eee";
  purpose_of_deposit.style.backgroundColor = "#eee";
};

document.querySelector("#payment_method").onchange = () => {
  const amount = document.querySelector("#amount");
  if (!amount.value) {
    document.querySelector("#payment_method").value = "";
    show_input_error(amount);
  }
  const payment_method = document.querySelector("#payment_method");
  payment_method.style.border = "2px solid #eee";
  payment_method.style.backgroundColor = "#eee";
  handle_payment_method(payment_method.value);
};

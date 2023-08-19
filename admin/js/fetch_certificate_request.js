// // const setCookie = (token, admin) => {
// //   const d = new Date();
// //   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
// //   let expires = "expires=" + d.toUTCString();
// //   document.cookie = `token=${token} ; ${expires}`;
// //   document.cookie = `admin=${admin} ; ${expires}`;
// //   window.location.replace("/admin/dashboard.html");
// // };

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

const handle_approve_certificate = async (event, certificate_ID) => {
  event.target.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/requested_certificate/update/approve",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, certificate_ID }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      event.target.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      alert(result.errMessage);
    } else {
      alert(result.message);
      event.target.innerHTML = "Success";
      window.location.href = "/admin/requested_certificate.html";
    }
  } catch (err) {
    event.target.innerHTML = "Try again";
    console.log(err);
    alert(err.message);
  }
};

const handle_decline_certificate = async (event, certificate_ID) => {
  event.target.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");

  // alert(certificate_ID);
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/requested_certificate/update/decline",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, certificate_ID }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      event.target.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      alert(result.errMessage);
    } else {
      alert(result.message);
      event.target.innerHTML = "Success";
      window.location.href = "/admin/requested_certificate.html";
    }
  } catch (err) {
    event.target.innerHTML = "Try again";
    console.log(err);
    alert(err.message);
  }
};

const createAndAppendElement = (element) => {
  const section = document.createElement("section");
  const user = document.createElement("h4");
  const cert_price = document.createElement("h4");
  const cert_type = document.createElement("h4");
  const state = document.createElement("h4");
  const status = document.createElement("h4");
  const payment_proof_btn = document.createElement("button");
  const decline_cert_btn = document.createElement("button");
  const approve_cert_btn = document.createElement("button");

  user.innerHTML = element.user ? element.user.Email : "Not available";
  cert_price.innerHTML = `$${element.amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")};`;
  cert_type.innerHTML = element.certificate_type;
  state.innerHTML = element.state;
  status.innerHTML = element.Status;
  payment_proof_btn.onclick = () => {
    // if (element.cert_deposit.paid_for_certificate){
      element.cert_deposit.paid_for_certificate == true
        ? alert(
            "the user paid for this certificate with their available balance",
          )
        : (window.location.href = `${element.cert_deposit.deposit_proof}`);
      };
    // }

  decline_cert_btn.onclick = () =>
    handle_decline_certificate(event, element._id);
  approve_cert_btn.onclick = () =>
    handle_approve_certificate(event, element._id);

  payment_proof_btn.innerHTML =
    element.cert_deposit?element.cert_deposit.paid_for_certificate == true
      ? "paid"
      : "Payment Proof" :"Not available";

  decline_cert_btn.innerHTML = "Decline Cert.. ";
  approve_cert_btn.innerHTML = "Approve Cert.. ";
  payment_proof_btn.className = "btn btn-primary";
  decline_cert_btn.className = "btn btn-danger";
  approve_cert_btn.className = "btn btn-primary";
  //   const E_M = document.createElement("h4");
  //   const user_name = document.createElement("h4");
  //   const final_balance = document.createElement("h4");
  //   // const P_L = document.createElement("h4");
  //   // const AI = document.createElement("h4");
  //   // const RF = document.createElement("h4");
  //   const CCBTN = document.createElement("button");
  //   const DCBTN = document.createElement("button");
  //   E_M.innerHTML = `${element.Email}`;
  //   user_name.innerHTML = `${element.Name}`;
  //   final_balance.innerHTML = `$${element.balance
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  //   // P_L.innerHTML = `$${element.profit_loss
  //   //   .toString()
  //   //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  //   // AI.innerHTML = `$${element.active_investment
  //   //   .toString()
  //   //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  //   // RF.innerHTML = `$${element.referral_bonus
  //   //   .toString()
  //   //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  //   CCBTN.innerHTML = "CREDIT USER";
  //   DCBTN.innerHTML = "DELETE USER";
  //   CCBTN.className = "btn btn-primary";
  //   DCBTN.className = "btn btn-danger";
  //   CCBTN.onclick = () =>
  //     (window.location.href = `/admin/fund-user.html?${element._id}`);

  //   DCBTN.onclick = () => handle_delete_user(event, element._id);

  section.append(
    user,
    cert_price,
    cert_type,
    state,
    status,
    payment_proof_btn,
    decline_cert_btn,
    approve_cert_btn,
  );
  document.querySelector(".history-table").append(section);
};
const setText = (userInfo) => {
  userInfo.map((info) => createAndAppendElement(info));
};

(async () => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/admin/certificate/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin }),
      },
    );
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

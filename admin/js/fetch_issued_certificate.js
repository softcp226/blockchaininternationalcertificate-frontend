
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


const handle_activate_deativate_certificate = async (event, certificate_ID) => {
  event.target.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/admin/issued_certificate/update/activate-deactivate",
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
      window.location.href = "/admin/issued_certificate.html";
    }
  } catch (err) {
    event.target.innerHTML = "Try again";
    console.log(err);
    alert(err.message);
  }
};

const handle_suspend_unsuspend_certificate = async (event, certificate_ID) => {
  event.target.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");

  // alert(certificate_ID);
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/admin/issued_certificate/update/suspend-unsuspend",
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
      window.location.href = "/admin/issued_certificate.html";
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
  // const cert_price = document.createElement("h4");
  const cert_type = document.createElement("h4");
  const state = document.createElement("h4");
  const status = document.createElement("h4");
  const activate_inactivate_btn=document.createElement("button");
  const suspended_unsuspend_btn = document.createElement("button");

  // const payment_proof_btn = document.createElement("button");
  // const decline_cert_btn = document.createElement("button");
  // const approve_cert_btn = document.createElement("button");

  user.innerHTML = element.user? element.user.Email : "Not available";
  cert_type.innerHTML = element.certificate_type;
  state.innerHTML = element.state;
  status.innerHTML = element.Status;
  activate_inactivate_btn.innerHTML=element.Status=="active"?"DEACTIVATE CERT...":"ACTIVATE CERT... ";
  suspended_unsuspend_btn.innerHTML=element.Status =="suspended"?"UNSUSPEND CERT...":"SUSPEND CERT..."
  activate_inactivate_btn.onclick=()=>handle_activate_deativate_certificate(event,element._id)
  suspended_unsuspend_btn.onclick=()=>handle_suspend_unsuspend_certificate(event,element._id)

  activate_inactivate_btn.className=element.Status =="active"? "btn btn-danger":"btn btn-primary"
  suspended_unsuspend_btn.className=element.Status=="suspended"?"btn btn-primary":"btn btn-danger"
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
    cert_type,
    state,
    status,
    activate_inactivate_btn,
    suspended_unsuspend_btn
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
      "https://blockchaininternationalcertificate-backend.glitch.me/api/admin/issued_certificate/fetch",
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

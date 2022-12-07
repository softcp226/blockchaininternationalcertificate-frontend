// const setCookie = (token, admin) => {
//   const d = new Date();
//   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   document.cookie = `token=${token} ; ${expires}`;
//   document.cookie = `admin=${admin} ; ${expires}`;
//   window.location.replace("/admin/dashboard.html");
// };

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

const handle_delete_deposit = async (event, deposit_req) => {
  event.target.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch("/api/admin/deposit/deleteOne", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, admin, deposit_req}),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      event.target.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      alert(result.errMessage);
    } else {
      alert(result.message);
      event.target.innerHTML = "Success";
      window.location.href = "/admin/user_deposit.html";
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
  const deposit_amount = document.createElement("h4");
  const purpose = document.createElement("h4");
  const payment_method = document.createElement("h4");
  const proof_btn= document.createElement("button");
  const delete_btn = document.createElement("button");
  const approve_btn = document.createElement("button");
  user.innerHTML=element.user ? element.user.Email : "Does not exist"
  deposit_amount.innerHTML = `$${element.amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

purpose.innerHTML = element.purpose_of_deposit;
payment_method.innerHTML=element.payment_method

proof_btn.innerHTML="View Deposit Proof"
delete_btn.innerHTML="Delete Request"
approve_btn.innerHTML="Approve Deposit"

proof_btn.className = "btn btn-primary";
delete_btn.className="btn btn-danger";
approve_btn.className="btn btn-primary"

proof_btn.onclick = () => {
  element.deposit_proof ? window.location.href = element.deposit_proof :alert("payment proof not submited");
}
approve_btn.onclick=()=>window.location.href=`/admin/approve-deposit.html?${element._id}`
delete_btn.onclick=()=>handle_delete_deposit(event,element._id)
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

  section.append(user,deposit_amount,purpose,payment_method,proof_btn,delete_btn,approve_btn);
  document.querySelector(".history-table").append(section);
};
const setText = (userInfo) => {
  userInfo.map((info) => createAndAppendElement(info));
};

(async () => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch("/api/admin/deposit/fetch", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, admin }),
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

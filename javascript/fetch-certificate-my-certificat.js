// const fetch_user = async (data) => {
//   try {
//     const response = await fetch("/api/user/fetch", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     alert(error.message);
//   }
// };

const setCertText = (result) => {
  console.log("result",result)

    document.querySelector("#download_all").onclick = () => {
      console.log(result);
      result.requested_certificate.forEach((element) => {
        element.state == "issued"
          ? window.open(`/certificate.html?${element._id}`)
          : "";
      });
    };
  document.querySelector("#bal").innerHTML = result.issued_certificate;
  result.requested_certificate.map((result) => {
    const container_div = document.createElement("div");
    const certificateID = document.createElement("div");
    const certificateDate = document.createElement("div");
    const certificateType = document.createElement("div");
    const certificateState = document.createElement("div");
    const certificateStatus = document.createElement("div");
    const download_btn = document.createElement("button");

    container_div.className = "certificate_details tail";
    certificateStatus.className = result.Status;
    certificateID.style.marginLeft = "5px";
    certificateID.innerHTML = `${result._id.slice(0, 15)}...`;
    certificateDate.innerHTML = result.date_requested;
    certificateType.innerHTML = result.certificate_type;
    certificateState.innerHTML = result.state;
    certificateStatus.innerHTML = result.Status;
    download_btn.innerHTML = result.state == "issued" ? "Download" : "-----";
    download_btn.onclick = () =>
      result.state == "issued"
        ? window.open(`/certificate.html?${result._id}`)
        : "";
    container_div.append(
      certificateID,
      certificateDate,
      certificateType,
      certificateState,
      certificateStatus,
      download_btn,
    );
    document.querySelector("#buy_cert_tag").append(container_div);

  
  });


  //   document.querySelectorAll("#user_icon").forEach((passport) => {
  //     passport.src = user.Passport;
  //   });
  //   document.querySelector("#user_name_txt").innerHTML = `${user.Name.substring(
  //     0,
  //     user.Name.indexOf(" "),
  //   )}...`;

  // document.querySelector(".bal").innerHTML = `$${user.balance
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me/api/user/certificate/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
    } else {
      setCertText(result.message);
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
})();

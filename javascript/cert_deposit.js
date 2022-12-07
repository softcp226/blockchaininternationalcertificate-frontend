let amount="0";
let certificate_ID;
const handle_addcoma=(number)=>{
return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  certificate_ID = getParam();
  try {
    const response = await fetch(
      "https://blockchaininternationalexchange.glitch.me/api/user/certificate/fetch/search_byid",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user, certificate_ID }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
    } else {
        amount=result.message.certificate.amount;
        document.querySelector(".amount_div").innerHTML = handle_addcoma(amount)
    }
  } catch (error) {
    console.log(error);
    // window.location.href = "/buy-certificate.html";
  }
})();

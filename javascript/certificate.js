
function getPDF() {
  var HTML_Width = $(".canvas_div_pdf").width();
  var HTML_Height = $(".canvas_div_pdf").height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width + top_left_margin * 2;
  var PDF_Height = PDF_Width * 1.5 + top_left_margin * 3;
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

  html2canvas($(".canvas_div_pdf")[0], { allowTaint: true }).then(function (
    canvas,
  ) {
    canvas.getContext("2d");

    console.log(canvas.height + "  " + canvas.width);

    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
    pdf.addImage(
      imgData,
      "JPG",
      top_left_margin,
      top_left_margin,
      canvas_image_width,
      canvas_image_height,
    );

    for (var i = 1; i <= totalPDFPages; i++) {
      pdf.addPage(PDF_Width, PDF_Height);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        -(PDF_Height * i) + top_left_margin * 4,
        canvas_image_width,
        canvas_image_height,
      );
    }

    pdf.save("Certificate.pdf");
  });
}

const certificate_type = (certificate) => {
  switch (certificate) {
    case "basic yield certificate":
      return "Basic";
      break;

    case "premium yield certificate":
      return "Premium";
      break;

    case "standard yield certificate":
      return "standard";
      break;

    case "premium yield certificate":
      return "Premium";
      break;

    case "enterprise yield certificate":
      return "enterprise";
      break;

    default:
      return "Basic";
      break;
  }
};

const setText = (certificate) => {
  // document.addEventListener("DOMContentLoaded", () => {

  document.querySelector(
    "#username",
  ).innerHTML = `${certificate.first_name.toUpperCase()} ${certificate.last_name.toUpperCase()}`;
  document.querySelector("#certificate_type").innerHTML = certificate_type(
    certificate.certificate_type,
  ).toUpperCase();
  document.querySelector(
    "#certificate_ID",
  ).innerHTML = `Certificate ID: ${certificate._id}`;
  document.querySelector(
    "#issue_date",
  ).innerHTML = `Issued On: ${certificate.date_issued}`;

  getPDF();

  // });
  setTimeout(() => {
    alert(
      "Please Use two fingers to shrink down certificate for better view on phone",
    );
  }, 1000);
};

// document.addEventListener("DOMContentLoaded", () => {
//   alert(
//     "Please Use two fingers to shrink down certificate for better view on phone",
//   );

//   // getPDF()
// });

const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

const getCookie = (cname) => {
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
  window.location.href = "/login.html";
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  certificate_ID = getParam();
  try {
    const response = await fetch(
      "https://blockchaininternationalexchange.glitch.me/api/user/certificate/fetchOne",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user, certificate_ID }),
      },
    );
    const result = await response.json();
    console.log(result);
    console.log(response.status);
    if (result.error) {
      if (response.status == 403)
        return (window.location.href = `/login.html?certificate.html?${certificate_ID}`);
      window.location.replace("my-certificate.html");
    } else {
      // document.addEventListener("DOMContentLoaded",()=>setText(result.message))
      setText(result.message);
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
})();
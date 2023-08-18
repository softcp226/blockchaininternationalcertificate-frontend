(async () => {
  try {
    const response = await fetch(
      "https://blockchaininternationalcertificate-backend.glitch.me",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "server is up and running" }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
    } else {
      console.log(result.message);
    }
  } catch (error) {
    console.log(error.message);
  }
})();

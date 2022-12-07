document.querySelector("#harmburger").onclick = () => {
  if (document.querySelector("#nav").className == "nav-hide") {
    document.querySelector("#nav").className = "nav-show";
  } else document.querySelector("#nav").className = "nav-hide";
};

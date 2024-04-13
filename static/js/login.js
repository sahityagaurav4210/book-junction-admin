import API from "../api/index.js";
import Utilities from "../utils/index.js";
import NotifyType from "../helpers/notification_type.helpers.js";

let messageBox = document.getElementById("dialogBox");
let button1 = document.getElementById("button1");
let close = document.getElementById("close");
let username = document.getElementById("username");
let password = document.getElementById("password");
let heading = document.querySelector(".heading");
let isLoggedIn = false;

messageBox.style.display = "none";

button1.addEventListener("click", async function () {
  button1.disabled = true;
  button1.innerHTML = "Please Wait...";

  try {
    if (username.value != "" && password.value != "") {
      let formData = {
        username: username.value,
        password: password.value,
      };

      await API.makePOSTRequest("/login", formData);

      isLoggedIn = true;
    } else {
      isLoggedIn = false;
      Utilities.showNotification(
        NotifyType.INFO,
        "Please fill the form correctly"
      );
    }
  } catch (error) {
    isLoggedIn = false;
    Utilities.showNotification(NotifyType.DANGER, error.message);
  }

  button1.disabled = false;
  button1.innerHTML = "Submit";

  if (isLoggedIn){
      window.location.href="/?request=cp&username=" + username.value;
  }
});

import NotifyType from "../helpers/notification_type.helpers.js";

class Utilities {
  static showNotification(notificationType = NotifyType.SUCCESS, message = "") {
    const notify = new Notyf();
    notify[notificationType]({
      duration: 1500,
      dismissible: true,
      message: message,
      position: { x: "right", y: "top" },
    });
  }
}

export default Utilities;

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const NOTIFICATION_TITLE = "neotw-app";
const NOTIFICATION_BODY = "🛸 Hello, neotw";
// const CLICK_MESSAGE = "Notification clicked!";

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY });

/* .onclick =
  () => (document.getElementById("output").innerText = CLICK_MESSAGE); */

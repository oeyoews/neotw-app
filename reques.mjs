import fetch from "node-fetch";
import { writeFile } from "fs";

fetch("https://neotw.netlify.app/", {
  method: "GET",
  // headers: { "Content-Type": "application/octet-stream" },
})
  .then((res) => res.buffer())
  .then((_) => {
    writeFile("src/index.html", _, "binary", function (err) {
      if (err) console.error(err);
      else console.log("success");
    });
  });

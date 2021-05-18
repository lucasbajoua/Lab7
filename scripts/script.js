// script.js

import { router } from "./router.js"; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://cse110lab6.herokuapp.com/entries")
    .then((response) => response.json())
    .then((entries) => {
      entries.forEach((entry) => {
        let newPost = document.createElement("journal-entry");
        newPost.entry = entry;
        document.querySelector("main").appendChild(newPost);

        let list = document.querySelectorAll("journal-entry");
        list.forEach((selectedEntry) => {
          selectedEntry.addEventListener("click", () => {
            setState("single entry");
            let newEntryPage = document.createElement("entry-page");
            newEntryPage.entry = entry;
            document.querySelector("main").appendChild(newEntryPage);
          });
        });

        // document
        //   .querySelectorAll("journal-entry")
        //   .addEventListener("click", () => {
        //     setState("single entry");
        //   });
      });
    });

  document.querySelector("img").addEventListener("click", () => {
    setState("settings");
  });

  document.querySelector("h1").addEventListener("click", () => {
    setState("journal entries");
  });
});

window.addEventListener("popstate", () => {
  setState(history.state);
});

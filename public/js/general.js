"use strict";
let lastScrollY = window.scrollY;
let blocksAdded = 1;
document.addEventListener("scroll", function (e) {
  if (window.scrollY > lastScrollY) {
    document.querySelector(".header").style.top = "-80px";
  } else {
    document.querySelector(".header").style.top = "0";
  }

  lastScrollY = window.scrollY;
});

document.addEventListener("DOMContentLoaded", () => {
  const addBlockBtn = document.getElementById("addBlockBtn");
  const blocksContainer = document.getElementById("blocksContainer");
  document
    .querySelector("#search-button")
    .addEventListener("click", function () {
      document.querySelector("#search-box").style.display = "block";
    });
  addBlockBtn.addEventListener("click", () => {
    blocksAdded++;
    const blockTemplate = `
      <div class="block">
      <h2 class="blockNumber">Block ${blocksAdded}</h2>
        <label for="blockHeading">Block Heading</label>
        <input type="text" name="blockHeading"  />

        <label for="blockParagraph">Block Paragraph</label>
        <textarea name="blockParagraph" ></textarea>

        <label for="blockImage">Block Image</label>
        <input type="text" name="blockImage"/>
      </div>
    `;

    blocksContainer.insertAdjacentHTML("beforeend", blockTemplate);
  });
});

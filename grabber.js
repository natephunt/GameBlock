// grab the content of the webpage with document.body.innerText
// give to aistuff.js

const pageContent = document.body.textContent;
chrome.runtime.sendMessage({ content: pageContent });
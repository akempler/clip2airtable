import axios from "axios";

const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const results = document.querySelector(".result-container");

const apikey = process.env.APIKEY || 'apiKeyNotFound';
const baseid = process.env.BASEID || 'baseIdNotFound';

const url = `https://api.airtable.com/v0/${baseid}/Ideas`;

results.style.display = "none";
loading.style.display = "none";
errors.textContent = "";
// grab the form
const form = document.querySelector(".form-data");
const title = document.querySelector("#working-title");
const idea = document.querySelector("#article-idea");

let currentUrl = '';
let currentTitle = '';

chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, function(tabs) {
  // and use that tab to fill in out title and url
  const tab = tabs[0];
  currentUrl = tab.url;
  currentTitle = tab.title;
});

const saveToAirtable = async () => {
  loading.style.display = "block";
  errors.textContent = "";

  let data = {
    fields: {
      "Working Title": title.value,
      "Status": "Unused",
      "Article Idea": idea.value,
      "Referenced Article URL": currentUrl,
      "Referenced article title": currentTitle,
      "Channels": [
        "Web"
      ]
    }
  }

  axios.post(url, data, {
    withCredentials: true,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apikey}`
    }
  }).then(function(response) {
    //console.log(response);  
    loading.style.display = "none";
    results.style.display = "block";
    results.innerHTML = '<p>Web page saved!<p>';
  }).catch(function(error) {
    console.log(error);
    throw new Error(`API ${error}`);
  });

};

// handle form submission
const handleSubmit = async e => {
  e.preventDefault();
  saveToAirtable();
};

form.addEventListener("submit", e => handleSubmit(e));
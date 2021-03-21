import axios from "axios";

const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const results = document.querySelector(".result-container");

const apikey = process.env.APIKEY || 'apiKeyNotFound';
const baseid = process.env.BASEID || 'baseIdNotFound';
const tableid = process.env.TABLEID || 'tableIdNotFound';
const viewid = process.env.VIEWID || 'viewIdNotFound';

const url = `https://api.airtable.com/v0/${baseid}/Ideas`;
const viewUrl = `https://airtable.com/${tableid}/${viewid}?blocks=hide`;

results.style.display = "none";
loading.style.display = "none";
errors.textContent = "";

const form = document.querySelector(".form-data");
const title = document.querySelector("#working-title");
const idea = document.querySelector("#article-idea");

let currentUrl = '';
let currentTitle = '';

chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, function(tabs) {
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
        "Newsletter"
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
    loading.style.display = "none";
    results.style.display = "block";
    results.innerHTML = `<p>Web page saved!</p><p><a href="${viewUrl}" target="_blank">View in Airtable</a></p>`;
  }).catch(function(error) {
    console.log(error);
    throw new Error(`API ${error}`);
  });

};

const handleSubmit = async e => {
  e.preventDefault();
  saveToAirtable();
};

form.addEventListener("submit", e => handleSubmit(e));
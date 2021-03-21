# Save to Airtable Chrome Extension

Chrome extension to save a web page to the AI Lab Ideas table.

# Setup and Building

Download the repo.

Install the dependencies: <br>
`npm install`

Create a .env file in the project root.<br>
Add the following:<br>
```
APIKEY=THE_API_KEY
BASEID=IDEAS_BASE_TABLE_ID
```


Build the extension: <br>
`npm run build`

If you run into problems building, try using node 12.x

Load the extension by going to chrome://extensions/ 

Enable developer mode.

Click the "Load unpacked" button and select the repo folder.

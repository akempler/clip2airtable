# Save to Airtable Chrome Extension

Chrome extension to save a web page to the AI Lab Ideas table.

This is just a quick example of creating a local extension for adding entries to airtable. 
I use it, for example, to add articles to a newsletter content pipeline I keep in airtable.

# Setup and Building

Download the repo.

Install the dependencies: <br>
`npm install`

Create a .env file in the project root.<br>
Add the following:<br>
```
APIKEY=THE_API_KEY
BASEID=IDEAS_BASE_TABLE_ID
TABLEID=TABLE_ID_WHEN_VIEWING_IN_AIRTABLE
VIEWID=VIEW_ID_WHEN_VIEWING_IN_AIRTABLE
```

For the table id and view id above, just visit the table/view in airtable and they will be in the url.


Build the extension: <br>
`npm run build`

If you run into problems building, try using node 12.x

Load the extension by going to chrome://extensions/ 

Enable developer mode.

Click the "Load unpacked" button and select the repo folder.

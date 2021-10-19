### `yarn`

Install all the dependencies to run this app.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `Connect FE and BE`

To Connect FE and BE, you should change some values.

1. FE \
   /workspaces/CLOUD_WEB_Blo-my_Byzantium/WEB(FE)/src/utils/api.ts \
   change the value of baseUrl to backend url.

2. BE \
   /workspaces/CLOUD_WEB_Blo-my_Byzantium/WEB(BE)/blo_web/settings.py \
   add frontend url in CORS_ALLOWED_ORIGINS.

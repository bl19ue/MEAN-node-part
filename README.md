MEAN-node-part
==============
<b>app.js</b> - Launching point, here we import everything which is required for the app to work, ex: 
modules, routes, database connection.

<b>/bin/</b> - Consists of useful executable scripts, default: www, which includes app.js; when invoked starts the node server

<b>/node_modules/</b> - consists of external modules; which are installed using npm install

<b>package.json</b> - consists of all the modules with their versions and other properties of the application in JSON format

<b>/public/</b> - Anything here is made publicly available by the server; js, css, images, templates

<b>/routes/</b> - Backend code

<b>/views/</b> - All the views, ex: .ejs

<b>/models/</b> - Database schema; here it will be mongoose schema

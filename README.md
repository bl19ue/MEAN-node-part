MEAN-node-part
==============
app.js - Launching point, here we import everything which is required for the app to work, ex: 
modules, routes, database connection.

/bin/ - Consists of useful executable scripts, default: www, which includes app.js; when invoked starts the node server

/node_modules/ - consists of external modules; which are installed using npm install

package.json - consists of all the modules with their versions and other properties of the application in JSON format

/public/ - Anything here is made publicly available by the server; js, css, images, templates

/routes/ - Backend code

/views/ - All the views, ex: .ejs

/models/ - Database schema; here it will be mongoose schema

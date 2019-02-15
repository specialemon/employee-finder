const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

//accepted data type
app.use(express.urlencoded({ extended:true}));
app.use(express.json());

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

//serve static files
app.use(express.static(path.join(__dirname, "app/public")));


app.listen(PORT, function(){
    console.log(`Now listening on port ${PORT}`);
})

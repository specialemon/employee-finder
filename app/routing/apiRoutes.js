let employeeData = require("../data/employees.js");

let dataURL = "/api/employees";

module.exports = function(app) {
    //GET request
    app.get(dataURL, function(req,res){
        res.json(employeeData);
    });

    app.post(dataURL, function(req,res){
        employeeData.push(req.body);
        res.json(req.body);
    });
};
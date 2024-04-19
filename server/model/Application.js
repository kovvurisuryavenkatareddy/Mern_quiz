const mongoose = require('mongoose');

const schemaData = mongoose.Schema({
    name: String,
    department: String,
    email: String,
    mobile: Number
}, {
    timestamps: true
});

const ApplicationModel = mongoose.model("Application", schemaData);

module.exports=ApplicationModel;
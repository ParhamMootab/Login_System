const mongoose = require('mongoose');

const uri = "mongodb+srv://Parham:Parfar7983@nodeexpress-jwt-test.mxmkk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log(err));

module.exports =  mongoose;
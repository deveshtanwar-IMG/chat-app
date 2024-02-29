const mongoose = require('mongoose')

// strictQuery set to true to prevent undefined (not defined in schema) insertion of fields in db
mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB_URI).then(() => {
    console.log("   🍀  Database Connected Successfully    ".bgWhite)
})
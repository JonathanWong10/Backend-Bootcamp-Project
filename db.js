const mongoose = require ('mongoose');

const mongoURI = "mongodb+srv://jonathanwfc:j59208948W.@cluster0.8oevmre.mongodb.net/Cozybar?retryWrites=true&w=majority&appName=Cluster0";

//const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

//connect to mongodb
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
    
module.exports = mongoose
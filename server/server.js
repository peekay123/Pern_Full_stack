const PORT = process.env.PORT || 8000;
const express = require('express')
const cors = require('cors')
const app = express()

//middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static('./images'))

//Routes
app.use('/data', require('./routes/router'));
app.use('/auth', require('./routes/Auth'));
app.use('/dashboard', require('./routes/dashboard'));

app.listen(PORT, ()=> {
    console.log(`server running on PORT ${PORT}`);
});


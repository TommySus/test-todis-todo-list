const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes/index')
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use("/",routes)



app.listen(process.env.PORT || PORT, ()=> {
    console.log(`listening on PORT ${PORT}`)
})
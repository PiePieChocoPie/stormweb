const userController = require('./controller/user.controller')
const  express = require('express')
const userRouter= require('./routes/user.routes')
const PORT = process.env.PORT || 8080

const app = express()
app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))



/*app.get('/',(req,res)=>{
    res.send('Hello psql & node & dev')
})*/
app.use(express.json())
app.use('/api', userRouter)
app.use(express.static('public'))


app.get('/', (req,res) =>{
    res.render('index')
})
app.get('/api/login',(req,res) =>{
    if(!req.body) {
        return res.sendStatus(400)
    }
    console.log(req.body)
    res.send(`${req.body.login} - ${req.body.password}`)


})
app.get('api/home', (req,res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
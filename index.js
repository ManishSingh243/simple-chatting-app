const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:false}))

app.get('/login', (req, res) => {
    res.send(`
<html>
    <body>
        <form onSubmit="localStorage.setItem('username', document.getElementById('username').value)" action='/' method='POST'>
            <input id='username' type='text' name'title'>
            <button type='submit'>add</button>
        </form>
    </body>
</html>`)
})

 app.get('/', (req, res) => {
    fs.readFile('message.txt', (err, data) => {
        if(err){
            console.log(err)
            data = "No Chat Exist"
        }
        res.send(`
        ${data}<form onSubmit="document.getElementById('username').value=localStorage.getItem('username')" action='/' method='post'>
            <input type='text' name='message' id='message'>
            <input type='hidden' name='username' id='username'>
            <button type='submit'>send</button>
        </form>
`)
    })
}) 

app.post('/', (req, res) => {
    fs.writeFile('message.txt', `${req.body.username}: ${req.body.message}`, {flag: 'a'}, (err)=>{
        err? console.log(err): res.redirect('/')
    })
})

app.listen(3000)
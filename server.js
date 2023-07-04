const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

// middleware
app.use(express.json())


// routes

const users = []

app.get('/users',(req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => { 
    try {
//  const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
//  console.log(salt)
//  console.log(hashedPassword)

    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()

    } catch (error) {
        res.status(501).send()
    }
})

app.post('/users/login', async (req,res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find the User')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password))
            res.send('Successfully!')
        else {
            res.send('Not Allowed!')
        }
    } catch (error) {
        res.status(500).send()
    }
})

app.listen(3000, () => {
    console.log('Node API is already running on the port');
})

// https://www.tutorialspoint.com/expressjs/expressjs_authentication.htm
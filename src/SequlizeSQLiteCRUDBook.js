





const express = require('express')
const Sequelize = require('sequelize')
const app = express()


app.use(express.json())


const sequelize = new sequelize('database','usename','password',{
    host:"localhost",
    dialect:"sqlite",
    storage:"./Database/SQBooks.sqlite"
})


const Book = sequelize.define("book",{
    id :{
        type: Sequlize.INTEGER,
        autoIncrement:true,
        primarykey: true
    },
    title :{
        type: Sequlize.STRING,
        allowNull: false
    },
    author :{
        type: Sequlize.STRING,
        allowNull: false
        
    },  
})




app.get('/books',(req,res)=>{
    Book.findAll().then(book =>{
        res.json(book)
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.get('/books/:id',(req,res)=>{
    Book.findByPk(req.params.id).then(book =>{
        if(!book) {
            res.status(400).send('Book not found')
        }else{
            res.json(book)
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.post('/books',(req,res)=>{
    Book.create(req.body).then(book =>{
        res.send(books)
    }).catch(err=>{
        res.status(500).send(err)
    })
})

app.put('/books/:id',(req,res)=>{
    Book.findByPk(req.params.id).then(book =>{
        if(!book){
            res.status.send('Bookn not found')
        }else{
            book.update(req.body).then(()=>{
                res.send(book)
            }).catch(err=>{
                res.status(500).send(err)
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.delete('/books/:id',(req,res)=>{
    Book.findByPk(req.params.id).then(book =>{
        if(!book){
            res.status.send('Bookn not found')
        }else{
            book.destroy().then(()=>{
                res.send({})
            }).catch(err=>{
                res.status(500).send(err)
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})


const port = process.env.PORT || 3000
app.listen(port,()=> console.log(`Listening on port ${port}`))
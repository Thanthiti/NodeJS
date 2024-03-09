const express = require('express')
const Sequelize = require('sequelize')
const app = express()


app.use(express.json())
console.log("Start\n\n\n\n")

const sequelize = new Sequelize('database', 'usename', 'password', {
    host: "localhost",
    dialect: "sqlite",
    storage: "./Database/SQBooks.sqlite"
})


const Book = sequelize.define("book", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false // have to
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false // have to        
    },
})

sequelize.sync()

app.get('/books', (req, res) => {
    Book.findAll().then(books => {
        res.json(books)
        books.map((x) => {
            console.log(x.title)
        })

        console.log(books + " Get Books FindALl")
    }).catch(err => {
        res.status(500).send(err)
    })
})


app.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status(404).send('Book not found')
        } else {
            res.json(book)
            console.log(book.title) //

            console.log(" Get Book findBiPk") //
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})



app.post('/books', (req, res) => {
    Book.create(req.body).then(book => {
        res.send(book)
        console.log(book + " Post Book") //

    }).catch(err => {
        res.status(500).send(err)
    })
})


app.put('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status.send('Book not found')
        } else {
            book.update(req.body).then(() => {
                res.send(book)
                console.log(book + " put Book ") //
            }).catch(err => {
                res.status(500).send(err)
            })
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})


app.delete('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book) {
            res.status.send('Book not found')
        } else {
            book.destroy().then(() => {
                console.log(book + " Now Destroy ") //
                res.send({})
            }).catch(err => {
                res.status(500).send(err)
            })
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
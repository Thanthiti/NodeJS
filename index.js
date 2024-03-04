const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())
console.log("Start\n\n\n\n")

const dburl = "postgres://webadmin:CVAsbp63189@node57327-nodepem.proen.app.ruk-com.cloud/Books"
    //const dburl = "postgres://webadmin:CVAsbp63189@node57327-nodepem.proen.app.ruk-com.cloud:11344/Books" // delete port 11344 if wanna run on rukcom
const sequelize = new Sequelize(dburl)




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
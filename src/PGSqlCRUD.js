const express = require('express')
const Sequelize = require('sequelize')
const app = express()

app.use(express.json())


const dburl = ""


const sequelize = new Sequelize(dburl)
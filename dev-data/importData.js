const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const Farm = require('../model/farmModel')
const User = require('../model/userModel')
const Review = require('../model/reviewModel')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
}).then(() => {
  console.log(`DB connected successfully 😃 🚀`)
})

const farms = JSON.parse(fs.readFileSync(`${__dirname}/farm.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/review.json`, 'utf-8'))

const importData = async() => {
  try {
    await Farm.create(farms)
    await User.create(users, { validateBeforeSave: false })
    await Review.create(reviews)
    console.log(`Data successfully loaded`)
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

const deleteData = async() => {
  try {
    await Farm.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()
    console.log(`Data successfully deleted`)
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

if(process.argv[2] === '--import') {
  importData()
}else if(process.argv[2] === '--delete') {
  deleteData()
}

// 01:56:03
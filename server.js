const express = require('express')
const mainRouter = require('./routes/index')
const productRouter = require('./routes/products')


const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.use(express.json())

app.set('view engine', 'ejs')

app.use(mainRouter)
app.use(productRouter)


// console.log(app.get('view engine'))
console.log(app.get('views'))

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})
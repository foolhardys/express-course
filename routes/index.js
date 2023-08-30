const path = require('path')
const apiKeyMiddleware = require('../middlewares/apiKey')
const router = require('express').Router()

// router.use(apiKeyMiddleware)


router.get('/', (req, res) => {
    res.render('index', {
        title: 'my Home page',
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'My About page'
    })
})

router.get('/download', (req, res) => {
    res.download(path.resolve(__dirname) + '/about.html')
})



// router.get('/api/products', apiKeyMiddleware, (req, res) => {
//     res.json([
//         {
//             id: '123',
//             name: 'Chrome',
//         },
//         {
//             id: '124',
//             name: 'Firefox'
//         }
//     ])
// })

module.exports = router
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mysql = require('mysql')
const bodyParser = require('body-parser')

// use express
const app = express()

// konfigurasi database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_product'
})

// menjalankan mysql
conn.connect((err) => {
    if(err) throw err
    console.log('Connected to mysql')
})

// setting views
app.set('views', path.join(__dirname,'views'))
// setting view engine
app.set('view engine', 'hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// homepage route
app.get('/', (req, res) => {
    let sql = "SELECT * FROM product"
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err
        res.render('product_view', {
            results: results
        })
    })
})

// route insert data
app.get('/create', (req, res) => {
    res.render('product_create')
})
app.post('/save', (req, res) => {
    let data = {
        name: req.body.name, 
        price: req.body.price
    }
    let sql = "INSERT INTO product SET ?"
    let query = conn.query(sql, data, (err, results) => {
        if(err) throw err
        res.redirect('/')
    })
})

// route update data
app.get('/product_edit/:id',  (req, res) => { 
    let sql = "SELECT * FROM product WHERE id="+req.params.id
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err
        res.render('product_view', {
            results: results
        })
    })
    res.render('product_edit', query)
})
app.post('/update', (req, res) => {
    
})


// route delete data
app.post('/delete', (req, res) => {
    let sql = "DELETE FROM product WHERE id="+ req.body.id +""
    let query = conn.query(sql, (err, results) => {
        if(err) throw err
        res.redirect('/')
    })
})

// server
app.listen(8000, () => {
    console.log('Server is running at port 8000');
});
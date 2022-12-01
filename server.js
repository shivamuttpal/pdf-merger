// We can use express as shown as below
const express = require('express')
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {mergePdfs}= require('./merge')

const app = express()
app.use('/static',express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})


app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    await mergePdfs(path.join(__dirname,req.files[0].path), path.join(__dirname,req.files[1].path))
    res.redirect("static/merged.pdf")
    // res.send({data:req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
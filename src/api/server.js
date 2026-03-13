const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../database');

require('../bot');
require('../scheduler');

const app = express();

const storage = multer.diskStorage({
 destination:"uploads/",
 filename:(req,file,cb)=>{
  cb(null,Date.now()+path.extname(file.originalname))
 }
});

const upload = multer({storage});

app.use(express.static('src/views'));
app.use(express.urlencoded({extended:true}));

app.post('/produto', upload.single('imagem'), (req,res)=>{

 const {nome,preco,descricao,horario,grupo} = req.body;

 db.run(
 "INSERT INTO produtos (nome,preco,descricao,imagem,horario,grupo) VALUES (?,?,?,?,?,?)",
 [nome,preco,descricao,req.file.filename,horario,grupo]
 );

 res.redirect('/');
});

app.listen(3000,()=>{
 console.log("Painel rodando");
});
const cron = require('node-cron');
const db = require('./database');
const client = require('./bot');
const { MessageMedia } = require('whatsapp-web.js');

cron.schedule('* * * * *', () => {

 const hora = new Date().toTimeString().slice(0,5);

 db.all(
 "SELECT * FROM produtos WHERE horario=?",
 [hora],
 (err, rows)=>{

 rows.forEach(produto=>{

 const media = MessageMedia.fromFilePath("./uploads/"+produto.imagem);

 const mensagem = `
🔥 OFERTA DO DIA

${produto.nome}

💰 ${produto.preco}

${produto.descricao}
`;

 client.sendMessage(produto.grupo, media, {caption:mensagem});

 });

 });

});
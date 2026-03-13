const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.db');

db.serialize(() => {

 db.run(`
 CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  preco TEXT,
  descricao TEXT,
  imagem TEXT,
  horario TEXT,
  grupo TEXT
 )
 `);

});

module.exports = db;
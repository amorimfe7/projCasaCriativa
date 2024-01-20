const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./dev-web-rocketseat.db')

db.serialize(function(){

    //criar tabela
    // db.run(`CREATE TABLE IF NOT EXISTS ideias(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         title TEXT,
    //         category TEXT,
    //         description TEXT,
    //         link TEXT
    //     );
    // `)

    //inserir dados na tabela
    // const query = `INSERT INTO ideias(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    //     ) VALUES (?,?,?,?,?)`

    // const values = [
    //     "/util/controle-de-video-game.png", 
    //     "Games", 
    //     "Lazer",
    //     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, debitis natus optio cum Explicabo quae hic numquam corrupti iure laboriosam",
    //     "https://store.steampowered.com/?l=portuguese"
    // ]

    // db.run(query, values, function(error) {
    //     if (error) return console.log(error)

    //     console.log(this)
    // })
    

    //deletar um dado da tabela
        db.run(`DELETE FROM ideias WHERE id = ?`, [23], function(error){
            if (error) return console.log(error)

            console.log("DELETADO", this)
        })
    

    // //consultar dados na tabela
        db.all(`SELECT * FROM IDEIAS`, function(error, rows){
            if (error) return console.log(error)

            console.log(rows)
        })
})

module.exports = db
//usei o express para criar e config o servidor
const express = require('express');
const server = express();

const db = require("./db.js")

// const ideias = [
//     {
//         img: "/util/assistindo-um-filme.png",
//         title: "Assistir um Filme",
//         category: "Lazer",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores deserunt debitis fuga, repudiandae hic omnis non",
//         url: "https://www.netflix.com/br/"
//     },


//     {
//         img: "/util/paleta-de-pintura.png",
//         title: "Pintura",
//         category: "Arte",
//         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, debitis natus optio cum Explicabo quae hic numquam corrupti iure laboriosam",
//         url: "https://br.pinterest.com/leandrokazuk/pintura-de-tela-f%C3%A1cil/"
//     },

//     {
//         img: "/util/jogo-de-tabuleiro.png",
//         title: "Jogos de Tabuleiro",
//         category: "Lazer",
//         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, debitis natus optio cum Explicabo quae hic numquam corrupti iure laboriosam",
//         url: "https://poki.com/br/tabuleiro"
//     },

//     {
//         img: "/util/programacao.png",
//         title: "Curso de Programação",
//         category: "Estudos",
//         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, debitis natus optio cum Explicabo quae hic numquam corrupti iure laboriosam",
//         url: "https://www.alura.com.br/"
//     },

//     {
//         img: "/util/meditacao.png",
//         title: "Meditação",
//         category: "Bem-estar",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quae hic numquam corrupti iure laboriosam totam exercitationem error praesentium!",
//         url: "https://www.headspace.com/"
//     },

//     {
//         img: "/util/uno.png",
//         title: "UNO",
//         category: "Lazer",
//         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, debitis natus optio cum Explicabo quae hic numquam corrupti iure laboriosam",
//         url: "https://www.ubisoft.com/pt-br/game/uno/uno"
//     },

//     {
//         img: "/util/controle-de-video-game.png",
//         title: "Games",
//         category: "Lazer",
//         description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, debitis natus optio cum Explicabo quae hic numquam corrupti iure laboriosam",
//         url: "https://store.steampowered.com/?l=portuguese"
//     },
// ]



//config arquivos estaticos (css, arq, imgs)
server.use(express.static("public")) //antiga pasta bkp

//habilitar uso do req.body
server.use(express.urlencoded({extended: true}))

//config nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//criei uma rota e capturo pedido do client p responder
server.get("/", function(req, res){

    db.all(`SELECT * FROM IDEIAS`, function(error, rows){
        if (error) return console.log(error)

            console.log(rows)

            const reversedIdeas = [...rows].reverse() //espalhe no array

            let lastIdeas = []
            for (let idea of reversedIdeas){
                if(lastIdeas.length < 3){
                    lastIdeas.push(idea) //add no array
                }
            }

            return res.render("index.html", {ideias: lastIdeas}) //envia p mim no frontend o index html
        })
    })

server.get("/minhas-ideias", function(req, res){

    

    db.all(`SELECT * FROM IDEIAS`, function(error, rows){
        if (error){
            return res.send("Erro no banco de dados!")
        }
        console.log(rows)

        const reversedIdeas = [...rows].reverse()
        return res.render("minhas-ideias.html", {ideias: reversedIdeas}) //envia p mim no frontend o iminhas-ideias
    })
})

server.post("/", function(req, res){
    const query = `
    INSERT INTO ideias(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(error) {
        if (error){
            return res.send("Erro no banco de dados!")
        }
        
        return res.redirect("/minhas-ideias")

    })
})

//liguei meu servidor na porta 3000
server.listen(3000)
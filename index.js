/* 
Instale as bibliotecas e o filme de API:
npm init
npm i express
Procure pela extensão RapidAPI Client no VSCode.
*/
// Para executar a API no terminal: node index.js
// Link para testar a API: http://localhost:3000/rota
const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) // configura API para usar JSON.
const fs = require('fs') // importa leitura e escrita de arquivos.




// Execução da API:
app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})
app.post("/filmes", (req,res) => {
    const filme = req.body
    if (!filme || Object.keys(filme).length === 0) {
        res.status(400).json({resposta: "Body não preenchido"})
    } else {
        try {
            const filmes = JSON.parse(fs.readFileSync('filmes.json', 'utf8'))
            filmes.push(filme)
            fs.writeFileSync('filmes.json', JSON.stringify(filmes), 'utf8')
            res.status(201).json({resposta: "Filme botado no cartaz com sucesso!"})
        } catch(error) {
            res.status(500).json({resposta: error.message})
        }
    }    
})
app.get("/filmes", (req, res) => {
    try{
        const filmes = JSON.parse(fs.readFileSync("filmes.json", "utf8"))
        res.status(200).json(filmes)
    }catch(error) {
        res.status(500).json({resposta: error.message})
    }

})

app.get("/filmes/:id", (req, res) => {
    const id = req.params.id
    try{
        const filmes = JSON.parse(fs.readFileSync("filmes.json", "utf8"))
       const filme_encontrado = filmes.find((filme) => filme.id(/\D/g, "") == id)
       if(!filme_encontrado) {
        res.status(404).json({erro: "filme não existe no banco de dados! "})
       }
       res.status(200).json(filme_encontrado)
    }catch(error) {
        res.status(500).json({resposta: error.message})
    }

})


app.delete("/filmes/:id", (req, res) => {
    const id = req.params.id
    try{
        const filmes = JSON.parse(fs.readFileSync("filmes.json", "utf8"))
       const indice = filmes.findIndex((filme) => filme.id == id)
       if(indice == -1){
        res.status(404).json({resposta: "filme não existe no banco de dados"})
       }
        filmes.splice(indice, 1)
        fs.writeFileSync('filmes.json', JSON.stringify(filmes), 'utf8')
       res.status(200).json({resposta: "filme tirado de cartaz"})
    }catch(error) {
        res.status(500).json({resposta: error.message})
    }
    filme.findindex("filmes/:id") 
    
})

app.put("/filmes/:id", (req, res) => {
    const id = req.params.id
    const dados = req.body
    try{
        const filmes = JSON.parse(fs.readFileSync("filmes.json", "utf8"))
       const indice_filme = filmes.findIndex((filme) => filme.id == id)
       if(indice_filme == -1){
        return res.status(404).json({resposta: "filme não existe no banco de dados"})
       }
        filmes [indice_filme] = dados
        fs.writeFileSync('filmes.json', JSON.stringify(filmes), 'utf8')
       res.status(200).json({resposta: "filme substituido com sucesso"})
    }catch(error) {
        res.status(500).json({resposta: error.message})
    }

})



app.listen(port, ()=> {
    console.log('API executado com sucesso' + port)
})
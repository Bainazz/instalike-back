import express from 'express';
import multer from 'multer';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000", 
    optionsSuccessStatus: 200,
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})
// linux ou no mac  
// const upload = multer({ dest: "./uploads"})



// Define as rotas usando o objeto Express App
const routes = (app) => {
    // Permite que o servidor interprete corpos de requisições no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions))

    // Rota para recuperar uma lista de todos os posts
    app.get("/posts", listarPosts); // chama a função controladora apropriada

    // Rota pra criar um novo post
    app.post("/posts", postarNovoPost); // chama a função controladora para criação de posts

    // Rota para upload de imagens (asumindo uma unica imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem); // chama a função controladora para processamento de imagem

    app.put("/upload/:id", atualizarNovoPost)
};  

export default routes;

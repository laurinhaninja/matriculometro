const app = require("./src/app/");
const routers = require("./src/routers");
const dotenv = require("dotenv").config(); // ele lê o .env
const PORT = process.env.PORT ?? 3000; // Se não existir o process.env.PORT ele usa a porta 3000

app.use(routers);

app.listen(3000, () => console.log("Servidor rodando na porta %s", PORT));

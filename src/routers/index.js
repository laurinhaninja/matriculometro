const { Router } = require("express");
const HomePages = require("../controllers/home");

class MainRouter {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", async (req, res, next) => await HomePages.prototype.get(req, res, next));
  }
}


module.exports = new MainRouter().router
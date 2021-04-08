module.exports = app => {
    const dino = require("../controller/dino.controller.js");

    const router = require("express").Router();

    router.post("/", dino.create);

    router.get("/", dino.findAll);

    router.get("/:id", dino.findOne);

    router.put("/:id", dino.update);

    router.delete("/:id", dino.delete);

    router.delete("/", dino.deleteAll);

    app.use('/api/dino', router);
};
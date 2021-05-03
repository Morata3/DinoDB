module.exports = app => {
    const dino = require("../controller/dino.controller.js");
    const shop = require("../controller/shop.controller.js");

    const router = require("express").Router();

    router.post("/", dino.create);
    router.get("/", dino.findAll);
    router.get("/:id", dino.findOne);
    router.put("/:id", dino.update);
    router.delete("/:id", dino.delete);
    router.delete("/", dino.deleteAll);


    router.post("/shop", shop.createPurchase);
    router.get("/shop/find", shop.findAllPurchases);
    router.put("/shop/:id", shop.updatePurchase);
    router.delete("/shop/:id", shop.deletePurchase);

    app.use('/api/dino', router);
};

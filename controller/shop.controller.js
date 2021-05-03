const db = require("../models/setup");
const Shop = db.shop;


exports.createPurchase = (req, res) => {
    if (!req.body.especie) {
        res.status(400).send({ message: "O corpo da peticion non pode estar baleiro!" });
        return;
    }
    console.log("Create: ",req.body.especie);

    const shop = new Shop({
        especie: req.body.especie,
        tipo: req.body.tipo,
        alimentacion: req.body.alimentacion,
        habitat: req.body.habitat,
        altura: req.body.altura,
        peso: req.body.peso,
        vida: req.body.vida,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        originalID: req.body.originalID
    });

    shop
        .save(shop)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algun erro ocurriu ao crear a compra."
            });
        });
};

exports.findAllPurchases = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: {$regex: new RegExp(title), $options: "i"}}:{};
    Shop.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algun erro ocurriu mentres buscabamos as compras."
            });
        });
};


exports.updatePurchase = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os datos a actualizar non poden estar baleiros!"
        });
    }

    const id = req.params.id;
    Shop.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Non se pode actualizar a compra con id=${id}.
                    Pode que non se atopara na base de datos!`
                });
            } else res.send({ message: "A compra foi actualizado con exito." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando a compra con id=" + id
            });
        });
};


exports.deletePurchase = (req, res) => {
    const id = req.params.id;
    Shop.findByIdAndRemove(id)
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: 'Non se pode eliminar a compra con id=${id}. Pode que non se atopase.'
                });
            }else{
                res.send({
                    message: "A compra foi eliminado correctamente."
                });
            }
        }).catch(err => {
        res.status(500).send({
            message: "Non se puido eliminar a compra con id = "+ id
        });
    });
};

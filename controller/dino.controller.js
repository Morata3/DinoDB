const db = require("../models/setup");
const Dino = db.dino;


exports.create = (req, res) => {
    if (!req.body.especie) {
        res.status(400).send({ message: "O corpo da peticion non pode estar baleiro!" });
        return;
    }
    console.log("Create: ",req.body.especie);

    const dino = new Dino({
        especie: req.body.especie,
        tipo: req.body.tipo,
        alimentacion: req.body.alimentacion,
        habitat: req.body.habitat,
        altura: req.body.altura,
        peso: req.body.peso,
        vida: req.body.vida,
        cantidad: req.body.cantidad,
        precio: req.body.precio
    });

    dino
        .save(dino)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algun erro ocurriu ao crear o dinosaurio."
            });
        });
};


exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: {$regex: new RegExp(title), $options: "i"}}:{};
    Dino.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Algun erro ocurriu mentres buscabamos os dinosaurios."
            });
        });
};


exports.findOne = (req, res) => {
    console.log("find One");
const id = req.params.id;
Dino.findById(id)
    .then(data => {
        if(!data)
            res.status(404).send({message: "Non se atoparon dinosaurios con id="+id});
        else res.send(data);
    })
    .catch(err =>{
        res
            .status(500)
            .send({message:"Error atopando dinosaurios con id="+id});
    });
};


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os datos a actualizar non poden estar baleiros!"
        });
    }

    const id = req.params.id;
    //console.log("PROBA",req.body.id);
    Dino.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Non se pode actualizar o dinosaurio id=${id}.
                    Pode que non se atopara na base de datos!`
                });
            } else res.send({ message: "O dinosaurio foi actualizado con exito." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando o dinosaurio con id=" + id
            });
        });
};


exports.delete = (req, res) => {
const id = req.params.id;
Dino.findByIdAndRemove(id)
    .then(data => {
    if(!data){
        res.status(404).send({
            message: 'Non se pode eliminar o dinosaurio con id=${id}. Pode que non se atopase.'
        });
    }else{
        res.send({
            message: "O dinosaurio foi eliminado correctamente."
        });
    }
}).catch(err => {
    res.status(500).send({
        message: "Non se puido eliminar o dinosaurio con id = "+ id
    });
});
};


exports.deleteAll = (req, res) => {

};


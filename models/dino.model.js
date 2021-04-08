module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            especie: String,
            tipo: String,
            alimentacion: String,
            habitat: String,
            altura: Number,
            peso: Number,
            vida: Number,
            cantidad: Number,
            precio: Number
        },
        {timestamps: true}
    );

    //override method
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Dino = mongoose.model("dino", schema);
    return Dino;
};
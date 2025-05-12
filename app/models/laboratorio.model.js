export default (sequelize, Sequelize) => {
    const Laboratorio = sequelize.define("laboratorios", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Laboratorio;
}
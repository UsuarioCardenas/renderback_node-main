export default (sequelize, Sequelize) => {
    const OrdenCompra = sequelize.define("ordenes_compra", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        total: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        situacion: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        laboratorioId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "laboratorios", // el nombre de la tabla
                key: "id"
            }
        }
    });
    return OrdenCompra;
}
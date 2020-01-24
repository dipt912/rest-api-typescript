import { Sequelize } from 'sequelize';

export let sequelize: Sequelize
export function sequelizeInit(config: any) {
    sequelize = new Sequelize(config.pg.dbname, config.pg.username, config.pg.password, {
        host: config.pg.host,
        port: config.pg.port,
        dialect: 'postgres',
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        },
        define: {
            underscored: true,
            version: true,
        }
    });
}
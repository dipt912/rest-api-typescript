import { Sequelize } from 'sequelize';
import { sequelize, sequelizeInit } from './sequelize';
import { loginModelInit } from './signin';
import { usersModelInit } from './users';

export interface PostgresInitDependencies {
    config: any;
}

let config: any;

async function init(dependencies: PostgresInitDependencies) {
    try {
        config = dependencies.config;

        sequelizeInit(config);

        await sequelize.authenticate();
        console.info({
            msg: 'Connected to the database',
            details: {
                dbname: config.pg.dbname,
                host: config.pg.host,
                port: config.pg.port,
            },
        });
       
        loginModelInit(sequelize);
        usersModelInit(sequelize);
    

        console.info({ msg: 'db init completed' });
    } catch (error) {
        console.error({ msg: 'Error during postgres init', error });
        throw error;
    }
}

export const getTransaction = () => {
    return sequelize.transaction();
};

export const db = {
    sequelize,
    Sequelize,
    init,
    getTransaction,
};
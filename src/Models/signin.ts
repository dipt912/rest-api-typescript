import { Sequelize, Model, DataTypes } from 'sequelize';

export class Logins extends Model {
    hash!: string ;
    name!: string;
    email!: string;
}

export const loginModelInit = (sequelize: Sequelize): void => {
    Logins.init({
        hash: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false },
    }, { sequelize, underscored: true,  modelName: 'logins' });
};

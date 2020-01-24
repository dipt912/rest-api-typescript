import { Sequelize, Model, DataTypes } from 'sequelize';

export class Users extends Model {
    name!: string;
    email!: string;
    fname!: string;
    lname!: string;
}

export const usersModelInit = (sequelize: Sequelize): void => {
    Users.init({
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false},
        fname: { type: DataTypes.STRING },
        lname: { type: DataTypes.STRING },
    }, { sequelize, underscored: true,  modelName: 'users'  });
};

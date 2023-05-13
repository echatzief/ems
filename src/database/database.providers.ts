import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE } from '@/src/config/index';
import { User } from '@/src/user/user.entity';

const providers = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: +process.env.DB_PORT,
        dialect: 'postgres',
        logging: false
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    }
  }
];

export default providers;
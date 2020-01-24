import { Dictionary } from './global';
function get(envVar: string) {
  
    return process.env[envVar];
}



const config: Dictionary<any> = {};
if (!config.pg) {
    config.pg = {};
}

config.pg.password = get('POSTGRES_PASSWORD');
config.pg.username = get('POSTGRES_USER');
config.pg.host = get('POSTGRES_HOST');
config.pg.user = get('POSTGRES_USER');
config.pg.dbname = get('POSTGRES_DB');
config.pg.port = get('POSTGRES_PORT');
config.redisUrl =  get('REDIS_URI');




module.exports = exports = config;
export const getConfig = () => config;

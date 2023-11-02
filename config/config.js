require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "timezone": "+07:00"
  },
  "test": {
    "username": process.env.TEST_DB_USERNAME,
    "password": process.env.TEST_DB_PASSWORD,
    "database": process.env.TEST_DB_DATABASE_NAME,
    "host": process.env.TEST_DB_HOST,
    "port": process.env.TEST_DB_PORT,
    "dialect": process.env.TEST_DB_DIALECT,
    "timezone": "+07:00"
  },
  "production": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_DATABASE_NAME,
    "host": process.env.PROD_DB_HOST,
    "port": process.env.PROD_DB_PORT,
    "dialect": process.env.PROD_DB_DIALECT,
    "timezone": "+07:00"
  }
};

// Optional semicolon or another valid JavaScript statement goes here.

let seqConfig = {
  development: {
    username: "postgres",
    password: "password123",
    database: "postgres",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "blog",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}

export default seqConfig;

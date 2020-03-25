// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/mealplanner.sqlite3'
    },
    // },

    // staging: {
    //   client: 'postgresql',
    //   connection: {
    //     database: 'my_db',
    //     user:     'username',
    //     password: 'password'
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },

    useNullAsDefault: true,

    migrations: {
      directory: './data/migrations'
    },

    seeds: {
      directory: './data/seeds'
    },
    // needed because using foreign keys
    pool: {
      afterCreate: (conn, done) => {
        //runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // tunr on FK enforcement
      }
    }
  }

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};

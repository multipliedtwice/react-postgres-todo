# Todo

Simple todo made with react, tailwind, postgres, knex, etc.

<img src="https://github.com/thousandsofraccoons/react-postgres-todo/raw/master/screenshot.png" alt="React tabs component download" width="100%">

# Installation

1. Create a `.git initenv` file in the server directory with this content

```
DB_HOST=localhost
DB_NAME=name
DB_USER=postgres
DB_PASSWORD=root
DB_PORT=5432
DATABASE_POOL_MIN=1
DATABASE_POOL_MAX=10

APP_PORT=5000
```

2. Create a `.env` file in the client directory with this content

```
REACT_APP_BACKEND=http://localhost:5000
```

3. `npm install` for /server and /client
4. `npm i knex -g` for /server
5. `knex migrate:latest` ----
6. `knex seed run` ----
7. `npm run dev` ----
8. `npm start` for client

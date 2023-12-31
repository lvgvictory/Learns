const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
const SortMiddleware = require('./app/middlewares/SortMiddleware');
app.use(SortMiddleware)

// Method override
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

// public static path
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
// const morgan = require('morgan')
// app.use(morgan('combined'))

// Teamplate engine
const handlebars = require('express-handlebars');

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
          getIndexForTable: function (index) {
            return index + 1
          }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route Init
const route = require('./routes');

route(app);

// Connect to DB
const db = require('./config/db');

db.connect();

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);

module.exports = app;

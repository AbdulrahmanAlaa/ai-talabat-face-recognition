//requiring NPM modules
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { connection, connect } from 'mongoose';
import * as cors from 'cors';
import routes from './routes';

const app = express();

// Allow Cross Origin Requests
app.use(cors());

// To parse application/json header.
app.use(bodyParser.urlencoded({ extended: false }));

// Registering Application Routes
app.use('/api',routes);

const { PORT = 3000 } = process.env;

// Log DataBase Error
connection.on('error', console.error);

// Connect to mongolab/local DB
connect(
  'mongodb+srv://admin:2314876@app-kfovs.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
});

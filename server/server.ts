//requiring NPM modules
import  express from 'express';
import  bodyParser from 'body-parser';
import { connection, connect } from 'mongoose';
import cors from 'cors';
import routes from './routes';
import { seedUsers } from './controllers/users';
import path from 'path';
const app = express();

// Allow Cross Origin Requests
app.use(cors());

// To parse application/json header.
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public/users',express.static(path.join(__dirname,'public/users')));

// Registering Application Routes
app.use('/api', routes);

const { PORT = 3000 } = process.env;

// Log DataBase Error
connection.on('error', console.error);

// Connect to mongolab/local DB
connect(
  'mongodb://admin:abc123456@ds153003.mlab.com:53003/ai-talabat',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).catch(console.error);

seedUsers();

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
});


//requestAnimationFrame
//reload
//prefetch
//works in unload cases
// navigator.sendBeacon('url',{} as any );
// Fire some code when element shown
// const observer = new IntersectionObserver(entries => {}, {
//   threshold: [0, 0.5, 1]
// });
// observer.observe(document.getElementById('id'));
// fetch()
// localStorage is sync while indexedDB is async
// localForage in npm to wrap indexedDB
// ref: https://developers.google.com/web/ilt/pwa/working-with-indexeddb

// if ('caches' in window) {
//   const url = 'https://reqres.in/api/users?page=2';
//   //cache first
//   caches.open('my-cache').then(cache => {
//     cache.match(url).then(result => {
//       if (result === undefined) {
//         console.log(`Not found in cache: ${url}`);
//         fetch(url).then(response => {
//           const clonedRes = response.clone();
//           cache.put(url, response);
//           clonedRes.json().then(j => console.log(`Response: ${j}`));
//         });
//       } else {
//         result.json().then(j => console.log(`Response from cache: ${j}`));
//       }
//     });
//   });
// }

// Storage
// if (navigator.storage && navigator.storage.estimate) {
//   navigator.storage
//     .estimate()
//     .then(est => console.log(`Quota: ${est.quota}, Usage: ${est.usage}`));
// }

// if (navigator.storage && navigator.storage.persisted) {
//  navigator.storage.persisted().then(fulfilled=> )

// }

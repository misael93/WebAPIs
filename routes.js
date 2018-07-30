var TodoController            = require('./controllers/todos'),
    AuthController            = require('./controllers/auth'),
    express                   = require('express'),
    passport                  = require('passport'),
    multer                    = require('multer');
    ArtistController          = require('./controllers/artists');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = (app) => {

    var apiRoutes     = express.Router(),
        authRoutes    = express.Router(),
        todoRoutes    = express.Router(),
        artistRoutes  = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthController.register);

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);
    todoRoutes.get('/:todo_id', TodoController.getTodo);
    todoRoutes.get('/', TodoController.getTodos);
    todoRoutes.post('/', TodoController.createTodo);
    todoRoutes.put('/:todo_id', TodoController.updateTodo);
    todoRoutes.delete('/:todo_id', TodoController.deleteTodo);

    // Artist Routes
    apiRoutes.use('/artists', artistRoutes)
    artistRoutes.get('/', ArtistController.getArtists);
    artistRoutes.post('/', ArtistController.createArtist);
    artistRoutes.get('/:identifier', ArtistController.getArtist);
    artistRoutes.put('/:identifier', ArtistController.updateArtist);
    artistRoutes.delete('/:identifier', ArtistController.deleteArtist);

    // Set up routes
    app.use('/api/v1', apiRoutes);

    apiRoutes.use((req, res, next) => {
      res.status(404).send("Not found");
    });

    apiRoutes.get('/', (req, res) => {
      res.status(200).send('Basic Api V1');
    })

}

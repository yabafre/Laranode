// routes/index.js
const { router } = require('../bootstrap/Router');
const UserController = require('../app/Controllers/UserController');

router.get('/', (req, res) => {
    res.send('Hello World!')
});
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);


module.exports = router;

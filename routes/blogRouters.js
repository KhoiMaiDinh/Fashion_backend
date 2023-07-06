const {Router}= require('express');
const blogController= require('../controllers/blogController');
const uploads = require('../middlewares/image');
const verifyRoles = require('../middlewares/verifyRoles');
const ROLES_LIST = require('../config/roles_list');

const router=  Router();

router.get('/get-all-blog',blogController.getAllBlog);
router.get('/get-random-blog/:number',blogController.getRandomBlog);
router.get('/get-blog-by-id/:_id',blogController.getBlogById);
router.post('/post-create-blog',verifyRoles(ROLES_LIST.Admin),uploads.array('imageBlog',4), blogController.postCreateProduct);
router.put('/put-update-blog/:_id',verifyRoles(ROLES_LIST.Admin),uploads.array('imageBlog',4),blogController.updateBlog);
router.delete('/delete-blog/:_id',verifyRoles(ROLES_LIST.Admin),blogController.deleteBlog);
router.get('/get-all-deleted-blog',blogController.getDeletedBlog);


module.exports= router;

import express  from "express";
import {  SignupUser,LoginUser } from '../controller/userController.js';
import { uploadImage, getImage } from "../controller/imageController.js";
import { createPost,getAllPosts,getSinglePost,updatePost,deletePost } from "../controller/postController.js";
import { authenticateToken } from "../controller/jwtController.js";
import { newComment, getComment,deleteComment } from "../controller/commentController.js";

import upload from "../utils/upload.js";

const router = express.Router();


router.post('/signup', SignupUser);
router.post('/login', LoginUser);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create',authenticateToken,createPost);
router.put('/update/:id',authenticateToken,updatePost);

router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id',authenticateToken,getSinglePost);
router.delete('/delete/:id',authenticateToken,deletePost);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id',authenticateToken, getComment);
router.delete('/comment/delete/:id',authenticateToken, deleteComment);

export default router;


import { request } from 'express';
import Post from '../model/post.js';


export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json({ msg: 'Post saved successfully' });
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getAllPosts = async (request, response) => {
    let category = request.query.category;
    let posts;
    try {
        if (category) {
            posts = await Post.find({ categories: category });
        } else {
            posts = await Post.find({});

        }

        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error);
    }
}
export const getSinglePost = async (request, response) => {

    try {

        const post = await Post.findById(request.params.id);


        return response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error);
    }
}
export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ msg: 'post not found' });

        }
        await Post.findByIdAndUpdate(request.params.id, { $set: request.body })

        response.status(200).json({ msg: 'Post update successfully' });
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post) {
            return response.status(404).json({ msg: 'post not found' });

        }
        await post.delete();
        response.status(200).json({ msg: 'Post delete successfully' });
    } catch {
        response.status(500).json(error);
    }
}
// import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const state = {
  posts: [
    {
      id: uuidv4(),
      title: "1.Post",
      content: "My first post",
      color: "#41b883",
    },
    {
      id: uuidv4(),
      title: "2.Post",
      content: "My second post",
      color: "#41b883",
    },
    {
      id: uuidv4(),
      title: "3.Post",
      content: "My third post",
      color: "#41b883",
    },
    {
      id: uuidv4(),
      title: "4.Post",
      content: "My fourth post",
      color: "#41b883",
    },
  ],
  updatePostButtonClicked: false,
  postShowedOnForm: { id: "", title: "", content: "" },
};

const getters = {
  getPosts: (state) => state.posts,
  updatePostButtonClicked: (state) => state.updatePostButtonClicked,
  getPostShowedOnForm: (state) => state.postShowedOnForm,
};

const actions = {
  addPost: ({ commit }, post) => {
    commit("addPost", post);
  },
  removePost: ({ commit }, post_id) => {
    commit("removePost", post_id);
  },
  addButton: ({ commit }) => {
    commit("addButton");
  },
  updateButton: ({ commit }) => {
    commit("updateButton");
  },
  updatePost: ({ commit }, oldPost) => {
    commit("updatePost", oldPost);
  },
  updatePostShowedOnForm: ({ commit }, post) => {
    commit("updatePostShowedOnForm", post);
  },
  updateColor: ({ commit }, post_id) => {
    commit("updateColor", post_id);
  },
};

const mutations = {
  addPost: (state, post) => {
    state.posts.unshift(post);
  },
  removePost: (state, post_id) => {
    const posts = state.posts.filter((post) => post.id !== post_id);
    state.posts = [...posts];
  },
  addButton: (state) => {
    state.updatePostButtonClicked = false;
  },
  updateButton: (state) => {
    state.updatePostButtonClicked = true;
  },
  updatePostShowedOnForm: (state, post) => {
    state.postShowedOnForm = {
      id: post.id,
      title: post.title,
      content: post.content,
    };
  },
  updatePost: (state, oldPost) => {
    state.posts = state.posts.map((post) => {
      if (post.id == oldPost.id) {
        post.id = oldPost.id;
        post.title = oldPost.title;
        post.content = oldPost.content;
        return post;
      } else {
        return post;
      }
    });
  },
  updateColor: (state, post_id) => {
    state.posts = state.posts.map((post) => {
      if (post_id == post.id) {
        post.color = "red";
        return post;
      } else {
        post.color = "#41b883";
        return post;
      }
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import env from "../../../env.js";

const state = {
  posts: [],
  updatePostButtonClicked: false,
  postShowedOnForm: { id: "", title: "", content: "" },
  csrftoken: "",
};

const getters = {
  getPosts: (state) => state.posts,
  updatePostButtonClicked: (state) => state.updatePostButtonClicked,
  getPostShowedOnForm: (state) => state.postShowedOnForm,
  getCSRFToken: (state) => state.csrftoken,
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
  setPosts: ({ commit }, posts) => {
    commit("setPosts", posts);
  },
  setCSRFToken: ({ commit }, csrftoken) => {
    commit("setCSRFToken", csrftoken);
  },
};

const mutations = {
  addPost: (state, post) => {
    let formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    axios
      .post(`${env.DB_URL}/store_post`, {
        title: post.title,
        content: post.content,
      })
      .then((res) => {
        state.posts.unshift(res.data.data);
      })
      .catch((error) => console.log(error));
  },
  removePost: async (state, post_id) => {
    await axios.delete(`${env.DB_URL}/delete_post/${post_id}`);
    const posts = state.posts.filter((post) => post.id !== post_id);
    state.posts = [...posts];
  },
  addButton: (state) => {
    state.updatePostButtonClicked = false;
  },
  updateButton: (state) => {
    state.updatePostButtonClicked = true;
  },
  updatePostShowedOnForm: async (state, post) => {
    state.postShowedOnForm = {
      id: post.id,
      title: post.title,
      content: post.content,
    };
  },
  updatePost: async (state, oldPost) => {
    try {
      // axios.defaults.headers.common["X-CSRF-TOKEN"] = state.csrftoken;
      // axios.defaults.headers.post["anti-csrf-token"] = state.csrftoken;
      // axios.defaults.headers.put["csrf-token"] = state.csrftoken;
      await axios.put(`${env.DB_URL}/update_post/${oldPost.id}`, oldPost, {
        // headers: { "X-CSRF-TOKEN": state.csrftoken },
        headers: {
          // "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": "U0i3ZWcHw1EyDdsBZUjF5WKRNz3VM83uPoso44X1",
        },
      });
    } catch (error) {
      console.log("in error of  updatePost " + state.csrftoken);
    }

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
  setPosts: (state, posts) => {
    state.posts = posts;
  },
  setCSRFToken: (state, csrftoken) => {
    state.csrftoken = csrftoken;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

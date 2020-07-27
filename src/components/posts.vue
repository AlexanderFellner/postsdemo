<template>
  <div class="posts">
    <Post
      v-for="post in getPosts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :content="post.content"
      :color="post.color"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Post from "./post";
import axios from "axios";
import Cookies from "js-cookie";
import env from "../../env.js";

export default {
  name: "posts",
  components: { Post },
  computed: { ...mapGetters(["getPosts"]) },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setPosts", "setCSRFToken"]),
    async fetchPosts() {
      const res = await axios.get(`${env.DB_URL}/posts`);
      // console.log(res.config);
      const csrf = Cookies.get("XSRF-TOKEN");
      console.log("csrf in get" + csrf);
      this.setCSRFToken(csrf);

      const posts = [];
      for (let post of res.data.data) {
        post.color = "#41b883";
        posts.push(post);
      }
      this.setPosts(posts);
      axios.interceptors.request.use(async (request) => {
        try {
          const csrf = Cookies.get("XSRF-TOKEN");
          console.log("csrf " + csrf);
          // this.setCSRFToken(csrf);
          /*  request.withCredentials = true;

          if (csrf) {
            request.headers.common["XSRF-TOKEN"] = csrf;
          } */

          return request;
        } catch (err) {
          throw new Error(
            `axios# Problem with request during pre-flight phase: ${err}.`
          );
        }
      });
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.posts {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
}
</style>

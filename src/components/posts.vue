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

export default {
  name: "posts",
  components: { Post },
  computed: { ...mapGetters(["getPosts"]) },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["removePost"]),
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

#removecross {
  position: absolute;
  right: 0;
  bottom: 0;
  color: rgb(83, 12, 12);
}
</style>

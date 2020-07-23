<template>
  <div id="box"><AddPost /><Posts /></div>
</template>

<script>
import AddPost from "../components/addPost";
import Posts from "../components/posts";
export default { name: "ShowAddPosts", components: { AddPost, Posts } };
</script>

<style scoped></style>

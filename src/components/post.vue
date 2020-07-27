<template>
  <div
    :style="{ backgroundColor: color }"
    @click="postboxActivated()"
    id="postbox"
  >
    <pre>{{ title }}</pre>

    {{ content }}

    <i @click="deletePost(id)" id="removecross" class="fas fa-times"></i>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "post",
  data() {
    return { removePostClicked: false };
  },
  props: { id: String, title: String, content: String, color: String },
  computed: { ...mapGetters(["updatePostButtonClicked"]) },
  methods: {
    ...mapActions([
      "removePost",
      "updatePostShowedOnForm",
      "postboxClicked",
      "updateColor",
    ]),
    deletePost(post_id) {
      this.removePostClicked = true;
      this.removePost(post_id);
    },
    postboxActivated() {
      if (this.removePostClicked == false) {
        const post = {
          id: this.id,
          title: this.title,
          content: this.content,
          color: this.color,
        };

        if (this.updatePostButtonClicked == true) {
          this.updatePostShowedOnForm(post);
          this.updateColor(post.id);
        }
      }
      this.removePostClicked = false;
    },
  },
};
</script>

<style scoped>
#postbox {
  background: #41b883;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
  position: relative;
  color: black;
  white-space: normal;
}
#removecross {
  position: absolute;
  right: 0;
  bottom: 0;
  color: rgb(83, 12, 12);
}
pre {
  word-wrap: break-word; /* IE 5.5-7 */
  white-space: pre-wrap; /* Modern browsers */
}
</style>

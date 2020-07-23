<template>
  <div id="app">
    <div id="nav">
      <router-link
        :style="{ color: homeLinkColor }"
        to="/"
        @click.native="homeLinkClicked()"
        >Home</router-link
      >
      |
      <router-link
        :style="{ color: aboutLinkColor }"
        to="/about"
        @click.native="aboutLinkClicked()"
        >About</router-link
      >|
      <router-link
        :style="{ color: postsLinkColor }"
        to="/posts"
        @click.native="postsLinkClicked()"
        >Posts</router-link
      >
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return { homeLinkColor: "", aboutLinkColor: "", postsLinkColor: "" };
  },
  methods: {
    homeLinkClicked() {
      this.homeLinkColor = "red";
      this.aboutLinkColor = "blue";
      this.postsLinkColor = "blue";
    },
    aboutLinkClicked() {
      this.homeLinkColor = "blue";
      this.aboutLinkColor = "red";
      this.postsLinkColor = "blue";
    },
    postsLinkClicked() {
      this.homeLinkColor = "blue";
      this.aboutLinkColor = "blue";
      this.postsLinkColor = "red";
    },
  },
};
</script>
<style>
@import url("../node_modules/@fortawesome/fontawesome-free/css/all.css");
#app {
  overflow-y: visible;
}
#nav {
  display: flex;
  justify-content: center;
}
</style>

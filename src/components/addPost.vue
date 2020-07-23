<template>
  <div>
    <div id="addupdatebox">
      <button
        :style="{ backgroundColor: backgroundColorAddButton }"
        @click="addButtonClicked()"
        id="addbutton"
      >
        Add</button
      ><button
        :style="{ backgroundColor: backgroundColorUpdateButton }"
        @click="updateButtonClicked()"
      >
        Update
      </button>
    </div>
    <form id="form" @submit="onSubmit">
      <label id="titlelabel" for="title">Title</label>
      <input
        required
        id="title"
        type="text"
        placeholder="Add Title"
        :value="getPostShowedOnForm.title"
      />
      <label id="contentlabel" for="content">Content</label>
      <textarea
        required
        wrap="hard"
        id="content"
        placeholder="Add content"
        :value="getPostShowedOnForm.content"
      ></textarea>
      <input type="submit" id="sendbutton" :value="sendValue" />
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "addPost",
  data() {
    return {
      sendValue: "Add post",
      title: "",
      content: "",
      backgroundColorAddButton: "",
      backgroundColorUpdateButton: "",
      maxlengthTitle: "30",
    };
  },
  computed: {
    ...mapGetters(["getPostShowedOnForm", "postboxClicked"]),
  },
  created() {
    this.backgroundColorAddButton = "red";
  },
  methods: {
    ...mapActions(["addPost", "updatePost", "addButton", "updateButton"]),

    makeLineBreaks(text, BreakSymbol, numberCharsPerLine) {
      let contenttext = "";
      if (text.length > numberCharsPerLine) {
        for (let i = 0; i < text.length; i++) {
          if (i % numberCharsPerLine == 0) {
            if (i + numberCharsPerLine < text.length) {
              //   console.log("i ist " + i);

              //   console.log("j ist " + j);
              const str1 = text.substr(i, numberCharsPerLine);
              //   console.log(str1);
              //   console.log(str1.length);
              const str2 = str1 + "\n";
              contenttext += str2;
            } else {
              contenttext += text.substr(i);
            }
          }
        }
      } else {
        contenttext = text;
      }
      return contenttext;
    },

    onSubmit(e) {
      e.preventDefault();
      let contenttext = this.makeLineBreaks(e.target[1].value, "\n", 40);
      if (e.target[0].value.length > 30) {
        this.$alert(
          "The title is too long.Only a maximum of 30 characters is allowed."
        );
        return;
      }

      if (e.target[1].value.length > 800) {
        this.$alert(
          "The content is too long.Only a maximum of 800 characters is allowed."
        );
        return;
      }
      console.log("Length " + contenttext.length);
      const post = {
        title: e.target[0].value,
        content: contenttext,
      };
      if (this.sendValue == "Add post") {
        post.id = uuidv4();
        this.addPost(post);
      } else {
        post.id = this.getPostShowedOnForm.id;
        this.updatePost(post);
      }
    },
    addButtonClicked() {
      this.sendValue = "Add post";
      this.backgroundColorAddButton = "red";
      this.backgroundColorUpdateButton = "rgb(25, 66, 200)";
      this.addButton();
    },
    updateButtonClicked() {
      this.sendValue = "Update post";
      this.backgroundColorUpdateButton = "red";
      this.backgroundColorAddButton = "rgb(25, 66, 200)";
      this.updateButton();
    },
  },
};
</script>

<style scoped>
#form {
  display: flex;

  flex-direction: column;
  justify-content: flex-start;
  margin: 20px 0px 20px 0px;
}
#addupdatebox {
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
}
#addupdatebox label {
  flex: 10;
}
#addupdatebox button {
  /* margin-bottom: 10px; */
  padding: 5px;
  background-color: rgb(25, 66, 200);
  border: thin solid rgb(25, 66, 200);
  border-radius: 2px;
}
#addbutton {
  margin-right: 10px;
}
#title,
#titlelabel,
#content,
#contentlabel {
  margin-bottom: 10px;
}
#content {
  height: 100px;
}
#sendbutton {
  padding: 5px;
  background-color: rgb(25, 66, 200);
  border: thin solid rgb(25, 66, 200);
  border-radius: 2px;
}
</style>

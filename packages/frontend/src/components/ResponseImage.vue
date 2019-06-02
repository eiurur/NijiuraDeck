<template>
  <span>
    <img
      class="image"
      :src="thumb"
      v-if="!(isShownImage || isShownVideo)"
      @click="showOriginal(img)"
    >
    <img :src="img" class="original" v-if="isShownImage" data-zoomable>
    <video autoplay controls loop :src="img" class="original" v-if="isShownVideo"></video>
  </span>
</template>

<style lang="scss" scoped>
.image {
  cursor: pointer;
  object-fit: contain;
  height: auto;
  width: auto;
  max-height: 320px;
  max-width: 320px;
}
.original {
  width: 100%;
}
</style>

<script>
import mediumZoom from "medium-zoom";
export default {
  name: "ResponseImage",
  props: ["thumb", "img"],
  created() {
    this.isShownImage = false;
    this.isShownVideo = false;
  },
  data() {
    return {
      isShownImage: false,
      isShownVideo: false
    };
  },
  methods: {
    showOriginal(img) {
      var ext = img
        .split(/\#|\?/)[0]
        .split(".")
        .pop()
        .trim();
      var VIDEO_EXTENSIONS = ["mp4", "webm"];
      console.log(img, ext, VIDEO_EXTENSIONS.includes(ext));
      if (VIDEO_EXTENSIONS.includes(ext)) {
        this.isShownVideo = true;
      } else {
        this.isShownImage = true;
      }
    }
  },
  updated() {
    Array.from(
      document.querySelectorAll("[data-zoomable]:not(.medium-zoom-image)")
    ).map(img => {
      img.onload = () => {
        mediumZoom(img);
      };
    });
  }
};
</script>
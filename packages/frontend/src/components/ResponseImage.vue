<template>
  <span :data-orig="orig">
    <img
      class="image"
      :src="thumb"
      v-if="!(isShownImage || isShownVideo)"
      @click="showOriginal(img)"
    />
    <img :src="img" class="original" v-if="isShownImage" data-zoomable />
    <video
      ref="video"
      autoplay
      controls
      loop
      :src="img"
      class="original"
      v-if="isShownVideo"
    ></video>
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
import mediumZoom from 'medium-zoom';

export default {
  name: 'ResponseImage',
  props: ['thumb', 'img', 'orig'],
  created() {
    this.isShownImage = false;
    this.isShownVideo = false;
  },
  data() {
    return {
      isShownImage: false,
      isShownVideo: false,
    };
  },
  methods: {
    showOriginal(img) {
      const ext = img
        .split(/#|\?/)[0]
        .split('.')
        .pop()
        .trim();
      const VIDEO_EXTENSIONS = ['mp4', 'webm'];
      if (VIDEO_EXTENSIONS.includes(ext)) {
        this.isShownVideo = true;
      } else {
        this.isShownImage = true;
      }
      this.onScroll();
    },
    onScroll() {
      console.log(this.isShownVideo);
      if (!this.isShownVideo) return;
      // Prevent error: TypeError: Failed to execute 'observe' on 'IntersectionObserver': parameter 1 is not of type 'Element'." vue refs
      setTimeout(() => {
        this.observer = new IntersectionObserver(entries => {
          if (entries[0].intersectionRatio <= 0) {
            this.$refs.video.pause();
          }
        });
        this.observer.observe(this.$refs.video);
      }, 100);
    }
  },
  updated() {
    Array.from(
      document.querySelectorAll('[data-zoomable]:not(.medium-zoom-image)'),
    ).map(img => {
      img.onload = () => {
        mediumZoom(img, { background: '#000' });
      };
    });
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
};
</script>

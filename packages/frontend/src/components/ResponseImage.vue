<template>
  <div :data-orig="orig" v-if="thumb">
    <div class="media-wrapper" v-if="!(isShownImage || isShownVideo)">
      <img
        class="image"
        loading="lazy"
        :src="thumb"
        @click="showOriginal(img)"
      />
      <span class="media-type-marker">
        <i v-if="!hasVideo" class="el-icon-picture-outline"></i>
        <i v-if="hasVideo" class="el-icon-video-camera"></i>
      </span>
    </div>
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
  </div>
</template>

<style lang="scss" scoped>
.media-wrapper {
  position: relative;
  display: inline-block;
}
.media-type-marker {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  padding: 0.15em 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
  color: #eee;
  line-height: 1.4;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
}
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

const VIDEO_EXTENSIONS = ['mp4', 'webm'];

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
      observer: null,
    };
  },
  computed: {
    ext() {
      if (!this.img) return '';
      return this.img
        .split(/#|\?/)[0]
        .split('.')
        .pop()
        .trim();
    },
    thumbClass() {
      if (this.hasVideo) return 'has-video';
      return 'has-image';
    },
    hasVideo() {
      return VIDEO_EXTENSIONS.includes(this.ext);
    },
  },
  methods: {
    showOriginal() {
      if (this.hasVideo) {
        this.isShownVideo = true;
      } else {
        this.isShownImage = true;
      }
      this.onScroll();
    },
    onScroll() {
      if (!this.isShownVideo) return;
      // Prevent error: TypeError: Failed to execute 'observe' on 'IntersectionObserver': parameter 1 is not of type 'Element'." vue refs
      setTimeout(() => {
        this.observer = new IntersectionObserver((entries) => {
          if (entries[0].intersectionRatio <= 0) {
            this.$refs.video.pause();
          }
        });
        this.observer.observe(this.$refs.video);
      }, 100);
    },
  },
  updated() {
    Array.from(
      document.querySelectorAll('[data-zoomable]:not(.medium-zoom-image)')
    ).map((img) => {
      img.onload = () => {
        mediumZoom(img, { background: '#000' });
      };
    });
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>

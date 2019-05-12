<template>
  <div ref="scrollable" :gutter="10" class="container scrollable half">
    <div
      v-for="{ id, name, quote, res, img, thumb, createdAt } in responses"
      :key="id"
      class="response"
    >
      <ResponseImage :thumb="thumb" :img="img"></ResponseImage>
      <div class="responseBody">
        <div v-if="quote" class="quote">{{ quote }}</div>
        <div class="res">{{ res }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scopedd>
.scrollable {
  overflow-y: auto;
  height: calc(100vh - 25vh);
  background: #fbfbec;
}
.catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.half {
  width: 50%;
}
.response {
  background: #eddbd1;
  color: #666;
  font-size: 14px;
  margin: 1rem;
  display: flex;
}
.image {
  cursor: pointer;
  object-fit: contain;
  height: auto;
  width: auto;
  max-height: 200px;
  max-width: 200px;
}
.responseBody {
  margin: 1rem;
  background: #eddbd1;
  // width: 100%;
}
.name {
}
.quote {
  color: rgb(120, 153, 34);
}
</style>

<script>
import ResponseImage from "@/components/ResponseImage.vue"; // @ is an alias to /src

export default {
  name: "ResponseList",
  components: {
    ResponseImage
  },
  props: ["responses"],
  updated() {
    this.$refs.scrollable.scrollTop = 0;
  }
};
</script>
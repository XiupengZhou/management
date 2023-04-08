<template>
  <h3 class="contentTitle">
    <span class="type" v-show="info.type">{{ info.type }} / </span>
    <span class="text">{{ info.text }}</span>
    <span class="msg" v-show="info.msg"> - {{ info.msg }}</span>
    <!-- <a v-if="info.a" :href="info.a.href">{{ info.a.text }}</a> -->
  </h3>
</template>

<script>
export default {
  name: "contentTitle",
  props: {
    info: Object,
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.contentTitle {
  height: 56px;
  padding-left: 16px;
  background: #fff;
  line-height: 56px;
  font-size: 16px;
  color: #b1b1b1;

  .text {
    color: #121212;
    font-weight: 600;
  }

  .msg {
    font-size: 14px;
    color: #303133;
  }

  a {
    color: #22507f;
    text-decoration: underline;
    font-size: 14px;
  }
}
</style>

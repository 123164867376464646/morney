<template>
  <div id="app">
    <router-view />
    <div class="qrcode-wrapper">
      <div @click="close">
        <Icon name="close" class="close" />
      </div>
      <img class="qrcode" src="./assets/qrcode.png" alt="二维码" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Icon from "./components/Icon.vue";
export default Vue.extend({
  components: { Icon },
  methods: {
    close() {
      const div = document.getElementsByClassName("qrcode-wrapper")[0];
      div.classList.add("closed");
    },
  },
});
</script>

<style lang="scss">
@import "~@/assets/styles/reset.scss";
@import "~@/assets/styles/helper.scss";

body {
  font-family: $font-hei;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 16px;
  background: #f5f5f5;
}
@media screen and (max-width: 500px) {
  .qrcode-wrapper {
    display: none;
  }
}
.qrcode-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .close {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 0;
  }
  .close:hover {
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.4);
    border-radius: 25%;
  }
  .qrcode {
    max-width: 350px;
    max-height: 350px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
}
.closed {
  display: none;
}
</style>

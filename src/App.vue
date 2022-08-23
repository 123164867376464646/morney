<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="js">
import store from "@/store/index2";

export default {
  data() {
    return {
      store: store
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/reset.scss';
@import '~@/assets/styles/helper.scss';

body {
  font-family: $font-hei;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 16px;
  background: #f5f5f5;

}

</style>

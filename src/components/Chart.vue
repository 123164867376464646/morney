<template>
  <div class="chart-wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: any;
  chart?: any;

  mounted() {
    if(this.options === undefined) {
      return console.log('options 为空');
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }

  @Watch('options')
  onOptionsChange() {
    return this.chart.setOption(this.options);

  }
}
</script>

<style scoped lang="scss">
.chart-wrapper {
  height: 400px;
}
</style>
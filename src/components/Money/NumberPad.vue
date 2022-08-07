<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons clearfix">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  output = '0';

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const input = button.textContent!;
    if (this.output.length > 16) {return;}
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {return;}
    this.output += input;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  remove() {
    const x = this.output.substring(0, this.output.length - 1);
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = x;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  clear() {
    this.output = '0';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/explicit-module-boundary-types
  ok() {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/helper.scss';

.numberPad {
  > .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }

  > .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 64px*2;
        float: right;
      }

      &.zero {
        width: 25*2%;
      }

      $bg: #f8e3bc;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4%*2);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
        background: darken($bg, 4%*3);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4%*4);

      }

      &:nth-child(14) {
        background: darken($bg, 4%*5);

      }

      &:nth-child(12) {
        background: darken($bg, 4%*6);

      }

      &:nth-child(14) {
        background: darken($bg, 4%*5);

      }
    }

  }
}

</style>
<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>{{ lowLabel }}</div>
      <div>-</div>
      <div>{{ highLabel }}</div>
    </div>
    <div class="beer-color-gradient-bar rounded w-100" :style="style">
      <div v-if="value" class="beer-color-gradient-bar-marker" :style="markerStyle"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { srmToRgb, srmToEbc } from '../lib';

export default {
  props: {
    low: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      default: null,
    },
  },

  computed: {
    ...mapState([
      'useEbc',
    ]),
    lowLabel() {
      if (this.useEbc) {
        return srmToEbc(this.low);
      }
      return this.low;
    },
    highLabel() {
      if (this.useEbc) {
        return srmToEbc(this.high);
      }
      return this.high;
    },
    colorLow() {
      return `#${srmToRgb(this.low)}`;
    },
    colorHigh() {
      return `#${srmToRgb(this.high)}`;
    },
    percentage() {
      if (!this.low || !this.high || !this.value) {
        return null;
      }
      const normalizedMax = this.high - this.low;
      const normalizedVal = this.value - this.low;
      return `${Math.round((normalizedVal / normalizedMax) * 100)}%`;
    },
    style() {
      return {
        background: `linear-gradient(to right, ${this.colorLow}, ${this.colorHigh})`,
      };
    },
    markerStyle() {
      return {
        left: this.percentage,
      };
    },
  },
};
</script>

<style>
  .beer-color-gradient-bar {
    height: 20px;
    position: relative;
  }
  .beer-color-gradient-bar-marker {
    width: 2px;
    height: 100%;
    background-color: black;
    position: absolute;
  }
</style>

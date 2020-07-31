<template>
  <div>
    <div class="d-md-flex justify-content-between small">
      <div>{{ low }}</div>
      <div>-</div>
      <div>{{ high }}</div>
    </div>
    <div class="range-bar rounded w-100" :style="style">
      <div v-if="value" class="range-bar-marker" :style="markerStyle"></div>
    </div>
  </div>
</template>

<script>
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
      required: true,
    },
  },

  computed: {
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
        background: 'linear-gradient(to right, #eee, #ddd)',
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

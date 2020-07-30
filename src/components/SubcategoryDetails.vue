<template>
  <div>
    <template v-if="subcategory.impression">
      <h5>Impression</h5>
      <p>{{ subcategory.impression[0] }}</p>
    </template>

    <template v-if="subcategory.aroma">
      <h5>Aroma</h5>
      <p>{{ subcategory.aroma[0] }}</p>
    </template>

    <template v-if="subcategory.appearance">
      <h5>Appearance</h5>
      <p>{{ subcategory.appearance[0] }}</p>
    </template>

    <template v-if="subcategory.flavor">
      <h5>Flavor</h5>
      <p>{{ subcategory.flavor[0] }}</p>
    </template>

    <template v-if="subcategory.mouthfeel">
      <h5>Mouthfeel</h5>
      <p>{{ subcategory.mouthfeel[0] }}</p>
    </template>

    <template v-if="subcategory.comments">
      <h5>Comments</h5>
      <p>{{ subcategory.comments[0] }}</p>
    </template>

    <template v-if="subcategory.history">
      <h5>History</h5>
      <p>{{ subcategory.history[0] }}</p>
    </template>

    <template v-if="subcategory.ingredients">
      <h5>Characteristic Ingredients</h5>
      <p>{{ subcategory.ingredients[0] }}</p>
    </template>

    <template v-if="subcategory.comparison">
      <h5>Style Comparison</h5>
      <p>{{ subcategory.comparison[0] }}</p>
    </template>

    <template v-if="subcategory.examples">
      <h5>Commercial Examples</h5>
      <p>{{ subcategory.examples[0] }}</p>
    </template>

    <template v-if="subcategory.tags">
      <h5>Tags</h5>
      <p>{{ subcategory.tags[0] }}</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    subcategory: {
      type: Object,
      required: true,
    },
  },
};
</script>

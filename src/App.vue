<template>
  <div id="app">
    <b-container fluid class="mt-4">
      <b-row>
        <b-col>
          <div class="text-center">
            <h1>Beer Style Calculator</h1>
            <p>
              This calculator makes use of
              <a href="https://github.com/meanphil/bjcp-guidelines-2015" target="_blank">Meanphil's XML-port</a>
              of the <a href="https://bjcp.org/stylecenter.php" target="_blank">BJCP Guidelines 2015</a>.
            </p>
            <p>The source code of this simple application is available at <a href="https://github.com/rbresjer/BeerStyleCalculator" target="_blank">GitHub</a>.</p>
          </div>

          <Form />
        </b-col>
      </b-row>

      <Results />

      <div v-if="isLoading">
        <div class="spinner-border text-primary"></div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Form from './components/Form.vue';
import Results from './components/Results.vue';

export default {
  components: {
    Form,
    Results,
  },

  computed: {
    ...mapState([
      'isLoading',
    ]),
  },

  mounted() {
    this.$store.dispatch('fetchData');
  },
};
</script>

<style>
  .beer-color {
    width: 30px;
    height: 30px;
  }
</style>

<template>
  <div class="card card-body rounded shadow mx-auto w-50 my-5">
    <b-row class="my-1">
      <b-col class="text-center">
        <b-form-group>
          <b-form-radio-group v-model="useEbc">
            <b-form-radio :value="true">EBC</b-form-radio>
            <b-form-radio :value="false">SRM</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col cols="2">
        <label class="col-form-label" for="ibu">IBU</label>
      </b-col>
      <b-col cols="10">
        <b-form-input
          id="ibu"
          v-model="ibu"
          type="number"
          placeholder="E.g. 30.1"
          step="0.01"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="2">
        <label class="col-form-label" for="og">OG</label>
      </b-col>
      <b-col cols="10">
        <b-form-input
          id="og"
          v-model="og"
          type="number"
          placeholder="E.g. 1.070"
          step="0.01"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="2">
        <label class="col-form-label" for="fg">FG</label>
      </b-col>
      <b-col cols="10">
        <b-form-input
          id="fg"
          v-model="fg"
          type="number"
          placeholder="E.g. 1.010"
          step="0.01"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="2">
        <label class="col-form-label" for="ebc">EBC</label>
      </b-col>
      <b-col cols="10" class="d-flex align-items-center">
        <b-form-input
          id="ebc"
          v-model="ebc"
          type="number"
          :readonly="!useEbc"
          placeholder="E.g. 12.2"
          step="0.01"
        ></b-form-input>
        <div
          v-if="beerColor && useEbc"
          class="beer-color rounded ml-2"
          :style="{ backgroundColor: `#${beerColor}` }"
        ></div>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="2">
        <label class="col-form-label" for="srm">SRM</label>
      </b-col>
      <b-col cols="10" class="d-flex align-items-center">
        <b-form-input
          id="srm"
          v-model="srm"
          type="number"
          :readonly="useEbc"
          placeholder="E.g. 5.5"
          step="0.01"
        ></b-form-input>
        <div
          v-if="beerColor && !useEbc"
          class="beer-color rounded ml-2"
          :style="{ backgroundColor: `#${beerColor}` }"
        ></div>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="2">
        <label class="col-form-label" for="abv">ABV</label>
      </b-col>
      <b-col cols="10">
        <b-form-input
          id="abv"
          v-model="abv"
          type="number"
          placeholder="E.g. 5.2"
          step="0.1"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="2"></b-col>
      <b-col cols="10">
        <b-form-checkbox v-model="showFlexible" name="check-button" switch>
          Match flexible
        </b-form-checkbox>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col cols="2"></b-col>
      <b-col>
        <button class="btn btn-primary" @click="resetFilters">Reset</button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { srmToRgb } from '../lib';

export default {
  computed: {
    useEbc: {
      get() {
        return this.$store.state.useEbc;
      },
      set(val) {
        this.$store.commit('setUseEbc', val);
      },
    },
    ibu: {
      get() {
        return this.$store.state.filters.ibu;
      },
      set(val) {
        this.$store.commit('setFilters', { ibu: val });
      },
    },
    og: {
      get() {
        return this.$store.state.filters.og;
      },
      set(val) {
        this.$store.commit('setFilters', { og: val });
      },
    },
    fg: {
      get() {
        return this.$store.state.filters.fg;
      },
      set(val) {
        this.$store.commit('setFilters', { fg: val });
      },
    },
    ebc: {
      get() {
        return this.$store.state.filters.ebc;
      },
      set(val) {
        this.$store.commit('setFilters', { ebc: val });
      },
    },
    srm: {
      get() {
        return this.$store.state.filters.srm;
      },
      set(val) {
        this.$store.commit('setFilters', { srm: val });
      },
    },
    abv: {
      get() {
        return this.$store.state.filters.abv;
      },
      set(val) {
        this.$store.commit('setFilters', { abv: val });
      },
    },
    showFlexible: {
      get() {
        return this.$store.state.showFlexible;
      },
      set(val) {
        this.$store.commit('setShowFlexible', val);
      },
    },

    beerColor() {
      if (!this.srm) {
        return null;
      }
      return srmToRgb(this.srm);
    },
  },

  methods: {
    ...mapMutations([
      'resetFilters',
    ]),
  },
};
</script>

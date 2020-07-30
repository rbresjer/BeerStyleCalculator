/* eslint-disable max-len */

import Vue from 'vue';
import Vuex from 'vuex';
import xml2js from 'xml2js';
import { srmToEbc, ebcToSrm } from '../lib';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    categories: null,

    useEbc: true,
    showFlexible: true,

    filters: {
      ibu: null,
      og: null,
      fg: null,
      srm: null,
      abv: null,
    },
  },

  getters: {
    filteredCategories: (state) => {
      if (!state.categories) {
        return null;
      }

      const filterStat = (subcategory, type) => {
        const filterValue = state.filters[type];
        if (!filterValue) {
          return true;
        }

        const stat = subcategory.stats[0][type][0];
        const showFlexible = state.showFlexible;

        const float = Number.parseFloat(filterValue);
        const low = Number.parseFloat(stat.low);
        const high = Number.parseFloat(stat.high);

        if (float < low) {
          return false;
        }
        if (float > high) {
          return false;
        }
        if (!showFlexible && stat.$.flexible === 'true') {
          return false;
        }

        return true;
      };

      return state.categories.map((category) => {
        const filteredSubcategory = category.subcategory.filter((subcategory) => {
          if (!filterStat(subcategory, 'ibu')) {
            return false;
          }
          if (!filterStat(subcategory, 'og')) {
            return false;
          }
          if (!filterStat(subcategory, 'fg')) {
            return false;
          }
          if (!filterStat(subcategory, 'srm')) {
            return false;
          }
          if (!filterStat(subcategory, 'abv')) {
            return false;
          }

          return true;
        });

        if (filteredSubcategory.length === 0) {
          return null;
        }

        return {
          ...category,
          subcategory: filteredSubcategory,
        };
      }).filter((category) => category != null);
    },
  },

  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },

    setCategories(state, categories) {
      state.categories = categories;
    },

    setUseEbc(state, useEbc) {
      state.useEbc = useEbc;
    },

    setShowFlexible(state, showFlexible) {
      state.showFlexible = showFlexible;
    },

    setFilters(state, filters) {
      const calcFilter = {};
      if ('ebc' in filters) {
        calcFilter.srm = filters.ebc ? ebcToSrm(filters.ebc) : null;
      }
      if ('srm' in filters) {
        calcFilter.ebc = filters.srm ? srmToEbc(filters.srm) : null;
      }
      state.filters = {
        ...state.filters,
        ...filters,
        ...calcFilter,
      };
    },

    resetFilters(state) {
      state.filters = {
        ibu: null,
        og: null,
        fg: null,
        srm: null,
        abv: null,
      };
    },

  },

  actions: {
    async fetchData({ commit }) {
      commit('setIsLoading', true);

      const response = await fetch('https://raw.githubusercontent.com/meanphil/bjcp-guidelines-2015/master/styleguide.xml');
      const xml = await response.text();
      const { styleguide } = await xml2js.parseStringPromise(xml);
      const { category: categories } = styleguide.class.find((el) => el.$.type === 'beer');
      commit('setCategories', categories);

      commit('setIsLoading', false);
    },
  },

  modules: {
  },
});

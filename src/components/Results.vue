<template>
  <div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">IBU</th>
          <th scope="col">OG</th>
          <th scope="col">FG</th>
          <th scope="col">
            <template v-if="useEbc">EBC</template>
            <template v-else>SRM</template>
          </th>
          <th scope="col">ABV</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!isLoading && filteredCategories && filteredCategories.length === 0">
          <td colspan="6">
            <div class="alert alert-warning text-center">
              No matching styles
            </div>
          </td>
        </tr>
        <template v-else v-for="category in filteredCategories">
          <tr :key="category.$.id">
            <td colspan="6" class="pt-3">
              <strong>{{ category.name[0] }}</strong>
            </td>
          </tr>
          <template v-for="subcategory in category.subcategory">
            <tr :key="`${subcategory.$.id}-stats`">
              <td>
                <a
                  href="#"
                  @click.prevent="toggleDetailsForSubcategoryId(subcategory.$.id)"
                  :class="{ 'font-weight-bold' : showDetailsForSubcategoryId === subcategory.$.id }"
                >
                  <template v-if="showDetailsForSubcategoryId === subcategory.$.id">
                    -
                  </template>
                  <template v-else>
                    +
                  </template>
                  {{ subcategory.name[0] }}
                </a>
              </td>
              <td>
                <RangeBar
                  v-if="subcategory.stats[0].ibu
                    && subcategory.stats[0].ibu[0].low
                    && subcategory.stats[0].ibu[0].high"
                  :low="Number.parseFloat(subcategory.stats[0].ibu[0].low)"
                  :high="Number.parseFloat(subcategory.stats[0].ibu[0].high)"
                  :value="Number.parseFloat(filters.ibu)"
                />
                <template v-else>
                  Flexible
                </template>
              </td>
              <td>
                <RangeBar
                  v-if="subcategory.stats[0].og
                    && subcategory.stats[0].og[0].low
                    && subcategory.stats[0].og[0].high"
                  :low="Number.parseFloat(subcategory.stats[0].og[0].low)"
                  :high="Number.parseFloat(subcategory.stats[0].og[0].high)"
                  :value="Number.parseFloat(filters.og)"
                />
                <template v-else>
                  Flexible
                </template>
              </td>
              <td>
                <RangeBar
                  v-if="subcategory.stats[0].fg
                    && subcategory.stats[0].fg[0].low
                    && subcategory.stats[0].fg[0].high"
                  :low="Number.parseFloat(subcategory.stats[0].fg[0].low)"
                  :high="Number.parseFloat(subcategory.stats[0].fg[0].high)"
                  :value="Number.parseFloat(filters.fg)"
                />
                <template v-else>
                  Flexible
                </template>
              </td>
              <td>
                <BeerColorGradientBar
                  v-if="subcategory.stats[0].srm[0].low && subcategory.stats[0].srm[0].high"
                  :low="Number.parseFloat(subcategory.stats[0].srm[0].low)"
                  :high="Number.parseFloat(subcategory.stats[0].srm[0].high)"
                  :value="Number.parseFloat(filters.srm)"
                />
              </td>
              <td>
                <RangeBar
                  v-if="subcategory.stats[0].abv
                    && subcategory.stats[0].abv[0].low
                    && subcategory.stats[0].abv[0].high"
                  :low="Number.parseFloat(subcategory.stats[0].abv[0].low)"
                  :high="Number.parseFloat(subcategory.stats[0].abv[0].high)"
                  :value="Number.parseFloat(filters.abv)"
                />
                <template v-else>
                  Flexible
                </template>
              </td>
            </tr>
            <tr
              v-if="showDetailsForSubcategoryId === subcategory.$.id"
              :key="`${subcategory.$.id}-details`"
            >
              <td colspan="6" class="pt-3">
                <SubcategoryDetails :subcategory="subcategory" />
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import RangeBar from './RangeBar.vue';
import BeerColorGradientBar from './BeerColorGradientBar.vue';
import SubcategoryDetails from './SubcategoryDetails.vue';

export default {
  components: {
    RangeBar,
    BeerColorGradientBar,
    SubcategoryDetails,
  },

  data() {
    return {
      showDetailsForSubcategoryId: null,
    };
  },

  computed: {
    ...mapGetters([
      'filteredCategories',
    ]),
    ...mapState([
      'isLoading',
      'useEbc',
      'filters',
    ]),
  },

  methods: {
    toggleDetailsForSubcategoryId(id) {
      if (this.showDetailsForSubcategoryId === id) {
        this.showDetailsForSubcategoryId = null;
      } else {
        this.showDetailsForSubcategoryId = id;
      }
    },
  },
};
</script>

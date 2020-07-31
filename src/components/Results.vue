<template>
  <div>
    <b-row class="font-weight-bold border-bottom">
      <b-col lg="4">
        Name
      </b-col>
      <b-col lg="8">
        <b-row>
          <b-col>
            IBU
          </b-col>
          <b-col>
            OG
          </b-col>
          <b-col>
            FG
          </b-col>
          <b-col>
            <template v-if="useEbc">EBC</template>
            <template v-else>SRM</template>
          </b-col>
          <b-col>
            ABV
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row
      v-if="isLoading"
      class="mt-3"
    >
      <b-col>
        <div class="spinner-border text-primary"></div>
      </b-col>
    </b-row>

    <b-row
      v-else-if="filteredCategories && filteredCategories.length === 0"
      class="mt-3"
    >
      <b-col>
        No matching styles
      </b-col>
    </b-row>

    <template
      v-else
      v-for="category in filteredCategories"
    >
      <b-row :key="category.$.id" class="mt-3">
        <b-col>
          <strong>{{ category.name[0] }}</strong>
        </b-col>
      </b-row>

      <template v-for="subcategory in category.subcategory">
        <b-row :key="`${subcategory.$.id}-stats`" class="align-items-center mb-3">
          <b-col lg="4">
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
          </b-col>
          <b-col lg="8">
            <b-row>
              <b-col>
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
              </b-col>
              <b-col>
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
              </b-col>
              <b-col>
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
              </b-col>
              <b-col>
                <BeerColorGradientBar
                  v-if="subcategory.stats[0].srm[0].low && subcategory.stats[0].srm[0].high"
                  :low="Number.parseFloat(subcategory.stats[0].srm[0].low)"
                  :high="Number.parseFloat(subcategory.stats[0].srm[0].high)"
                  :value="Number.parseFloat(filters.srm)"
                />
              </b-col>
              <b-col>
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
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row
          v-if="showDetailsForSubcategoryId === subcategory.$.id"
          :key="`${subcategory.$.id}-details`"
          class="my-3"
        >
          <b-col offset="1" cols="10" class="rounded border shadow p-3">
            <SubcategoryDetails :subcategory="subcategory" />
          </b-col>
        </b-row>
      </template>
    </template>
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

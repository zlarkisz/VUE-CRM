<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency('UAH') }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">There are no categories.
      <router-link to="/categories">Add new category</router-link>
    </p>

    <section v-else>
      <div
        v-for="cat in categories"
        :key="cat.id"
      >
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend | currency('UAH') }} из {{ cat.limit | currency('UAH') }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              :class="[
                'determinate',
                cat.progressColor
              ]"
              :style="{ width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import currencyFilter from '@/filters/currency.filter'

  export default {
    name: 'Planing',

    data() {
      return {
        loading: true,
        categories: []
      }
    },

    computed: {
      ...mapGetters(['info'])
    },

    async mounted() {
      const records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

      this.categories = categories.map(cat => {
        const spend = records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)

        const percent = 100 * spend / cat.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'

        const tooltipValue = cat.limit - spend
        const tooltip = `${tooltipValue < 0 ? 'Rised on' : 'Left'} ${currencyFilter(Math.abs(tooltipValue), 'EUR')}`

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      })

      this.loading = false
    }
  }
</script>

<style scoped>

</style>

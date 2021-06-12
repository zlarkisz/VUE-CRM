<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Amount</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, i) in records"
      :key="record.id">
        <td>{{ i + 1 }}</td>
        <td>{{ record.amount | currency('UAH') }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span :class="['white-text', 'badge', record.typeClass]">{{ record.typeText }}</span>
        </td>
        <td>
          <button
            v-tooltip="'watch the record'"
            class="btn-small btn"
            @click="$router.push(`/detail/${record.id}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'HistoryTable',

    props: {
      records: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

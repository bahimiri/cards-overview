<template>
  <div class="amount-filter">
    <p>You can filter transactions by entering a minimum amount.</p>
    <label :for="id">Minimum transaction amount</label>
    <input v-model="filterValue" type="number" :id="id" @input="filterTransactions()">
  </div>
</template>

<script setup lang="ts">
import { useCardsStore } from '@/stores/cards';
import useUID from '@/composables/useUID';
import { ref } from 'vue';

const filterValue = ref(0)
const filterTransactions = () => {
  useCardsStore().setFilterValue(filterValue.value)
}

const id = `input-${useUID().generateId()}`

</script>

<style lang="scss" scoped>
.amount-filter {
  label {
    display: block;
  }

  p {
    margin-bottom: 0.5rem;
  }
}
</style>
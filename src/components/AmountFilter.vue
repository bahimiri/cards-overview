<template>
  <div class="amount-filter">
    <p>You can optionally filter transactions by entering a minimum amount.</p>
    <label :for="id">Minimum transaction amount</label>
    <input
        v-model="filterValue"
        type="number"
        :id="id"
        @input="filterTransactions()">
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

const id = `input-${ useUID().generateId() }`

</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.amount-filter {
  margin-bottom: 2.5rem;

  label {
    display: block;
  }

  input {
    display: block;
    width: 100%;
    padding: 16px 24px;
    border-radius: $border-radius-sm;
    background-color: var(--color-background);
    color: var(--color-foreground);
    border-color: var(--color-foreground);
  }

  p {
    margin-bottom: 0.5rem;
  }
}
</style>
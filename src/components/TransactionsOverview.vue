<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/cards';
import SimpleCard from '@/components/SimpleCard.vue';
import AmountFilter from '@/components/AmountFilter.vue';

const cardsStore = useCardsStore()
const { filteredTransactions } = storeToRefs(cardsStore)

const amountFormatter = new Intl.NumberFormat(navigator.language, {
  style: 'currency',
  currency: 'EUR',
});
</script>

<template>
  <div>
    <h2>Transactions</h2>

    <AmountFilter />

    <ul class="transactions-overview" aria-live="polite">
      <li v-for="transaction in filteredTransactions" :key="transaction.id">
        <SimpleCard>
          <div class="transaction">
            <span>{{ transaction.description }}</span>
            <span>{{ amountFormatter.format(transaction.amount) }}</span>
          </div>
        </SimpleCard>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.transactions-overview {

  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .transaction {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }
}
</style>
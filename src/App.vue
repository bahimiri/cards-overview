<script setup lang="ts">
import AmountFilter from '@/components/AmountFilter.vue';
import TransactionsOverview from '@/components/TransactionsOverview.vue';
import CardSelection from '@/components/CardSelection.vue';
</script>

<template>
  <header>
    <h1>Transaction Overview</h1>
    <CardSelection />
  </header>
  <main>
    <AmountFilter />

    <TransactionsOverview />
  </main>
</template>

<style scoped>
header {
  margin-bottom: 2.5rem;
}
</style>

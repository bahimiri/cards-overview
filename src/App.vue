<script setup lang="ts">
import AmountFilter from '@/components/AmountFilter.vue';
import TransactionsOverview from '@/components/TransactionsOverview.vue';
import CardSelection from '@/components/CardSelection.vue';
</script>

<template>
  <header>
    <h1>Transaction Overview</h1>
    <p>Choose the card for which you want to see your transactions:</p>
    <CardSelection />
  </header>
  <main>
    <AmountFilter />
    <TransactionsOverview />
  </main>
</template>

<style scoped>
</style>

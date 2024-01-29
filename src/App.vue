<script setup lang="ts">
import TransactionsOverview from '@/components/TransactionsOverview.vue';
import CardSelection from '@/components/CardSelection.vue';
</script>

<template>
  <header>
    <h1>Transaction Overview</h1>
    <CardSelection />
  </header>
  <main>
    <TransactionsOverview />
  </main>
</template>

<style scoped>
header {
  margin-bottom: 2.5rem;
}
</style>

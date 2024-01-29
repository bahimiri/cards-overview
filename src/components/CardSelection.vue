<script setup lang="ts">
import { useCardsStore } from '@/stores/cards';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import CardView from './CardView.vue';

const cardsStore = useCardsStore()
const { cards } = storeToRefs(cardsStore)

onBeforeMount(async () => {
  await cardsStore.fetchCards()
})

</script>

<template>
  <div>
    <CardView v-for="card in cards"
              :card="card"
              />
  </div>
</template>


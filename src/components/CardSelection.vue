<script setup lang="ts">
import { useCardsStore } from '@/stores/cards';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import CardView from './CardView.vue';

const cardsStore = useCardsStore()
const { cards, selectedCard } = storeToRefs(cardsStore)

onBeforeMount(async () => {
  await cardsStore.fetchCards()
})

</script>

<template>
  <fieldset>
    <legend>Choose the card for which you want to see your transactions:</legend>

    <CardView v-for="card in cards"
              :key="card.id"
              :card="card"
              :is-selected="card.id === selectedCard?.id"
              radio-group-name="cards-selection"
              @card-selected="cardsStore.selectCard(card)"
    />
  </fieldset>
</template>


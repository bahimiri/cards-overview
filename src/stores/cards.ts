import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Card } from '@/api';
import { getCards } from '@/api';

export const useCardsStore = defineStore('cards', () => {
  const cards = ref<Array<Card>>([])

  const fetchCards = async (): Promise<void> => {
    cards.value = await getCards();
  }

  return {
    cards,
    fetchCards,
  }
})

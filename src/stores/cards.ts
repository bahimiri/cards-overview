import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Card, Transaction } from '@/api';
import { getCards, getTransactions } from '@/api';

export const useCardsStore = defineStore('cards', () => {
  const cards = ref<Array<Card>>([])
  const selectedCard = ref<Card | null>(null)

  const fetchCards = async (): Promise<void> => {
    try {
      cards.value = await getCards();
      if (cards.value.length) {
        await selectCard(cards.value[0])
      }
    } catch (e) {
      console.error('Could not fetch cards', e)
      cards.value = []
      await selectCard(null)
    }
  }

  const selectCard = async (card: Card | null): Promise<void> => {
    selectedCard.value = card;
    setFilterValue(0)
    if (card) {
      await fetchTransactions(card.id)
    }
  }

  const transactions = ref<Array<Transaction>>([])
  const fetchTransactions = async (cardId: string): Promise<void> => {
    try {
      transactions.value = await getTransactions(cardId)
    } catch (e) {
      console.error('Could not fetch transactions', e)
      transactions.value = []
    }
  }

  const transactionFilterValue = ref(0)
  const setFilterValue = (value: number | null) => {
    transactionFilterValue.value = value || 0
  }
  const filteredTransactions = computed(() => {
    return transactions.value.filter(transaction => transaction.amount >= transactionFilterValue.value)
  })

  return {
    cards,
    fetchCards,
    selectedCard,
    selectCard,
    filteredTransactions,
    transactionFilterValue,
    setFilterValue,
  }
})

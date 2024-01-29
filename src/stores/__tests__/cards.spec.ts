import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { MockedFunction } from 'vitest'
import type { Card } from '@/api';
import { useCardsStore } from '@/stores/cards';
import { createPinia, setActivePinia } from 'pinia';
import { getCards, getTransactions } from '@/api';

vi.mock('@/api', () => ({
  getCards: vi.fn(),
  getTransactions: vi.fn()
}))

describe('store: cards', () => {

  let cardsStore: ReturnType<typeof useCardsStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    cardsStore = useCardsStore();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  })

  describe('.fetchCards', () => {

    it('fetches cards and selects the first one', async () => {
      const cards: Array<Card> = [{ id: '1', description: 'desc1' }, { id: '2', description: 'desc2' }]
      ;(getCards as MockedFunction<typeof getCards>).mockResolvedValue(cards)
      await cardsStore.fetchCards()

      expect(cardsStore.cards).toEqual(cards)
      expect(cardsStore.selectedCard).toEqual(cards[0])
    })

    it('on error resets cards', async () => {
      cardsStore.cards = [{ id: '1', description: 'desc1' }, { id: '2', description: 'desc2' }]
      await cardsStore.selectCard(cardsStore.cards[0])
      ;(getCards as MockedFunction<typeof getCards>).mockImplementation(() => {
        throw new Error('test error')
      })
      await cardsStore.fetchCards()

      expect(cardsStore.cards).toEqual([])
      expect(cardsStore.selectedCard).toEqual(null)
    })
  })

  describe('.selectCard', () => {

    it('updates selected card and resets filter value', () => {
      cardsStore.selectedCard = null
      cardsStore.transactionFilterValue = 40
      const card = { id: '1', description: 'desc1' };
      cardsStore.selectCard(card)

      expect(cardsStore.selectedCard).toEqual(card)
      expect(cardsStore.transactionFilterValue).toEqual(0)
    })

    it('fetches transactions if a card is set', async () => {
      const transactions = [{ id: '1', description: 'desc1', amount: 1 }, { id: '2', description: 'desc2', amount: 2 }]
      ;(getTransactions as MockedFunction<typeof getTransactions>).mockResolvedValue(transactions)
      const card = { id: '1', description: 'desc1' };
      await cardsStore.selectCard(card)

      expect(cardsStore.filteredTransactions).toEqual(transactions)
    })

    it('does not fetch transactions if card is reset', async () => {
      const getTransactionsSpy = vi.spyOn(await import('@/api'), 'getTransactions')
      await cardsStore.selectCard(null)

      expect(getTransactionsSpy).not.toHaveBeenCalled()
    })

    it('resets transactions if there is an error during fetching', async () => {
      const transactions = [{ id: '1', description: 'desc1', amount: 1 }, { id: '2', description: 'desc2', amount: 2 }]
      ;(getTransactions as MockedFunction<typeof getTransactions>).mockResolvedValueOnce(transactions)
      const card = { id: '1', description: 'desc1' };
      await cardsStore.selectCard(card)
      expect(cardsStore.filteredTransactions.length).toBeGreaterThan(0)

      ;(getTransactions as MockedFunction<typeof getTransactions>).mockImplementation(() => {
        throw new Error('test error')
      })
      await cardsStore.selectCard(card)
      expect(cardsStore.filteredTransactions.length).toBe(0)
    })
  })

  describe('.setFilterValue', () => {
    it('filters transactions for those with given minimum amount', async () => {
      const transactions = [
          { id: '1', description: 'desc1', amount: 100 },
          { id: '2', description: 'desc2', amount: 200 },
          { id: '3', description: 'desc3', amount: 300 }
        ]
      ;(getTransactions as MockedFunction<typeof getTransactions>).mockResolvedValue(transactions)
      const card = { id: '1', description: 'desc1' };
      await cardsStore.selectCard(card)

      cardsStore.setFilterValue(200)

      expect(cardsStore.filteredTransactions).toEqual([
        { id: '2', description: 'desc2', amount: 200 },
        { id: '3', description: 'desc3', amount: 300 }
      ])
    })

    it('does not filter transactions if filter value is set to null', async () => {
      const transactions = [
          { id: '1', description: 'desc1', amount: 100 },
          { id: '2', description: 'desc2', amount: 200 }
        ]
      ;(getTransactions as MockedFunction<typeof getTransactions>).mockResolvedValue(transactions)
      const card = { id: '1', description: 'desc1' };
      await cardsStore.selectCard(card)

      cardsStore.setFilterValue(null)

      expect(cardsStore.filteredTransactions).toEqual(transactions)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
})

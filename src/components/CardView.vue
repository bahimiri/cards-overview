<script setup lang="ts">
import type { Card } from '@/api';
import useUID from '@/composables/useUID';
import SimpleCard from '@/components/SimpleCard.vue';

defineProps<{
  card: Card,
  isSelected: boolean,
  radioGroupName: string
}>()

const id = useUID().generateId()
</script>

<template>
  <SimpleCard class="card-view" :highlighted="isSelected">
    <input
        type="radio"
        :id="`card-${id}`"
        :name="radioGroupName"
        :aria-describedby="`card-desc-${id}`"
        :value="card.id"
        :checked="isSelected"
        @input="$emit('card-selected')"
    />
    <label :for="`card-${id}`">{{ card.description }}</label>
    <div class="card-description" :id="`card-desc-${id}`">{{ card.id }}</div>
  </SimpleCard>
</template>

<style scoped lang="scss">
@import "src/assets/base";

.card-view {
  cursor: pointer;

  &:focus-within {
    outline: 2px dashed var(--color-foreground);
  }

  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  label {
    display: inline-block;
    margin-bottom: 1rem;
  }

  .card-description {
    margin-bottom: 80px;
  }
}
</style>
<script setup lang="ts">
import type { Card } from '@/api';
import useUID from '@/composables/useUID';

defineProps<{
  card: Card,
  radioGroupName: string
}>()

const id = useUID().generateId()
</script>

<template>
  <input
      type="radio"
      :id="`card-${id}`"
      :name="radioGroupName"
      :aria-describedby="`card-desc-${id}`"
  />
  <label :for="`card-${id}`">{{ card.description }}</label>
  <div :id="`card-desc-${id}`">{{ card.id }}</div>
</template>

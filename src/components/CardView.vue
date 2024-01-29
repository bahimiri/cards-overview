<script setup lang="ts">
import type { Card } from '@/api';

defineProps<{
  card: Card
}>()
</script>

<template>
  <div>
    {{card.description}}
  </div>
</template>

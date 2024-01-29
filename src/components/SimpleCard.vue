<script setup lang="ts">
withDefaults(defineProps<{
  highlighted?: boolean,
}>(), {
  highlighted: false,
})
</script>

<template>
  <div class="simple-card" :class="{highlighted: highlighted}">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/variables.scss";

.simple-card {
  background-color: var(--color-secondary);
  border-radius: $border-radius;
  padding: 16px 32px;

  @media (min-width: $bp-m) {
    min-width: 40%;
  }

  &.highlighted {
    background-color: var(--color-primary);
  }
}
</style>
<template>
  <section class="page sub-page sub-page--ceo-message">
    <MenuSubBanner v-if="!hideBanner" banner-text="CEO 인사말" />
    <div class="sub-page__content">
      <!-- CEO 인사말 내용 -->
      <BaseTopButton v-if="!hideBanner" />
    </div>
  </section>
</template>

<script setup>
import MenuSubBanner from '@/views/MenuSubBanner.vue'
import BaseTopButton from '@/components/common/BaseTopButton.vue'

defineProps({
  hideBanner: { type: Boolean, default: false },
})
</script>

<style scoped></style>
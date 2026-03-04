<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner v-if="!hideBanner" banner-text="회사개요" />
    <div class="sub-page__content">
      <!-- 회사개요 내용 -->
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
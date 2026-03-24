<template>
  <a class="skip-link" :href="`#${APP_CONFIG.mainContentId}`">본문으로 건너뛰기</a>
  <div id="wrap">
    <Header v-if="!route.meta?.hideHeaderFooter" />
    <main
      :id="APP_CONFIG.mainContentId"
      role="main"
      aria-label="본문"
      tabindex="-1"
    >
      <router-view />
    </main>
    <Footer v-if="!route.meta?.hideHeaderFooter" />
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { useRoute } from 'vue-router'
import { APP_CONFIG } from '@/config/app.config'

const route = useRoute()
</script>

<style scoped></style>

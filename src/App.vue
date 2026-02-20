<template>
  <div id="wrap">
    <Header v-if="!route.meta?.hideHeaderFooter"></Header>
    <main id="container">
      <router-view></router-view>
    </main>
    <Footer v-if="!route.meta?.hideHeaderFooter"></Footer>
  </div>
</template>

<script setup>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import { useRoute } from "vue-router";

const route = useRoute(); // 현재 활성화된 라우트 정보 가져오기
</script>

<style scoped></style>

<template>
  <div id="wrap">
    <Header></Header>
    <main id="container">
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<style scoped></style>

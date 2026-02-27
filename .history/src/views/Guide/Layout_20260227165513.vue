<template>
    <h1>Layout</h1>
    <section>
      <div class="cont">
        <div class="bx">
          <h2><em>Header</em></h2>
          <Header />
        </div>
      </div>

      <div class="cont">
        <div class="bx">
          <h2><em>Footer</em></h2>
          <Footer />
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
  </script>
  
  <style lang="scss" scoped>
  @use "@scss/layout/_header.scss";
  @use "@scss/layout/_footer.scss";
  section .cont { border: none; }
  </style>
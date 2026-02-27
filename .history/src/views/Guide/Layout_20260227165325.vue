<template>
    <h1>Layout</h1>
    <section>
      <div class="cont">
        <div class="bx">
          <h2><em>Header</em></h2>
          
        </div>
      </div>

      <div class="cont">
        <div class="bx">
          <h2><em>Footer</em></h2>
          
        </div>
      </div>
    </section>
  </template>
  
  <script setup>

  </script>
  
  <style lang="scss" scoped>
  @use "@scss/layout/_header.scss";
  @use "@scss/layout/_footer.scss";
  section .cont { border: none; }
  </style>
<template>
  <div class="tab-page tab-page--schedule">
    <div class="tab-page-inner inner--schedule">

      <div class="content schedule">

        <h2 class="sub-title">일정관리</h2>
        <!-- calendar -->
        <template>
  <el-calendar v-model="value" />
</template>
      </div>


    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref(new Date())
</script>

<style scoped></style>
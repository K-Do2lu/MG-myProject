<template>
  <div class="tab-page tab-page--schedule">
    <div class="tab-page-inner inner--schedule">

      <div class="content schedule">

        <h2 class="sub-title">일정관리</h2>
        <!-- calendar -->

          <el-calendar v-model="value">
            <template #header="{ date, prevMonth, nextMonth, selectDate }">
            <div class="my-calendar-header">
              <span>{{ date }}</span>
              <div class="btn-group">
                <button type="button"  @click="prevMonth()">이전 달</button>
                <button type="button" @click="selectDate(new Date())">오늘</button>
                <button type="button" @click="nextMonth()">다음 달</button>
              </div>
            </div>
          </template>
        </el-calendar>

      </div>


    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref(new Date())
</script>

<style scoped></style>
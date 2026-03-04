<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="회사개요"/>

    <div class="sub-page__content">
      <BaseTable></BaseTable>

      <!-- Tab -->
      <BaseTab v-model="activeTab">
          <BaseTabPanel label="회사개요" value="overview">
            탭 1 내용
          </BaseTabPanel> 
          <BaseTabPanel label="CEO 인사말" value="greeting">
            탭 2 내용
          </BaseTabPanel>
          <BaseTabPanel label="연혁" value="history">
            탭 3 내용
          </BaseTabPanel>
          <BaseTabPanel label="오시는 길" value="directions">
            탭 4 내용
          </BaseTabPanel>
          <BaseTabPanel label="협력사 소개" value="partner">
            탭 5 내용
          </BaseTabPanel>
        </BaseTab>

      
   
    <!-- Top button -->
    <BaseTopButton/>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import MenuSubBanner from '@/views/MenuSubBanner.vue'

const activeTab = ref('overview')  // 기본 선택 탭

</script>

<style scoped></style>
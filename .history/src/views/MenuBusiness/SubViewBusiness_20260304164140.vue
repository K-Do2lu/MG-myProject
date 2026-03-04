<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="사업영역"/>

    <div class="sub-page__content">

      <!-- Tab -->
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="회사개요" value="overview">
          <sybViewOverview/>
        </BaseTabPanel>
        <BaseTabPanel label="CEO 인사말" value="ceo">
          <subViewCeoMessage/>
        </BaseTabPanel>
        <BaseTabPanel label="연혁" value="history">
          <subViewHistory/>
        </BaseTabPanel>
        <BaseTabPanel label="오시는 길" value="location">
          <subViewLocation/>
        </BaseTabPanel>
        <BaseTabPanel label="협력사 소개" value="partners">
          <subViewPartners/>
        </BaseTabPanel>
      </BaseTab>

      
   
    <!-- Top button -->
    <BaseTopButton/>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import
import SubViewBusinessArea from '@/views/MenuBusiness/SubViewBusinessArea.vue'

const activeTab = ref('overview')  // 기본 선택 탭

</script>

<style scoped></style>
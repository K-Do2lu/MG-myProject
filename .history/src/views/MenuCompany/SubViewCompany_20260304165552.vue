<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="회사개요"/>

    <div class="sub-page__content">

      <!-- Tab -->
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="회사개요" value="sybViewOverview">
          <subViewOverview/>
        </BaseTabPanel>
        <BaseTabPanel label="CEO 인사말" value="subViewCeoMessage">
          <subViewCeoMessage/>
        </BaseTabPanel>
        <BaseTabPanel label="연혁" value="subViewHistory">
          <subViewHistory/>
        </BaseTabPanel>
        <BaseTabPanel label="오시는 길" value="subViewLocation">
          <subViewLocation/>
        </BaseTabPanel>
        <BaseTabPanel label="협력사 소개" value="subViewPartners">
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
import MenuSubBanner from '@/views/MenuSubBanner.vue'
import subViewOverview from '@/views/MenuCompany/SubViewOverview.vue'
import subViewCeoMessage from '@/views/MenuCompany/SubViewCeoMessage.vue'
import subViewHistory from '@/views/MenuCompany/SubViewHistory.vue'
import subViewLocation from '@/views/MenuCompany/SubViewLocation.vue'
import subViewPartners from '@/views/MenuCompany/SubViewPartners.vue'

const activeTab = ref('sybViewOverview')  // 기본 선택 탭

</script>

<style scoped lang="scss">
@import '@scss/pages/subPage/SubViewCompany.scss';
</style>
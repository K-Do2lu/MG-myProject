<template>
  <section class="page sub-page sub-page--company">
    <MenuSubBanner banner-text="Company" />

    <div class="sub-page__content">
      <!-- Tab -->
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="회사개요" value="overview">
          <SubViewOverview />
        </BaseTabPanel>
        <BaseTabPanel label="CEO 인사말" value="ceo">
          <SubViewCeoMessage />
        </BaseTabPanel>
        <BaseTabPanel label="연혁" value="history">
          <SubViewHistory />
        </BaseTabPanel>
        <BaseTabPanel label="오시는 길" value="location">
          <SubViewLocation />
        </BaseTabPanel>
        <BaseTabPanel label="협력사 소개" value="partners">
          <SubViewPartners />
        </BaseTabPanel>
      </BaseTab>

      <!-- Top button -->
      <BaseTopButton />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import MenuSubBanner from '@/views/MenuSubBanner.vue'
import SubViewOverview from '@/views/MenuCompany/SubViewOverview.vue'
import SubViewCeoMessage from '@/views/MenuCompany/SubViewCeoMessage.vue'
import SubViewHistory from '@/views/MenuCompany/SubViewHistory.vue'
import SubViewLocation from '@/views/MenuCompany/SubViewLocation.vue'
import SubViewPartners from '@/views/MenuCompany/SubViewPartners.vue'

const activeTab = ref('overview') // 기본 선택 탭
</script>

<style scoped lang="scss">
@import '@scss/pages/subPage/SubViewCompany.scss';
</style>
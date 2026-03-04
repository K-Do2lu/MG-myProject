<template>
  <section class="page sub-page sub-page--company">
    <MenuSubBanner :banner-text="bannerTextByTab" />

    <div class="sub-page__content">
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="회사개요" value="overview">
          <div class="sub-page__panel"><!-- 회사개요 내용 --></div>
        </BaseTabPanel>
        <BaseTabPanel label="CEO 인사말" value="ceo">
          <div class="sub-page__panel"><!-- CEO 인사말 내용 --></div>
        </BaseTabPanel>
        <BaseTabPanel label="연혁" value="history">
          <div class="sub-page__panel"><!-- 연혁 내용 --></div>
        </BaseTabPanel>
        <BaseTabPanel label="오시는 길" value="location">
          <div class="sub-page__panel"><!-- 오시는 길 내용 --></div>
        </BaseTabPanel>
        <BaseTabPanel label="협력사 소개" value="partners">
          <div class="sub-page__panel"><!-- 협력사 소개 내용 --></div>
        </BaseTabPanel>
      </BaseTab>
      <BaseTopButton />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MenuSubBanner from '@/views/MenuSubBanner.vue'
import BaseTab from '@/components/common/BaseTab.vue'
import BaseTabPanel from '@/components/common/BaseTabPanel.vue'
import BaseTopButton from '@/components/common/BaseTopButton.vue'

const route = useRoute()
const router = useRouter()

const TAB_VALUES = ['overview', 'ceo', 'history', 'location', 'partners']
const BANNER_TEXTS = {
  overview: '회사개요',
  ceo: 'CEO 인사말',
  history: '연혁',
  location: '오시는 길',
  partners: '협력사 소개',
}

const activeTab = ref('overview')

const bannerTextByTab = computed(() => BANNER_TEXTS[activeTab.value] ?? '회사개요')

// URL 쿼리 ?tab=ceo 와 탭 동기화
function syncTabFromRoute() {
  const t = route.query.tab
  if (t && TAB_VALUES.includes(t)) activeTab.value = t
}

function syncRouteFromTab() {
  const next = { path: '/sub1', query: { ...route.query, tab: activeTab.value } }
  if (route.query.tab !== activeTab.value) {
    router.replace(next)
  }
}

onMounted(syncTabFromRoute)
watch(() => route.query.tab, syncTabFromRoute)
watch(activeTab, syncRouteFromTab)
</script>

<style scoped></style>
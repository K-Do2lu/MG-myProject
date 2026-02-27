<template>
  <h1>Components</h1>
  <section>
    <div class="cont">
      <div class="bx">
        <h2><em>Sub Banner</em></h2>
        <MenuSubBanner />
      </div>
    </div>
    <div class="cont">
      <div class="bx">
        <h2><em>Tab</em></h2>
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
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import MenuSubBanner from '@/views/MenuSubBanner.vue'
import BaseTab from '@/components/common/BaseTab.vue'
import BaseTabPanel from '@/components/common/BaseTabPanel.vue'

const activeTab = ref(null)
</script>

<style lang="scss" scoped></style>
<template>
  <h1>Components</h1>
  <section>
    <div class="cont">
      <div class="bx">
        <h2><em>Tab</em></h2>
        <BaseTab v-model="activeTab">
          <BaseTabPanel label="탭1" value="notice">
            탭 1 내용
          </BaseTabPanel>
          <BaseTabPanel label="탭2" value="faq">
            <!-- 탭 2 내용 공 -->
          </BaseTabPanel>
        </BaseTab>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BaseTab from '@/components/common/BaseTab.vue'
import BaseTabPanel from '@/components/common/BaseTabPanel.vue'

const activeTab = ref('notice')
</script>

<style lang="scss" scoped></style>
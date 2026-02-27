<template>
  <h1>Components</h1>
  <section>
    <div class="cont">
      <div class="bx">
        <h2><em>Tab</em></h2>
        <BaseTab v-model="activeTab">
          <BaseTabPanel label="공지사항" value="notice">
            1탭
          </BaseTabPanel>
          <BaseTabPanel label="FAQ" value="faq">
            2탭
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
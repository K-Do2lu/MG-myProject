<script setup>
import { ref } from 'vue'
import BaseTabs from '@/components/common/BaseTabs.vue'
import BaseTab from '@/components/common/BaseTab.vue'

const activeTab = ref('notice')
</script>

<template>
  <BaseTabs v-model="activeTab">
    <BaseTab label="공지사항" value="notice">
      공지사항 탭 내용
    </BaseTab>

    <BaseTab label="FAQ" value="faq">
      FAQ 탭 내용
    </BaseTab>
  </BaseTabs>
</template>
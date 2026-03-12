<template>
  <div class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="BUSINESS"/>

    <div class="sub-page__content">

      <!-- Tab -->
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="사업영역" value="SubViewBusinessArea">
          <SubViewBusinessArea/>
        </BaseTabPanel>
      </BaseTab>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MenuSubBanner from '@/views/MenuSubBanner.vue'
import SubViewBusinessArea from '@/views/MenuBusiness/SubViewBusinessArea.vue'

const activeTab = ref('SubViewBusinessArea')  // 기본 선택 탭

</script>

<style scoped></style>
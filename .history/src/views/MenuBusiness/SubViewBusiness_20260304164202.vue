<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="사업영역"/>

    <div class="sub-page__content">

      <!-- Tab -->
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="사업영역" value="overview">
          <SubViewBusinessArea/>
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
import SubViewBusinessArea from '@/views/MenuBusiness/SubViewBusinessArea.vue'

const activeTab = ref('overview')  // 기본 선택 탭

</script>

<style scoped></style>
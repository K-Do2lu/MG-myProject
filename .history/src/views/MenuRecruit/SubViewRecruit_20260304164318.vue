<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="Recruit"/>

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
import SubViewJob from '@/views/MenuRecruit/SubViewJob.vue'


const activeTab = ref('overview')  // 기본 선택 탭

</script>

<style scoped></style>
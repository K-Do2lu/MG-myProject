<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="Recruit"/>

    <div class="sub-page__content">

      <!-- Tab -->
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="채용공고고" value="overview">
          <SubViewJob/>
        </BaseTabPanel>
        <BaseTabPanel label="인재상" value="overview">
          <SubViewJob/>
        </BaseTabPanel>
        <BaseTabPanel label="자료실실" value="overview">
          <SubViewArchive/>
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
import SubViewTalent from '@/views/MenuRecruit/SubViewTalent.vue'
import SubViewArchive from '@/views/MenuRecruit/SubViewArchive.vue'

const activeTab = ref('overview')  // 기본 선택 탭

</script>

<style scoped></style>
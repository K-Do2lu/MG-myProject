<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="RECRUIT"/>

    <div class="sub-page__content">

      <!-- Tab -->
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="채용공고" value="MenuSubBanner">
          <SubViewJob/>
        </BaseTabPanel>
        <BaseTabPanel label="인재상" value="SubViewJob">
          <SubViewTalent/>
        </BaseTabPanel>
        <BaseTabPanel label="자료실" value="SubViewArchive">
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
import SubViewArchive from '@/views/MenuRecruit/SubViewArchive.vue'학학

const activeTab = ref('MenuSubBanner')  // 기본 선택 탭

</script>

<style scoped></style>
<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="Notice"/>

    <div class="sub-page__content">

      <!-- Tab -->
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="공지사항" value="SubViewNoticeItem">
          <SubViewNoticeItem/>
        </BaseTabPanel>
        <BaseTabPanel label="입찰공고고" value="ceo">
          <SubViewTender/>
        </BaseTabPanel>
        <BaseTabPanel label="일정관리" value="history">
          <SubViewSchedule/>
        </BaseTabPanel>
      </BaseTab>

      
   
    <!-- Top button -->
    <BaseTopButton/>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SubViewNoticeItem from '@/views/MenuNotice/SubViewNoticeItem.vue'
import SubViewTender from '@/views/MenuNotice/SubViewTender.vue'
import SubViewSchedule from '@/views/MenuNotice/SubViewSchedule.vue'

const activeTab = ref('overview')  // 기본 선택 탭

</script>

<style scoped></style>
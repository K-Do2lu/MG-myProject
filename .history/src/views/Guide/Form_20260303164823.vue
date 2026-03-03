<template>
  <h1>Form</h1>
  <section>
    <div class="cont">
      <h2><em>Input</em></h2>
      <BaseInput
        v-model="searchVal"
        label="검색어"
        placeholder="검색어를 입력해주세요."
      >
        <template #suffix>
          <img src="/src/assets/images/icons/ico_serch.png" alt="">
        </template>
      </BaseInput>
    </div>

    <div class="cont">
      <h2><em>Select</em></h2>
      <BaseSelect
        v-model="regionVal"
        label="검색 조건"
        :placeholder="regionOptions[0]?.label"
        :options="regionOptions"
        :hide-label="false"
      />
    </div>

    <div class="cont">
      <h2><em>Select</em> footer</h2>
      <BaseSelectFooter
        v-model="regionVal2"
        label="검색 조건"
        :options="regionOptions2"
        :hide-label="true"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchVal = ref('')
const searchError = computed(() => { /* 검증 로직 */ })

const regionVal = ref('')
const regionOptions = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
]

const regionVal2 = ref('FamilySite')
const regionOptions2 = [
  { value: 'FamilySite', label: 'Family Site' },
  { value: 'https://www.kfcc.co.kr/', label: 'MG새마을금고' },
  { value: 'https://www.mginfo.co.kr/', label: 'MG신용정보' },
  { value: 'http://www.mgts.co.kr/Default.asp', label: 'MG토탈서비스' },
  { value: 'https://www.kccwf.or.kr/home/comm/comm0001m01/mainPage.html', label: 'MG복지회' },
  { value: 'https://www.mgcap.co.kr/jsp/main/main.jsp', label: 'MG캐피탈' },
  { value: 'http://www.mgtvlive.com/', label: 'MG TV' },
]
</script>
<template>
    <h1>Form</h1>
    <section>
      <div class="cont">
        <div class="bx">
          <BaseInput
            v-model="searchVal"
            label="검색"
            hint="최소 2자 이상"
            :error="searchError"
          />

        </div>
      </div>

      <div class="cont">
        <div class="bx">
          <BaseSelect
            v-model="regionVal"
            label="지역"
            placeholder="선택"
            :options="regionOptions"
            :error="regionError"
          />        
        </div>
      </div>
      
    </section>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
//   import BaseSelect from '@/components/form/BaseSelect.vue'
  
  const searchVal = ref('')
  const searchError = computed(() => { /* 검증 로직 */ })
  
  // const regionVal = ref('')
  // const regionError = computed(() => { /* 검증 로직 */ })
  // const regionOptions = [{ value: 'seoul', label: '서울' },]
  </script>
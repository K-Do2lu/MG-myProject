<template>
  <header id="header" class="header">
    <div class="header-cont">
      <h1 class="logo">
        <a href="https://www.mgdatasystem.co.kr/">
          <img src="@/assets/images/logo_mgds.png" alt="MG데이터시스템">
        </a>
      </h1>

      <nav>
        <ul>
          <li>
            <router-link to="/sub1">COMPANY</router-link>
            <ul class="sub-menu">
              <li><router-link to="/sub1/sub1_1">회사개요</router-link></li>
              <li><router-link to="/sub1/sub1_2">CEO인사말</router-link></li>
              <li><router-link to="/sub1/sub1_3">연혁</router-link></li>
              <li><router-link to="/sub1/sub1_4">오시는 길</router-link></li>
              <li><router-link to="/sub1/sub1_5">협력사 소개</router-link></li>
            </ul>
          </li>
          <li>
            <router-link to="/sub2">BUSINESS</router-link>
            <ul class="sub-menu">
              <li><router-link to="/sub2/sub2_1">사업영역</router-link></li>
            </ul>
          </li>
          <li>
            <router-link to="/sub3">NOTICE</router-link>
            <ul class="sub-menu">
              <li><router-link to="/sub3/sub3_1">공지사항</router-link></li>
              <li><router-link to="/sub3/sub3_2">입찰공고</router-link></li>
              <li><router-link to="/sub3/sub3_3">일정관리</router-link></li>
            </ul>
          </li>
          <li>
            <router-link to="/sub4">RECRUIT</router-link>
            <ul class="sub-menu">
              <li><router-link to="/sub3/sub4_1">채용공고</router-link></li>
              <li><router-link to="/sub3/sub4_2">인재상</router-link></li>
              <li><router-link to="/sub3/sub4_3">자료실</router-link></li>
            </ul>
          </li>
          <li class="logo-dshop"><a href="https://mgdshop.co.kr/main/index.do" title="새창 열림"  target="_blank"><img src="@/assets/images/logo_dshop.png" alt="MGDshop"></a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

   <!-- <button
      type="button"
      class="btn-menu"
      aria-controls="gnb"
      :aria-expanded="isOpen.toString()"
      @click="toggle"
    >
      메뉴
    </button>

    <nav id="gnb" class="gnb" :hidden="!isOpen">
      <ul>
        <li><a href="#">Menu 1</a></li>
        <li><a href="#">Menu 2</a></li>
      </ul>
    </nav> -->

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const onKeydown = (e) => {
  if (e.key === "Escape" && isOpen.value) {
    isOpen.value = false;
  }
};

// 컴포넌트 살아 있을 때만 이벤트 등록
onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

// 페이진 전환 시 이벤트 누수 방지
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

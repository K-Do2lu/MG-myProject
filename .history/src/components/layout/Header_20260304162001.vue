<template>
  <header id="header" class="header">
    <div class="header-cont">

      <h1 class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo_mgds.png" alt="MG데이터시스템">
        </router-link>
      </h1>

      <!-- 햄버거 버튼 -->
      <button
        class="btn-menu"
        @click="toggleMenu"
        :class="{ 'is-open': isMobileMenu }"
        :aria-expanded="isMobileMenu"
        aria-label="메뉴 열기">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- 네비 -->
      <nav
      class="gnb"
      :class="{ 'is-mobile-open': isMobileMenu, 'is-dropdown-closed': forceCloseDropdown }"
      @mouseenter="forceCloseDropdown = false">

        <ul>
          <li
            v-for="(menu, idx) in menuData"
            :key="idx"
            @mouseenter="forceCloseDropdown = false">

            <router-link
              :to="menu.link"
              class="depth1"
              @click="closeMenuIfMobile">
              {{ menu.title }}
            </router-link>

            <ul class="sub-menu">
              <li v-for="(sub, sIdx) in menu.subs" :key="sIdx">
                <router-link :to="sub.link" @click="closeMenuIfMobile">
                  {{ sub.name }}
                </router-link>
              </li>
            </ul>

          </li>

          <li class="logo-dshop">
            <a href="https://mgdshop.co.kr/main/index.do" target="_blank">
              <img src="@/assets/images/logo_dshop.png" alt="MGDshop">
            </a>
          </li>

        </ul>
      </nav>

      <!-- 모바일 배경 -->
      <div
        class="overlay"
        v-if="isMobileMenu"
        @click="toggleMenu">
      </div>

    </div>
  </header>
</template>


<script setup>
import { ref } from "vue";

const isHover = ref(false);
const isMobileMenu = ref(false);
const forceCloseDropdown = ref(false);

const toggleMenu = () => {
  isMobileMenu.value = !isMobileMenu.value;
  document.body.style.overflow = isMobileMenu.value ? "hidden" : "";
};

const closeMenuIfMobile = () => {
  if (isMobileMenu.value) {
    isMobileMenu.value = false;
    document.body.style.overflow = "";
  }
  forceCloseDropdown.value = true;
};

// 유지보수용 데이터: 메뉴가 추가되어도 이 객체만 수정하면 됨
const menuData = [
  { title: "COMPANY", link: "/sub1",
  subs: [
    { name: "회사개요", link: "/sub1" },
    { name: "CEO인사말", link: "" },
    { name: "연혁", link: "" },
    { name: "오시는 길", link: "" },
    { name: "협력사 소개", link: "" }
  ]},
  { title: "BUSINESS", link: "/sub2",
  subs: [{ name: "사업영역", link: "/sub2/sub2_1" }] },
  { title: "NOTICE", link: "/sub3/sub3_1",
  subs: [
    { name: "공지사항", link: "/sub3/sub3_1" },
    { name: "입찰공고", link: "/sub3/sub3_2" },
    { name: "일정관리", link: "/sub3/sub3_3" }
  ]},
  { title: "RECRUIT", link: "/sub4/sub4_1",
  subs: [
    { name: "채용공고", link: "/sub4/sub4_1" },
    { name: "인재상", link: "/sub4/sub4_2" },
    { name: "자료실", link: "/sub4/sub4_3" }
  ]}
];
</script>

<style scoped>
@import "@scss/layout/_header.scss";
</style>
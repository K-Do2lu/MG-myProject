<template>
  <header id="header" class="header">
    <div class="header-cont">
      <h1 class="logo">
        <router-link :to="ROUTES.HOME">
          <img src="@/assets/images/logo_mgds.png" alt="MG데이터시스템" width="180" height="40" decoding="async" />
        </router-link>
      </h1>

      <button
        type="button"
        class="btn-menu"
        :class="{ 'is-open': isMobileMenu }"
        :aria-expanded="isMobileMenu"
        :aria-controls="NAV_ID"
        :aria-label="isMobileMenu ? '메뉴 닫기' : '메뉴 열기'"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        :id="NAV_ID"
        class="gnb"
        :class="{ 'is-mobile-open': isMobileMenu, 'is-dropdown-closed': forceCloseDropdown }"
        aria-label="주 메뉴"
        @mouseenter="forceCloseDropdown = false"
      >
        <ul>
          <li
            v-for="(menu, idx) in MAIN_NAV_ITEMS"
            :key="idx"
            @mouseenter="forceCloseDropdown = false"
          >
            <router-link :to="menu.link" class="depth1" @click="closeMenuIfMobile">
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
            <a
              href="https://mgdshop.co.kr/main/index.do"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="@/assets/images/logo_dshop.png" alt="MGDshop" width="120" height="32" decoding="async" />
            </a>
          </li>
        </ul>
      </nav>

      <div
        v-if="isMobileMenu"
        class="overlay"
        role="button"
        tabindex="0"
        aria-label="메뉴 닫기"
        @click="toggleMenu"
        @keydown.enter.prevent="toggleMenu"
        @keydown.space.prevent="toggleMenu"
      />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { ROUTES } from '@/constants/routes'
import { MAIN_NAV_ITEMS } from '@/config/navigation'

const NAV_ID = 'primary-navigation'

const isMobileMenu = ref(false)
const forceCloseDropdown = ref(false)

function toggleMenu() {
  isMobileMenu.value = !isMobileMenu.value
  document.body.style.overflow = isMobileMenu.value ? 'hidden' : ''
}

function closeMenuIfMobile() {
  if (isMobileMenu.value) {
    isMobileMenu.value = false
    document.body.style.overflow = ''
  }
  forceCloseDropdown.value = true
}
</script>

<style lang="scss">
@use '@scss/layout/_header.scss';
</style>

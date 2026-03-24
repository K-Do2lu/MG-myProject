<template>
  <div :class="['tab-page', `tab-page--${variant}`]">
    <BoardPostDetailPage
      v-if="detailId != null"
      :board-key="boardKey"
      :post-id="detailId"
      @close="detailId = null"
    />
    <div v-else :class="['tab-page-inner', `inner--${variant}`]">
      <div :class="['content', variant]">
        <h2 class="sub-title">{{ ui.pageTitle }}</h2>

        <div class="notice-table">
          <div v-if="searchEnabled" class="notice-search">
            <BaseSelect
              v-model="regionVal"
              :placeholder="regionOptions[0].label"
              :options="regionOptions"
            />
            <BaseInput
              v-model="searchVal"
              :placeholder="cfg.searchPlaceholder"
              aria-label="게시글 검색어"
            >
              <template #suffix>
                <img :src="icoSearch" alt="" width="20" height="20" decoding="async" />
              </template>
            </BaseInput>
          </div>

          <p
            v-if="loading"
            class="notice-loading"
            role="status"
            :aria-label="cfg.loadingText"
          >
            {{ cfg.loadingText }}
          </p>
          <p v-else-if="fetchError" class="notice-error" role="alert">{{ fetchError }}</p>

          <div class="notice-count" aria-live="polite">
            {{ cfg.totalCountLabel }} <em>{{ rows.length }}</em>{{ cfg.totalCountUnit }}
          </div>

          <BaseTable
            :rows="rows"
            :caption="ui.tableCaption"
            :empty-text="cfg.emptyText"
            :page-size="cfg.pageSize"
            :colspan="isMobile ? 3 : 1"
            :empty-colspan="3"
          >
            <template #colgroup>
              <col style="width: 70%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
            </template>

            <template #header>
              <th scope="col">제목</th>
              <th scope="col">등록일</th>
              <th scope="col">조회수</th>
            </template>

            <template #row="{ row }">
              <td class="title" :colspan="isMobile ? 3 : 1" scope="row">
                <div class="notice-title">
                  <button
                    v-if="row.id != null && row.id !== ''"
                    type="button"
                    class="notice-title__text notice-title__btn"
                    :aria-label="`${row.title}, 상세 보기`"
                    @click="openDetail(row)"
                  >
                    {{ row.title }}
                  </button>
                  <span v-else class="notice-title__text">{{ row.title }}</span>
                  <span v-if="row.hasAttachment" class="notice-title__icon" aria-hidden="true">
                    <img :src="icoFile" alt="" width="20" height="20" decoding="async" />
                  </span>
                  <span
                    v-if="row.isImportant"
                    class="notice-title__badge"
                    role="status"
                    aria-label="중요 게시물"
                    >HOT</span
                  >
                </div>
                <div class="notice-num">
                  <span class="notice-num__date">
                    <span class="label">등록일</span>
                    <time :datetime="row.dateIso || undefined">{{ row.date }}</time>
                  </span>
                  <span class="notice-num__views">
                    <span class="label">조회수</span>
                    {{ row.views }}
                  </span>
                </div>
              </td>
              <td v-if="!isMobile" class="num">
                <time :datetime="row.dateIso || undefined">{{ row.date }}</time>
              </td>
              <td v-if="!isMobile" class="num">{{ row.views }}</td>
            </template>
          </BaseTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { APP_CONFIG } from '@/config/app.config'
import { getBoardUi, isBoardTableKey } from '@/constants/boardTables'
import { useBoardListPage } from '@/composables/useBoardListPage'
import { useMediaQueryMaxWidth } from '@/composables/useMediaQueryMaxWidth'
import BoardPostDetailPage from '@/components/board/BoardPostDetailPage.vue'
import icoSearch from '@/assets/images/icons/ico_serch.png'
import icoFile from '@/assets/images/icons/ico_file.svg'

const props = defineProps({
  boardKey: {
    type: String,
    required: true,
    validator: (v) => isBoardTableKey(v),
  },
})

const ui = computed(() => getBoardUi(props.boardKey))
const variant = computed(() => ui.value.variant)

const cfg = computed(() => {
  const b = APP_CONFIG.boardList
  return {
    pageSize: b.pageSize,
    searchPlaceholder: b.searchPlaceholder,
    emptyText: b.emptyText,
    loadingText: b.loadingText,
    totalCountLabel: b.totalCountLabel,
    totalCountUnit: b.totalCountUnit,
  }
})

const { matches: isMobile } = useMediaQueryMaxWidth(APP_CONFIG.boardList.mobileMaxWidthPx)

const {
  rows,
  loading,
  fetchError,
  detailId,
  openDetail,
} = useBoardListPage(
  /** @type {'notice'|'tender'} */ (props.boardKey)
)

const searchEnabled = ref(true)
const searchVal = ref('')
const regionVal = ref('')
const regionOptions = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
]
</script>

<style scoped>
.notice-title__btn {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  color: inherit;
  text-align: inherit;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.notice-title__btn:hover {
  text-decoration: underline;
}
</style>

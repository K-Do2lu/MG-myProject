<template>
  <div class="admin-board-hub">
    <el-alert
      class="admin-board-hub__alert"
      title="게시판 구분을 선택한 뒤 글을 등록·수정하거나 목록에서 삭제할 수 있습니다."
      type="info"
      show-icon
      :closable="false"
    />

    <el-card class="admin-board-hub__picker-card" shadow="never">
      <div class="admin-board-hub__picker">
        <span class="admin-board-hub__label">게시판 구분</span>
        <el-radio-group v-model="boardType" size="large">
          <el-radio-button label="notice">{{ BOARD_UI.notice.adminRadioLabel }}</el-radio-button>
          <el-radio-button label="tender">{{ BOARD_UI.tender.adminRadioLabel }}</el-radio-button>
        </el-radio-group>
      </div>
    </el-card>

    <el-tabs v-model="hubTab" class="admin-board-hub__tabs" type="border-card">
      <el-tab-pane label="글 작성" name="form" :lazy="false">
        <div v-if="editingPostId != null" class="admin-board-hub__editing">
          <span>수정 중 · ID {{ editingPostId }}</span>
          <el-button type="primary" link @click="clearEdit">새 글 작성으로</el-button>
        </div>
        <AdminBoardEdit
          :key="`${boardType}-${editingPostId ?? 'new'}`"
          :board-type="boardType"
          :post-id="editingPostId"
          @submitted="onFormSubmitted"
          @cancel-edit="clearEdit"
        />
      </el-tab-pane>
      <el-tab-pane label="목록 관리" name="list" :lazy="false">
        <AdminBoardList
          ref="listRef"
          :board-type="boardType"
          :refresh-nonce="listRefreshNonce"
          @edit="onEditRow"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { BOARD_UI } from '@/constants/boardTables'
import AdminBoardEdit from '@/views/admin/AdminBoardEdit.vue'
import AdminBoardList from '@/views/admin/AdminBoardList.vue'

const route = useRoute()
const router = useRouter()

function normalizeQueryBoard(q) {
  return q === 'tender' ? 'tender' : 'notice'
}

const boardType = ref(normalizeQueryBoard(route.query.board))
const hubTab = ref('form')
/** @type {import('vue').Ref<number | string | null>} */
const editingPostId = ref(null)
const listRef = ref(null)
/** 저장·등록 후 목록 강제 갱신용 */
const listRefreshNonce = ref(0)

watch(
  () => route.query.board,
  (b) => {
    boardType.value = normalizeQueryBoard(b)
  }
)

watch(boardType, (v, prev) => {
  // 최초 실행(prev undefined)에서는 편집 중 글을 지우지 않음 · 게시판만 바꿀 때만 초기화
  if (prev !== undefined && v !== prev) {
    editingPostId.value = null
    hubTab.value = 'form'
  }
  if (route.query.board === v) return
  router.replace({ path: ROUTES.ADMIN_BOARD, query: { board: v } })
})

function clearEdit() {
  editingPostId.value = null
}

function onEditRow(id) {
  editingPostId.value = id
  hubTab.value = 'form'
}

function onFormSubmitted() {
  listRefreshNonce.value += 1
}

watch(hubTab, (tab) => {
  if (tab === 'list') {
    nextTick(() => {
      listRef.value?.load?.()
    })
  }
})
</script>

<style lang="scss" scoped>
.admin-board-hub {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px;
}

.admin-board-hub__alert {
  margin
  margin-bottom: 16px;
}

.admin-board-hub__picker-card {
  margin-bottom: 20px;
}

.admin-board-hub__picker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.admin-board-hub__label {
  font-weight: 600;
  font-size: 15px;
}

.admin-board-hub__tabs {
  margin-top: 4px;
}

.admin-board-hub__tabs :deep(.el-tab-pane) {
  padding-top: 16px;
}

.admin-board-hub__editing {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--el-fill-color-light);
  font-size: 14px;
}
</style>

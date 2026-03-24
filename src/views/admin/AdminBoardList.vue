<template>
  <el-card class="admin-board-list" shadow="never">
    <template #header>
      <div class="admin-board-list__head">
        <span class="admin-board-list__title">{{ listTitle }}</span>
        <el-button size="small" :loading="loading" @click="load">새로고침</el-button>
      </div>
    </template>

    <p v-if="loading && rows.length === 0" class="admin-board-list__hint">불러오는 중…</p>
    <p v-else-if="loadError" class="admin-board-list__error">{{ loadError }}</p>

    <el-table v-else :data="rows" stripe style="width: 100%" empty-text="등록된 글이 없습니다.">
      <el-table-column prop="id" label="ID" width="72" />
      <el-table-column prop="title" label="제목" min-width="180" show-overflow-tooltip />
      <el-table-column prop="createdLabel" label="등록일" width="120" />
      <el-table-column label="HOT" width="70" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.is_hot" type="warning" size="small">HOT</el-tag>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column label="첨부" width="72" align="center">
        <template #default="{ row }">
          {{ row.fileCount > 0 ? row.fileCount + '개' : '—' }}
        </template>
      </el-table-column>
      <el-table-column label="작업" width="160" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="emit('edit', row.id)">
            수정
          </el-button>
          <el-button type="danger" link size="small" @click="confirmDelete(row)">
            삭제
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { supabase } from '@/supabase'
import { assertBoardTableKey, getBoardUi } from '@/constants/boardTables'
import { formatBoardDate } from '@/utils/formatBoardDate'
import { normalizeAttachmentsFromRow } from '@/utils/boardAttachments'
import { removeBoardStorageObjects } from '@/utils/boardStorage'

const props = defineProps({
  boardType: {
    type: String,
    required: true,
    validator: (v) => ['notice', 'tender'].includes(v),
  },
  /** 부모에서 저장 등 후 증가시키면 목록을 다시 불러옵니다 */
  refreshNonce: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['edit', 'changed'])

const loading = ref(false)
const loadError = ref('')
/** @type {import('vue').Ref<{ id: unknown, title: string, createdLabel: string, is_hot: boolean, fileCount: number, _raw: Record<string, unknown> }[]>} */
const rows = ref([])

const listTitle = computed(() => getBoardUi(props.boardType).adminListTitle)

async function load() {
  let table
  try {
    table = assertBoardTableKey(props.boardType)
  } catch {
    loadError.value = '잘못된 게시판입니다.'
    rows.value = []
    return
  }

  loading.value = true
  loadError.value = ''

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false })

  loading.value = false

  if (error) {
    loadError.value = error.message
    rows.value = []
    return
  }

  rows.value = (data ?? []).map((row) => {
    const atts = normalizeAttachmentsFromRow(row)
    return {
      id: row.id,
      title: row.title ?? '',
      createdLabel: formatBoardDate(row.created_at, { separator: '-' }),
      is_hot: Boolean(row.is_hot),
      fileCount: atts.length,
      _raw: row,
    }
  })
}

async function confirmDelete(row) {
  try {
    await ElMessageBox.confirm(
      `이 글을 삭제할까요?\n"${String(row.title).slice(0, 60)}${String(row.title).length > 60 ? '…' : ''}"`,
      '삭제 확인',
      {
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        type: 'warning',
      }
    )
  } catch {
    return
  }

  let table
  try {
    table = assertBoardTableKey(props.boardType)
  } catch {
    return
  }

  const paths = normalizeAttachmentsFromRow(row._raw).map((a) => a.path)
  await removeBoardStorageObjects(paths)

  const { error } = await supabase.from(table).delete().eq('id', row.id)

  if (error) {
    ElMessage.error(error.message || '삭제에 실패했습니다.')
    return
  }

  ElMessage.success('삭제되었습니다.')
  await load()
  emit('changed')
}

watch(
  () => props.boardType,
  () => load(),
  { immediate: true }
)

watch(() => props.refreshNonce, () => load())

defineExpose({ load })
</script>

<style lang="scss" scoped>
.admin-board-list {
  margin-top: 20px;
}

.admin-board-list__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.admin-board-list__title {
  font-size: 16px;
  font-weight: 600;
}

.admin-board-list__hint,
.admin-board-list__error {
  margin: 0 0 12px;
  font-size: 14px;
}

.admin-board-list__error {
  color: var(--el-color-danger);
}
</style>

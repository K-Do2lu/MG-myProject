import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { supabase } from '@/supabase'
import { assertBoardTableKey } from '@/constants/boardTables'
import { mapSupabaseRowToBoardListRow } from '@/utils/boardListRow'

/**
 * 공지/입찰 공개 목록 페이지 공통 로직
 * @param {'notice'|'tender'} tableKey
 */
export function useBoardListPage(tableKey) {
  const rows = ref([])
  const loading = ref(true)
  const fetchError = ref(null)
  const detailId = ref(null)

  async function load() {
    let table
    try {
      table = assertBoardTableKey(tableKey)
    } catch (e) {
      fetchError.value = e.message
      rows.value = []
      loading.value = false
      return
    }

    loading.value = true
    fetchError.value = null

    const { data, error: sbError } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false })

    loading.value = false

    if (sbError) {
      fetchError.value = sbError.message
      rows.value = []
      return
    }

    rows.value = (data ?? []).map(mapSupabaseRowToBoardListRow)
  }

  function openDetail(row) {
    if (row?.id == null || row.id === '') return
    detailId.value = row.id
  }

  function onPageVisible() {
    if (typeof document === 'undefined' || document.visibilityState !== 'visible') return
    load()
  }

  watch(detailId, (id, prev) => {
    if (id == null && prev != null) {
      load()
    }
  })

  onMounted(() => {
    load()
    document.addEventListener('visibilitychange', onPageVisible)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', onPageVisible)
  })

  return {
    rows,
    loading,
    fetchError,
    detailId,
    load,
    openDetail,
  }
}

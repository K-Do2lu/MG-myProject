// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// 아까 대시보드에서 본 그 주소와 키를 넣어주세요!
const supabaseUrl = 'https://qpbnpfkyeqtncqoltvxx.supabase.co'
const supabaseAnonKey = 'sb_publishable_pKu4V8CBLV7RLWW7mOfnjg_ed6zhbXX'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
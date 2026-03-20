// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// 아까 대시보드에서 본 그 주소와 키를 넣어주세요!
const supabaseUrl = 'https://qpbnpfkyeqtncqoltvxx.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
# Supabase — 게시판 첨부파일

## 0. 에러: `Could not find the 'attachments' column of 'notice'`

여러 첨부·관리자 등록/수정 시 **`attachments` (jsonb)** 컬럼이 필요합니다.  
`attachment_path` / `attachment_name` 만 있고 `attachments` 가 없으면 위 메시지가 납니다.

**SQL Editor**에서 아래만 실행해도 됩니다:

```sql
alter table public.notice add column if not exists attachments jsonb;
alter table public.tender add column if not exists attachments jsonb;
```

**Run** 후 잠시 뒤 다시 시도하세요.

---

## 0-b. 에러: `Could not find the 'attachment_name' column of 'notice'`

`notice` / `tender` 테이블에 아래 컬럼이 없을 때 납니다. **한 번에** 추가하려면 아래 블록 전체를 실행하세요.

1. Supabase Dashboard → **SQL Editor** → New query  
2. 아래 블록 전체 붙여넣기 → **Run**

```sql
alter table public.notice
  add column if not exists attachment_path text,
  add column if not exists attachment_name text;

alter table public.tender
  add column if not exists attachment_path text,
  add column if not exists attachment_name text;

-- 여러 첨부(전체 ZIP·개별 다운로드)용 — 없으면 등록 시 attachments 컬럼 오류
alter table public.notice
  add column if not exists attachments jsonb;

alter table public.tender
  add column if not exists attachments jsonb;
```

실행 후 잠시 기다렸다가 관리자에서 다시 등록해 보세요.

---

## 1. DB 컬럼 (위와 동일, 마이그레이션 파일)

CLI 사용 시: `migrations/20260305120000_board_attachment_columns.sql` 실행.

## 2. Storage 버킷 (없으면 등록 시 **Bucket not found**)

앱 기본값은 버킷 이름이 **`board-attachments`** 입니다. **대소문자·철자까지 동일**해야 합니다.

1. [Supabase Dashboard](https://supabase.com/dashboard) → 프로젝트 선택  
2. 왼쪽 **Storage** → **New bucket**  
3. **Name**: `board-attachments` 입력  
4. **Public bucket** 켜기(권장) — 끄면 다운로드 URL이 막히므로 이후 Storage 정책으로 읽기 허용 필요  
5. **Create**

다른 이름을 쓰려면 프로젝트 루트 `.env.local`에 다음을 넣고 dev 서버를 다시 켜세요.

```env
VITE_SUPABASE_BOARD_BUCKET=실제_버킷_이름
```

## 3. Storage 정책 (예시)

Public 읽기 + 익명 업로드(현재 관리자 화면도 anon 키 사용 시):

- **SELECT**: `bucket_id = 'board-attachments'` — `anon`, `authenticated` 허용 (public bucket이면 자동일 수 있음)
- **INSERT**: 관리자만 올리려면 Supabase Auth 후 `authenticated`만 INSERT 허용 권장.  
  임시로 anon INSERT를 열면 누구나 업로드 가능하므로 운영 전에 반드시 제한하세요.

정책은 프로젝트 설정에 맞게 [Storage RLS](https://supabase.com/docs/guides/storage/security/access-control)에서 조정합니다.

## 4. 관리자에서 수정·삭제가 안 될 때 (Table RLS) — **여기 설정 필요**

앱은 `.env`의 **`anon` 키**로 Supabase에 붙습니다. 테이블에 **RLS(Row Level Security)** 가 켜져 있으면, **정책이 없는 작업은 전부 거절**됩니다.  
등록만 되고 **수정이 반영 안 됨** → 대부분 **`UPDATE` 정책 없음**입니다.

### 확인

1. Dashboard → **Table Editor** → `notice` 테이블 선택  
2. 상단 **RLS** 또는 톱니바퀴 근처에서 **RLS enabled** 여부 확인  

### 개발용(빠른 해결): `anon` 에 전부 허용

⚠️ **누구나 글을 수정·삭제할 수 있어 운영에는 부적합**합니다. 로컬/테스트·임시로만 쓰세요.

**SQL Editor**에서 실행:

```sql
alter table public.notice enable row level security;
alter table public.tender enable row level security;

-- 이미 같은 이름 정책이 있으면 먼저 삭제하거나 이름을 바꾸세요.
drop policy if exists "notice_anon_all" on public.notice;
drop policy if exists "tender_anon_all" on public.tender;

create policy "notice_anon_all"
  on public.notice
  for all
  to anon
  using (true)
  with check (true);

create policy "tender_anon_all"
  on public.tender
  for all
  to anon
  using (true)
  with check (true);
```

`authenticated` 역할만 쓰는 프로젝트라면 `to anon` 대신 `to authenticated` 로 바꾸고, 관리자 페이지에서 **로그인한 세션**으로 호출해야 합니다.

### 운영 권장

- Supabase **Auth**로 관리자만 로그인 → `authenticated` + `auth.uid()` 조건이 있는 **UPDATE/DELETE 전용 정책**  
- 또는 **Service Role** 키는 **서버(API)** 에만 두고, 관리자 기능은 서버 경유

### 공개 화면 목록은 되는데 수정만 안 될 때

- **SELECT** 정책은 있는데 **UPDATE** 가 없는 전형적인 경우입니다.  
- 위 개발용 정책을 넣거나, Dashboard → **Authentication** → **Policies** 에서 `notice` / `tender` 에 **UPDATE** 행 추가합니다.

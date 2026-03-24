-- 게시판 첨부: Storage 경로 + 다운로드용 원본 파일명
-- 버킷 생성: Dashboard → Storage → New bucket → 이름: board-attachments (또는 .env VITE_SUPABASE_BOARD_BUCKET)
-- Public bucket이면 아래 SELECT 정책으로 익명 다운로드 가능. Private이면 signed URL 로직으로 바꿔야 함.

alter table public.notice
  add column if not exists attachment_path text,
  add column if not exists attachment_name text;

alter table public.tender
  add column if not exists attachment_path text,
  add column if not exists attachment_name text;

comment on column public.notice.attachment_path is 'Supabase Storage object path (bucket 내 경로)';
comment on column public.notice.attachment_name is '다운로드 시 표시할 원본 파일명';
comment on column public.tender.attachment_path is 'Supabase Storage object path (bucket 내 경로)';
comment on column public.tender.attachment_name is '다운로드 시 표시할 원본 파일명';

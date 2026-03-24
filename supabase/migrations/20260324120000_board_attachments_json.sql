-- 여러 첨부: [{ "path": "notice/uuid.png", "name": "원본.png" }, ...]
alter table public.notice
  add column if not exists attachments jsonb;

alter table public.tender
  add column if not exists attachments jsonb;

comment on column public.notice.attachments is '첨부 목록 JSON 배열: path(Storage), name(표시/다운로드명)';
comment on column public.tender.attachments is '첨부 목록 JSON 배열: path(Storage), name(표시/다운로드명)';

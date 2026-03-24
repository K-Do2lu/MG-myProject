-- 조회수: 원자적 증가 + anon 은 이 RPC 만 호출해도 됨 (테이블 UPDATE 권한 없이 운영 가능)
-- Supabase → SQL Editor 에서 실행하거나 CLI 로 마이그레이션 적용

create or replace function public.increment_board_view_count(p_board text, p_id bigint)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  if p_board is null or p_board not in ('notice', 'tender') then
    raise exception 'invalid p_board';
  end if;

  execute format(
    'update public.%I set view_count = coalesce(view_count, 0) + 1 where id = $1 returning view_count',
    p_board
  ) using p_id into new_count;

  return new_count;
end;
$$;

comment on function public.increment_board_view_count(text, bigint) is
  '공지/입찰 상세 조회 시 조회수 +1 (Postgres에는 SELECT 시 자동 트리거가 없어 RPC로 처리)';

revoke all on function public.increment_board_view_count(text, bigint) from public;
grant execute on function public.increment_board_view_count(text, bigint) to anon;
grant execute on function public.increment_board_view_count(text, bigint) to authenticated;

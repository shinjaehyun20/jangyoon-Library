# 교육형 동화책 시리즈 운영 가이드

## 목표
- 격주 1권 발간 가능한 제작 체인을 유지한다.
- `KR 읽기판`과 `KR-EN 병기판`을 같은 장면 구조에서 동시에 만든다.
- 웹북과 PDF가 같은 콘텐츠/삽화 자산을 공유하도록 유지한다.

## 권별 진행 순서
1. 공개 도메인 또는 공개 활용 가능 원전 후보를 고른다.
2. 원전 사용 근거를 메타데이터에 기록한다.
3. 14~16장면 구조로 장면 아웃라인을 작성한다.
4. 장면별 KR 본문, EN 병기, 학습 포인트를 완성한다.
5. `templates/illustration-pack.template.json` 기준으로 ComfyUI 프롬프트 세트를 만든다.
6. 웹북에서 모바일과 PC 가독성을 확인한다.
7. `npm run export:pdf`로 두 에디션 PDF를 생성한다.
8. `docs/qa-checklist.md`를 통과하면 발간 상태로 올린다.

## 추천 폴더 규칙
- 새 권 데이터: `src/data/books/<book-id>.json`
- 발간 PDF: `outputs/`
- 삽화 및 seeds: `outputs/<volume>/`
- ComfyUI 워크플로: `comfyui/workflows/`

## 샘플 권
- 현재 샘플 권은 `북풍과 해님`
- 원전 출처: Aesop's Fables
- 공개 사용 근거: Wikisource 공개 도메인 텍스트

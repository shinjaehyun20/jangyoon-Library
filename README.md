# Jangyoon Library

교육형 어린이 동화책 시리즈를 위한 GitHub Pages 배포형 워크스페이스입니다.

## 배포 주소
- GitHub Repository: `https://github.com/shinjaehyun20/jangyoon-Library`
- GitHub Pages: `https://shinjaehyun20.github.io/jangyoon-Library/`

## 현재 포함 내용
- 모바일/PC 동시 대응 반응형 웹북
- `KR 읽기판` / `KR-EN 병기판` 토글
- 인쇄 친화형 PDF 출력 버튼
- 샘플 권 `북풍과 해님`
- 장면/메타데이터/ComfyUI/웹 리더/PDF 스펙 템플릿
- 실제 생성 삽화 `cover + scene-01 ~ scene-15`
- GitHub Pages 배포 스크립트

## 샘플 권
- 제목: `북풍과 해님`
- 원전: `Aesop's Fables - The North Wind and the Sun`
- 공개 활용 근거: `Wikisource 공개 도메인 텍스트를 아동용으로 재구성`
- 대상: `8세, 초등학교 1학년`

## 실행
```bash
npm install
npm run dev
```

## 검증
```bash
npm run validate:content
npm run build
```

## PDF 출력
```bash
npm run export:pdf
```

생성된 PDF는 `outputs/` 아래에 저장됩니다.

## 삽화 생성
로컬 SD 3.5 기반 삽화 생성 스크립트:

```bash
scripts\run_generate_story_illustrations.bat
```

직접 실행 파일:
- `scripts/generate_story_illustrations.py`
- Python env: `D:\workspace\env\python\py310-torch\Scripts\python.exe`
- 모델 루트: `D:\workspace\tools\ComfyUI`

생성 결과는 아래 경로에 저장됩니다.
- `public/illustrations/volume-01`

## GitHub Pages 배포
```bash
npm run deploy
```

배포 기본 경로는 `/jangyoon-Library/`로 설정되어 있습니다.

## 주요 폴더
- `src/`: 웹북 앱 소스
- `src/data/books/`: 책 데이터 JSON
- `public/illustrations/volume-01/`: 실제 삽화 PNG
- `scripts/`: 검증, PDF, 삽화 생성 스크립트
- `templates/`: 다음 권 제작용 템플릿
- `docs/`: 운영 가이드와 QA 체크리스트
- `outputs/`: PDF 출력물

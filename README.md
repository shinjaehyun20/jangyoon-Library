# Jangyoon Library

교육형 어린이 동화책 시리즈를 위한 GitHub Pages 배포형 워크스페이스입니다.

## 포함 내용
- 모바일/PC 동시 대응 반응형 웹북
- `KR 읽기판` / `KR-EN 병기판` 토글
- 인쇄 친화형 PDF 출력 버튼
- 샘플 권 `북풍과 해님`
- 장면/메타데이터/ComfyUI/웹 리더/PDF 스펙 템플릿
- GitHub Pages 배포 스크립트

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

## GitHub Pages 배포
```bash
npm run deploy
```

배포 기본 경로는 `/jangyoon-Library/`로 설정되어 있습니다.

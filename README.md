# NeoToolGen 🛠️

다양한 기능을 제공하는 Node.js 기반 웹 도구 모음입니다.

## 기능 소개

### 1. 📁 파일 일괄 이름 변경
- 폴더를 선택하여 내부 파일들을 일괄 이름 변경
- 파일들을 이름순으로 정렬 후 연번을 부여
- 예: "aaa"를 입력하면 → aaa001.jpg, aaa002.png, aaa003.txt 형태로 변경

### 2. 📝 텍스트 파일 생성
- 사용자가 입력한 내용으로 텍스트 파일 생성
- 즉시 다운로드 가능

### 3. 🔍 파일 정보 조회
- 선택한 파일의 상세 정보 확인
- 파일명, 크기, 타입, 수정일 등

### 4. 🎲 랜덤 문자열 생성
- 지정된 길이의 랜덤 문자열 생성
- 숫자, 특수문자 포함 옵션
- 클립보드 복사 기능

### 5. ⏰ 현재 시간 정보
- 현재 날짜와 시간 정보 제공
- 다양한 형식으로 표시 (한국 시간, ISO, 타임스탬프)

### 6. 💻 시스템 정보
- 서버 시스템 정보 조회
- 플랫폼, CPU, 메모리 등

## 설치 및 실행

### 필요사항
- Node.js (버전 14 이상)
- npm

### 설치
```bash
npm install
```

### 실행
```bash
npm start
```

개발 모드 (자동 재시작):
```bash
npm run dev
```

## 접속
브라우저에서 `http://localhost:3000`으로 접속

## 프로젝트 구조
```
neotoolgen/
├── server.js          # Express 서버
├── package.json        # 프로젝트 설정
├── public/            # 정적 파일
│   ├── index.html     # 메인 페이지
│   ├── styles.css     # 스타일시트
│   └── script.js      # 클라이언트 JavaScript
├── uploads/           # 임시 업로드 폴더
└── downloads/         # 다운로드 파일 저장소
```

## 사용법

1. **파일 일괄 이름 변경**: 
   - "폴더 선택" 버튼을 클릭하여 폴더 선택
   - 새 파일명 입력 (예: "photo")
   - "이름 변경" 버튼 클릭
   - 결과: photo001.jpg, photo002.png 등으로 변경

2. **기타 기능들**:
   - 각 카드의 입력 필드를 채우고 해당 버튼 클릭
   - 결과는 카드 하단에 표시
   - 생성된 파일은 하단 다운로드 섹션에서 확인 가능

## 기술 스택
- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **File Upload**: Multer
- **File System**: fs-extra

## 라이선스
MIT License
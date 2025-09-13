# 📅 Dream Assignment - 캘린더 앱

간단한 일정 관리 캘린더 애플리케이션입니다.  
Expo + React Native + Jotai 를 기반으로 구현되었으며, 과제 요구사항에 맞춰 기본 달력 / 일정 표시 / 일정 상세 열람 기능을 제공합니다.

### 📌 구현 기능

✅ 기본 달력 기능 (년도, 월, 일, 요일 표시)

✅ 달력에 일정(이벤트) 표시

✅ 특정 날짜 선택 시, 해당 날짜의 일정 목록 확인

✅ 일정 목록 선택 시, 해당 일정의 제목과 상세 내용 열람 가능

데이터는 API 없이 assets/events.json 의 샘플 이벤트를 사용합니다.

---

## 🚀 실행 방법

```bash
# 의존성 설치
pnpm install

# 앱 실행 (Expo)
pnpm expo start
또는
pnpm start
```

### 📂 디렉터리 구조

```bash
app/                         # Expo Router 기반 라우팅
 ├─ event/                   # 일정 상세 관련 라우트
 │   ├─ [id].tsx             # 일정 상세 화면
 │   ├─ _layout.tsx          # 이벤트 관련 레이아웃
 │   └─ index.tsx            # 메인 달력 + 리스트 화면
 └─ ...                      # (루트 App.tsx는 expo entry)

assets/                      # 정적 리소스 및 더미 데이터
 ├─ events.json              # 샘플 일정 데이터
 ├─ adaptive-icon.png
 ├─ favicon.png
 ├─ icon.png
 └─ splash-icon.png

src/
 ├─ atoms/
 │   └─ calendar.ts          # jotai atoms (이벤트, 선택 날짜 등)
 │
 ├─ boot/
 │   └─ Boot.tsx             # 초기 데이터 로딩
 │
 ├─ components/              # UI 컴포넌트 모음
 │   ├─ calendar/            # 달력 관련 컴포넌트
 │   │   ├─ CalendarDots.tsx
 │   │   ├─ CalendarGrid.tsx
 │   │   ├─ CalendarHeader.tsx
 │   │   └─ CalendarWeekDaysHeader.tsx
 │   │
 │   ├─ card/                # 카드형 레이아웃
 │   │   └─ SectionCard.tsx
 │   │
 │   ├─ detail/              # 상세 페이지 전용 UI
 │   │   ├─ DetailHeader.tsx
 │   │   ├─ DetailMeta.tsx
 │   │   ├─ Divider.tsx
 │   │   └─ NotFoundView.tsx
 │   │
 │   ├─ list/                # 리스트 관련 UI
 │   │   ├─ EmptySign.tsx
 │   │   ├─ EventList.tsx
 │   │   └─ EventListItem.tsx
 │   │
 │   └─ text/                # 텍스트/타이틀/배지
 │       ├─ PillTag.tsx
 │       └─ Title.tsx
 │
 ├─ constants/
 │   └─ calendar.ts          # 이벤트 타입별 색상 정의
 │
 ├─ theme/
 │   └─ index.ts             # 색상/폰트/spacing 테마
 │
 └─ types/                   # 타입 정의 (EventItem 등)
```

### 🛠 사용 기술

- React Native (Expo)

- Jotai : 전역 상태 관리 (이벤트, 선택된 날짜)

- expo-router : 파일 기반 라우팅

- react-native-safe-area-context : 안전 영역 대응

- TypeScript : 정적 타입 안정성 보장

### 🎨주요 화면
<img width="316" height="770" alt="image" src="https://github.com/user-attachments/assets/d003644c-38f1-497d-8055-a8d1a6eb5cd0" />
<img width="316" height="770" alt="image" src="https://github.com/user-attachments/assets/7f723cb4-5d88-4bfc-9362-3111f41e5888" />



- 캘린더 화면

- 년/월 이동 가능

- 날짜별 이벤트 개수 점(dot) 표시

- 날짜 선택 시 하단에 일정 목록 표시

- 이벤트 상세 화면

- 제목, 날짜/시간, 장소, 메모, 유형 표시

- 일정이 없는 경우 "일정을 찾을 수 없습니다." 안내

### 👤 개발자 메모

과제 요구사항에 맞춰 추가 편집/수정 기능은 제외했습니다.

디자인은 theme를 기준으로 일관성 있게 적용했습니다.

더미 데이터(assets/events.json)는 8~10월 다양한 유형의 이벤트로 구성했습니다.

*** 다양한 화면 사이즈와 iOS 환경 테스트는 컴퓨터 사양 제약으로 직접 진행하지는 못했으나,
레이아웃과 스타일을 반응형 구조로 작성하여 크로스플랫폼 환경에서도 동작할 수 있도록 고려하였습니다.

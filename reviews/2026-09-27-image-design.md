# UI/UX 이미지 모델 검토 · 2026-09-27

사용자가 제공한 이미지에는 Artificial Analysis UI/UX Design 오픈 웨이트
리더보드의 모델·호스팅 설정 14개가 보입니다. HunyuanImage 3.0 본체는
기존 레지스트리 항목에 연결했고, 나머지 13개를 추가했습니다. 함께 소개된
Ming-Image-0.1-Design-Layer도 별개 모델로 추가했습니다. 이미지→편집 가능
PPT 및 디자인 스킬은 모델 체크포인트가 아니므로 모델 개수에 넣지 않았습니다.

## 평가 출처와 범위

| 평가 | 기록 | 근거 | 날짜 의미 |
| --- | ---: | --- | --- |
| UI/UX Design · open weights | 13개 Elo | [InclusionAI 공식 모델 카드의 AA 이미지](https://huggingface.co/inclusionAI/Ming-Image-0.1-Design/resolve/main/assets/uiux_leaderboard.webp) | 9/27 확인, 원본 평가일 및 촬영일 미공개. 제공사 캡처 점수, 공식 현재 순위 아님 |
| Text to Image · All · open weights | 14개 Elo 및 공식 전체 순위 | [Artificial Analysis 전체 리더보드](https://artificialanalysis.ai/image/leaderboard/text-to-image/open-weights) | 9/27 확인 스냅샷, 개별 평가일 미공개 |

이미지에서 `Cosmos3-Super-Text2Image...`의 끝이 잘려 있어 926 UI/UX 점수를
특정 모델 버전에 할당하지 않았습니다. Cosmos3 본체의 공식 전체 점수만
등록했습니다. Ming 레이어 분해 모델에는 이미지 생성 점수를 전용하지 않았습니다.
두 평가의 Elo는 카테고리와 모델 설정이 다르므로 각각 다른 `METRICS`와
cohort로 저장했습니다. 화면의 제공사 캡처 점수는 공식 순위 숫자 대신
점수 순서로 표시합니다.

## 모델 출처

- [Ming Design](https://huggingface.co/inclusionAI/Ming-Image-0.1-Design), [Design-Layer](https://huggingface.co/inclusionAI/Ming-Image-0.1-Design-Layer): MIT, 중국, 6B. Artificial Analysis에는 2026년 9월 공개로만 표기되어 정확한 정식 공개일과 API 첫날은 비워 두었습니다.
- [Ideogram 4.0 공식 발표](https://ideogram.ai/news/ideogram-4.0/), [라이선스](https://ideogram.ai/licensing/): 2026-06-03. 가중치는 공개되었지만 비상업 약관이 적용되며 OSI 오픈소스가 아닙니다. Quality, Instant, Fast (Quality)는 평가용 서비스 설정으로 구분합니다.
- [Tencent HunyuanImage 3.0 Instruct](https://huggingface.co/tencent/HunyuanImage-3.0-Instruct): 2026-01-26, 커뮤니티 라이선스. 기존 3.0의 라이선스 표기도 정정.
- [FLUX.2 dev](https://huggingface.co/black-forest-labs/FLUX.2-dev), [Fal Turbo](https://huggingface.co/fal/FLUX.2-dev-Turbo): 공개 가중치, 비상업 약관. Flash/Turbo 호스팅 설정의 API 상업 사용권과 로컬 가중치 약관은 분리.
- [HiDream O1](https://huggingface.co/HiDream-ai/HiDream-O1-Image): 2026-05-08, MIT.
- [Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo): Apache-2.0.
- [Cosmos3 Super Text2Image](https://huggingface.co/nvidia/Cosmos3-Super-Text2Image): 2026-05-31, OpenMDW 1.1.
- [ERNIE Image](https://huggingface.co/baidu/ERNIE-Image): Apache-2.0.

## 확인된 API 요금

| 설정 | USD | 단위 | 공식 출처 |
| --- | ---: | --- | --- |
| Ideogram 4.0 Default | 0.06 | 이미지 1장 | [Ideogram 4.0](https://ideogram.ai/models/4.0/) |
| Ideogram 4.0 Quality | 0.10 | 이미지 1장 | [Ideogram 4.0](https://ideogram.ai/models/4.0/) |
| FLUX.2 dev (Fal) | 0.012 | 출력 1MP | [Fal API](https://fal.ai/models/fal-ai/flux-2) |
| FLUX.2 dev Flash (Fal) | 0.005 | 출력 1MP | [Fal 가이드](https://fal.ai/learn/devs/flux-2-flash-developer-guide) |
| FLUX.2 dev Turbo (Fal) | 0.008 | 출력 1MP | [Fal 가이드](https://fal.ai/learn/devs/flux-2-turbo-developer-guide) |

다른 항목은 선택한 공급자별 요금이 달라 가격을 추정하지 않았습니다.
Ming 모델 카드에 연결된 디자인/PPT 스킬은 별도의 모델 체크포인트가 아닙니다.

## 검증

`node tests/registry.test.cjs`: JavaScript 구문, 모델 ID·점수 키 중복,
재실행, 카탈로그/오픈 웨이트 필터 상태 복귀, 화면 이미지 URL과 두 평가의
데이터 분리 확인. 브라우저 실화면·실기기 테스트는 수행하지 못했습니다.

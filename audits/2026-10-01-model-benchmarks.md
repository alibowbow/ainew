# 2026-10-01 모델·벤치마크 검수

## 범위

- 기존 등록 모델 중 2026-09-01 이후 출시·프리뷰·제공 기록이 있는 44개를 공식 발표·문서·모델 카드와 대조했습니다.
- 누락 모델 및 API/서비스 설정 24개를 추가했습니다. 설정은 `recordType: configuration`으로 구분합니다.
- 검수 표시가 있는 최신 항목은 68개입니다. 추가로 과거 출시 모델 4개의 최신 AA 평가를 확인했습니다. 전체 카탈로그는 199개이며, 전체 과거 모델의 모든 평가를 이번에 재검수했다는 뜻은 아닙니다.
- Artificial Analysis의 현재 v4.3.2 원문을 확인했습니다. 과거 기사에 나온 v4.2 점수를 현재 지표에 섞지 않았습니다.
- 점수 미확인은 0점 또는 미평가를 뜻하지 않습니다. 이미지·영상·음성·음악·월드·3D 모델은 일반 텍스트 지능 지표 대신 해당 분야 평가를 사용합니다.

## 수정 요약

- GPT-6.1 Sol: Low 42, Medium 48, High 50, Xhigh 51, Max 52. 제공사 HealthBench 결과와 AA 지능 지표를 별도 기록했습니다.
- Gemini 4 Argon High 53, GPT-6 Astra 46/50/51/52/53, Claude Fable 5.1 47/49/51/53/53, Gemini 3.8 Flash 33/40/41, Muse Spark 1.3 Xhigh 45·Max 48을 보완했습니다.
- GPT-6 Sol High 43→42, None 28→29. Luna Low/Medium/High/Xhigh/Max는 22/30/33/35/38로 정정했습니다.
- Sonnet 5.5 Low 36은 현재 AA가 공개하지 않은 값이므로 삭제했습니다. 공개된 Medium 41/High 47/Xhigh 52/Max 56만 남겼습니다. Default fallback과 출시 전 구조화 출력 버그 관련 원문 주의 사항을 유지했습니다.
- MiMo Pro API 46·Flash API 38은 API 평가 설정에 연결했습니다. RL 공개 가중치와 정확히 같은 체크포인트인지 확정하지 않았습니다.
- MiMo Pro-RL 17개, Flash-RL 16개, Distill-Qwen-9B SFT 11개의 공식 평가를 채웠습니다. avg@1·avg@3와 내부 mini 평가를 구분했습니다.
- Muse Voice Transcribe의 streaming final WER 3.1%, 평균 diarization DER 17.5%를 추가했습니다. 그래프에 약 3.0%로 표시한 별도 속도 실험을 정확한 수치로 등록하지 않았습니다.
- Gemini Live Extended Thinking의 음성 지표 4개를 추가했습니다. Speech to Speech Quality Index는 일반 Intelligence Index와 별도입니다.
- Mercury Voice의 9월 29일 Enterprise GA와 128K 컨텍스트, 표준/할인 요금을 추가했습니다. 음성 파이프라인의 텍스트 LLM이며 TTFAT p50 320ms·p95 750ms는 발표의 low 설정입니다.
- Solar Mini 4의 AA 독립 페이지 24점과 Upstage가 인용한 24.1점을 별도 지표로 표시했습니다. 가격표의 UTC 할인 기간을 기록했습니다.
- 기본 벤치마크 화면에서 30개 등록 모델의 최고 공개 설정 점수와 Sol 6.1의 5개 설정을 먼저 표시합니다. 전체 AA 리더보드의 공식 순위로 표기하지 않습니다.
- 공식 그래프는 9월 22일 Sol/Luna 기사 이미지에서 9월 30일 Argon 분석의 평가별 이미지로 교체했습니다. UI/UX 이미지 그래프는 기존 출처를 유지합니다.

- Step 5 Preview 44, Ling 금융 23·시각 25, K2 Horizon 0.9B/3.7B/7B/MoVA/375B의 3/16/21/25/31, MiniCPM5-2B 12를 보완했습니다.
- 9월 새 평가인 JT-4.1 Flash 34와 DeepSeek V4 Pro 0813의 Max 36·Non-reasoning 20도 확인했습니다. JT는 7월 출시이나 정확한 출시일은 미확인입니다.

## AA 원문

- [현재 Intelligence Index 방법론](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index)
- [AA 변경 기록](https://artificialanalysis.ai/changelog)
- [GPT-6.1 Sol 독립 분석](https://artificialanalysis.ai/articles/gpt-6-1-sol-replaces-gpt-6-sol-after-just-7-days-with-near-astra-intelligence)
- [Gemini 4 Argon 독립 분석](https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs)
- [Sonnet Low: 현재 점수 미공개](https://artificialanalysis.ai/models/claude-sonnet-5-5-low)
- [Solar Mini 4 독립 분석](https://artificialanalysis.ai/articles/korean-ai-lab-upstage-releases-solar-mini-4)

## 최신 항목별 확인

숫자 점수는 평가별 버전·설정·출처와 함께 앱에서 확인할 수 있습니다. 아래 표의 점수 개수는 출처별 스냅샷과 추론 설정을 포함합니다.

| 모델 / 제공 설정 | AA 지능 지표 상태 | 등록 평가 | 원문 |
|---|---|---:|---|
| Gemini 4 Argon | v4.3.2 점수 확인 | 21 | [원문](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) |
| GPT-6.1 Sol | v4.3.2 점수 확인 | 10 | [원문](https://developers.openai.com/api/docs/models/gpt-6.1-sol) |
| Mercury Voice | 공개 v4.3.2 점수 미확인 | 2 | [원문](https://www.inceptionlabs.ai/blog/introducing-mercury-voice) |
| Claude Sonnet 5.5 | v4.3.2 점수 확인 | 27 | [원문](https://platform.claude.com/docs/en/models/sonnet-5-5/overview) |
| LFM2.5-VL-3B-DSpark | 공개 v4.3.2 점수 미확인 | 6 | [원문](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark) |
| Qwen Decision Model Preview | 공개 v4.3.2 점수 미확인 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Claude Opus 5.5 | v4.3.2 점수 확인 | 9 | [원문](https://platform.claude.com/docs/en/models/opus-5-5/overview) |
| Gemini 3.8 Flash TTS | 전문 분야 평가 대상 | 2 | [원문](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts) |
| Gemini 3.8 Flash-Lite TTS | 전문 분야 평가 대상 | 0 | [원문](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-lite-tts) |
| GPT-6 Luna | v4.3.2 점수 확인 | 8 | [원문](https://developers.openai.com/api/docs/changelog) |
| GPT-6 Sol | v4.3.2 점수 확인 | 11 | [원문](https://developers.openai.com/api/docs/changelog) |
| MiMo-V2.6-Distill-Qwen-9B | 공개 v4.3.2 점수 미확인 | 11 | [원문](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B) |
| MiMo-V2.6-Flash-RL | 공개 v4.3.2 점수 미확인 | 16 | [원문](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL) |
| MiMo-V2.6-Pro-RL | 공개 v4.3.2 점수 미확인 | 17 | [원문](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) |
| Solar Mini 4 | v4.3.2 점수 확인 | 7 | [원문](https://www.upstage.ai/blog/en/solar-mini-4) |
| Aikido Altar-1 | 공개 v4.3.2 점수 미확인 | 2 | [원문](https://huggingface.co/AikidoSec/altar-1) |
| Grok 4.7 | v4.3.2 점수 확인 | 6 | [원문](https://docs.x.ai/developers/grok-4-7) |
| MiMo-V2.6-Flash · API 평가 | v4.3.2 점수 확인 | 1 | [원문](https://artificialanalysis.ai/models/mimo-v2-6-flash) |
| MiMo-V2.6-Pro · API 평가 | v4.3.2 점수 확인 | 1 | [원문](https://artificialanalysis.ai/models/mimo-v2-6-pro) |
| Qwen3.8 Omni Flash Realtime | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Qwen Audio 3.1 Realtime Plus | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Qwen-Image-2.1 | 전문 분야 평가 대상 | 2 | [원문](https://huggingface.co/Qwen/Qwen-Image-2.1) |
| HappyOyster 1.0 Acting | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/developer-guides/getting-started/world-model/happyoyster-guide) |
| HappyOyster 1.0 Adventure | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/developer-guides/getting-started/world-model/happyoyster-guide) |
| HappyOyster 1.0 Directing | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/developer-guides/getting-started/world-model/happyoyster-guide) |
| Qwen3.8 Omni Flash | 공개 v4.3.2 점수 미확인 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Step 5 Preview | v4.3.2 점수 확인 | 1 | [원문](https://artificialanalysis.ai/models/step-5) |
| Astra for Law · 시스템 구성 | 공개 v4.3.2 점수 미확인 | 1 | [원문](https://openai.com/index/astra-for-law/) |
| Qwen3.8 LiveTranslate Flash Realtime | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Gemini 3.8 Live | 전문 분야 평가 대상 | 0 | [원문](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/) |
| Gemini 3.8 Live Extended Thinking | 전문 분야 평가 대상 | 4 | [원문](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/) |
| Vidu Image · QwenCloud | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Vidu Q2 Pro Fast · QwenCloud | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Vidu Q3 Ad · QwenCloud | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Vidu Q3 Drama · QwenCloud | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Vidu Q3 Mix · QwenCloud | 전문 분야 평가 대상 | 0 | [원문](https://docs.qwencloud.com/changelog/models) |
| Eleven Music v2.5 | 전문 분야 평가 대상 | 0 | [원문](https://elevenlabs.io/blog/music-v2-5-model) |
| Fugu Max | 공개 v4.3.2 점수 미확인 | 0 | [원문](https://sakana.ai/fugu-max-release/) |
| Fugu Ultra v2 | 공개 v4.3.2 점수 미확인 | 2 | [원문](https://sakana.ai/fugu-max-release/) |
| Ling-3.0-flash-Fin | v4.3.2 점수 확인 | 1 | [원문](https://huggingface.co/inclusionAI/Ling-3.0-flash-Fin) |
| DeepSeek-V4.1-Flash | v4.3.2 점수 확인 | 22 | [원문](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) |
| GPT-Live-1 | 전문 분야 평가 대상 | 0 | [원문](https://openai.com/index/introducing-gpt-live-1-in-the-api/) |
| Ling-3.0-flash-VL | v4.3.2 점수 확인 | 1 | [원문](https://huggingface.co/inclusionAI/Ling-3.0-flash-VL) |
| Meshy 7.1 | 전문 분야 평가 대상 | 3 | [원문](https://www.meshy.ai/blog/meshy-7-1-launch) |
| Suno v6 | 전문 분야 평가 대상 | 0 | [원문](https://suno.com/blog/introducing-v6) |
| Suno v6 Mini | 전문 분야 평가 대상 | 0 | [원문](https://suno.com/blog/introducing-v6) |
| Suno v6 Wild | 전문 분야 평가 대상 | 0 | [원문](https://suno.com/blog/introducing-v6) |
| GPT Image 2.5 Flare | 전문 분야 평가 대상 | 1 | [원문](https://developers.openai.com/api/docs/models/gpt-image-2.5-flare) |
| GPT Image 2.5 Sunburst | 전문 분야 평가 대상 | 1 | [원문](https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst) |
| Mercury 2.5 | v4.3.2 점수 확인 | 1 | [원문](https://www.inceptionlabs.ai/blog/introducing-mercury-2-5) |
| Mercury Router Preview | 공개 v4.3.2 점수 미확인 | 0 | [원문](https://www.inceptionlabs.ai/blog/introducing-mercury-2-5) |
| MiniCPM5-2B | v4.3.2 점수 확인 | 1 | [원문](https://huggingface.co/openbmb/MiniCPM5-2B) |
| GPT-6 Astra | v4.3.2 점수 확인 | 42 | [원문](https://openai.com/index/gpt-6-astra/) |
| GWM Worlds 2 | 전문 분야 평가 대상 | 0 | [원문](https://runway.com/research/introducing-gwm-worlds-2) |
| K2 Horizon 0.9B | v4.3.2 점수 확인 | 1 | [원문](https://huggingface.co/IFM/K2-Horizon-0.9B) |
| K2 Horizon 3.7B | v4.3.2 점수 확인 | 1 | [원문](https://huggingface.co/IFM/K2-Horizon-3.7B) |
| K2 Horizon 375B-A23B | v4.3.2 점수 확인 | 3 | [원문](https://huggingface.co/IFM/K2-Horizon-375B-A23B) |
| K2 Horizon 7B | v4.3.2 점수 확인 | 1 | [원문](https://huggingface.co/IFM/K2-Horizon-7B) |
| K2 Horizon MoVA 36B A4B | v4.3.2 점수 확인 | 1 | [원문](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B) |
| Gemini 3.8 Flash | v4.3.2 점수 확인 | 6 | [원문](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/) |
| Gemini 3.8 Flash Cyber | 공개 v4.3.2 점수 미확인 | 1 | [원문](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/) |
| Muse Spark 1.3 | v4.3.2 점수 확인 | 14 | [원문](https://research.meta.ai/blog/introducing-muse-spark-1-3) |
| Qwen3.8 Max (0902) | v4.3.2 점수 확인 | 1 | [원문](https://docs.qwencloud.com/changelog/models) |
| Atlas | 전문 분야 평가 대상 | 0 | [원문](https://www.worldlabs.ai/blog/atlas) |
| Claude Fable 5.1 | v4.3.2 점수 확인 | 28 | [원문](https://www.anthropic.com/claude-fable-and-mythos-5-1) |
| Claude Mythos 5.1 | 공개 v4.3.2 점수 미확인 | 0 | [원문](https://www.anthropic.com/claude-fable-and-mythos-5-1) |
| Muse Voice Transcribe | 전문 분야 평가 대상 | 2 | [원문](https://research.meta.ai/blog/introducing-muse-voice-transcribe) |
| Solaris | 전문 분야 평가 대상 | 0 | [원문](https://arxiv.org/abs/2609.00776) |
| GLM-5.3 · AA 평가만 검수 | v4.3.2 점수 확인 | 4 | [원문](https://artificialanalysis.ai/models/glm-5-3) |
| DeepSeek-V4-Pro · AA 평가만 검수 | v4.3.2 점수 확인 | 4 | [원문](https://artificialanalysis.ai/models/deepseek-v4-pro) |
| Kimi K3 · AA 평가만 검수 | v4.3.2 점수 확인 | 3 | [원문](https://artificialanalysis.ai/models/kimi-k3) |
| JT-4.1 Flash 236B A21B · AA 평가만 검수 | v4.3.2 점수 확인 | 1 | [원문](https://artificialanalysis.ai/models/jt236b) |

## 알려진 제한

- 입력 예산·도구·하니스 또는 평가일이 원문에 없는 경우 미기재로 유지했습니다. 확인일은 평가를 실행한 날짜가 아닙니다.
- Sol 6.1 발표의 비교 문장이나 델타만으로 DeepSWE·GDP.pdf 등의 절대 점수를 역산하지 않았습니다.
- 모델 카드에 표시되지 않은 최신 평가가 있을 수 있습니다. 정확한 숫자를 확인한 항목만 등록하고, 원문 그래프는 링크로 남깁니다.
- Gemini 4 Argon은 Fairwind 제한 접근이며 공개 API 최초 제공일은 미발표입니다. Gemini Live Avatar 9월 24일 GA는 기반 모델의 9월 15일 출시와 별도 업데이트로 표시합니다.
- Vidu의 9월 14일은 QwenCloud 제공일입니다. 기반 모델 최초 출시일은 미확인으로 남깁니다.
- Solar Mini 4 출시일 9월 22일은 AA 모델 페이지 기준입니다. Upstage 공식 발표에서 최초 API 제공일은 확인되지 않았습니다.

## 검증

- `node tests/registry.test.cjs`: 구문·중복 ID/평가·출처 메타데이터·정렬·필터·페이지 분할·재적용 안정성 통과.
- 전체 등록 평가: 372→478개. AA v4.3.2 설정별 검수 66개와 기존 공식 순위 발췌 7개를 함께 유지해 총 73개입니다. 공식 순위 발췌는 기본 점수 표 아래에서 펼쳐 볼 수 있습니다.
- 모바일 history 수정은 PR #27에 먼저 반영됐으며 390/768/1280px에서 글자 폭·페이지 가로 넘침·검색·시대 필터를 검증했습니다.
- PR #30 main 병합 및 Pages 배포 성공 후 실제 브라우저에서 Sol 5개 설정, 설정별 점수 보기, 모델 상세 열기/닫기, 9월 30일 공식 그래프 로딩을 확인했습니다. 390/768/1280px에서 벤치마크 가로 넘침이 없으며 390×844px 첫 화면에 AA 모델 점수 9개가 표시됩니다. 같은 세 화면 크기에서 history 회귀 확인도 통과했습니다.

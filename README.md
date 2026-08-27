# AI Model Atlas

주요 AI 모델의 출시 흐름과 AI 기술사의 전환점을 함께 탐색하는 정적 리서치 인터페이스입니다.

## 포함 범위

- 1955–2026: AI 학문 형성, 역전파, LSTM, AlexNet과 딥러닝, word2vec, GAN, AlphaGo, Transformer, AlphaZero, BERT, GPT 계열, 확산 모델, RLHF, ChatGPT, 멀티모달, 추론, 에이전트 평가
- 2023년부터 2026년 8월까지의 주요 모델 릴리즈 28개
- OpenAI, Anthropic, Google, Meta, DeepSeek, Qwen, xAI, Mistral 계열
- GPQA Diamond, MMLU-Pro, Humanity’s Last Exam, Text Arena의 평가별 순위 스냅샷
- GPQA Diamond, SWE-bench, AIME 또는 수학·추론, MMMU 또는 OSWorld 중심의 모델 비교표
- 역사 시대 필터, 출시 연도·모델 계열·검색·정렬 필터
- 모델 상세 카드, 공식 발표문 링크, 비교 고정 기능
- 모바일 메뉴, 기본 Tab/Enter/Space 조작, `/` 검색, `H` 역사 필터, 화살표 키 역사 탭 이동

## 데이터 원칙

출시일은 공식 발표일을 우선했습니다. 역사 카드는 원 논문·학술기관·공식 발표를 연결합니다. 점수는 각 제공자가 발표한 설정과 측정 방식에 따라 기록했으며, 동일한 조건의 단일 순위표로 해석하지 않습니다.

순위 카드는 2026년 8월 27일 조회한 Artificial Analysis와 Arena의 동적 리더보드 스냅샷입니다. Arena는 사람의 선호 Elo이며 사실성·과학 추론의 절대 순위가 아닙니다. GPQA·MMLU-Pro·HLE도 모델 버전, 추론 예산, 프롬프트, 도구, 하네스에 따라 값이 달라질 수 있습니다.

## 주요 원출처

- [Dartmouth AI history](https://home.dartmouth.edu/about/artificial-intelligence-ai-coined-dartmouth)
- [Backpropagation, Nature](https://www.nature.com/articles/323533a0)
- [AlexNet, NeurIPS](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks)
- [AlphaGo, Nature](https://www.nature.com/articles/nature16961)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [GPT-3, NeurIPS](https://papers.nips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html)
- [InstructGPT](https://arxiv.org/abs/2203.02155)
- [GPQA](https://arxiv.org/abs/2311.12022), [MMLU-Pro](https://arxiv.org/abs/2406.01574), [MMMU](https://arxiv.org/abs/2311.16502), [HLE](https://arxiv.org/abs/2501.14249)
- [SWE-bench](https://www.swebench.com/), [LiveBench](https://livebench.ai/), [LiveCodeBench](https://livecodebench.github.io/)
- [Artificial Analysis GPQA](https://artificialanalysis.ai/evaluations/gpqa-diamond), [MMLU-Pro](https://artificialanalysis.ai/evaluations/mmlu-pro), [HLE](https://artificialanalysis.ai/evaluations/humanitys-last-exam), [Intelligence Index](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index)
- [Arena text leaderboard](https://arena.ai/leaderboard/text)

## 실행

별도의 빌드 도구 없이 `index.html`을 브라우저에서 열면 됩니다. GitHub Pages를 사용하는 경우 Pages source를 `main` 브랜치의 root로 설정하면 됩니다.

## 디자인 메모

AI 연구 인덱스의 편집 화면을 콘셉트로 삼았습니다. 어두운 잉크색 사이드 레일, 따뜻한 종이색 캔버스, 라임 신호색을 사용해 일반적인 SaaS 대시보드와 구분되는 정보 밀도와 리듬을 만들었습니다. 좁은 화면에서는 사이드 레일이 접히고, 카드와 벤치마크 표가 모바일 폭에 맞춰 재배치됩니다.

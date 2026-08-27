# Model Atlas

Model Atlas is a zero-build, single-file static research desk for the global history of AI, model release timelines, benchmark snapshots, and a secondary China open-model track.

## Scope

- Global AI history from the Dartmouth proposal/workshop through deep learning, AlphaGo, Transformer, foundation models, reasoning, and agents
- 28 source-linked global model releases from 2023–2026
- Search, year/family filters, release sorting, model detail modal, and pinned comparison
- Benchmark snapshots for SWE-bench, GPQA, AIME/Math, MMLU, MMMU, and BrowseComp
- China open/open-weight track covering Qwen3.8, DeepSeek V4, GLM-5.3, Kimi K3, MiniMax M3/M2.5, and Tencent Hunyuan/Hy3
- Explicit distinction between open-source licenses, open weights, custom licenses, and entries requiring model-card verification
- Mobile drawer navigation, touch-sized controls, focus-visible styles, keyboard shortcuts, modal focus trapping, and light/dark theme persistence

## Run

Open index.html directly in a browser. No npm, build step, server, or environment variables are required.

## Keyboard

- ⌘ K / Ctrl K or /: focus search
- H: jump to global history
- Arrow keys: move within history and benchmark tabs
- Esc: close the model dialog or mobile navigation

## China research sources

- [Qwen3.8 official repository](https://github.com/QwenLM/Qwen3.8)
- [DeepSeek V4 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [DeepSeek official change log](https://api-docs.deepseek.com/updates/)
- [GLM-5.3 developer docs](https://docs.z.ai/guides/llm/glm-5.3)
- [GLM-5.3-Flash model card](https://huggingface.co/zai-org/GLM-5.3-Flash)
- [Kimi K3 model card](https://huggingface.co/moonshotai/Kimi-K3)
- [MiniMax-M3 model card](https://huggingface.co/MiniMaxAI/MiniMax-M3)
- [MiniMax-M2.5 model card](https://huggingface.co/MiniMaxAI/MiniMax-M2.5)
- [Tencent Hunyuan Hy3 research page](https://hunyuan.tencent.com/research/hy3)

Benchmark numbers are dated public snapshots and must not be treated as a single universal leaderboard. Always inspect the linked model card or release notes for harness, prompt, tool-use, and reasoning-budget details.

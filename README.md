# Model Atlas

Model Atlas is a zero-build static catalog for AI history, models, modalities, and benchmark snapshots.

## Scope

- Global AI history from the Dartmouth proposal/workshop through deep learning, AlphaGo, Transformer, foundation models, reasoning, and agents
- Source-linked model releases, previews, and research announcements, with separate availability milestones
- 3D asset/model generation across text-to-3D, image-to-3D, reconstruction, PBR, and controllable 3D workflows
- Search, year/family filters, release sorting, model detail modal, and pinned comparison
- Benchmark snapshots for SWE-bench, GPQA, AIME/Math, MMLU, MMMU, and BrowseComp
- Region filters for global, China, Korea, US, and Europe
- Explicit distinction between open-source licenses, open weights, custom licenses, and entries requiring model-card verification
- Responsive sticky top navigation, touch-sized controls, focus-visible styles, keyboard shortcuts, modal focus trapping, and light/dark theme persistence

## Run

Open index.html directly in a browser. No npm, build step, server, or environment variables are required.

## Keyboard

- ⌘ K / Ctrl K or /: focus search
- Esc: close the model dialog

## Selected model sources

- [Qwen3.8 official repository](https://github.com/QwenLM/Qwen3.8)
- [DeepSeek V4 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- [DeepSeek official change log](https://api-docs.deepseek.com/updates/)
- [DeepSeek V4.1 Flash official model card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)
- [GLM-5.3 developer docs](https://docs.z.ai/guides/llm/glm-5.3)
- [GLM-5.3-Flash model card](https://huggingface.co/zai-org/GLM-5.3-Flash)
- [Kimi K3 model card](https://huggingface.co/moonshotai/Kimi-K3)
- [MiniMax-M3 model card](https://huggingface.co/MiniMaxAI/MiniMax-M3)
- [MiniMax-M2.5 model card](https://huggingface.co/MiniMaxAI/MiniMax-M2.5)
- [Tencent Hunyuan Hy3 research page](https://hunyuan.tencent.com/research/hy3)
- [Meshy 7 official announcement](https://www.meshy.ai/blog/meshy-7-image-to-3d-geometry-alignment)
- [Meshy 7.1 official announcement](https://www.meshy.ai/blog/meshy-7-1-launch)
- [Tripo 3.1 official release article](https://www.tripo3d.ai/research/the-teapot-test-from-showing-to-making)
- [OpenAI GPT Image 2.5 announcement](https://openai.com/index/introducing-chatgpt-images-2-5/)
- [OpenAI GPT-Live-1 API announcement](https://openai.com/index/introducing-gpt-live-1-in-the-api/)
- [OpenAI GPT-6 Sol / Luna API change log](https://developers.openai.com/api/docs/changelog)
- [Claude Opus 5.5 model overview](https://platform.claude.com/docs/en/models/opus-5-5/overview)
- [Grok 4.7 official announcement](https://x.ai/news/grok-4-7)
- [MiMo-V2.6-Pro-RL official model card](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL)
- [MiMo-V2.6-Flash-RL official model card](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL)
- [MiMo-V2.6-Distill-Qwen-9B official model card](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B)
- [Eleven Music v2.5 official announcement](https://elevenlabs.io/blog/music-v2-5-model)
- [Sakana Fugu Max / Ultra v2 official announcement](https://sakana.ai/fugu-max-release/)
- [Microsoft TRELLIS.2 official repository](https://github.com/microsoft/TRELLIS.2)
- [Meta SAM 3D Objects official repository](https://github.com/facebookresearch/sam-3d-objects)
- [Stability AI Stable Fast 3D](https://stability.ai/news-updates/introducing-stable-fast-3d)

Benchmark scores are condition-specific snapshots. Check the linked source for evaluation details.

## Data verification

Run `node tests/registry.test.cjs` for syntax, data integrity, filter regression, and benchmark-view checks.

Latest source review: [2026-09-23](reviews/2026-09-23.md). Idempotent weekly data updates are applied before UI initialization; source/evaluation dates are never replaced by the review date. Latest-evaluation shortcuts preserve score ordering and condition-specific cohorts. World models remain distinct from mesh-producing 3D models and are available in the media filter.

## Default benchmark view

The benchmark route opens with Artificial Analysis's September 22, 2026 Intelligence Index evaluation breakdown chart, embedded with an external `<img>` from its official article CDN. No image asset is uploaded or copied into this repository. Its publication date is distinct from its September 23 verification date; current Intelligence and Coding leaderboards are linked alongside it. Evaluation scores default to the recent Artificial Analysis Index excerpt, and Text Arena, source filters, and score ordering remain available under `평가별 점수`.

Source: https://artificialanalysis.ai/articles/gpt-6-sol-and-luna-push-the-cost-efficiency-frontier

On future benchmark reviews, check `AA_OFFICIAL_CHART` against the publisher's latest official chart. Update its image URL, article URL, publication date, versions, and verification date together. Do not label a static article image as a live leaderboard or replace it with a generic social-preview card. Preserve the entire chart, branding, model configurations, and axes; retain the external-image error state and source link.

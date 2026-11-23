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

## Design

- The compact masthead uses the same navigation on every route. Narrow layouts place navigation on a second row.
- The overview puts model search, recent releases and the Intelligence Index first. Category links and the monthly release chart follow.
- Model details and theme changes progressively enhance with the View Transitions API.
- `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast` and forced colors are respected. Pretendard Variable loads from jsDelivr and falls back to system fonts offline.

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
- [Meta Muse Wonder official model card](https://research.meta.ai/static/muse-wonder-model-card)
- [Meta Muse Spark Open official model card](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B)
- [DeepSeek V4.1 Flash 1017 official model card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)
- [NVIDIA Nemotron 3.5 Bolt official model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-BF16)
- [NVIDIA Nemotron 3.5 Super VL official model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16)
- [Jais 3 official release](https://ifm.ai/blog/jais3/)
- [MiniMax M3.1 Flash official announcement](https://www.minimax.io/blog/minimax-m31f)
- [Kimi K3.1 Pro official technical blog](https://www.kimi.ai/blog/kimi-k3-1-pro)
- [Kimi API official model and pricing page](https://platform.kimi.ai/)
- [NVIDIA Nemotron 3.5 Bolt E4B 4GB official model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)
- [OpenAI GPT-6.1 Terra announcement](https://openai.com/index/introducing-gpt-6-1-terra/)
- [OpenAI GPT-6.1 Terra model and pricing](https://developers.openai.com/api/docs/models/gpt-6.1-terra)
- [Google Gemini 4 Carbon announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/)
- [Google DeepMind Genie 4 announcement](https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/)
- [Gemini API pricing (Gemini 4 Argon GA)](https://ai.google.dev/gemini-api/docs/pricing)
- [Mistral Large 4 open-weight release](https://mistral.ai/news/mistral-large-4-oss/)
- [Liquid AI LFM3 release](https://huggingface.co/blog/LiquidAI/lfm3)
- [Artificial Analysis Intelligence Index v5](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5)
- [OpenAI GPT-6 Rosalind Research release notes](https://help.openai.com/en/articles/9624314-model-release-notes)
- [OpenAI GPT-Rosalind-6 system card](https://deploymentsafety.openai.com/gpt-rosalind-6)
- [Particle-1 official launch](https://particle.ai/blog/introducing-particle-1)
- [NVIDIA Nemotron 3.5 Transcribe official model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B-FP8)
- [SAM3D-Part official code and weights](https://github.com/Jiahao620/sam3d-part)
- [Ideogram Vector official model and API pricing](https://ideogram.ai/models/vector/)
- [Text Arena official October 27 snapshot](https://arena.ai/leaderboard/chat/text)
- [OpenAI GPT-6 Cyber announcement](https://openai.com/index/gpt-6-cyber/)
- [OpenAI Images 2.6 announcement](https://openai.com/index/introducing-chatgpt-images-2-6/)
- [Google Gemini Omni 1.2 Flash announcement](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-2-flash/)
- [Thinking Machines Inkling 2 Small model card](https://thinkingmachines.ai/models/inkling-2-small/)
- [Tencent Hunyuan Hy4 announcement](https://hunyuan.tencent.com/blog/hy4)
- [Ricursive Ripple-65B Preview announcement](https://www.ricursive.com/blog/ripple-65b-preview)
- [Kakao Kanana-2-v-decide-3b-2611 model card](https://huggingface.co/kakaocorp/kanana-2-v-decide-3b-2611)
- [NVIDIA Cosmos 3 official announcement](https://huggingface.co/blog/nvidia/cosmos-3-world-foundation-models)
- [Text Arena official November 8 snapshot](https://arena.ai/leaderboard/chat/text)
- [Anthropic Claude Fable 5.2 / Mythos 5.2](https://www.anthropic.com/claude-fable-and-mythos-5-2)
- [Meta Muse Ember](https://research.meta.ai/blog/muse-ember)
- [Salesforce SOV-Transcribe-1](https://huggingface.co/salesforce-sovereign-intelligence/SOV-Transcribe-1)
- [Zyphra ZONOS3-Mini](https://huggingface.co/Zyphra/ZONOS3-Mini)
- [MiniMax H3-Image](https://www.minimax.io/blog/minimax-h3-image)
- [Google Gemini Decisions API](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/)
- [Terminal-Bench 4.1 official leaderboard](https://www.tbench.ai/)
- [Text Arena official November 11 snapshot](https://arena.ai/leaderboard/chat/text)
- [Thinking Machines Inkling 2 Mini announcement](https://thinkingmachines.ai/news/inkling-2-mini/)
- [Microsoft MAI Code 2 announcement](https://microsoft.ai/news/introducing-mai-code-2/)
- [Microsoft MAI Image 2.7 announcement](https://microsoft.ai/news/introducing-mai-image-2-7/)
- [Liquid AI d1.2 announcement](https://www.liquid.ai/blog/d1-2)
- [Tencent WeMM-Video paper and weights](https://huggingface.co/papers/2611.26409)
- [EmbeddingGemma 2 technical report](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2-technical-report/)
- [Terminal-Bench 4.1 official leaderboard, November 23](https://www.tbench.ai/)
- [Text Arena official November 22 snapshot](https://arena.ai/leaderboard/chat/text)

Benchmark scores are condition-specific snapshots. Check the linked source for evaluation details.

## Data verification

Run `node tests/registry.test.cjs` for syntax, data integrity, filter regression, and benchmark-view checks.

Latest source review: [2026-11-23](reviews/2026-11-23.md). Idempotent weekly data updates are applied before UI initialization; source/evaluation dates are never replaced by the review date. Latest-evaluation shortcuts preserve score ordering and condition-specific cohorts. World models remain distinct from mesh-producing 3D models and are available in the media filter.

Image-design review: [2026-09-27](reviews/2026-09-27-image-design.md). The benchmark home also embeds the provider-published UI/UX Design open-weight snapshot using an external `<img>` and links to its registered scores. These are separate from Artificial Analysis's current overall text-to-image leaderboard and from the September 22 Intelligence chart.

## Default benchmark view

The benchmark overview now puts the November 23 Terminal-Bench 4.1 snapshot, November 22 Text Arena snapshot, Decision Index v2.1, Inkling 2 Mini, MAI Code 2 and MAI Image 2.7 cohorts before the November 19 Artificial Analysis Intelligence Index v5.0.1 snapshot. Earlier configuration-level and v4.3.2 tables remain in the archive. The evaluation selector defaults to the latest checked condition-specific cohort. See the [November 23 weekly review](reviews/2026-11-23.md) and [November 19 benchmark review](reviews/2026-11-19-benchmarks.md) for source dates and settings.

The Artificial Analysis GPT-6.2 release article's assessment breakdown is embedded as a publication snapshot. The score table works independently of remote image availability.

Source: https://artificialanalysis.ai/articles/openai-has-the-2-model-in-the-intelligence-index-with-the-release-of-gpt-6-2-astra-and-gpt-6-2-sol/

On future benchmark reviews, update the chart source, image, edition, publication date and verification date together. Retain the complete publisher chart, its error fallback, and a link to the article.

Responsive verification: `tests/weekly-responsive.html` renders the overview, catalog and benchmark routes in 320/390/768/1280px frames.

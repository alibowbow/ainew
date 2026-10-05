// Source: https://artificialanalysis.ai/speech-to-text/streaming
// Public page data checked 2026-10-05 KST. WER values are fractions, latency seconds.
const AA_STREAMING_20261005 = [
  {
    "modelId": "gpt-realtime-whisper",
    "name": "OpenAI GPT Realtime Whisper",
    "hostApiId": "gpt-realtime-whisper",
    "aaWerStreamingIndex": 0.048854,
    "aaWerStreamingFirstPartialAfterSpeechEnd": 0.07305090745200775,
    "timeToFinalTranscriptSeconds": 0.6877532456313331,
    "timeToFirstPartialTranscriptSeconds": 0.20556208072771684
  },
  {
    "modelId": "muse-voice-transcribe",
    "name": "Muse Voice Transcribe",
    "hostApiId": "hyper_glider",
    "aaWerStreamingIndex": 0.030623,
    "aaWerStreamingFirstPartialAfterSpeechEnd": 0.03574691459283201,
    "timeToFinalTranscriptSeconds": 0.16305052059344063,
    "timeToFirstPartialTranscriptSeconds": 0.1270717282655382
  },
  {
    "modelId": "mai-transcribe-2-streaming",
    "name": "MAI-Transcribe-2-Streaming",
    "hostApiId": "mai-transcribe-2-streaming-aa-g4",
    "aaWerStreamingIndex": 0.025136,
    "aaWerStreamingFirstPartialAfterSpeechEnd": 0.02516275142251098,
    "timeToFinalTranscriptSeconds": 0.1275691718681629,
    "timeToFirstPartialTranscriptSeconds": 0.12193524507770948
  },
  {
    "modelId": "gemini-3-5-transcribe-live",
    "name": "Gemini 3.5 Transcribe Live",
    "hostApiId": "gemini-3.5-transcribe-live",
    "aaWerStreamingIndex": 0.039983,
    "aaWerStreamingFirstPartialAfterSpeechEnd": 0.05774323141346407,
    "timeToFinalTranscriptSeconds": 0.3952753359762964,
    "timeToFirstPartialTranscriptSeconds": 0.24989982967479663
  }
];

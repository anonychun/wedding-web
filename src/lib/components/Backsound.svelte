<script lang="ts">
  import { song } from "#lib/wedding.ts"

  let audio: HTMLAudioElement | null = $state(null)
  let playing = $state(false)

  // Browsers block autoplay-with-sound until the visitor has interacted with
  // the page, so queue playback to start on the very first interaction.
  const INTERACTIONS = ["pointerdown", "keydown", "touchstart"] as const

  function armRetry() {
    for (const type of INTERACTIONS) window.addEventListener(type, start)
  }

  function disarmRetry() {
    for (const type of INTERACTIONS) window.removeEventListener(type, start)
  }

  async function start() {
    disarmRetry()
    if (!audio) return
    try {
      await audio.play()
    } catch (error) {
      if (error instanceof DOMException && error.name === "NotAllowedError") armRetry()
    }
  }

  $effect(() => {
    if (!audio) return
    audio.volume = song.volume
    start()
    return () => {
      disarmRetry()
      audio?.pause()
    }
  })
</script>

<audio
  bind:this={audio}
  src={song.url}
  loop
  preload="auto"
  onplay={() => (playing = true)}
  onpause={() => (playing = false)}
></audio>

<button
  type="button"
  aria-pressed={playing}
  aria-label={playing ? `Matikan musik — ${song.title}` : `Putar musik — ${song.title}`}
  title={song.title}
  onclick={() => (playing ? audio?.pause() : start())}
  class="fixed right-5 bottom-5 z-50 flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink bg-white text-ink shadow-sm transition-transform hover:scale-105 active:scale-95"
>
  {#if playing}
    <span class="flex items-center gap-[3px]" aria-hidden="true">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </span>
  {:else}
    <svg
      viewBox="0 0 24 24"
      class="size-5"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18V6l11-2v12" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
      <path d="M3 3l18 18" />
    </svg>
  {/if}
</button>

<style>
  .bar {
    width: 3px;
    height: 1rem;
    border-radius: 9999px;
    background: var(--color-ink);
    transform-origin: center;
    animation: eq 1.1s ease-in-out infinite;
  }

  .bar:nth-child(2) {
    animation-delay: 0.25s;
  }

  .bar:nth-child(3) {
    animation-delay: 0.5s;
  }

  @keyframes eq {
    0%,
    100% {
      transform: scaleY(0.3);
    }
    50% {
      transform: scaleY(1);
    }
  }
</style>

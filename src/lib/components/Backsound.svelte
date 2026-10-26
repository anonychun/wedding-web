<script lang="ts">
  import { song } from "#lib/wedding.ts"

  let audio: HTMLAudioElement

  // Browsers may block autoplay with sound until the visitor has interacted
  // with the page, so keep retrying on any gesture that grants user activation.
  const GESTURES = ["click", "touchend", "keydown"] as const

  $effect(() => {
    const listen = () => GESTURES.forEach((type) => window.addEventListener(type, play))
    const unlisten = () => GESTURES.forEach((type) => window.removeEventListener(type, play))
    const play = () => audio.play().then(unlisten, () => {})

    audio.volume = song.volume
    listen()
    play()

    return () => {
      unlisten()
      audio.pause()
    }
  })
</script>

<audio bind:this={audio} src={song.url} loop autoplay preload="auto"></audio>

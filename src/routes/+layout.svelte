<script lang="ts">
  import "./layout.css"
  import favicon from "#lib/assets/favicon.svg"
  import heroImage from "#lib/assets/hero.webp"
  import { couple } from "#lib/wedding.ts"
  import type { LayoutProps } from "./$types"

  let { children, data }: LayoutProps = $props()

  const heroImageUrl = $derived(`${data.origin}${heroImage}`)
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Homemade+Apple&display=swap"
  />

  <!-- Link preview (WhatsApp, Telegram, ...) -->
  <meta
    property="og:site_name"
    content="The Wedding of {couple.groom.nickname} &amp; {couple.bride.nickname}"
  />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={heroImageUrl} />
  <meta property="og:image:type" content="image/webp" />
  <meta property="og:image:width" content="1080" />
  <meta property="og:image:height" content="637" />
  <meta
    property="og:image:alt"
    content="Foto pra-nikah {couple.groom.nickname} &amp; {couple.bride.nickname}"
  />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{@render children()}

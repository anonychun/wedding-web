<script lang="ts">
  import Invitation from "#lib/components/Invitation.svelte"
  import { couple, shareBlurb } from "#lib/wedding.ts"
  import type { PageProps } from "./$types"

  let { data, form }: PageProps = $props()

  const title = $derived(
    `Undangan untuk ${data.guest.name} · ${couple.groom.nickname} & ${couple.bride.nickname}`,
  )
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="og:description" content={shareBlurb} />
  <meta name="robots" content="noindex" />
</svelte:head>

<Invitation guest={data.guest} gifts={data.gifts} wishes={data.wishes} {form} />

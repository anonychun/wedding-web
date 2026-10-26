<script lang="ts">
  import Invitation from "#lib/components/Invitation.svelte"
  import { couple, shareBlurb } from "#lib/wedding.ts"
  import type { PageProps } from "./$types"

  let { data }: PageProps = $props()

  const title = `The Wedding of ${couple.groom.nickname} & ${couple.bride.nickname}`
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="og:description" content={shareBlurb} />
</svelte:head>

<Invitation guest={null} gifts={null} wishes={data.wishes} />

<script lang="ts">
  import Invitation from "#lib/components/Invitation.svelte"
  import { couple } from "#lib/wedding.ts"
  import type { PageProps } from "./$types"

  let { data }: PageProps = $props()
</script>

<svelte:head>
  <title>The Wedding of {couple.groom.nickname} &amp; {couple.bride.nickname}</title>
</svelte:head>

<Invitation guest={null} gifts={null} wishes={data.wishes} />

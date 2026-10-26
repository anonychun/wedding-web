<script lang="ts">
  import Invitation from "#lib/components/Invitation.svelte"
  import { couple } from "#lib/wedding.ts"
  import type { PageProps } from "./$types"

  let { data, form }: PageProps = $props()
</script>

<svelte:head>
  <title
    >Undangan untuk {data.guest.name} · {couple.groom.nickname} &amp; {couple.bride.nickname}</title
  >
  <meta name="robots" content="noindex" />
</svelte:head>

<Invitation guest={data.guest} gifts={data.gifts} wishes={data.wishes} {form} />

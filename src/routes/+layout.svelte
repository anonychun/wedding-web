<script lang="ts">
  import "./layout.css"
  import favicon from "#lib/assets/favicon.svg"
  import type { LayoutProps } from "./$types"

  let { children }: LayoutProps = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Homemade+Apple&display=swap"
  />
</svelte:head>

{@render children()}

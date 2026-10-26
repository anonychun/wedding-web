<script lang="ts">
  import { page } from "$app/state"
</script>

<main class="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
  <p class="font-script text-3xl">Oops</p>
  <p class="label">{page.status}</p>
  <p class="text-sm">{page.error?.message}</p>
</main>

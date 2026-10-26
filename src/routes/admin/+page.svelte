<script lang="ts">
  import { enhance } from "$app/forms"
  import { page } from "$app/state"
  import type { PageProps } from "./$types"

  let { data, form }: PageProps = $props()

  let copied = $state<string | null>(null)
  let query = $state("")

  const linkFor = (code: string) => `${page.url.origin}/${code}`

  const filtered = $derived(
    data.authed
      ? data.invitations.filter((i) => i.guestName.toLowerCase().includes(query.toLowerCase()))
      : [],
  )

  const stats = $derived.by(() => {
    const list = data.authed ? data.invitations : []
    return {
      total: list.length,
      attending: list.filter((i) => i.attendance === "attending").length,
      notAttending: list.filter((i) => i.attendance === "not_attending").length,
      pending: list.filter((i) => !i.attendance).length,
    }
  })

  async function copy(code: string) {
    await navigator.clipboard.writeText(linkFor(code))
    copied = code
    setTimeout(() => (copied = null), 1500)
  }
</script>

<svelte:head>
  <title>Admin · Undangan</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="mx-auto max-w-5xl px-5 py-10 text-[13px]">
  {#if !data.authed}
    <form
      method="POST"
      action="?/login"
      use:enhance
      class="mx-auto mt-24 max-w-xs space-y-4 bg-white p-8 shadow-sm"
    >
      <h1 class="font-script text-center text-2xl">Admin</h1>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        autocomplete="current-password"
        class="w-full border-b border-neutral-400 bg-transparent py-1 focus:outline-none"
      />
      {#if form && "loginError" in form}
        <p class="text-[11px] text-red-700">{form.loginError}</p>
      {/if}
      <button class="label w-full cursor-pointer bg-ink py-2 text-white">Masuk</button>
    </form>
  {:else}
    <header class="mb-10 flex items-center justify-between">
      <h1 class="font-script text-2xl">Daftar Undangan</h1>
      <form method="POST" action="?/logout" use:enhance>
        <button class="label cursor-pointer underline">Keluar</button>
      </form>
    </header>

    <section class="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {#each [["Total", stats.total], ["Hadir", stats.attending], ["Tidak hadir", stats.notAttending], ["Belum jawab", stats.pending]] as [label, value] (label)}
        <div class="bg-white p-4 shadow-sm">
          <p class="label text-neutral-500">{label}</p>
          <p class="text-2xl font-bold">{value}</p>
        </div>
      {/each}
    </section>

    <form
      method="POST"
      action="?/create"
      use:enhance
      class="mb-10 flex flex-col gap-4 bg-white p-6 shadow-sm sm:flex-row sm:items-end"
    >
      <label class="flex-1">
        <span class="label">Nama tamu</span>
        <input
          name="guestName"
          required
          maxlength="200"
          placeholder="cth. Bapak Budi & Keluarga"
          class="mt-1 block w-full border-b border-neutral-400 bg-transparent py-1 focus:outline-none"
        />
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" name="showGifts" class="accent-ink" checked />
        Tampilkan rekening
      </label>
      <button class="label cursor-pointer bg-ink px-6 py-2 text-white">Buat undangan</button>
    </form>

    {#if form && "createError" in form}
      <p class="-mt-6 mb-6 text-[11px] text-red-700">{form.createError}</p>
    {/if}
    {#if form && "created" in form && form.created}
      <div
        class="-mt-6 mb-10 flex items-center justify-between gap-4 border border-ink bg-white p-4"
      >
        <p>Undangan dibuat: <code class="font-bold">{linkFor(form.created)}</code></p>
        <button
          type="button"
          class="label cursor-pointer underline"
          onclick={() => copy(form.created!)}
        >
          {copied === form.created ? "Tersalin ✓" : "Salin link"}
        </button>
      </div>
    {/if}

    <input
      bind:value={query}
      placeholder="Cari nama tamu..."
      class="mb-4 w-full border-b border-neutral-400 bg-transparent py-1 focus:outline-none sm:w-72"
    />

    <div class="overflow-x-auto bg-white shadow-sm">
      <table class="w-full text-left">
        <thead class="label border-b border-neutral-200 text-neutral-500">
          <tr>
            <th class="p-3">Tamu</th>
            <th class="p-3">Kehadiran</th>
            <th class="p-3">Ucapan</th>
            <th class="p-3">Rekening</th>
            <th class="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as inv (inv.id)}
            <tr class="border-b border-neutral-100 align-top">
              <td class="p-3">
                <p class="font-bold">{inv.guestName}</p>
                <a href="/{inv.code}" target="_blank" class="text-[11px] text-neutral-500 underline"
                  >/{inv.code}</a
                >
              </td>
              <td class="p-3 whitespace-nowrap">
                {inv.attendance === "attending"
                  ? "Hadir"
                  : inv.attendance === "not_attending"
                    ? "Tidak hadir"
                    : "—"}
              </td>
              <td class="max-w-xs p-3">{inv.message ?? "—"}</td>
              <td class="p-3">
                <form method="POST" action="?/toggleGifts" use:enhance>
                  <input type="hidden" name="id" value={inv.id} />
                  <input type="hidden" name="showGifts" value={String(!inv.showGifts)} />
                  <button class="label cursor-pointer underline"
                    >{inv.showGifts ? "Tampil" : "Sembunyi"}</button
                  >
                </form>
              </td>
              <td class="space-y-1 p-3 text-right whitespace-nowrap">
                <button
                  type="button"
                  class="label block w-full cursor-pointer text-right underline"
                  onclick={() => copy(inv.code)}
                >
                  {copied === inv.code ? "Tersalin ✓" : "Salin link"}
                </button>
                <form
                  method="POST"
                  action="?/delete"
                  use:enhance={({ cancel }) => {
                    if (!confirm(`Hapus undangan untuk ${inv.guestName}?`)) cancel()
                  }}
                >
                  <input type="hidden" name="id" value={inv.id} />
                  <button class="label cursor-pointer text-red-700 underline">Hapus</button>
                </form>
              </td>
            </tr>
          {:else}
            <tr
              ><td colspan="5" class="p-6 text-center text-neutral-500">Belum ada undangan.</td></tr
            >
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</main>

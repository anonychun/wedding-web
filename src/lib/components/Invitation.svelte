<script lang="ts">
  import { enhance } from "$app/forms"
  import hero from "#lib/assets/hero.jpeg"
  import left from "#lib/assets/left.jpg"
  import right from "#lib/assets/right.jpg"
  import { couple, wedding } from "#lib/wedding.ts"

  type Attendance = "attending" | "not_attending"

  type Props = {
    guest: {
      name: string
      attendance: Attendance | null
      message: string | null
      respondedAt: Date | null
    } | null
    gifts: { bank: string; number: string; holder: string }[] | null
    wishes: {
      guestName: string
      message: string | null
      attendance: Attendance | null
      respondedAt: Date | null
    }[]
    form?: { success?: boolean; error?: string } | null
  }

  let { guest, gifts, wishes, form = null }: Props = $props()

  const monogram = `${couple.groom.nickname[0]}&${couple.bride.nickname[0]}`

  let submitting = $state(false)
  let editing = $state(false)
  let copied = $state<string | null>(null)

  const showForm = $derived(guest && (!guest.respondedAt || editing))

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    copied = text
    setTimeout(() => (copied = null), 1500)
  }

  function attendanceLabel(a: Attendance | null) {
    return a === "attending" ? "Hadir" : a === "not_attending" ? "Tidak hadir" : ""
  }
</script>

<div class="mx-auto max-w-5xl overflow-x-clip px-5 pb-24 text-[13px] leading-relaxed sm:px-10">
  <!-- Header -->
  <header class="flex flex-col gap-8 py-8 sm:flex-row sm:items-start sm:justify-between">
    <a href="#top" class="font-script text-xl leading-tight">
      <span class="block text-sm">Love,</span>
      {monogram}
    </a>
    <div class="grid grid-cols-1 gap-6 text-[11px] sm:grid-cols-3 sm:gap-12">
      <div>
        <p class="label mb-2">Tanggal &amp; Waktu</p>
        <p>{wedding.dateLabel}</p>
        <p class="mt-2">Akad pukul {wedding.akad.time}</p>
      </div>
      {#each [wedding.akad, wedding.resepsi] as event (event.title)}
        <div>
          <p class="label mb-2">{event.title}</p>
          <p>{event.venue}</p>
          {#each event.address as line, i (i)}
            <p class={i === 0 ? "mt-2" : ""}>{line}</p>
          {/each}
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener"
            class="mt-1 inline-block underline"
          >
            Lihat peta
          </a>
        </div>
      {/each}
    </div>
  </header>

  <!-- Hero -->
  <section id="top" class="relative mt-10 bg-white p-2 shadow-sm sm:p-3">
    <div class="tape"></div>
    <img
      src={hero}
      alt="{couple.groom.nickname} &amp; {couple.bride.nickname}"
      class="aspect-[1080/637] w-full object-cover"
    />
    <div
      class="flex flex-col gap-8 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div class="max-w-sm">
        {#if guest}
          <p class="label mb-1">Kepada Yth.</p>
          <p class="mb-4 text-base font-bold">{guest.name}</p>
        {/if}
        <p>
          Kami akan menikah! Dengan penuh sukacita, kami mengundang Anda untuk hadir dan merayakan
          hari bahagia kami bersama.
        </p>
      </div>
      <div class="font-script -rotate-6 text-center text-lg sm:pr-10">
        <p class="text-base">Love,</p>
        <p>{couple.groom.nickname} &amp; {couple.bride.nickname}</p>
      </div>
    </div>
    <p class="border-t border-neutral-100 px-4 py-4 text-center text-[11px] sm:px-6">
      {couple.groom.fullName} &nbsp;·&nbsp; {couple.bride.fullName}
    </p>
  </section>

  <!-- Details -->
  <section class="mt-28 grid items-center gap-14 sm:grid-cols-[1fr_auto]">
    <div class="order-2 space-y-14 sm:order-1 sm:pl-10">
      <div class="grid grid-cols-[6rem_1fr] gap-4">
        <p class="label pt-0.5">Susunan Acara</p>
        <ul>
          {#each wedding.itinerary as item (item.time)}
            <li>{item.time} ........ {item.label}</li>
          {/each}
        </ul>
      </div>
      <div class="grid grid-cols-[6rem_1fr] gap-4">
        <p class="label pt-0.5">Busana</p>
        <div>
          {#each wedding.attire as line, i (i)}
            <p>{line}</p>
          {/each}
        </div>
      </div>
    </div>
    <div class="relative order-1 mx-auto w-60 sm:order-2 sm:mr-10">
      <h2
        class="font-script mb-6 -rotate-6 text-center text-xl whitespace-nowrap sm:absolute sm:top-6 sm:-left-36 sm:z-10 sm:mb-0"
      >
        Detail Acara
      </h2>
      <figure class="relative bg-white p-2 pb-10 shadow-sm">
        <div class="tape"></div>
        <img
          src={right}
          alt={couple.groom.nickname}
          class="aspect-[4/5] w-full object-cover object-top"
        />
      </figure>
    </div>
  </section>

  <!-- Gifts / Prayer -->
  <section class="mt-28 grid items-start gap-14 sm:grid-cols-[auto_1fr]">
    <div class="relative mx-auto w-60 sm:ml-10">
      <figure class="relative bg-white p-2 pb-10 shadow-sm">
        <div class="tape"></div>
        <img
          src={left}
          alt={couple.bride.nickname}
          class="aspect-[4/5] w-full object-cover object-top"
        />
      </figure>
      <h2
        class="font-script mt-6 -rotate-6 text-center text-xl whitespace-nowrap sm:absolute sm:top-6 sm:-right-44 sm:z-10 sm:mt-0"
      >
        {gifts ? "Tanda Kasih" : "Doa Kami"} ♡
      </h2>
    </div>
    <div class="max-w-md pt-4 sm:pt-16">
      {#if gifts}
        <p>
          Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami. Namun apabila Anda ingin
          memberikan tanda kasih, Anda dapat mengirimkannya melalui rekening berikut.
        </p>
        <ul class="mt-8 space-y-5">
          {#each gifts as account (account.number)}
            <li class="flex items-end justify-between gap-4 border-b border-neutral-400 pb-2">
              <div>
                <p class="label">{account.bank}</p>
                <p class="text-sm font-bold tracking-wider">{account.number}</p>
                <p class="text-[11px]">a.n. {account.holder}</p>
              </div>
              <button
                type="button"
                class="label shrink-0 cursor-pointer underline-offset-4 hover:underline"
                onclick={() => copy(account.number)}
              >
                {copied === account.number ? "Tersalin ✓" : "Salin"}
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="italic">
          “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan
          dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan
          dijadikan-Nya di antaramu rasa kasih dan sayang.”
        </p>
        <p class="label mt-4">QS. Ar-Rum: 21</p>
      {/if}
    </div>
  </section>

  <!-- RSVP -->
  {#if guest}
    <section class="relative mx-auto mt-32 max-w-xl">
      <h2 class="font-script absolute -top-14 -left-2 z-10 -rotate-6 text-5xl sm:-left-16">RSVP</h2>
      <div class="bg-white px-6 pt-14 pb-10 shadow-sm sm:px-10">
        <p class="mb-8 text-right text-[11px]">Mohon konfirmasi sebelum {wedding.rsvpDeadline}.</p>

        {#if showForm}
          <form
            method="POST"
            action="?/rsvp"
            class="space-y-7"
            use:enhance={() => {
              submitting = true
              return async ({ update }) => {
                await update({ reset: false })
                submitting = false
                editing = false
              }
            }}
          >
            <fieldset>
              <legend class="mb-2">Apakah Anda dapat hadir?</legend>
              <div class="flex flex-wrap gap-2">
                {#each [["attending", "Ya, dengan senang hati"], ["not_attending", "Maaf, tidak bisa hadir"]] as [value, label] (value)}
                  <label
                    class="cursor-pointer rounded-full border border-neutral-500 px-3 py-0.5 text-[11px] has-checked:bg-ink has-checked:text-white"
                  >
                    <input
                      type="radio"
                      name="attendance"
                      {value}
                      required
                      checked={guest.attendance === value}
                      class="sr-only"
                    />
                    {label}
                  </label>
                {/each}
              </div>
            </fieldset>

            <div>
              <p>Nama</p>
              <p class="border-b border-neutral-400 py-1 font-bold">{guest.name}</p>
            </div>

            <label class="block">
              <span
                >Ucapan &amp; doa <span class="text-[10px] text-neutral-500">(opsional)</span></span
              >
              <textarea
                name="message"
                rows="3"
                maxlength="1000"
                value={guest.message ?? ""}
                class="mt-1 block w-full resize-y border-0 border-b border-neutral-400 bg-transparent px-0 py-1 focus:border-ink focus:ring-0 focus:outline-none"
              ></textarea>
            </label>

            {#if form?.error}
              <p class="text-[11px] text-red-700">{form.error}</p>
            {/if}

            <button
              type="submit"
              disabled={submitting}
              class="label w-full cursor-pointer bg-ink py-3 text-white disabled:opacity-60"
            >
              {submitting ? "Mengirim..." : "Kirim"}
            </button>
          </form>
        {:else}
          <div class="space-y-4 text-center">
            <p class="font-script text-xl">Terima kasih!</p>
            <p>
              Konfirmasi Anda: <strong>{attendanceLabel(guest.attendance)}</strong>
            </p>
            {#if guest.message}
              <p class="italic">“{guest.message}”</p>
            {/if}
            <button
              type="button"
              class="label cursor-pointer underline"
              onclick={() => (editing = true)}
            >
              Ubah jawaban
            </button>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  <!-- Wishes -->
  {#if wishes.length > 0}
    <section class="mx-auto mt-28 max-w-xl">
      <h2 class="font-script mb-8 -rotate-3 text-center text-2xl">Ucapan &amp; Doa</h2>
      <ul class="max-h-[32rem] space-y-6 overflow-y-auto pr-2">
        {#each wishes as wish, i (i)}
          <li class="border-b border-neutral-300 pb-4">
            <div class="flex items-baseline justify-between gap-4">
              <p class="font-bold">{wish.guestName}</p>
              <span class="label shrink-0 text-neutral-500">{attendanceLabel(wish.attendance)}</span
              >
            </div>
            {#if wish.message}
              <p class="mt-1">{wish.message}</p>
            {/if}
          </li>
        {/each}
      </ul>
    </section>
  {/if}

  <footer class="mt-28 text-center">
    <p class="mx-auto max-w-sm text-[11px]">
      Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan
      memberikan doa restu.
    </p>
    <p class="font-script mt-6 text-xl">{couple.groom.nickname} &amp; {couple.bride.nickname}</p>
  </footer>
</div>

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

{#snippet instagram(handle: string)}
  <a
    href="https://www.instagram.com/{handle}"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-1.5 mt-4 hover:underline underline-offset-4"
  >
    <svg
      viewBox="0 0 24 24"
      class="size-3.5"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
    @{handle}
  </a>
{/snippet}

<div class="mx-auto px-5 sm:px-10 pb-24 max-w-5xl overflow-x-clip text-[13px] leading-relaxed">
  <!-- Hero -->
  <section id="top" class="relative bg-white shadow-sm mt-16 p-2 sm:p-3">
    <div class="tape"></div>
    <img
      src={hero}
      alt="{couple.groom.nickname} &amp; {couple.bride.nickname}"
      class="w-full object-cover aspect-[1080/637]"
    />
    <div
      class="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-8 px-4 sm:px-6 py-10"
    >
      <div class="max-w-sm">
        {#if guest}
          <p class="mb-1 label">Kepada Yth.</p>
          <p class="mb-4 font-bold text-base">{guest.name}</p>
        {/if}
        <p class="mb-2 italic">Assalamu'alaikum Warohmatullahi Wabarokatuh</p>
        <p>
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara
          pernikahan kami.
        </p>
      </div>
      <div class="sm:pr-10 font-script text-lg text-center -rotate-6">
        <p class="text-base">Love,</p>
        <p>{couple.groom.nickname} &amp; {couple.bride.nickname}</p>
      </div>
    </div>
  </section>

  <!-- Groom -->
  <section class="items-center gap-14 grid sm:grid-cols-[1fr_auto] mt-28">
    <div class="order-2 sm:order-1 sm:pl-10 sm:text-left text-center">
      <p class="mb-3 label">Mempelai Pria</p>
      <p class="font-bold text-lg">{couple.groom.fullName}</p>
      <p class="mt-4">{couple.groom.childOrder}</p>
      <p>{couple.groom.parents}</p>
      {@render instagram(couple.groom.instagram)}
    </div>
    <div class="relative order-1 sm:order-2 mx-auto sm:mr-10 w-60">
      <h2
        class="sm:top-6 sm:-left-32 sm:z-10 sm:absolute mb-6 sm:mb-0 font-script text-2xl text-center whitespace-nowrap -rotate-6"
      >
        {couple.groom.nickname}
      </h2>
      <figure class="relative bg-white shadow-sm p-2 pb-10">
        <div class="tape"></div>
        <img
          src={right}
          alt={couple.groom.fullName}
          class="w-full object-cover object-top aspect-[4/5]"
        />
      </figure>
    </div>
  </section>

  <!-- Bride -->
  <section class="items-center gap-14 grid sm:grid-cols-[auto_1fr] mt-28">
    <div class="relative mx-auto sm:ml-10 w-60">
      <h2
        class="sm:top-6 sm:-right-36 sm:z-10 sm:absolute mb-6 sm:mb-0 font-script text-2xl text-center whitespace-nowrap -rotate-6"
      >
        {couple.bride.nickname} ♡
      </h2>
      <figure class="relative bg-white shadow-sm p-2 pb-10">
        <div class="tape"></div>
        <img
          src={left}
          alt={couple.bride.fullName}
          class="w-full object-cover object-top aspect-[4/5]"
        />
      </figure>
    </div>
    <div class="sm:pl-10 sm:text-left text-center">
      <p class="mb-3 label">Mempelai Wanita</p>
      <p class="font-bold text-lg">{couple.bride.fullName}</p>
      <p class="mt-4">{couple.bride.childOrder}</p>
      <p>{couple.bride.parents}</p>
      {@render instagram(couple.bride.instagram)}
    </div>
  </section>

  <!-- Date & venues -->
  <section class="mx-auto mt-28 max-w-3xl text-center">
    <h2 class="mb-8 font-script text-2xl -rotate-3">Waktu &amp; Tempat</h2>
    <p class="mb-2 label">Tanggal</p>
    <p class="font-bold text-base">{wedding.dateLabel}</p>

    <div class="gap-6 grid sm:grid-cols-2 mt-12">
      {#each [wedding.akad, wedding.resepsi] as event (event.title)}
        <div class="relative flex flex-col items-center bg-white shadow-sm px-6 pt-10 pb-8">
          <div class="tape"></div>
          <p class="label">{event.title}</p>
          <p class="mt-2 font-bold text-base">{event.time}</p>
          <div class="bg-neutral-300 my-5 w-10 h-px"></div>
          <p class="font-bold">{event.venue}</p>
          {#each event.address as line, i (i)}
            <p class={i === 0 ? "mt-1" : ""}>{line}</p>
          {/each}
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:bg-ink mt-6 px-4 py-2 border border-ink hover:text-white transition-colors label"
          >
            Lihat peta
          </a>
        </div>
      {/each}
    </div>
  </section>

  <!-- Quran verse -->
  <section class="mx-auto mt-28 max-w-xl text-center">
    <div class="bg-neutral-300 mx-auto mb-8 w-10 h-px"></div>
    <blockquote class="italic">
      “Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu
      dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu
      rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
      tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”
    </blockquote>
    <p class="mt-6 label">Q.S. Ar-Rum: 21</p>
    <div class="bg-neutral-300 mx-auto mt-8 w-10 h-px"></div>
  </section>

  <!-- Gifts (only for invitations with showGifts enabled) -->
  {#if gifts}
    <section class="mx-auto mt-28 max-w-md">
      <h2 class="mb-6 font-script text-2xl text-center -rotate-3">Tanda Kasih ♡</h2>
      <p class="text-center">
        Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami. Namun apabila Anda ingin
        memberikan tanda kasih, Anda dapat mengirimkannya melalui rekening berikut.
      </p>
      <ul class="space-y-5 mt-8">
        {#each gifts as account (account.number)}
          <li class="flex justify-between items-end gap-4 pb-2 border-neutral-400 border-b">
            <div>
              <p class="label">{account.bank}</p>
              <p class="font-bold text-sm tracking-wider">{account.number}</p>
              <p class="text-[11px]">a.n. {account.holder}</p>
            </div>
            <button
              type="button"
              class="hover:underline underline-offset-4 cursor-pointer label shrink-0"
              onclick={() => copy(account.number)}
            >
              {copied === account.number ? "Tersalin ✓" : "Salin"}
            </button>
          </li>
        {/each}
      </ul>
    </section>
  {/if}

  <!-- RSVP -->
  {#if guest}
    <section class="relative mx-auto mt-32 max-w-xl">
      <h2 class="-top-14 -left-2 sm:-left-16 z-10 absolute font-script text-5xl -rotate-6">RSVP</h2>
      <div class="bg-white shadow-sm px-6 sm:px-10 pt-14 pb-10">
        <p class="mb-8 text-[11px] text-right">Mohon konfirmasi sebelum {wedding.rsvpDeadline}.</p>

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
                    class="has-checked:bg-ink px-3 py-0.5 border border-neutral-500 rounded-full text-[11px] has-checked:text-white cursor-pointer"
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
              <p class="py-1 border-neutral-400 border-b font-bold">{guest.name}</p>
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
                class="block bg-transparent mt-1 px-0 py-1 border-0 border-neutral-400 focus:border-ink border-b focus:outline-none focus:ring-0 w-full resize-y"
              ></textarea>
            </label>

            {#if form?.error}
              <p class="text-[11px] text-red-700">{form.error}</p>
            {/if}

            <button
              type="submit"
              disabled={submitting}
              class="bg-ink disabled:opacity-60 py-3 w-full text-white cursor-pointer label"
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
              class="underline cursor-pointer label"
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
      <h2 class="mb-8 font-script text-2xl text-center -rotate-3">Ucapan &amp; Doa</h2>
      <ul class="space-y-6 pr-2 max-h-[32rem] overflow-y-auto">
        {#each wishes as wish, i (i)}
          <li class="pb-4 border-neutral-300 border-b">
            <div class="flex justify-between items-baseline gap-4">
              <p class="font-bold">{wish.guestName}</p>
              <span class="text-neutral-500 label shrink-0">{attendanceLabel(wish.attendance)}</span
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
    <p class="mt-6 font-script text-xl">{couple.groom.nickname} &amp; {couple.bride.nickname}</p>
  </footer>
</div>

<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { skills, navLinks, projectCards, timeline } from '$lib/portfolio';

  const storageKey = 'heavy-serenade-theme';
  const copy = {
    light: {
      pressed: 'false',
      aria: 'Switch to dark mode'
    },
    dark: {
      pressed: 'true',
      aria: 'Switch to light mode'
    }
  };

  let theme = $state('light');
  let scrollRatio = $state(0);
  let isHeaderElevated = $state(false);
  let isMobileMenuOpen = $state(false);

  function applyTheme(nextTheme) {
    theme = nextTheme === 'dark' ? 'dark' : 'light';

    if (browser) {
      document.body.dataset.theme = theme;
      localStorage.setItem(storageKey, theme);
    }
  }

  function toggleTheme() {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  }

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  function updateScrollState() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

    scrollRatio = Math.min(scrollTop / scrollMax, 1);
    isHeaderElevated = scrollTop > 8;
  }

  onMount(() => {
    applyTheme(localStorage.getItem(storageKey) || theme);
    let frameId = 0;

    const queueUpdate = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateScrollState();
      });
    };

    queueUpdate();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    const handleResize = () => {
      queueUpdate();

      if (window.innerWidth > 960) {
        closeMobileMenu();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', handleResize);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  });
</script>

<svelte:head>
  <title>Heavy Serenade Portfolio</title>
  <meta
    name="description"
    content="A music-inspired SvelteKit portfolio with Heavy and Serenade modes."
  />
</svelte:head>

<div
  class="page-shell"
  style={`--scroll-ratio:${scrollRatio.toFixed(4)}; --parallax-shift:${(scrollRatio * 180).toFixed(1)}px; --parallax-drift:${(scrollRatio * 72).toFixed(1)}px;`}
>
  <div class="page-ambience" aria-hidden="true">
    <div class="page-ambience__wash"></div>
    <div class="page-ambience__beam"></div>
    <div class="page-ambience__particles"></div>
  </div>

  <header
    class="glass-header z-30"
    class:glass-header--elevated={isHeaderElevated}
    class:glass-header--menu-open={isMobileMenuOpen}
  >
    <div class="glass-header__inner">
      <a class="brand-mark" href="#top" onclick={closeMobileMenu}>
        <span class="font-display text-xl">Claire Danielle</span>
      </a>

      <nav class="header-nav" aria-label="Primary">
        {#each navLinks as link, index (link.href)}
          <a class="header-nav-link" href={link.href}>
            <span class="header-nav-index">{String(index + 1).padStart(2, '0')}</span>
            <span>{link.label}</span>
          </a>
        {/each}
      </nav>

      <div class="header-meta">
        <button
          class="menu-toggle"
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onclick={toggleMobileMenu}
        >
          <span class="menu-toggle-box" aria-hidden="true">
            {#if isMobileMenuOpen}
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  d="M6 6 18 18M18 6 6 18"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.9"
                />
              </svg>
            {:else}
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  d="M4.5 7.5h15M4.5 12h15M4.5 16.5h15"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.9"
                />
              </svg>
            {/if}
          </span>
        </button>

        <button
          class="theme-toggle"
          type="button"
          aria-pressed={copy[theme].pressed}
          aria-label={copy[theme].aria}
          onclick={toggleTheme}
        >
          <span class="theme-toggle-track">
            <span class="theme-toggle-thumb">
              {#if theme === 'dark'}
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path
                    d="M15.2 4.6a7.6 7.6 0 1 0 4.2 13.9A8.6 8.6 0 0 1 15.2 4.6Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                  />
                </svg>
              {:else}
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8" />
                  <path
                    d="M12 2.8v2.3M12 18.9v2.3M21.2 12h-2.3M5.1 12H2.8M18.5 5.5l-1.6 1.6M7.1 16.9l-1.6 1.6M18.5 18.5l-1.6-1.6M7.1 7.1 5.5 5.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="1.8"
                  />
                </svg>
              {/if}
            </span>
          </span>
        </button>
      </div>
    </div>

    <div
      id="mobile-nav"
      class="mobile-menu"
      class:mobile-menu--open={isMobileMenuOpen}
      aria-hidden={!isMobileMenuOpen}
    >
      <nav class="mobile-menu__nav" aria-label="Mobile primary">
        {#each navLinks as link, index (link.href)}
          <a class="mobile-menu__link" href={link.href} onclick={closeMobileMenu}>
            <span class="header-nav-index">{String(index + 1).padStart(2, '0')}</span>
            <span>{link.label}</span>
          </a>
        {/each}
      </nav>

      <div class="mobile-menu__footer">
        <span class="mobile-menu__label">Mode</span>
        <button
          class="theme-toggle"
          type="button"
          aria-pressed={copy[theme].pressed}
          aria-label={copy[theme].aria}
          onclick={toggleTheme}
        >
          <span class="theme-toggle-track">
            <span class="theme-toggle-thumb">
              {#if theme === 'dark'}
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path
                    d="M15.2 4.6a7.6 7.6 0 1 0 4.2 13.9A8.6 8.6 0 0 1 15.2 4.6Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                  />
                </svg>
              {:else}
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8" />
                  <path
                    d="M12 2.8v2.3M12 18.9v2.3M21.2 12h-2.3M5.1 12H2.8M18.5 5.5l-1.6 1.6M7.1 16.9l-1.6 1.6M18.5 18.5l-1.6-1.6M7.1 7.1 5.5 5.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="1.8"
                  />
                </svg>
              {/if}
            </span>
          </span>
        </button>
      </div>
    </div>
  </header>

  <main id="top" class="space-y-7">
    <section class="surface-section hero-panel staff-section py-7">
      <div class="hero-trackbar relative z-[1] px-6 md:px-8">
        <span class="section-label text-white/80">Track 01 - Know About Me</span>
        <span class="hero-trackbar-line" aria-hidden="true"></span>
      </div>

      <div class="px-6 md:px-8">
        <div class="relative z-[1] grid gap-6 pt-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div class="reveal flex flex-col justify-center px-1 py-4">
            <p class="eyebrow hero-subtle">Frontend developer</p>
            <h1 class="hero-title my-3">Hi, <span class="text-8xl">I'm Claire!</span></h1>
            <p class="hero-subtle mb-6 max-w-[35rem] text-[1.08rem] leading-7">
              I am a Full Stack Developer based in Philippines who loves creating aesthetic and functional website. I enjoy incorporating my hobbies and interest into my work, and I am always looking for new ways to push the boundaries of web design and development.
            </p>

            <div class="flex flex-wrap gap-3.5">
              <a
                class="rounded-full px-5 py-3 font-bold no-underline"
                href="#projects"
                style:background="var(--button-primary-bg)"
                style:color="var(--button-primary-text)"
              >
                View Works
              </a>
              <a
                class="rounded-full border px-5 py-3 font-bold no-underline"
                href="#contact"
                style:border-color="var(--button-secondary-border)"
                style:color="var(--button-secondary-text)"
              >
                Contact Me
              </a>
            </div>

            <div
              class="mt-7 grid max-w-[28.75rem] gap-3 rounded-[24px] border px-4 py-4 "
              style:border-color="var(--hero-border)"
              style:background="rgba(255, 255, 255, 0.06)"
            >
              <div>
                <span class="mini-label text-white/70">Now Playing</span>
                <strong class="mt-1 block">Designing poetic, responsive web experiences</strong>
              </div>
              <div class="flex flex-wrap gap-2.5">
                <span class="soft-pill px-3.5 py-2">UI Systems</span>
                <span class="soft-pill px-3.5 py-2">Creative Frontend</span>
                <span class="soft-pill px-3.5 py-2">Svelte Ready</span>
              </div>
            </div>
          </div>

          <div class="reveal reveal-delay relative min-h-[620px] max-lg:min-h-[560px] max-md:min-h-[510px]">
            <div class="stage-main" aria-hidden="true"></div>

            <div class="hero-card left-0 top-[124px] flex w-[240px] items-center gap-4 rounded-[22px] p-4 max-md:top-0 max-md:w-[220px]">
              <span class="avatar-glow" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path
                    d="M14 5v9.1"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.9"
                  />
                  <path
                    d="M14 5l6-1.6v7.2"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.9"
                  />
                  <circle cx="10" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.9" />
                  <circle cx="20" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="1.9" />
                </svg>
              </span>
              <div>
                <strong>Creative Direction</strong>
                <p class="mt-1 text-sm leading-6">collage layouts / soft interactions / music cues</p>
              </div>
            </div>


            <div class="hero-card right-0 top-[238px] w-[196px] p-5 max-md:top-[162px]">
              <p class="mini-label">Diary Fragment</p>
              <strong class="mt-2 block leading-7">Build pages that hold emotion, not just information.</strong>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="surface-section px-6 py-6 md:px-8">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="section-label">Track 02 - Works</div>
        <h2 class="display-title">Selected tracks from the portfolio.</h2>
      </div>

      <div class="mt-6 grid gap-5 lg:grid-cols-4">
        {#each projectCards as project, index (project.title)}
          <article
            class={`project-card ${project.dark ? 'project-card-dark' : 'project-card-light'} ${index === 1 ? 'reveal reveal-delay' : 'reveal'} p-[22px]`}
          >
            <div class="project-topline flex items-center justify-between gap-4">
              <span>{project.time}</span>
              <span>{project.type}</span>
            </div>
            <h3 class="card-title mt-4 text-[1.9rem]">{project.title}</h3>
            <p class="mt-3 leading-7">{project.description}</p>
            <div class={`project-preview ${project.preview} mt-[18px] mb-[18px]`}></div>
            <div class="flex flex-col gap-3 text-[0.92rem] md:flex-row md:items-center md:justify-between">
              <span>Mood: {project.mood}</span>
              <div class="flex gap-4">
                <a class="no-underline hover:opacity-80" href="#contact">Live Demo</a>
                <a class="no-underline hover:opacity-80" href="#contact">GitHub</a>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <section id="skills" class="surface-section staff-section px-6 py-6 md:px-8">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="section-label font-bold">Track 03 - Skills</div>
        <h2 class="display-title">Studio tools behind the sound.</h2>
      </div>

      <div class="mt-6 grid gap-5 lg:grid-cols-3">
        {#each skills as credit, index (credit.heading)}
          <article
            class={`${index === 1 ? 'reveal reveal-delay' : 'reveal'} rounded-[32px] border p-7`}
            style:border-color="var(--border-color)"
            style:background="linear-gradient(180deg, var(--surface-main), var(--surface-alt))"
          >
            <h3 class="card-title mt-0 text-[1.9rem]">{credit.heading}</h3>
            <div class="mt-4 flex flex-wrap gap-2.5">
              {#each credit.items as item (item)}
                <span class="chip-pill px-3.5 py-2">{item}</span>
              {/each}
            </div>
          </article>
        {/each}
      </div>

      <div class="equalizer reveal reveal-delay relative z-[1] mt-6 flex h-[110px] items-end gap-3" aria-hidden="true">
        {#each Array(6) as _, index (index)}
          <span></span>
        {/each}
      </div>
    </section>

    <section id="path" class="surface-section px-6 py-6 md:px-8">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="section-label">Track 04 - Career Path</div>
        <h2 class="display-title">Experience arranged like a booklet.</h2>
      </div>

      <div class="mt-6 grid gap-6 lg:grid-cols-2">
        <article
          class="reveal rounded-[32px] border p-7"
          style:background="var(--surface-alt)"
          style:border-color="var(--border-color)"
        >
          <h3 class="card-title mt-0 text-[1.9rem]">Experience</h3>
          <ul class="m-0 list-none p-0">
            {#each timeline as item (item.year)}
              <li class="grid gap-4 border-b py-[18px] last:border-b-0 last:pb-0 md:grid-cols-[84px_1fr]" style:border-color="var(--border-color)">
                <span class="font-extrabold" style:color="var(--accent-main)">{item.year}</span>
                <div>
                  <strong>{item.role}</strong>
                  <p class="mt-1 leading-7">{item.description}</p>
                </div>
              </li>
            {/each}
          </ul>
        </article>

        <article
          class="reveal reveal-delay rounded-[32px] border p-7"
          style:background="var(--surface-alt)"
          style:border-color="var(--border-color)"
        >
          <h3 class="card-title mt-0 text-[1.9rem]">Education &amp; Notes</h3>
          <div class="grid gap-[22px]">
            <div>
              <span class="mini-label">Education</span>
              <strong class="mt-1 block">Course / School / Year</strong>
              <p class="mt-1 leading-7">Replace this with your program, specialization, or bootcamp.</p>
            </div>
            <div>
              <span class="mini-label">Certifications</span>
              <strong class="mt-1 block">Certification Name / Year</strong>
              <p class="mt-1 leading-7">Add the credentials that support your strongest work.</p>
            </div>
            <div>
              <span class="mini-label">Specialty</span>
              <strong class="mt-1 block">Creative frontend with production discipline</strong>
              <p class="mt-1 leading-7">Best for portfolio builds, landing pages, and branded interfaces.</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="contact" class="surface-section contact-panel staff-section px-6 py-6 md:px-8">
      <div class="section-label relative z-[1] text-white/80">Track 05 - Encore</div>
      <div class="relative z-[1] grid min-h-[320px] gap-6 pt-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div class="reveal">
          <p class="eyebrow text-white/70">Let's make something sound good.</p>
          <h2 class="display-title mt-2">Design with feeling. Build with precision.</h2>
          <p class="mt-4 max-w-[34rem] leading-7 text-white/85">
            If you want a portfolio, landing page, or product surface that feels distinct without
            losing clarity, let's talk.
          </p>
        </div>

        <div class="reveal reveal-delay flex flex-wrap gap-3.5">
          <a
            class="rounded-full px-5 py-3 font-bold no-underline"
            href="mailto:hello@example.com"
            style:background="var(--button-primary-bg)"
            style:color="var(--button-primary-text)"
          >
            Email Me
          </a>
          <a
            class="rounded-full border px-5 py-3 font-bold no-underline"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            style:border-color="var(--button-secondary-border)"
            style:color="var(--button-secondary-text)"
          >
            LinkedIn
          </a>
          <a
            class="rounded-full border px-5 py-3 font-bold no-underline"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            style:border-color="var(--button-secondary-border)"
            style:color="var(--button-secondary-text)"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer class="flex flex-col gap-3 px-0.5 pt-2 text-[0.92rem] md:flex-row md:justify-between" style:color="var(--muted-color)">
    <p>Inspired by my love with NMIXX</p>
    <p>All rights reserved.</p>
  </footer>
</div>

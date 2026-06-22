<script>
  import { onMount } from 'svelte';

  let { image, onClose, onPrevious, onNext, canNavigate = false } = $props();

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      onClose?.();
    }

    if (canNavigate && event.key === 'ArrowLeft') {
      onPrevious?.();
    }

    if (canNavigate && event.key === 'ArrowRight') {
      onNext?.();
    }
  }

  onMount(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="image-modal"
  role="dialog"
  aria-modal="true"
  aria-label={image?.title ? `${image.title} full image preview` : 'Full image preview'}
  tabindex="-1"
  onclick={handleBackdropClick}
  onkeydown={handleKeydown}
>
  <div class="image-modal__panel">
    <button
      class="image-modal__close"
      type="button"
      aria-label="Close image preview"
      onclick={() => onClose?.()}
    >
      <span aria-hidden="true">x</span>
    </button>

    {#if canNavigate}
      <button
        class="image-modal__nav image-modal__nav--prev"
        type="button"
        aria-label="Show previous image"
        onclick={() => onPrevious?.()}
      >
        <span aria-hidden="true">&#8249;</span>
      </button>

      <button
        class="image-modal__nav image-modal__nav--next"
        type="button"
        aria-label="Show next image"
        onclick={() => onNext?.()}
      >
        <span aria-hidden="true">&#8250;</span>
      </button>
    {/if}

    <figure class="image-modal__figure">
      <img class="image-modal__img" src={image.src} alt={image.alt} />
      {#if image.title}
        <figcaption class="image-modal__caption">{image.title}</figcaption>
      {/if}
    </figure>
  </div>
</div>

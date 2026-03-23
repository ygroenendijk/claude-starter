/* ═══════════════════════════════════════════════════════════════
   Green Dev — Shopify Training NL
   main.js
   ═══════════════════════════════════════════════════════════════ */

/* ── Page load class ─────────────────────────────────────────── */
document.body.classList.add('loaded')

/* ── Scroll reveal ────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal')

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
)

revealEls.forEach((el) => revealObserver.observe(el))

/* ── Location tiles — highlight + sync to form select ────────── */
const locationTiles = document.querySelectorAll('.location-tile')
const citySelect = document.getElementById('city')

locationTiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    // Remove selected from all
    locationTiles.forEach((t) => t.classList.remove('is-selected'))

    // Select this one
    tile.classList.add('is-selected')

    // Sync the form dropdown
    const city = tile.dataset.city
    if (citySelect) {
      citySelect.value = city
      citySelect.dispatchEvent(new Event('change'))
    }

    // Smooth scroll to the form after a short delay
    setTimeout(() => {
      const formSection = document.getElementById('inschrijven')
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  })
})

// Reflect form select back to tiles
if (citySelect) {
  citySelect.addEventListener('change', () => {
    locationTiles.forEach((tile) => {
      tile.classList.toggle('is-selected', tile.dataset.city === citySelect.value)
    })
  })
}

/* ── Form submission ──────────────────────────────────────────── */

const form = document.getElementById('waitlist-form')
const successMsg = document.getElementById('form-success')

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const submitBtn = form.querySelector('[type="submit"]')
    const originalHTML = submitBtn.innerHTML

    submitBtn.disabled = true
    submitBtn.innerHTML = '<span class="mono">…</span> Bezig met aanmelden'

    const payload = {
      name:  document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      city:  document.getElementById('city').value,
      level: form.querySelector('[name="level"]:checked')?.value ?? '',
    }

    try {
      const res = await fetch('https://green-dev.nl/meld-je-aan/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error ?? 'Unknown error')

      form.reset()
      locationTiles.forEach((t) => t.classList.remove('is-selected'))

      if (successMsg) {
        successMsg.removeAttribute('hidden')
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    } catch (err) {
      console.error('Submission error:', err)
      submitBtn.innerHTML = 'Er ging iets mis — probeer het opnieuw'
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML
        submitBtn.disabled = false
      }, 3000)
      return
    }

    submitBtn.disabled = false
    submitBtn.innerHTML = originalHTML
  })
}

/* ── Client-side validation ───────────────────────────────────── */
function validateForm() {
  let valid = true

  const nameEl = document.getElementById('name')
  const emailEl = document.getElementById('email')
  const cityEl = document.getElementById('city')
  const levelEls = document.querySelectorAll('[name="level"]')

  // Name
  if (!nameEl.value.trim()) {
    markInvalid(nameEl)
    valid = false
  } else {
    markValid(nameEl)
  }

  // Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(emailEl.value.trim())) {
    markInvalid(emailEl)
    valid = false
  } else {
    markValid(emailEl)
  }

  // City
  if (!cityEl.value) {
    cityEl.style.borderColor = '#f5704a'
    valid = false
  } else {
    cityEl.style.borderColor = ''
  }

  // Level
  const levelSelected = Array.from(levelEls).some((r) => r.checked)
  if (!levelSelected) {
    const fieldset = form.querySelector('.form__fieldset')
    if (fieldset) fieldset.style.outline = '2px solid #f5704a'
    valid = false
  } else {
    const fieldset = form.querySelector('.form__fieldset')
    if (fieldset) fieldset.style.outline = ''
  }

  return valid
}

function markInvalid(el) {
  el.classList.add('is-invalid')
  el.setAttribute('aria-invalid', 'true')
}

function markValid(el) {
  el.classList.remove('is-invalid')
  el.removeAttribute('aria-invalid')
}

// Clear validation on input
document.querySelectorAll('.form__input').forEach((input) => {
  input.addEventListener('input', () => markValid(input))
})

/* ── Nav background on scroll ─────────────────────────────────── */
const nav = document.querySelector('.nav')

if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(11, 31, 18, 0.98)'
      : 'rgba(11, 31, 18, 0.85)'
  }, { passive: true })
}

/* ── FAQ smooth expand ────────────────────────────────────────── */
document.querySelectorAll('.faq__item').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      // Close siblings
      document.querySelectorAll('.faq__item[open]').forEach((other) => {
        if (other !== details) other.removeAttribute('open')
      })
    }
  })
})


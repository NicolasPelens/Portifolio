// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(15, 15, 15, 0.98)"
  } else {
    header.style.background = "rgba(15, 15, 15, 0.95)"
  }
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".section-title, .about-content, .project-card, .skills-category, .contact-content",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Animate skill bars when they come into view
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll(".skill-progress")
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width")
          setTimeout(() => {
            bar.style.width = width + "%"
          }, 200)
        })
      }
    })
  },
  { threshold: 0.5 },
)

const skillsSection = document.querySelector(".skills")
if (skillsSection) {
  skillsObserver.observe(skillsSection)
}

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle")
const nav = document.querySelector(".nav")
const navLinks = document.querySelectorAll(".nav a")

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
    menuToggle.classList.toggle("active")
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      menuToggle.classList.remove("active")
    })
  })

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove("active")
      menuToggle.classList.remove("active")
    }
  })

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("active")
      menuToggle.classList.remove("active")
    }
  })
}

// Form submission
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const nome = formData.get("nome")
    const email = formData.get("email")
    const mensagem = formData.get("mensagem")

    // Simple validation
    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido.")
      return
    }

    const submitButton = contactForm.querySelector(".submit-button")
    const originalText = submitButton.textContent

    submitButton.textContent = "Enviando..."
    submitButton.disabled = true

    // Simulate form submission with EmailJS or similar service
    setTimeout(() => {
      // Here you would integrate with EmailJS or your backend
      console.log("[v0] Form data:", { nome, email, mensagem })

      alert(
        `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve através do email ${email}.`,
      )
      contactForm.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false
    }, 2000)
  })
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")

  if (hero && window.innerWidth > 768) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`
  } else if (hero) {
    hero.style.transform = "translateY(0)"
  }
})

// Add hover effect to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect on page load
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    // Uncomment the line below to enable typing effect
    // typeWriter(heroTitle, originalText, 100);
  }
})

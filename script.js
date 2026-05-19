const projects = [
  { name: "Kurnool Smart Road Expansion", authority: "Kurnool Municipal Corporation", status: "Material Phase Checked", progress: 68, priority: "High" },
  { name: "Tungabhadra Irrigation Pipeline", authority: "Irrigation Department AP", status: "In Progress", progress: 42, priority: "Medium" },
  { name: "NH44 Reinforcement Project", authority: "Highway Authority", status: "Structural Audit Pending", progress: 31, priority: "Critical" },
  { name: "Municipal Drainage Upgrade", authority: "Public Health Engineering", status: "Final QC Certified", progress: 100, priority: "Closed" },
  { name: "Structural Bridge Rehabilitation", authority: "Roads and Buildings Dept.", status: "In Progress", progress: 57, priority: "High" }
];

const codes = [
  { code: "IS 456:2000", title: "Plain and Reinforced Concrete", desc: "Core design and construction guidance for reinforced concrete structures.", area: "Concrete works", category: "concrete structural safety" },
  { code: "IS 1786", title: "High Strength Deformed Steel Bars", desc: "Requirements for TMT reinforcement steel used in structural concrete.", area: "Steel reinforcement", category: "steel reinforcement" },
  { code: "IS 1893", title: "Earthquake Resistant Design", desc: "Criteria for seismic design of structures in earthquake-prone regions.", area: "Seismic safety", category: "earthquake structural safety" },
  { code: "IS 875", title: "Design Loads for Buildings", desc: "Dead, imposed, wind, snow, and special load considerations.", area: "Structural loading", category: "structural safety" },
  { code: "IS 10262", title: "Concrete Mix Proportioning", desc: "Guidelines for mix design, target strength, workability, and durability.", area: "Concrete mix design", category: "concrete" },
  { code: "IS 13920", title: "Ductile Detailing of RC Structures", desc: "Seismic detailing provisions for beams, columns, joints, and reinforcement.", area: "Ductile reinforcement", category: "earthquake reinforcement structural safety" }
];

const testimonials = [
  { initials: "SK", name: "S. Kumar", role: "Civil Contractor, Rayalaseema Infra", quote: "R.M.D.T gave us an independent audit trail that made client review faster and reduced rework at site." },
  { initials: "AR", name: "A. Reddy", role: "Municipal Engineer", quote: "Their material verification format is clear, precise, and useful during public works documentation." },
  { initials: "NP", name: "N. Prasad", role: "Infrastructure Consultant", quote: "The structural audit observations were practical, well organized, and backed by measurable quality checks." }
];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const header = $("#siteHeader");
const progress = $("#scrollProgress");
const backToTop = $("#backToTop");
const navMenu = $("#navMenu");
const navToggle = $("#navToggle");
const themeToggle = $("#themeToggle");

let currentFilter = "all";
let sortAscending = false;
let testimonialIndex = 0;
let formStep = 0;

function updateScrollState() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progress.style.width = `${percent}%`;
  header.classList.toggle("scrolled", window.scrollY > 40);
  backToTop.classList.toggle("visible", window.scrollY > 600);
}

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.innerHTML = theme === "dark" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem("rmdt-theme", theme);
}

function renderProjects() {
  const tbody = $("#projectBody");
  const filtered = projects
    .filter((project) => currentFilter === "all" || project.status === currentFilter)
    .sort((a, b) => sortAscending ? a.progress - b.progress : b.progress - a.progress);

  tbody.innerHTML = filtered.map((project) => {
    const statusClass = project.status.includes("Certified") ? "certified" : project.status.includes("Pending") ? "pending" : "";
    return `
      <tr>
        <td><strong>${project.name}</strong></td>
        <td>${project.authority}</td>
        <td><span class="status-badge ${statusClass}"><i class="fa-solid fa-circle"></i>${project.status}</span></td>
        <td><div class="progress-track" aria-label="${project.progress}% complete"><div class="progress-fill" style="--progress:${project.progress}%"></div></div></td>
        <td><span class="priority-chip">${project.priority}</span></td>
      </tr>
    `;
  }).join("");
}

function renderCodes(query = "") {
  const grid = $("#codeGrid");
  const normalized = query.trim().toLowerCase();
  const filtered = codes.filter((item) => {
    const haystack = `${item.code} ${item.title} ${item.desc} ${item.area} ${item.category}`.toLowerCase();
    return haystack.includes(normalized);
  });

  grid.innerHTML = filtered.length
    ? filtered.map((item) => `
      <article class="code-card reveal visible">
        <span class="section-kicker">${item.code}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <span class="category-pill">${item.area}</span>
      </article>
    `).join("")
    : `<article class="code-card reveal visible"><h3>No standards found</h3><p>Try concrete, steel, earthquake, reinforcement, or structural safety.</p></article>`;
}

function verifyCertificate() {
  const input = $("#certificateInput").value.trim().toUpperCase();
  const empty = $(".result-empty");
  const loader = $("#verifyLoader");
  const card = $("#resultCard");

  card.classList.remove("active");
  empty.style.display = "none";
  loader.classList.add("active");

  window.setTimeout(() => {
    loader.classList.remove("active");
    if (input === "RMDT-QC-2026") {
      card.classList.add("active");
    } else {
      empty.style.display = "grid";
      empty.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i><h3>Certificate Not Found</h3><p>Use the demo code RMDT-QC-2026 for the validated sample record.</p>`;
    }
  }, 950);
}

function renderTestimonial() {
  const item = testimonials[testimonialIndex];
  $("#testimonialCard").innerHTML = `
    <div class="stars" aria-label="5 star rating">
      <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
    </div>
    <p class="quote"><i class="fa-solid fa-quote-left"></i> ${item.quote}</p>
    <div class="profile-row">
      <div class="avatar">${item.initials}</div>
      <div><strong>${item.name}</strong><br><span>${item.role}</span></div>
    </div>
  `;
}

function updateStepper() {
  $$("[data-step]").forEach((step) => step.classList.toggle("active", Number(step.dataset.step) === formStep));
  $$("[data-step-dot]").forEach((dot) => dot.classList.toggle("active", Number(dot.dataset.stepDot) <= formStep));
  $("#prevStep").style.visibility = formStep === 0 ? "hidden" : "visible";
  $("#nextStep").textContent = formStep === 3 ? "Submit Request" : "Next";
  $("#formError").textContent = "";
  if (formStep === 3) renderReview();
}

function currentStepValid() {
  const activeStep = $(`[data-step="${formStep}"]`);
  const fields = $$("input, select", activeStep).filter((field) => field.type !== "file");
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.focus();
      $("#formError").textContent = field.pattern ? "Please enter valid information for this step." : "Please complete all required fields.";
      return false;
    }
  }
  return true;
}

function renderReview() {
  const data = new FormData($("#auditForm"));
  $("#reviewCard").innerHTML = `
    <h3>Review audit request</h3>
    <p><strong>Project</strong><span>${data.get("projectName") || "Not provided"}</span></p>
    <p><strong>Work Order</strong><span>${data.get("workOrder") || "Not provided"}</span></p>
    <p><strong>Category</strong><span>${data.get("category") || "Not provided"}</span></p>
    <p><strong>Engineer</strong><span>${data.get("engineer") || "Not provided"}</span></p>
    <p><strong>Mobile</strong><span>${data.get("mobile") || "Not provided"}</span></p>
    <p><strong>Email</strong><span>${data.get("email") || "Not provided"}</span></p>
    <p><strong>Blueprint</strong><span>${$("#fileName").textContent}</span></p>
  `;
}

function submitForm() {
  $("#successModal").classList.add("active");
  $("#auditForm").reset();
  $("#fileName").textContent = "No file selected";
  formStep = 0;
  updateStepper();
}

function initCounters() {
  const counters = $$("[data-counter]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "true";
      const target = Number(entry.target.dataset.counter);
      const suffix = target === 98 ? "%" : target === 24 ? "/7" : target === 99.2 ? "%" : "+";
      const start = performance.now();
      const duration = 1200;

      function tick(now) {
        const progressValue = Math.min((now - start) / duration, 1);
        const value = target * (1 - Math.pow(1 - progressValue, 3));
        entry.target.textContent = target % 1 ? value.toFixed(1) + suffix : Math.round(value) + suffix;
        if (progressValue < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => observer.observe(counter));
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach((element) => observer.observe(element));
}

function initActiveNav() {
  const sections = $$(".section, #services, #projects, #verification, #compliance, #audit-request, #contact");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      $$(".nav-link").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { threshold: 0.35 });
  sections.forEach((section) => section.id && observer.observe(section));
}

function initUpload() {
  const zone = $("#uploadZone");
  const fileInput = $("#fileInput");
  const chooseFile = $("#chooseFile");
  const fileName = $("#fileName");

  chooseFile.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files[0]?.name || "No file selected";
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    zone.addEventListener(eventName, (event) => {
      event.preventDefault();
      zone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    zone.addEventListener(eventName, (event) => {
      event.preventDefault();
      zone.classList.remove("dragover");
    });
  });

  zone.addEventListener("drop", (event) => {
    const file = event.dataTransfer.files[0];
    if (!file) return;
    fileInput.files = event.dataTransfer.files;
    fileName.textContent = file.name;
  });
}

window.addEventListener("scroll", updateScrollState);
window.addEventListener("load", updateScrollState);

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

$$(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

$("#projectFilters").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  currentFilter = button.dataset.filter;
  $$("#projectFilters button").forEach((item) => item.classList.toggle("active", item === button));
  renderProjects();
});

$("#sortProjects").addEventListener("click", () => {
  sortAscending = !sortAscending;
  renderProjects();
});

$("#verifyBtn").addEventListener("click", verifyCertificate);
$("#certificateInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") verifyCertificate();
});

$("#codeSearch").addEventListener("input", (event) => renderCodes(event.target.value));

$("#prevTestimonial").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});

$("#nextTestimonial").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial();
});

$("#prevStep").addEventListener("click", () => {
  formStep = Math.max(0, formStep - 1);
  updateStepper();
});

$("#nextStep").addEventListener("click", () => {
  if (formStep < 3) {
    if (!currentStepValid()) return;
    formStep += 1;
    updateStepper();
    return;
  }
  submitForm();
});

$("#closeModal").addEventListener("click", () => $("#successModal").classList.remove("active"));
$("#successModal").addEventListener("click", (event) => {
  if (event.target.id === "successModal") event.target.classList.remove("active");
});

applyTheme(localStorage.getItem("rmdt-theme") || "light");
renderProjects();
renderCodes();
renderTestimonial();
updateStepper();
initCounters();
initReveal();
initActiveNav();
initUpload();

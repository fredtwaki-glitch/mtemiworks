/**
 * MTEMI SWIFT RIDES — BOOKING / ENQUIRY FORM HANDLER
 * ---------------------------------------------------------
 * Framework-agnostic vanilla JS handler so this markup can be
 * dropped into a React <form onSubmit> later with minimal change.
 *
 * Swap `submitEnquiry()` for a real API call when a backend is
 * ready, e.g.:
 *   await fetch("/api/enquiries", { method: "POST", body: JSON.stringify(payload) })
 * No credentials or API keys belong in this file.
 * ---------------------------------------------------------
 */
(function () {
  const forms = document.querySelectorAll("[data-booking-form]");

  async function submitEnquiry(payload) {
    // Placeholder for future REST API / CRM / email service integration.
    // Currently resolves locally so the front end works standalone.
    return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 600));
  }

  function validateField(field) {
    const errorEl = field.closest(".field")?.querySelector(".field-error");
    if (!field.checkValidity()) {
      if (errorEl) errorEl.textContent = field.validationMessage;
      field.setAttribute("aria-invalid", "true");
      return false;
    }
    if (errorEl) errorEl.textContent = "";
    field.removeAttribute("aria-invalid");
    return true;
  }

  forms.forEach((form) => {
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      requiredFields.forEach((field) => {
        if (!validateField(field)) valid = false;
      });
      if (!valid) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      const data = Object.fromEntries(new FormData(form).entries());

      try {
        await submitEnquiry(data);
        const successEl = form.parentElement.querySelector(".form-success") || form.querySelector(".form-success");
        if (successEl) {
          successEl.classList.add("visible");
          successEl.setAttribute("role", "status");
        }
        form.reset();

        // Offer a pre-filled WhatsApp follow-up with the same details.
        const waLink = form.querySelector("[data-wa-followup]");
        if (waLink && window.MTEMI_buildWhatsAppLink) {
          const summary = [
            data.name ? `Name: ${data.name}` : "",
            data.phone ? `Phone: ${data.phone}` : "",
            data.pickup ? `Pickup: ${data.pickup}` : "",
            data.destination ? `Destination: ${data.destination}` : "",
            data.date ? `Travel date: ${data.date}` : "",
            data.returnDate ? `Return date: ${data.returnDate}` : "",
            data.passengers ? `Passengers: ${data.passengers}` : "",
            data.tripType ? `Trip type: ${data.tripType}` : "",
          ]
            .filter(Boolean)
            .join("\n");
          waLink.href = window.MTEMI_buildWhatsAppLink(
            `Hi Mtemi Swift Rides, I'd like to request a quote.\n\n${summary}`
          );
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      }
    });
  });
})();

/**
 * MTEMI SWIFT RIDES — SITE CONFIG
 * ---------------------------------------------------------
 * Every real-world detail the business needs to supply lives
 * here. Nothing elsewhere in the codebase should hard-code a
 * phone number, handle, or name — edit this file and the whole
 * site updates.
 *
 * Replace the "[PLACEHOLDER]" values with verified information
 * before launch. Do not invent numbers, handles or claims.
 * ---------------------------------------------------------
 */
window.MTEMI_CONFIG = {
  brand: {
    name: "Mtemi Swift Rides",
    tagline: "Comfortable Journeys. Reliable Rides. Memorable Experiences.",
  },

  contact: {
    phone: "0726 369 063",
    phoneHref: "+254726369063",       // used for tel: links
    whatsapp: "0726 369 063",          // shown on the page
    whatsappIntl: "254726369063",      // digits only w/ country code, used to build wa.me links
    email: "mtemiswift@gmail.com",
    location: "Nakuru, Kenya",
    operatingArea: "Kenya & Beyond",
    // Set once the business confirms an exact, publishable pickup / office point.
    mapAddress: "Nakuru, Kenya",
    mapEmbedQuery: "Nakuru, Kenya",
  },

  ceo: {
    name: " Geoffrey Mburu",
    title: "Founder & CEO — Mtemi Swift Rides",
    photoPlaceholder: true, // flip to false once a real portrait is added
  },

  social: {
    instagram: "https://www.instagram.com/mtemi_swiftrides?igsh=MWY1Z2FlZDJuNXpidg==",
    facebook: "https://www.facebook.com/share/14kxaV8o9CS/",
    tiktok: "https://www.tiktok.com/@mtemi.swift.rides?_r=1&_t=ZS-9931TGVhgP7",
    youtube: "#", // add once a YouTube channel exists
  },

  // Used to build a pre-filled WhatsApp message from the booking form.
  whatsapp: {
    baseMessage:
      "Hi Mtemi Swift Rides, I'd like to request a quote.",
  },
};

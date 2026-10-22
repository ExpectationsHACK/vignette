// All site copy comes from "Landing Pages Vingettes.docx" (corrections applied).
// Links marked TODO still need real URLs.

export const site = {
  /** Live address: a subdomain of esuakemapress.com (DNS at Wix, CNAME to Vercel). */
  url: "https://vignettes.esuakemapress.com",
  publisher: "Esuakema Press",
  title: "Vignettes of a Nigerian Experience",
  author: "Heloise Annette Oton",
  subtitle: "A Memoir by Heloise Annette Oton",
  editorialCredit: "Historical Context and Editorial Development: Goodness Chidinma Eweama",
  seoTitle: "Vignettes of a Nigerian Experience | Memoir by Heloise Annette Oton",
  metaDescription:
    "A Harlem-born woman of Caribbean heritage follows love to Nigeria in 1962. Discover Heloise Annette Oton’s vivid memoir of marriage, war, teaching, and home.",
  /** TODO: Amazon product page URL. */
  amazonUrl: "#",
  mockup: { src: "/images/vignettes-mockup.jpg", width: 1023, height: 1280 },
  nav: [
    { label: "About the Book", href: "#about" },
    { label: "Meet the Author", href: "#author" },
    { label: "From the Book", href: "#excerpts" },
    { label: "Bulk Orders & Events", href: "#enquire" },
  ],
};

export const aboutBook = {
  heading: "About the Book",
  intro: [
    "Heloise Annette Oton was born in Harlem to Caribbean immigrants, raised in the Bronx, and educated at Columbia. Then she met a man at the Nigerian Consulate in New York, married him three months later, and crossed the Atlantic to a country she had never imagined calling home.",
    "Vignettes of a Nigerian Experience follows her from New York to Lagos in 1962, then to the university town of Nsukka, through the Nigeria-Biafra War, and on to Calabar, where she taught, raised five children, and built a community that became her own. Written with warmth and honesty, the book captures:",
  ],
  highlights: [
    { lead: "A love story that crosses oceans:", text: "a marriage that changed two lives and spanned two continents." },
    { lead: "An eyewitness view of Nigeria:", text: "from independence-era Lagos through the Nigeria-Biafra War to life in Calabar." },
    { lead: "A story of belonging:", text: "what it means to be Caribbean, American, and at home in Nigeria all at once." },
    { lead: "A tribute to real and beautiful people", text: "in their full dimensions, not their silhouettes." },
  ],
  closing:
    "Written in vignettes, each chapter opens with a proverb and invites you to sit a while, as if the author were telling you her story across a table, still listening for the drums.",
};

export const author = {
  heading: "Meet the Author",
  /**
   * Author portrait. Save the photo as /public/images/heloise.jpg; until the file
   * exists a placeholder is shown. `position` sets which part of the photo stays
   * in frame when it is cropped to a portrait shape.
   */
  photo: {
    src: "/images/heloise.jpg",
    alt: "Heloise Annette Oton, smiling, in a blue and violet batik headwrap and dress",
    position: "50% 30%",
  },
  bio: "Heloise Annette Oton was born in Harlem, New York, to a Jamaican mother and a Trinidadian father. She grew up in the Bronx, studied at Columbia, and marched on Washington. In 1962 she followed her husband, Esuakema Udo Oton, to Nigeria, where she lived for more than two decades. She taught hundreds of students in Calabar, raised five children, and managed a business after her husband’s death. She writes from Brooklyn, New York.",
};

export const excerpts = {
  heading: "From the Book",
  quotes: [
    { text: "Nothing in America had prepared me for Lagos, Nigeria.", source: "Chapter Five, “Adventures in Lagos”" },
    { text: "Esuakema made me a border-crosser.", source: "Prologue" },
    { text: "The drums are still drumming somewhere in Calabar… I am still listening.", source: "Epilogue" },
  ],
};

export const enquire = {
  heading: "Bulk Orders, Book Clubs, and Events",
  body: "Planning a reading, an event, or an order for your group? Churches, alumni associations, community unions, schools, and book clubs are welcome to enquire about bulk copies, review copies, discussion questions, and author conversations.",
  /** TODO: contact email (domain or Gmail/Outlook still to be decided). Empty hides it. */
  email: "",
  topics: ["Bulk order", "Book club", "Author conversation", "Newsletter feature", "Other"],
};

export const footer = {
  /** Profiles with an empty href are hidden. TODO: Facebook URL. */
  social: [
    { label: "Facebook", icon: "facebook", href: "" },
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/esuakemapress/" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/esuakema-press-b8718b446" },
  ] as const,
};

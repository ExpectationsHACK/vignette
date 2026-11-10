// All site copy comes from "Landing Pages Vingettes.docx" (corrections applied).
// Unconfigured purchase and discovery links are kept blank until official URLs are available.

export const site = {
  /** Live address: a subdomain of esuakemapress.com (DNS at Wix, CNAME to Vercel). */
  url: "https://vignettes.esuakemapress.com",
  publisher: "Esuakema Press",
  title: "Vignettes of a Nigerian Experience",
  author: "Heloise Annette Oton",
  tagline: "A Caribbean American woman’s journey through Nigeria",
  subtitle: "A Memoir by Heloise Annette Oton",
  editorialCredit: "Historical Context and Editorial Development: Goodness Chidinma Eweama",
  seoTitle: "Vignettes of a Nigerian Experience | Memoir by Heloise Annette Oton",
  metaDescription:
    "A Harlem-born woman of Caribbean heritage follows love to Nigeria in 1962. Discover Heloise Annette Oton’s vivid memoir of marriage, war, teaching, and home.",
  /** Add each official destination here when its listing is ready. */
  amazonUrl: "",
  barnesAndNobleUrl: "",
  bookshopUrl: "",
  selarUrl: "",
  goodreadsUrl: "",
  heroCover: { src: "/images/vignettes-book-cover.png", width: 592, height: 823 },
  mockup: { src: "/images/vignettes-mockup.jpg", width: 1023, height: 1280 },
  nav: [
    { label: "Discover the Book", href: "#about" },
    { label: "Meet the Author", href: "#author" },
    { label: "Read an Excerpt", href: "#excerpts" },
    { label: "Reviews & Endorsements", href: "#reader-voices" },
    { label: "Historical Journey", href: "#journey" },
    { label: "Book Heloise", href: "#enquire" },
    { label: "Buy the Book", href: "#buy" },
  ],
};

export const selectedQuotes = {
  landing: "…the sea is not a barrier but a road.",
  about: "In Nigeria, as I had long since learned, an unannounced visitor is not an imposition but simply an expression of relationship.",
  author: "I carry stories from New York to Lagos to Calabar and back again, and now I am setting them down, for the first time, in a place where they might outlast me.",
  closing: "The drums are still drumming somewhere in Calabar… I am still listening.",
  source: "Heloise Annette Oton, Vignettes of a Nigerian Experience",
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
  heading: "Meet Heloise Annette Oton",
  deck: "A life between continents. A story that spans generations.",
  /** `position` sets which part of the portrait stays in frame when cropped. */
  photo: {
    src: "/images/author.jpg",
    alt: "Heloise Annette Oton smiling in a blue patterned jacket",
    position: "50% 30%",
  },
  bio: [
    "Born in Harlem to Jamaican and Trinidadian parents, Heloise Annette Oton grew up in the Bronx, studied at Columbia University, and participated in the historic March on Washington.",
    "In 1962, she followed her husband to Nigeria, beginning a remarkable journey that would transform her understanding of love, identity, family, and belonging.",
    "From Lagos to the university town of Nsukka, through the Nigeria-Biafra War and into Calabar, Heloise witnessed a nation in transition while building a life of her own.",
    "She taught hundreds of students, raised five children, and developed deep connections to the people and communities around her.",
    "Now writing from Brooklyn, New York, Heloise shares her extraordinary experiences in Vignettes of a Nigerian Experience: a memoir about crossing borders, discovering home, and preserving the stories that connect us.",
  ],
};

export const excerpts = {
  heading: "From the Book",
  quotes: [
    { text: "Nothing in America had prepared me for Lagos, Nigeria.", source: "Chapter Five, “Adventures in Lagos”" },
    { text: "Esuakema made me a border-crosser.", source: "Prologue" },
  ],
};

export const historicalJourney = {
  heading: "Explore the Historical Journey",
  introduction:
    "Follow Heloise from her first arrival in Nigeria to the places and events that shaped her family and her sense of home.",
  stops: [
    {
      image: {
        src: "/images/journey/lagos-1950s.jpg",
        alt: "A quiet street in Lagos with arcaded colonial buildings and a twin-towered church in the distance",
        caption: "Joseph Street, Lagos, mid-20th century",
        credit: "Edward Harland Duckworth / Northwestern University Libraries",
        source: "https://commons.wikimedia.org/wiki/File:Joseph_Street,_Lagos,_with_the_Royal_Cinema.png",
      },
      title: "Nigeria, 1962",
      description:
        "A newly married Heloise leaves New York for a country she has never imagined calling home.",
    },
    {
      image: {
        src: "/images/journey/nsukka-1960.jpg",
        alt: "Dr. Nnamdi Azikiwe in white robes standing among students on the University of Nigeria campus at Nsukka",
        caption: "Dr. Nnamdi Azikiwe with students at the University of Nigeria, Nsukka, 1960",
        credit: "E. H. Duckworth / Northwestern University Libraries",
        source: "https://commons.wikimedia.org/wiki/File:Dr._Nnamdi_Azikiwe,_Dr._George_Johnson_and_students_on_the_campus_of_the_University_of_Nigeria,_Nsukka.jpg",
      },
      title: "Nsukka",
      description:
        "At the university town of Nsukka, family life unfolds amid the changing realities of a young nation.",
    },
    {
      image: {
        src: "/images/journey/new-nigerian-1970.jpg",
        alt: "Front page of the New Nigerian newspaper, 12 January 1970, headlined Owerri is now captured",
        caption: "New Nigerian, 12 January 1970",
        credit: "Aart Rietveld / ASC Leiden, CC BY-SA 4.0",
        source: "https://commons.wikimedia.org/wiki/File:ASC_Leiden_-_Rietveld_Collection_-_Nigeria_1970_-_1973_-_01_-_093_New_Nigerian_newspaper_page_7_January_1970._End_of_the_Nigerian_civil_war_with_Biafra.jpg",
      },
      title: "The Biafra War",
      description:
        "The Nigeria-Biafra War transforms daily life and becomes a defining chapter in Heloise’s story.",
    },
    {
      image: {
        src: "/images/journey/calabar-1968.jpg",
        alt: "A Red Cross ambulance and a helicopter at a grass airfield used for relief flights in Calabar",
        caption: "Relief airfield, Calabar, 1968",
        credit: "CDC / Dr. Lyle Conrad",
        source: "https://commons.wikimedia.org/wiki/File:Makeshift_airport_in_Calabar,_Nigeria,_probably_1968.png",
      },
      title: "Calabar",
      description:
        "In Calabar, Heloise teaches, raises five children, and builds a community of her own.",
    },
  ],
};

export const readerVoices = {
  heading: "Reviews & Endorsements",
  body: "Professional reviews and literary endorsements will be shared here as they become available. Have you read the book, known Heloise, or been touched by her work? Share what her story has meant to you. Comments are reviewed before they appear here.",
};

export const enquire = {
  heading: "Book Heloise",
  body: "Invite Heloise for an author talk, interview, book-club conversation, or speaking engagement. Churches, alumni associations, community unions, schools, and book clubs are also welcome to enquire about bulk copies, review copies, and discussion questions.",
  email: "info@esuakemapress.com",
  topics: ["Bulk order", "Book club", "Author conversation", "Newsletter feature", "Other"],
};

export const footer = {
  /** Profiles with an empty href are hidden until their official page is available. */
  social: [
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/profile.php?id=61595653392157&mibextid=wwXIfr" },
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/esuakemapress/" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/esuakema-press-b8718b446" },
  ] as const,
};

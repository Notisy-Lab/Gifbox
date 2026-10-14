// Top 20 des GIFs les plus connus.
// Chaque GIF est cherché dans cet ordre :
//   1. le fichier local  gifs/<slug>.gif  (idéal pour une borne hors-ligne)
//   2. chaque identifiant Giphy de `giphy`, dans l'ordre
//   3. sinon une carte de remplacement (emoji + titre) s'affiche
// Pour changer un GIF : remplace l'identifiant Giphy (la fin de l'URL
// giphy.com/gifs/xxxx-<ID>) ou dépose ton propre fichier dans gifs/.
window.GIFS = [
  { slug: "nyan-cat",          title: "Nyan Cat",                 year: 2011, emoji: "🌈", giphy: ["CS1EfWWymZPeo", "gx54W1mSpeYMg"] },
  { slug: "rickroll",          title: "Rickroll",                 year: 2007, emoji: "🕺", giphy: ["Ju7l5y9osyymQ", "GyJ1kWCTtptetpULNh"] },
  { slug: "dancing-baby",      title: "Dancing Baby",             year: 1996, emoji: "👶", giphy: ["eA2LbvMeJvQiY"] },
  { slug: "this-is-fine",      title: "This Is Fine",             year: 2013, emoji: "🔥", giphy: ["QMHoU66sBXqqLqYvGO"] },
  { slug: "mind-blown",        title: "Mind Blown",               year: 2010, emoji: "🤯", giphy: ["xT0xeJpnrWC4XWblEk", "lXu72d4iKwqek"] },
  { slug: "mj-popcorn",        title: "Michael Jackson Popcorn",  year: 2011, emoji: "🍿", giphy: ["UrsOTbx6xh20IXChwR", "vyJPQbpT8FoeVslqLk"] },
  { slug: "kermit-typing",     title: "Kermit qui tape",          year: 2015, emoji: "🐸", giphy: ["SANDK2zAhctsWpJOjx", "xTiTnwWM5Y7w4JPemY"] },
  { slug: "homer-bushes",      title: "Homer dans la haie",       year: 2013, emoji: "🌳", giphy: ["COYGe9rZvfiaQ", "2A3DG83yvN8uaBiaNR"] },
  { slug: "obama-mic-drop",    title: "Obama Mic Drop",           year: 2016, emoji: "🎤", giphy: ["12zUQw4Vqzor0A", "l0K42u9hCg0x6XbLa"] },
  { slug: "deal-with-it",      title: "Deal With It",             year: 2010, emoji: "😎", giphy: ["l41YvHPauy1qW8uha", "2FayVQMPrCTm5KAU0"] },
  { slug: "dicaprio-cheers",   title: "DiCaprio Cheers",          year: 2013, emoji: "🥂", giphy: ["DfLwM9kttDFEQ"] },
  { slug: "confused-travolta", title: "Travolta perdu",           year: 2015, emoji: "🤷", giphy: ["6uGhT1O4sxpi8", "2iq624YaUlxTU8XpQp"] },
  { slug: "oprah-car",         title: "Oprah : You get a car!",   year: 2004, emoji: "🚗", giphy: ["Q3siJKQdEjjtZMpR8Q"] },
  { slug: "party-parrot",      title: "Party Parrot",             year: 2015, emoji: "🦜", giphy: ["l3q2zVr6cu95nF6O4", "IGlI8OyOEZ2VN6LooW"] },
  { slug: "dancing-banana",    title: "Peanut Butter Jelly Time", year: 1999, emoji: "🍌", giphy: ["8tViNlYfmCJ9syvQQj"] },
  { slug: "michael-scott-no",  title: "Michael Scott : NOOO",     year: 2009, emoji: "😱", giphy: ["12XMGIWtrHBl5e"] },
  { slug: "elmo-fire",         title: "Elmo en feu",              year: 2016, emoji: "😈", giphy: ["yr7n0u3qzO9nG"] },
  { slug: "salt-bae",          title: "Salt Bae",                 year: 2017, emoji: "🧂", giphy: ["26gsl2WC5tRxkemdi"] },
  { slug: "blinking-guy",      title: "Blinking Guy",             year: 2017, emoji: "😳", giphy: ["3o7527pa7qs9kCG78A"] },
  { slug: "dramatic-chipmunk", title: "Dramatic Chipmunk",        year: 2007, emoji: "🐿️", giphy: [] },
];

// Curated high-energy, cute, and funny motivational GIFs for crossing 3.5L goal
export const MOTIVATIONAL_GIFS = [
  {
    id: 1,
    title: "Pikachu Happy Victory Dance!",
    url: "https://i.giphy.com/media/13G7hmmFr9yuxG/giphy.gif",
    quote: "Pika-POWER! You completely smashed your 3.5 Liter goal today! ⚡💧",
    vibe: "Legendary"
  },
  {
    id: 2,
    title: "Dancing Baby Groot!",
    url: "https://i.giphy.com/media/10UeedrT5MIfPG/giphy.gif",
    quote: "We are Groot... and YOU are the ultimate hydration champion! 🌿✨",
    vibe: "Groovy"
  },
  {
    id: 3,
    title: "Minions Victory Cheering!",
    url: "https://i.giphy.com/media/oF5oUYTOhvFnO/giphy.gif",
    quote: "Bello! 3.5 Liters conquered! The whole squad is celebrating you! 🍌🎉",
    vibe: "Hype"
  },
  {
    id: 4,
    title: "Happy Cat Thumbs Up!",
    url: "https://i.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif",
    quote: "Certified Water Royalty! Your skin and kidneys are throwing a party! 👑💖",
    vibe: "Wholesome"
  },
  {
    id: 5,
    title: "Snoopy's Iconic Happy Dance!",
    url: "https://i.giphy.com/media/oXnN2TsfE5dVC/giphy.gif",
    quote: "Over 3.5L! Drop what you're doing and do a glorious victory dance! 🕺🌟",
    vibe: "Joyful"
  },
  {
    id: 6,
    title: "The Ultimate Toast (Gatsby Style)!",
    url: "https://i.giphy.com/media/GCLlQnV7dIBoI/giphy.gif",
    quote: "A toast to you, Old Sport. You didn't just hydrate—you dominated! 🥂✨",
    vibe: "Classy"
  },
  {
    id: 7,
    title: "SpongeBob & Patrick Joy!",
    url: "https://i.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
    quote: "I'M READY! And you are fully recharged and super-hydrated! 🍍🌊",
    vibe: "Energetic"
  },
  {
    id: 8,
    title: "Excited Golden Puppy!",
    url: "https://i.giphy.com/media/kyLYXonQYYfwYDI5LX/giphy.gif",
    quote: "10/10 best hydration effort! Tail-wagging levels of proud of you! 🐕💧",
    vibe: "Adorable"
  },
  {
    id: 9,
    title: "Quirky Dancing Duck!",
    url: "https://i.giphy.com/media/mCRJDo24UvJMA/giphy.gif",
    quote: "Hydration God Mode unlocked! Keep that radiant glow going! 🦆🌈",
    vibe: "Hilarious"
  },
  {
    id: 10,
    title: "Anime Ultimate Epic Handshake!",
    url: "https://i.giphy.com/media/pHb82xtBPfqEg/giphy.gif",
    quote: "Pure powerhouse energy! That's how champions handle their water intake! 💪🔥",
    vibe: "Beast Mode"
  }
];

// Hilarious, dramatic & cute GIFs when someone HAS NOT completed their 3.5L task
export const SLACKING_GIFS = [
  {
    id: 101,
    title: "SpongeBob Needs Water!",
    url: "https://i.giphy.com/media/vsxe4XnAlf8pW/giphy.gif",
    quote: "I don't need it... I don't need it... I NEED IT! GO DRINK WATER! 🧽🌵",
    vibe: "Dehydrated",
    tag: "Dried Out"
  },
  {
    id: 102,
    title: "Sad Crying Pikachu",
    url: "https://i.giphy.com/media/7SF5scGB2AFrgsXP63/giphy.gif",
    quote: "Pikachu is deeply heartbroken that you haven't finished your 3.5L water... 😢⚡",
    vibe: "Guilt Trip",
    tag: "Heartbroken"
  },
  {
    id: 103,
    title: "Dramatic Fainting Scene",
    url: "https://i.giphy.com/media/26FPy3QZQqGtDcrja/giphy.gif",
    quote: "Collapsing dramatically from acute water deprivation! Please send hydration! 💀🥀",
    vibe: "Drama Queen",
    tag: "Fainting"
  },
  {
    id: 104,
    title: "Confused Travolta: Where's the Water?",
    url: "https://i.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif",
    quote: "Looking around for your water intake... but finding nothing! Where is it?! 🕵️‍♂️💧",
    vibe: "Baffled",
    tag: "Missing In Action"
  },
  {
    id: 105,
    title: "Crying Spongebob Tears",
    url: "https://i.giphy.com/media/OPU6wzx8JrHna/giphy.gif",
    quote: "Look at these tears! That's the only liquid in your body right now! Go drink! 😭🌊",
    vibe: "Melodramatic",
    tag: "Shedding Tears"
  },
  {
    id: 106,
    title: "Walter White Falling Down",
    url: "https://i.giphy.com/media/vMmnJti6wQPDy/giphy.gif",
    quote: "The exact moment your body realizes you're still below 3.5 Liters... 💀📉",
    vibe: "Pure Despair",
    tag: "Down Bad"
  }
];

export function getRandomMotivationalGif(excludeId = null) {
  const filtered = excludeId 
    ? MOTIVATIONAL_GIFS.filter(g => g.id !== excludeId)
    : MOTIVATIONAL_GIFS;
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

export function getRandomSlackingGif(excludeId = null) {
  const filtered = excludeId 
    ? SLACKING_GIFS.filter(g => g.id !== excludeId)
    : SLACKING_GIFS;
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

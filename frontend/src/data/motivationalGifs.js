// High-quality cute motivational GIFs & celebration messages
export const MOTIVATIONAL_GIFS = [
  {
    id: 1,
    title: "Dancing Duck Victory!",
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZhcTJ6eGtkNDg0azR5ajlud2xmdzdxN2N0bzVzMmVpMnl0M3d4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mCRJDo24UvJMA/giphy.gif",
    quote: "Hydration Champion! You conquered 3.5 Liters! Keep shining! 🌟"
  },
  {
    id: 2,
    title: "Happy Cat Cheers!",
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnpxYmR6ZWhuMTkxeWppZnVwbnBqdzM1eXRqbzR2cnZ2NGd2YWgyNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jpbnoe3UIa8TU8LM13/giphy.gif",
    quote: "Water Queen/King status unlocked! Your body is thanking you right now! 💖"
  },
  {
    id: 3,
    title: "Bear High-Five!",
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTI4MWFldGFvaW1ubmtyMWtsb3d6ZDN6cWV5ZnY3Z2VpbnJlaWlyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kFgzrTt798d2w/giphy.gif",
    quote: "Boom! Over 3.5L! Pure hydration beast mode activated! 🌊🔥"
  },
  {
    id: 4,
    title: "Panda Roll of Joy",
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDBobnA3Znhmcnk3YnpxdHczcGpxdXJ3dm95a3p1Mmpwa3dwaGQxdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eat4rk3i1S8Ks/giphy.gif",
    quote: "So proud of you! Crushing goals like it's nothing! 🐼✨"
  },
  {
    id: 5,
    title: "Snoopy Happy Dance",
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmtraDhhbGV1NHR2OXoxMTRidHlwaWZveW13OTY2ZjBhMnlvczZndyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oXnN2TsfE5dVC/giphy.gif",
    quote: "You did it! 3.5L+ milestone crushed! Take a glorious bow! 🎉"
  },
  {
    id: 6,
    title: "Excited Puppy!",
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3h2ZndpOHo1NXAzaWd3dG53ODJldjdrODdrY25jZDFva3F1NWNqOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kyLYXonQYYfwYDI5LX/giphy.gif",
    quote: "Legendary hydration! May your glow be as bright as your water intake! 🐕💧"
  }
];

export function getRandomMotivationalGif() {
  const index = Math.floor(Math.random() * MOTIVATIONAL_GIFS.length);
  return MOTIVATIONAL_GIFS[index];
}

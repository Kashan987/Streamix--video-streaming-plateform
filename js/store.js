// Har video ke liye alag-alag link hain. "srcs" me pehla link main hai,
// baaki usi video ke backup links hain (sirf wahi video play hoga).
const W3 = "https://media.w3.org/2010/05/";
const TV = "https://test-videos.co.uk/vids/";

const VIDEOS = [
  { id: "bbb", title: "Big Buck Bunny", category: "Animation",
    desc: "Ek bada sa khargosh aur teen shararati jaanwar. Blender Foundation ki mashhoor short film.",
    srcs: [W3 + "bunny/movie.mp4", "https://www.w3schools.com/html/mov_bbb.mp4"] },
  { id: "sintel", title: "Sintel Trailer", category: "Animation",
    desc: "Ek ladki apne khoye hue dragon ko dhundhne nikalti hai.",
    srcs: [W3 + "sintel/trailer.mp4"] },
  { id: "bear", title: "Bear in the River", category: "Nature",
    desc: "Nadi kinare ek bhalu ka chhota sa clip.",
    srcs: [W3 + "video/movie_300.mp4", "https://www.w3schools.com/html/movie.mp4"] },
  { id: "flower", title: "Flower Bloom", category: "Nature",
    desc: "Ek phool khilne ka sundar time-lapse.",
    srcs: ["https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"] },
  { id: "bunnytrailer", title: "Big Buck Bunny Trailer", category: "Animation",
    desc: "Big Buck Bunny ka official trailer.",
    srcs: [W3 + "bunny/trailer.mp4"] },
  { id: "jelly", title: "Jellyfish", category: "Nature",
    desc: "Samundar me tairti jellyfish.",
    srcs: [TV + "jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4"] },
  { id: "bbb10", title: "Big Buck Bunny (10 sec)", category: "Short",
    desc: "Big Buck Bunny ka 10 second ka clip.",
    srcs: [TV + "bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"] },
  { id: "sintel10", title: "Sintel (10 sec)", category: "Short",
    desc: "Sintel ka 10 second ka clip.",
    srcs: [TV + "sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4"] }
];

const KEY = "streamix_custom";
function customVideos() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function allVideos() {
  return [...customVideos(), ...VIDEOS].map(x => ({ ...x, srcs: x.srcs || [x.src] }));
}
function addCustom(item) {
  const list = customVideos();
  list.unshift(item);
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}
function removeCustom(id) {
  try { localStorage.setItem(KEY, JSON.stringify(customVideos().filter(x => x.id !== id))); } catch {}
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
// Thumbnail: agar thumb link ho to image, warna video ka pehla frame
function card(x) {
  const thumb = x.thumb
    ? `<img src="${esc(x.thumb)}" alt="" loading="lazy">`
    : `<video muted playsinline preload="metadata" src="${esc(x.srcs[0])}#t=1"></video>`;
  return `<a class="card" href="watch.html?id=${encodeURIComponent(x.id)}">
    <div class="thumb">${thumb}</div>
    <h3>${esc(x.title)}</h3>
    <p>${esc(x.category)}</p>
  </a>`;
}

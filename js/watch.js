const id = new URLSearchParams(location.search).get("id");
const all = allVideos();
const cur = all.find(x => x.id === id);
const main = document.getElementById("main");

if (!cur) {
  main.innerHTML = `<p class="empty">Video nahi mila. <a href="/">Home par jao</a></p>`;
} else {
  document.title = cur.title + " – Streamix";
  const del = cur.custom ? `<button class="btn ghost" id="del">Remove</button>` : "";
  const player = document.getElementById("player");
  player.innerHTML = `<video controls playsinline preload="auto"></video><p class="vmsg" id="vmsg" hidden></p>`;
  const vid = player.querySelector("video");
  const msg = document.getElementById("vmsg");
  const sources = cur.srcs;
  let i = 0;
  function load() {
    vid.src = sources[i];
    vid.load();
    vid.play().catch(() => {});
  }
  vid.addEventListener("error", () => {
    i++;
    if (i < sources.length) {
      msg.hidden = false;
      msg.textContent = "Ye link nahi chala, isi video ka backup link try ho raha hai...";
      load();
    } else {
      msg.hidden = false;
      msg.innerHTML = 'Video load nahi hua. Link galat ho sakta hai ya internet band hai. <a href="' + esc(cur.srcs[0]) + '" target="_blank" rel="noopener">Link seedha kholo</a>';
    }
  });
  vid.addEventListener("playing", () => { if (i === 0) msg.hidden = true; });
  load();
  document.getElementById("info").innerHTML =
    `<h1>${esc(cur.title)}</h1><p class="meta">${esc(cur.category)}</p><p>${esc(cur.desc || "")}</p>${del}`;
  document.getElementById("next").innerHTML =
    all.filter(x => x.id !== cur.id).slice(0, 8).map(card).join("");
  const d = document.getElementById("del");
  if (d) d.onclick = () => { removeCustom(cur.id); location.href = "/"; };
}

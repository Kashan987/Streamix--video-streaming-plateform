const grid = document.getElementById("grid");
const chips = document.getElementById("chips");
const search = document.getElementById("search");
const empty = document.getElementById("empty");
let cat = "All";

function render() {
  const q = search.value.trim().toLowerCase();
  const list = allVideos().filter(x =>
    (cat === "All" || x.category === cat) && x.title.toLowerCase().includes(q));
  grid.innerHTML = list.map(card).join("");
  empty.hidden = list.length > 0;
}

function renderChips() {
  const cats = ["All", ...new Set(allVideos().map(x => x.category))];
  chips.innerHTML = cats.map(c =>
    `<button class="chip${c === cat ? " on" : ""}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
}

chips.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  cat = b.dataset.c;
  renderChips(); render();
});
search.addEventListener("input", render);

// Add video dialog
const dlg = document.getElementById("dlg");
document.getElementById("openAdd").onclick = () => dlg.showModal();
document.getElementById("cancel").onclick = () => dlg.close();
document.getElementById("form").addEventListener("submit", e => {
  const f = e.target;
  addCustom({
    id: "c" + Date.now(),
    title: f.title.value.trim(),
    category: f.category.value.trim() || "My videos",
    src: f.src.value.trim(),
    thumb: f.thumb.value.trim(),
    desc: f.desc.value.trim(),
    custom: true
  });
  f.reset();
  renderChips(); render();
});

renderChips(); render();

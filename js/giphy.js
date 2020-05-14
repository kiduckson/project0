const form = document.querySelector("form");
const giphy = document.querySelector(".giphy");
const error = document.querySelector(".error");
const API_KEY = `rK7VcoRib8x3UXXeG2U7bqvfHjiLvL1H`;

let trend = "trending?";
let search = "";
let searched = false;
let limit = 25;
let offset = 0;
let finished = false;
let executed = false;

getGif();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  search = "search?q=" + encodeURIComponent(formData.get("search")) + "&";
  searched = true;
  getGif();
});

window.onscroll = function (ev) {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !finished
  ) {
    if (executed) {
      return;
    }

    loadMore();
    executed = true;
    ㅜ;
    setTimeout(() => {
      executed = false;
    }, 2000);
  }
};

function loadMore() {
  offset += limit;
  getGif(false);
}

function loadOne(key) {
  limit = 1;
  search = key;
  getGif();
}

async function getGif(reset = true) {
  try {
    const url = `http://api.giphy.com/v1/gifs/${
      searched ? search : trend
    }api_key=${API_KEY}&${limit}&offset=${offset}`;

    const res = await fetch(url);
    const data = await res.json();
    const gifs = data["data"];

    if (gifs.length === 0) {
      finished = true;
    }

    if (reset) {
      error.innerHTML = "";
      giphy.innerHTML = "";
      offset = 0;
    }

    if (data.pagination["total_count"] === 0) {
      error.innerHTML = "";
      giphy.innerHTML = "";
      const notice = document.createElement("h1");
      notice.textContent = "Not found 😥";
      notice.setAttribute("id", "title");
      error.appendChild(notice);
    }

    if (!search) {
      error.innerHTML = "";
      const notice = document.createElement("h1");
      notice.textContent = "Trending 🤩";
      notice.setAttribute("id", "title");
      error.appendChild(notice);
    }

    gifs.forEach((gif) => {
      const div = document.createElement("div");
      const vid = document.createElement("video");
      const src = document.createElement("source");
      src.src = gif["images"]["original"]["mp4"];
      vid.appendChild(src);
      vid.setAttribute("autoplay", "");
      vid.setAttribute("loop", "");
      div.appendChild(vid);
      div.setAttribute("class", "gif");
      giphy.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}

const form = document.querySelector("form");
const news = document.querySelector(".search");
const trending = document.querySelector(".trending");
const API_KEY = `4c8d50fe9e7c449ca12f6507db831abc`;

trandingNews();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const key = encodeURIComponent(formData.get("search"));
  getNews(key);
});

function getNews(key) {
  const url = `http://newsapi.org/v2/everything?q=${key}&language=en&from=2020-04-08&sortBy=publishedAt&apiKey=${API_KEY}`;
  news.innerHTML = "";
  fetchNews(news, url);
}

function trandingNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
  fetchNews(trending, url);
}

async function fetchNews(key, url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const articles = data["articles"];
    articles.forEach((article) => {
      const div = document.createElement("div");
      div.setAttribute("class", "card bg-dark text-white");

      const header = document.createElement("h4");
      header.textContent = article["title"];

      const publishedAt = document.createElement("p");
      publishedAt.textContent = article["publishedAt"];

      const img = document.createElement("img");
      img.src = article["urlToImage"];
      img.setAttribute("class", "card-img-top img-fluid");

      const description = document.createElement("p");
      description.textContent = article["description"];

      const link = document.createElement("a");
      link.setAttribute("href", article["url"]);
      link.textContent = article["url"];

      div.appendChild(img);
      div.appendChild(header);
      div.appendChild(publishedAt);
      div.appendChild(description);
      div.appendChild(link);
      key.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}

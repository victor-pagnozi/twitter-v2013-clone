window.onload = async function () {
  console.log('caiu aqui')
  const url = "https://newsapi.org/v2/everything";
  const apiKey = "6458b118fc1149fb9a38c6c24bcb2757";

  const response = await fetch(`${url}?${new URLSearchParams({
    q: "brazil dev",
    from: "2023-10-01",
    sortBy: "publishedAt",
    apiKey
  })}`, {
    method: 'GET'
  })

  const results = await response.json();

  if (results.status === 'ok') {
    const divStream = document.getElementById("stream");

    results.articles.map(item => {
      divStream.innerHTML += generateTweetStructure(item);
    })
  }
}

function generateTweetStructure(article) {
  const tagNameFormatted = article.author.toLowerCase().replaceAll(' ', '_');

  return `<div class="tweet">
    <div class="content">
      <img class="avatar" src="${article.urlToImage}" />
      <strong class="fullname">${article.author}</strong>
      <span class="username">${tagNameFormatted}</span>

      <p class="tweet-text">${article.description}</p>
      <div class="tweet-actions">
        <ul>
          <li><span class="icon action-reply"></span> Reply</li>
          <li><span class="icon action-retweet"></span> Retweet</li>
          <li><span class="icon action-favorite"></span> Favorite</li>
          <li><span class="icon action-more"></span> More</li>
        </ul>
      </div>

      <div class="stats">
        <div class="time">
          ${new Date(article.publishedAt).toLocaleDateString()}
          @
          ${new Date(article.publishedAt).toLocaleTimeString()}</div>
      </div>
    </div>
  </div>`
}
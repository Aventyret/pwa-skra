entriesForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  const request = await fetch(form.getAttribute('action'), {
    method: form.getAttribute('method'),
    body: JSON.stringify(data)
  });
  const response = await request.json();

  console.log(response);
});

entriesRefresh.addEventListener('click', async (event) => {
  event.preventDefault();
  entriesUpdate();
});


entriesUpdate();

async function entriesUpdate(){
  const request = await fetch('/api/entries');
  const response = await request.json();
  const fragment = new DocumentFragment();

  console.log(response);

  response.entries.forEach(entry => {
    const article = document.createElement('article');

    article.innerHTML = `
      <p>${entry.content}</p>
    `;

    fragment.appendChild(article);
  });

  entriesList.replaceChildren(fragment);
}

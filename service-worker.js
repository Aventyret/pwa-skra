const entries = [
  {
    id: 1,
    content: 'Hejsan'
  }
];

addEventListener('install', onInstall);
addEventListener('activate', onActivate);
addEventListener('fetch', onFetch);

function onInstall(event){
  self.skipWaiting();
  console.log('install');
}

function onActivate(event){
  event.waitUntil(
    self.clients.claim()
  );
  console.log('activate');
}

async function onFetch(event){
  const url = new URL(event.request.url);

  if(url.pathname === '/api/entries'){
    event.respondWith(
      entriesList(event)
    );
  }

  if(url.pathname === '/api/entries/add'){
    event.respondWith(
      entriesAdd(event)
    );
  }

  const cached = await caches.match(event.request);

  if(cached){
    event.respondWith(
      cached
    );
  }


}

function entriesList(event){
  return new Response(JSON.stringify({
    entries
  }), {
    status: 200,
    headers: {
      'content-type': 'application/json'
    }
  });
}

async function entriesAdd(event){
  const body = await event.request.json();

  entries.push(body);

  return new Response(JSON.stringify({
    add: true
  }), {
    status: 200,
    headers: {
      'content-type': 'application/json'
    }
  });
}





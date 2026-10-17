import { self } from '$app/service-worker';
import { version } from '$app/env';
import { immutable, assets } from '$app/manifest';
import { resolve } from '$app/paths';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

// `immutable`/`assets` paths from `$app/manifest` are relative to the
// base path, so resolve them to absolute pathnames that can be matched
// against `url.pathname` in the `fetch` handler
const ASSETS = [
	...immutable.map((asset) => resolve(asset.path)), // the Vite output
	...assets.map((asset) => resolve(asset.path))  // everything in `static`
];

console.log("logadaço")

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	console.log("logadaço")

	event.waitUntil(addFilesToCache());
});


self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE)
				console.log(key) 
				await caches.delete(key);
		}
	}
	
	event.waitUntil(deleteOldCaches());
});


self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;
	console.log("fetchando")

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
			}
		}

		try {
			const response = await fetch(event.request);

			if (!(response instanceof Response)) {
				throw new Error('invalid response from fetch');
			}

			if (response.status === 200 && !response.headers.get('cache-control')?.includes('no-store')) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			throw err;
		}
	}

	event.respondWith(respond());
});
// Disables access to DOM typings like `HTMLElement` which are not available
// inside a service worker and instantiates the correct globals
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />
/// <reference types="../.svelte-kit/ambient.d.ts" />

import { immutable, assets, prerendered } from '$app/manifest';
import { version } from '$app/env';
import { resolve } from '$app/paths';
import * as tudo from '$app/service-worker';

const self = /** @type {ServiceWorkerGlobalScope} */ (
	/** @type {unknown} */ (globalThis.self)
);

const CACHE = `cache-${version}`;
console.log("ligado ligadaçõ")
//const ASSETS = [...build, ...files];
const ASSETS = [...immutable, ...assets, ...prerendered]

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		console.log("cache: ", cache)
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
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
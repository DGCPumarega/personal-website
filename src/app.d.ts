import { D1Database, IncomingRequestCfProperties } from "@cloudflare/workers-types";

declare global {
	namespace App {
		interface Platform {
			env: {
				D1_DATABASE: D1Database, 
				KV_STORE: KVNamespace,
			};
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};

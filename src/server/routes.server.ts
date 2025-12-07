import { RenderMode, type ServerRoute } from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
	{ path: "**", renderMode: RenderMode.Client },
	{ path: "create", renderMode: RenderMode.Prerender },
	{ path: "storage", renderMode: RenderMode.Prerender },
	{ path: "not-found", renderMode: RenderMode.Prerender },
];

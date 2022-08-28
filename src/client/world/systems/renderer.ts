import { WebGLRenderer } from "three";

export function createRenderer(): WebGLRenderer {
	const renderer = new WebGLRenderer();
	renderer.shadowMap.enabled = true;
	return renderer;
}
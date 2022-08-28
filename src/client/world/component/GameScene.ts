import { Color, Scene } from "three";


export function GameScene(): Scene {
	const scene = new Scene();

	scene.background = new Color("#50BBDD");

	return scene;
}
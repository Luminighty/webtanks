import { Group, Mesh, MeshBasicMaterial, MeshPhongMaterial } from "three";
import { loadGLTF } from "../../ModelLoader";
import { Component } from "../Component.interface";
import THREE from "three";


export class Level implements Component {

	private file: string;

	constructor(file: string) {
		this.file = file;
	}

	async loadModels(): Promise<Group[]> {
		const gltf = await loadGLTF(this.file);
		const material = new MeshPhongMaterial({ color: 0xFFFF00 });
		
		gltf.scene.traverse((obj) => {
			if (obj instanceof Mesh) {
				obj.material = material;
		//		obj.material = material;
			}
		})
		return [gltf.scene];
	}

}
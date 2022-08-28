import { Group } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { loadGLTF } from "../../ModelLoader";
import { Component } from "../Component.interface";

export class Tank implements Component {

	private _id: string;
	public head!: Group;
	public body!: Group;

	constructor(id: string) {
		this._id = id;
	}

	async loadModels(): Promise<Group[]> {
		this.head = (await loadGLTF("assets/tank_head.glb")).scene;
		this.body = (await loadGLTF("assets/tank_body.glb")).scene;
		this.body.add(this.head);
		
		return [this.body];
	}

	get id(): string {
		return this._id;
	}

}
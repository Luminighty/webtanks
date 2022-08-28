import { Group } from "three";

export interface Component {
	loadModels(): Promise<Group[]>;
}
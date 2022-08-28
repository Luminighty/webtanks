import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();

export function loadGLTF(file: string): Promise<GLTF> {
	return new Promise((resolve, reject) => {
	  loader.load(file, (gltf) => {
		gltf.scene.castShadow = true;
		gltf.scene.receiveShadow = true;

		gltf.scene.traverse((o) => {
			o.receiveShadow = true;
			o.castShadow = true;
		})

		resolve(gltf);
	  }, undefined, function (error) {
		reject(error)
	  });
	})
  }
import { AmbientLight, CameraHelper, DirectionalLight, DirectionalLightHelper, Group, PerspectiveCamera, Renderer, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createCamera } from "./component/Camera";
import { GameScene as createGameScene } from "./component/GameScene";
import { Level } from "./component/Level";
import { Tank } from "./component/Tank";
import { createRenderer } from "./systems/renderer";

export class World {
	private renderer: WebGLRenderer;
	private scene: Scene;
	private camera: PerspectiveCamera;
	private controls: OrbitControls;

	private light: DirectionalLight;
	
	private tank: Tank;
	private level: Level;

	constructor(container: HTMLElement) {
		this.renderer = createRenderer();
		this.scene = createGameScene();
		this.camera = createCamera();

		this.tank = new Tank("player");
		this.tank.loadModels()
					.then(this.addComponent.bind(this));

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.camera.position.set(0, 20, 100);
		this.controls.update();
		this.camera.position.z = 5;

		const ambient = new AmbientLight(0xF0F0F0, 0.1);
		this.light = new DirectionalLight(0xffffff, 1);
		this.light.castShadow = true;
		this.light.position.set(0, 20, 5);
		this.light.position.multiplyScalar(30);
		this.light.target.position.set(-5, 0, 0);
		this.light.shadow.mapSize.width = 2048;
		this.light.shadow.mapSize.height = 2048;
		const d = 50;

		this.light.shadow.camera.left = - d;
		this.light.shadow.camera.right = d;
		this.light.shadow.camera.top = d;
		this.light.shadow.camera.bottom = - d;

		this.light.shadow.camera.far = 3500;
		this.light.shadow.bias = - 0.0001;

		// this.scene.add(ambient);
		this.scene.add(this.light, this.light.target);

		this.level = new Level("assets/test.glb");

		this.level.loadModels()
					.then((groups) => this.scene.add(...groups));
		

		this.helpers();

		container.appendChild(this.renderer.domElement);
	}

	helpers() {
		this.scene.add(new CameraHelper(this.light.shadow.camera));
		this.scene.add(new DirectionalLightHelper(this.light));
	}

	addComponent(group: Group[]) {
		group.forEach((g) => this.scene.add(g));
	}

	update() {
		this.controls.update();
		if (this.tank.head)
			this.tank.head.rotateY(0.02);
	}

	keydown(key: string) {
		if (key == "s")
			this.tank.body.translateZ(0.1);
		if (key == "w")
			this.tank.body.translateZ(-0.1);
		if (key == "a")
			this.tank.body.translateX(-0.1);
		if (key == "d")
			this.tank.body.translateX(0.1);
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	onResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.render(this.scene, this.camera);
	}
}
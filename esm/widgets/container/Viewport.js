import Container from "./Container.js";
import viewportLayout from "./Viewport.scss";

export default class Viewport extends Container {
	cls = [viewportLayout.viewport];
	render() {
		return super.render(document.body);
	}
}
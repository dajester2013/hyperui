import Panel from "../esm/widgets/container/Panel";
import { hyper } from "hyperhtml";

let appRoot = document.getElementById("app");

let button = hyper`<button onclick=${()=>alert("clicked")}>Click me</button>`;


let p = new Panel({
	title:"woo",
	items: [
		new Panel({title:"inside", items:[button]})
	]
});
window.p=p;
window.hyper=hyper;
p.render(appRoot);
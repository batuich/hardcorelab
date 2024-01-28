import anime from 'animejs/lib/anime.es.js';
import { mobBreakpoint , tabBreakpoint } from './vars.js';

let scrollAnimationEl;

const animationElementSetup = function(){
	let windowWidth = document.documentElement.clientWidth;
	let windowHeight = document.documentElement.clientHeight;
	// offset from the screen bottom to show
	const siteElOffest = (windowWidth > mobBreakpoint) ? 100 : 180;
	// animation duration
	const siteElShowOffset = (windowWidth > mobBreakpoint) ? 100 : 200;
	// making array with animation setup
	scrollAnimationEl = [
		anime({
			targets: '.wedo-title h2',
			opacity: 1,
			translateY: -siteElOffest,
			easing: 'linear',
			duration: 500,
			autoplay: false
		})
	];

}

export default animationElementSetup;
//export scrollAnimationEl;
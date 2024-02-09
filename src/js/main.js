//import 'normalize.css';
import '../scss/style.scss';

import anime from 'animejs/lib/anime.es.js';
import ScrambleText from 'scramble-text';
import lottie from 'lottie-web';

// vars
// blocks parametrs
let heightStartBlock;
let offsetWedoBlock;
let heightWedoBlock;
let offsetPerfBlock;
let heightPerfBlock;
let offsetStratBlock;
let heightStratBlock;
let offsetTeamBlock;
let heightTeamBlock;
let offsetContactBlock;
let heightContactBlock;
//window width and height
let windowWidth;
let windowHeight;
const MOBILE_BREAKPOINT = 576;
const TABLET_BREAKPOINT = 768;
//animation elements
let animationSetupFlag = false;
let ontopDecorRectAnime;
let ontopMenuAnime;
let ontopContactAnime;
// mobile text near header buttons
let ontopTextContactusAnime;
let ontopTextMenuAnime;
let menuMobAnime;
let menuMobHeight;
let menuStartAnime;
let menuWedoAnime;
let menuPerfAnime;
let menuStratAnime;
let menuTeamAnime;
let menuBorderAnime;
let popupPerfAnime;
let popupPerfMobAnime;
const popupPerfDuration = 250;
// common animation site blocks
let commonElAnime = [];
//scramble text animations
let scrambleTitleText;
let scrambleTitleTextFlag = false;
let scrambleWedoTitle;
let scrambleTeamTitle;
let scrambleNum1;
let scrambleNum2;
let scrambleNum3;
let scrambleNum4;
const chars = [
	'安', '以', '宇', '衣', '於', '加', '幾', '久', '計', '己', '左', '之', '寸', '世', '曽', '太', '知', '川', '天', '止', '奈', '仁', '奴', '称', '乃', '波', '比', '不', '部', '保'
	// '末','美','武','女','毛','也','為','由','恵','与','良','利','留','礼','呂', '和','遠','无'
];
//background animations
// длительность анимации поворота паттерна
const BACKPATTERNDURATION = 10000;
const PATTERN_SPEED = 10;
const CIRCLE_AMOUNT = 37;
const RECT_AMOUNT = 32;
const BACK_ELEMENTS_DELAY = 200;
let backCir;
let backRect;
let backCirlceAnime;
let backRectAnime;
//wedo graph animation
let wedoGraph;
//icon perfomance link animation
let iconPerfomanceAnim;

// looking for scroll
window.addEventListener("scroll", () => {
	animationScroll();
});

// looking for window size. if its change recalculate block positions
window.addEventListener("resize", () => {
	// don't do anything if its mobile or tablet screen
	if (windowWidth > TABLET_BREAKPOINT) {
		updateVars();
		animationElementsSetup();
	}
});

// waiting for DOM loaded
document.addEventListener('DOMContentLoaded', () => {
	// scramble texts
	setTimeout(scrambleTitleTextFun, 500);
	scrambleTitleTextFlag = true;
	scrambleText();

	// update vars after loading
	updateVars();
	// setup animation elements
	animationElementsSetup();

	// click actions and targets
	const clickAction = new Map();
	// open perfomance graphics
	clickAction.set(document.querySelector(".perf-graph-link a"), () => {
		if (windowWidth > MOBILE_BREAKPOINT) {
			if (popupPerfAnime.reversed) popupPerfAnime.reverse();
			popupPerfAnime.play();
		} else {
			if (popupPerfMobAnime.reversed) popupPerfMobAnime.reverse();
			popupPerfMobAnime.play();
		}
	});
	// close perfomace graphics
	clickAction.set(document.querySelector(".perf-graph-button"), () => {
		popupPerfAnime.reverse();
		popupPerfAnime.play();
	});
	clickAction.set(document.querySelector(".perf-graph-button-mob"), () => {
		popupPerfMobAnime.reverse();
		popupPerfMobAnime.play();
	});
	// mobile contact button
	clickAction.set(document.querySelector(".on-top-contact-mob button"), () => {
		window.location.href = "#contact";
	});
	//open mobile menu
	clickAction.set(document.querySelector(".on-top-menu-mob button"), () => {
		if (windowWidth <= MOBILE_BREAKPOINT) {
			if (menuMobAnime.reversed) menuMobAnime.reverse();
			menuMobAnime.play();
		}
	});
	// close mobile menu
	clickAction.set(document.querySelector(".menu-mob button"), () => {
		menuMobAnime.reverse();
		menuMobAnime.play();
	});
	// desktop menu links
	let menuLinks = document.querySelectorAll(".on-top-menu ul li a");
	for (let i = 0; i < menuLinks.length; i++) {
		clickAction.set(menuLinks[i], () => {
			window.location.href = menuLinks[i].hash;
		});
	}
	// mobile menu links
	menuLinks = document.querySelectorAll(".menu-mob ul li a");
	for (let i = 0; i < menuLinks.length; i++) {
		clickAction.set(menuLinks[i], () => {
			menuMobAnime.reverse();
			menuMobAnime.play();
			window.location.href = menuLinks[i].hash;
		});
		clickAction.set(menuLinks[i].parentNode, () => {
			menuMobAnime.reverse();
			menuMobAnime.play();
			window.location.href = menuLinks[i].hash;
		});
	}
	// click listener
	document.addEventListener('click', (event) => {
		event.preventDefault();
		const clickedElement = event.target;
		if (clickAction.has(clickedElement)) {
			const action = clickAction.get(clickedElement);
			action();
		} else {
		}
	});
	// perfomance icon
	document.querySelector(".perf-graph-link a").addEventListener('mouseenter', () => {
		iconPerfomanceAnim.goToAndPlay(1);
	});

	// page length multiplied
	let animPageLength = offsetContactBlock;
	// animation length with stagger effect
	// let durationCircle = BACKPATTERNDURATION + BACK_ELEMENTS_DELAY *(CIRCLE_AMOUNT-1);
	// let durationRect = BACKPATTERNDURATION + BACK_ELEMENTS_DELAY *(RECT_AMOUNT-1);
	// calculate amount of rotation
	// let amountCircleRotation = animPageLength * PATTERN_SPEED / durationCircle;
	// let amountRectRotation = animPageLength * PATTERN_SPEED / durationRect;

	backCir = anime({
		targets: '.circle-svg .circle',
		rotateY: 360 * 3,
		duration: animPageLength * PATTERN_SPEED,
		easing: 'easeInOutSine',
		delay: anime.stagger(BACK_ELEMENTS_DELAY),
		autoplay: false,
		complete: () => { console.log("CIRCLE DONE"); }
		});
	// определение анимации квадратного паттерна
	backRect = anime({
		targets: '.rect-svg .rect',
		rotateY: 360 * 3,
		duration: animPageLength * PATTERN_SPEED,
		easing: 'easeInOutSine',
		delay: anime.stagger(BACK_ELEMENTS_DELAY),
		autoplay: false,
		complete: () => { console.log("RECT DONE"); }
	});
});

//FUNCTIONS

// update vars after resize window
const updateVars = () => {
	let el = document.querySelector(".start-block");
	heightStartBlock = el.clientHeight;
	el = document.querySelector(".wedo-block");
	offsetWedoBlock = Math.round(el.getBoundingClientRect().top + window.scrollY);
	heightWedoBlock = el.clientHeight;
	el = document.querySelector(".perf-block");
	offsetPerfBlock = Math.round(el.getBoundingClientRect().top + window.scrollY);
	heightPerfBlock = el.clientHeight;
	el = document.querySelector(".strat-block");
	offsetStratBlock = Math.round(el.getBoundingClientRect().top + window.scrollY);
	heightStratBlock = el.clientHeight;
	el = document.querySelector(".team-block");
	offsetTeamBlock = Math.round(el.getBoundingClientRect().top + window.scrollY);
	heightTeamBlock = el.clientHeight;
	el = document.querySelector(".contact-block");
	offsetContactBlock = Math.round(el.getBoundingClientRect().top + window.scrollY);
	heightContactBlock = el.clientHeight;

	windowWidth = document.documentElement.clientWidth;
	windowHeight = document.documentElement.clientHeight;
	// mobile menu hide
	if (windowWidth <= MOBILE_BREAKPOINT) {
		menuMobHeight = document.querySelector(".menu-mob").getBoundingClientRect().height;
		document.querySelector(".menu-mob").style.top = - menuMobHeight + "px";
	} else {
		menuMobHeight = 0;
		document.querySelector(".menu-mob").style.display = "none";
	}
}

// setup animation elements
const animationElementsSetup = () => {
	//site elements common animation
	// offset from the screen bottom to show
	const siteElOffest = (windowWidth > MOBILE_BREAKPOINT) ? 100 : 50;
	// animation duration
	const siteElShowOffset = (windowWidth > MOBILE_BREAKPOINT) ? 100 : 50;

	let allEl = document.querySelectorAll('.com-an');
	for (let i = 0; i < allEl.length; i++) {
		allEl[i].style.top = pxToPx(siteElOffest) + 'px';
		allEl[i].style.opacity = 0;
		let comElOffset = Math.round(allEl[i].getBoundingClientRect().top + window.scrollY - windowHeight);
		commonElAnime[i] = {
			el: allEl[i],
			offsetY: comElOffset + pxToPx(siteElShowOffset),
			anime: anime({
				targets: allEl[i],
				opacity: 1,
				translateY: -pxToPx(siteElOffest),
				easing: 'linear',
				duration: pxToPx(siteElOffest),
				delay: 0,
				autoplay: false
			})
		};
	}
	// add function to start scrable animation for titles
	commonElAnime[0].anime.loopComplete = function (a) {
		if (a.completed) a.reverse();
		if (a.reversePlayback) a.completed = false;
		scrambleWedoTitle.play().start();
		wedoGraph.play();
	}
	commonElAnime[9].anime.loopComplete = function (a) {
		if (a.completed) a.reverse();
		if (a.reversePlayback) a.completed = false;
		scrambleTeamTitle.play().start();
	}
	// add function to start scrable animation for numbers
	commonElAnime[3].anime.loopComplete = function (a) {
		if (a.completed) a.reverse();
		if (a.reversePlayback) a.completed = false;
		scrambleNum1.play().start();
	}
	commonElAnime[4].anime.loopComplete = function (a) {
		if (a.completed) a.reverse();
		if (a.reversePlayback) a.completed = false;
		scrambleNum2.play().start();
	}
	commonElAnime[5].anime.loopComplete = function (a) {
		if (a.completed) a.reverse();
		if (a.reversePlayback) a.completed = false;
		scrambleNum3.play().start();
	}
	commonElAnime[6].anime.loopComplete = function (a) {
		if (a.completed) a.reverse();
		if (a.reversePlayback) a.completed = false;
		scrambleNum4.play().start();
	}
	//ontop animation elements
	// do not hide if mobile screen
	if (windowWidth > MOBILE_BREAKPOINT) {
		ontopDecorRectAnime = anime({
			targets: '.decor-rect-1',
			opacity: 0,
			easing: 'linear',
			duration: 500,
			autoplay: false
		});
	}
	ontopMenuAnime = anime({
		targets: '.on-top-menu',
		opacity: 0,
		easing: 'linear',
		duration: 500,
		autoplay: false
	});
	ontopContactAnime = anime({
		targets: '.on-top-contact-us',
		opacity: 0,
		easing: 'linear',
		duration: 500,
		autoplay: false
	});
	ontopTextContactusAnime = anime({
		targets: '.on-top-contact-mob p',
		opacity: 0,
		easing: 'linear',
		duration: 50,
		autoplay: false
	});
	ontopTextMenuAnime = anime({
		targets: '.on-top-menu-mob p',
		opacity: 0,
		easing: 'linear',
		duration: 50,
		autoplay: false
	});
	menuMobAnime = anime({
		targets: '.menu-mob',
		opacity: 1,
		translateY: menuMobHeight,
		easing: 'linear',
		duration: 200,
		autoplay: false
	});
	//menu start item
	const animDuration = pxToPx(40);
	const animPreliminary = pxToPx(200);
	// vars for menu border animation
	let menuItemWidth = [];
	let menuBorderWidth = [];
	let menuBorderOffsetX = [];
	let menuBorderOffsetY = [];
	const menuBorderPadding = 2;

	menuItemWidth[0] = document.querySelector(".menu-start a").offsetWidth;
	let elOffset = pxToPx(160) - menuItemWidth[0];
	menuBorderWidth[0] = menuItemWidth[0] + pxToPx(120) + menuBorderPadding * 2;
	menuBorderOffsetX[0] = pxToPx(158) - menuItemWidth[0] - menuBorderPadding;
	menuBorderOffsetY[0] = - menuBorderPadding;

	menuStartAnime = anime({
		targets: '.menu-start',
		translateX: [
			{ value: elOffset, duration: 0, delay: 0 },
			{ value: 0, duration: animDuration, delay: heightStartBlock - animPreliminary },
		],
		easing: 'linear',
		autoplay: false
	});

	//menu wedo item
	menuItemWidth[1] = document.querySelector(".menu-wedo a").offsetWidth;
	elOffset = pxToPx(160) - menuItemWidth[1];
	menuBorderWidth[1] = menuItemWidth[1] + pxToPx(120) + menuBorderPadding * 2;
	menuBorderOffsetX[1] = pxToPx(158) - menuItemWidth[1] - menuBorderPadding;
	menuBorderOffsetY[1] = - menuBorderPadding + pxToPx(24 + 11) * 1;

	menuWedoAnime = anime({
		targets: '.menu-wedo',
		translateX: [
			{ value: elOffset, duration: animDuration, delay: offsetWedoBlock - animPreliminary },
			{ value: 0, duration: animDuration, delay: heightWedoBlock - animDuration },
		],
		easing: 'linear',
		autoplay: false
	});

	//menu perfomance item
	menuItemWidth[2] = document.querySelector(".menu-perf a").offsetWidth;
	elOffset = pxToPx(160) - menuItemWidth[2];
	menuBorderWidth[2] = menuItemWidth[2] + pxToPx(120) + menuBorderPadding * 2;
	menuBorderOffsetX[2] = pxToPx(158) - menuItemWidth[2] - menuBorderPadding;
	menuBorderOffsetY[2] = - menuBorderPadding + pxToPx(24 + 11) * 2;

	menuPerfAnime = anime({
		targets: '.menu-perf',
		translateX: [
			{ value: elOffset, duration: animDuration, delay: offsetPerfBlock - animPreliminary },
			{ value: 0, duration: animDuration, delay: heightPerfBlock - animDuration },
		],
		easing: 'linear',
		autoplay: false
	});

	//menu strategy item
	menuItemWidth[3] = document.querySelector(".menu-strat a").offsetWidth;
	elOffset = pxToPx(160) - menuItemWidth[3];
	menuBorderWidth[3] = menuItemWidth[3] + pxToPx(120) + menuBorderPadding * 2;
	menuBorderOffsetX[3] = pxToPx(158) - menuItemWidth[3] - menuBorderPadding;
	menuBorderOffsetY[3] = - menuBorderPadding + pxToPx(24 + 11) * 3;

	menuStratAnime = anime({
		targets: '.menu-strat',
		translateX: [
			{ value: elOffset, duration: animDuration, delay: offsetStratBlock - animPreliminary },
			{ value: 0, duration: animDuration, delay: heightStratBlock - animDuration },
		],
		easing: 'linear',
		autoplay: false
	});

	//menu team item
	menuItemWidth[4] = document.querySelector(".menu-team a").offsetWidth;
	elOffset = pxToPx(160) - menuItemWidth[4];
	menuBorderWidth[4] = menuItemWidth[4] + pxToPx(120) + menuBorderPadding * 2;
	menuBorderOffsetX[4] = pxToPx(158) - menuItemWidth[4] - menuBorderPadding;
	menuBorderOffsetY[4] = - menuBorderPadding + pxToPx(24 + 11) * 4;

	menuTeamAnime = anime({
		targets: '.menu-team',
		translateX: [
			{ value: elOffset, duration: animDuration, delay: offsetTeamBlock - animPreliminary },
			{ value: 0, duration: animDuration, delay: heightTeamBlock + pxToPx(300) },
		],
		easing: 'linear',
		autoplay: false
	});
	// setup default border position
	let menuBorder = document.querySelector(".menu-border");
	menuBorder.style.width = menuBorderWidth[0] + "px";
	menuBorder.style.height = pxToPx(24) + "px";
	menuBorder.style.left = menuBorderOffsetX[0] + "px";
	menuBorder.style.top = menuBorderOffsetY[0] + "px";

	menuBorderAnime = anime({
		targets: '.menu-border',
		translateY: [
			{ value: pxToPx(24 + 11) * 1, duration: animDuration, delay: offsetWedoBlock - animPreliminary },
			{ value: pxToPx(24 + 11) * 2, duration: animDuration, delay: heightWedoBlock - animDuration },
			{ value: pxToPx(24 + 11) * 3, duration: animDuration, delay: heightPerfBlock - animDuration },
			{ value: pxToPx(24 + 11) * 4, duration: animDuration, delay: heightStratBlock - animDuration },
		],
		translateX: [
			{ value: menuBorderOffsetX[1] - menuBorderOffsetX[0], duration: animDuration, delay: offsetWedoBlock - animPreliminary },
			{ value: menuBorderOffsetX[2] - menuBorderOffsetX[0], duration: animDuration, delay: heightWedoBlock - animDuration },
			{ value: menuBorderOffsetX[3] - menuBorderOffsetX[0], duration: animDuration, delay: heightPerfBlock - animDuration },
			{ value: menuBorderOffsetX[4] - menuBorderOffsetX[0], duration: animDuration, delay: heightStratBlock - animDuration },
		],
		width: [
			{ value: menuBorderWidth[1], duration: animDuration, delay: offsetWedoBlock - animPreliminary },
			{ value: menuBorderWidth[2], duration: animDuration, delay: heightWedoBlock - animDuration },
			{ value: menuBorderWidth[3], duration: animDuration, delay: heightPerfBlock - animDuration },
			{ value: menuBorderWidth[4], duration: animDuration, delay: heightStratBlock - animDuration },
		],
		easing: 'linear',
		autoplay: false
	});
	// setup popup graphics animation
	popupPerfAnime = anime({
		targets: '.perf-graph',
		opacity: 1,
		translateY: -pxToPx(40),
		easing: 'easeOutSine',
		duration: popupPerfDuration,
		begin: function (a) {
			if (!a.reversed) document.querySelector('.perf-graph').style.display = 'block';
		},
		complete: function (a) {
			if (a.reversed) document.querySelector('.perf-graph').style.display = 'none';
		},
		autoplay: false
	});
	popupPerfMobAnime = anime({
		targets: '.perf-graph-mob',
		opacity: 1,
		translateX: windowWidth,
		easing: 'easeOutSine',
		duration: popupPerfDuration,
		begin: function (a) {
			if (!a.reversed) document.querySelector('.perf-graph-mob').style.display = 'block';
		},
		complete: function (a) {
			if (a.reversed) document.querySelector('.perf-graph-mob').style.display = 'none';
		},
		autoplay: false
	});
	//background pattern scroll animation
	let screenFlag;
	let backPatternNumbersCircle = {
		desktop: {
			translateX: [200, 200, 200, -560, -560],
			translateY: [0, 400, 400, 400, 0],
			rotate: [0, 90, 90, 180, 270]
		},
		mobile: {
			translateX: [0, 0, -150, -150, -150],
			translateY: [-100, -100, -100, -100, 200],
			rotate: [-90, -90, -180, -180, -270]
		}
	};
	let backPatternNumbersRect = {
		desktop: {
			translateX: [-200, -200, -200, 560, 560],
			translateY: [0, -400, -400, -400, 0],
			rotate: [45, 90, 180, 225, 315]
		},
		mobile: {
			translateX: [0, 0, 150, 150, 150],
			translateY: [150, 150, 150, 150, -100],
			rotate: [0, 0, -45, -90, -180]
		}
	};

	screenFlag = windowWidth > MOBILE_BREAKPOINT ? 'desktop' : 'mobile';

	backCirlceAnime = anime({
		targets: '.circle-pattern',
		translateX: [
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateX[0]),
				duration: heightStartBlock
			},
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateX[1]),
				duration: heightWedoBlock
			},
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateX[2]),
				duration: heightPerfBlock
			},
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateX[3]),
				duration: heightStratBlock
			},
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateX[4]),
				duration: heightTeamBlock
			},
		],
		translateY: [
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateY[0]),
				duration: heightStartBlock
			},
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateY[1]),
				duration: heightWedoBlock
			},
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateY[2]),
				duration: heightPerfBlock
			},
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateY[3]),
				duration: heightStratBlock
			},
			{
				value: pxToPx(backPatternNumbersCircle[screenFlag].translateY[4]),
				duration: heightTeamBlock
			},
		],
		rotate: [
			//defaine start rotation in first place
			{
				value: -90,
				duration: 0
			},
			{
				value: backPatternNumbersCircle[screenFlag].rotate[0],
				duration: heightStartBlock
			},
			{
				value: backPatternNumbersCircle[screenFlag].rotate[1],
				duration: heightWedoBlock
			},
			{
				value: backPatternNumbersCircle[screenFlag].rotate[2],
				duration: heightPerfBlock
			},
			{
				value: backPatternNumbersCircle[screenFlag].rotate[3],
				duration: heightStratBlock
			},
			{
				value: backPatternNumbersCircle[screenFlag].rotate[4],
				duration: heightTeamBlock
			},
		],
		easing: 'linear',
		autoplay: false
	});
	backRectAnime = anime({
		targets: '.rect-pattern',
		translateX: [
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateX[0]),
				duration: heightStartBlock
			},
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateX[1]),
				duration: heightWedoBlock
			},
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateX[2]),
				duration: heightPerfBlock
			},
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateX[3]),
				duration: heightStratBlock
			},
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateX[4]),
				duration: heightTeamBlock
			},
		],
		translateY: [
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateY[0]),
				duration: heightStartBlock
			},
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateY[1]),
				duration: heightWedoBlock
			},
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateY[2]),
				duration: heightPerfBlock
			},
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateY[3]),
				duration: heightStratBlock
			},
			{
				value: pxToPx(backPatternNumbersRect[screenFlag].translateY[4]),
				duration: heightTeamBlock
			},
		],
		rotate: [
			{
				value: backPatternNumbersRect[screenFlag].rotate[0],
				duration: heightStartBlock
			},
			{
				value: backPatternNumbersRect[screenFlag].rotate[1],
				duration: heightWedoBlock
			},
			{
				value: backPatternNumbersRect[screenFlag].rotate[2],
				duration: heightPerfBlock
			},
			{
				value: backPatternNumbersRect[screenFlag].rotate[3],
				duration: heightStratBlock
			},
			{
				value: backPatternNumbersRect[screenFlag].rotate[4],
				duration: heightTeamBlock
			},
		],
		easing: 'linear',
		autoplay: false
	});
	//wedo graph animation
	let wedoTargets = screenFlag == 'desktop' ? '.wedo-graph-svg .bar' : '.wedo-graph-svg .bar-mobile';
	let wedoGraph = anime({
		targets: wedoTargets,
		keyframes: [
			{
				duration: 500,
				opacity: 0,
				translateY: 40,
			},
			{
				duration: 200,
				opacity: 1,
				translateY: 10,
			}
		],
		loop: false,
		autoplay: false,
		easing: 'easeOutBack',
		delay: anime.stagger(20)
	});
	// perfomance icon animation
	let iconPerfomance = document.querySelector('#icon-perfomance');
	iconPerfomanceAnim = lottie.loadAnimation({
		container: iconPerfomance, // the dom element that will contain the animation
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: 'lottie/icon-perfomance.json' // the path to the animation json
	});

	animationSetupFlag = true;
}

// scroll animation 
const animationScroll = () => {
	let windowScrollAmount = window.scrollY;
	// if animated element setuped
	if (animationSetupFlag) {
		//scramble hero title
		if (windowScrollAmount == 0 && scrambleTitleTextFlag) {
			scrambleTitleTextFun();
		}
		// hide menu and decor rect when we scrolled to footer
		let animTime = (windowScrollAmount - offsetContactBlock + pxToPx(150)) * 10;
		if (windowWidth > MOBILE_BREAKPOINT) ontopDecorRectAnime.seek(animTime);
		ontopMenuAnime.seek(animTime);
		ontopContactAnime.seek(animTime);
		// menu items
		menuStartAnime.seek(windowScrollAmount);
		menuWedoAnime.seek(windowScrollAmount);
		menuPerfAnime.seek(windowScrollAmount);
		menuStratAnime.seek(windowScrollAmount);
		menuTeamAnime.seek(windowScrollAmount);
		menuBorderAnime.seek(windowScrollAmount);
		// hide text on mobile screen
		ontopTextContactusAnime.seek(windowScrollAmount);
		ontopTextMenuAnime.seek(windowScrollAmount);
		// common site elements
		for (let i = 0; i < commonElAnime.length; i++) {
			commonElAnime[i].anime.seek(windowScrollAmount - commonElAnime[i].offsetY);
		}
		//back pattern element animation on scroll
		backCir.seek(windowScrollAmount*PATTERN_SPEED);
		backRect.seek(windowScrollAmount*PATTERN_SPEED);
		backCirlceAnime.seek(windowScrollAmount);
		backRectAnime.seek(windowScrollAmount);
	}
}
//scramble title
const scrambleText = () => {
	const numberTime = 200;

	scrambleWedoTitle = new ScrambleText(
		document.getElementById('wedo-title'),
		{
			timeOffset: 8,
			chars: chars
		}
	).stop();

	scrambleTeamTitle = new ScrambleText(
		document.getElementById('team-title'),
		{
			timeOffset: 10,
			chars: chars
		}
	).stop();

	scrambleNum1 = new ScrambleText(
		document.getElementById('number-1'),
		{
			timeOffset: numberTime,
			chars: chars
		}
	).stop();
	scrambleNum2 = new ScrambleText(
		document.getElementById('number-2'),
		{
			timeOffset: numberTime,
			chars: chars
		}
	).stop();
	scrambleNum3 = new ScrambleText(
		document.getElementById('number-3'),
		{
			timeOffset: numberTime,
			chars: chars
		}
	).stop();
	scrambleNum4 = new ScrambleText(
		document.getElementById('number-4'),
		{
			timeOffset: numberTime,
			chars: chars
		}
	).stop();
}
// scramble hero title
const scrambleTitleTextFun = () => {
	scrambleTitleText = new ScrambleText(
		document.getElementById('main-title'),
		{
			timeOffset: 15,
			chars: chars,
			callback: function () { }
		}
	).play().start();
}
// convert vm to px using current window width
const vmToPx = (str) => {
	str = str.replace(/[^\d.-]/ig, '');
	return Math.round(str * windowWidth / 100);
}
// convert px to vm using design layout propotions
const pxToVm = (n) => {
	let designWidth = windowWidth > MOBILE_BREAKPOINT ? 1480 : 320;
	return (n * 100 / designWidth) + "vw";
}
// convert px from design layout to window px 
const pxToPx = (n) => {
	n = pxToVm(n);
	return vmToPx(n);
}
// page scroll height
const scrollHeight = () => {
	return Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);
}
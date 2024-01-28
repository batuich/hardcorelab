import { mobBreakpoint , tabBreakpoint } from './vars.js';
import anime from 'animejs/lib/anime.es.js';
import ScrambleText from 'scramble-text';

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
const mobBreakpoint = 576;
const tabBreakpoint = 768;
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

// looking for scroll
window.addEventListener("scroll", function () {
	animationScroll();
});

// looking for window size. if its change recalculate block positions
window.addEventListener("resize", function () {
	// don't do anything if its mobile or tablet screen
	if( windowWidth > tabBreakpoint){
		updateVars();
		animationElementsSetup();
	}
});

// waiting for DOM loaded
document.addEventListener('DOMContentLoaded', function () {
	// scramble texts
  setTimeout(scrambleTitleTextFun, 500);
	scrambleTitleTextFlag = true;
	scrambleText();
	
	// update vars after loading
	updateVars();
	// setup animation elements
	animationElementsSetup();
	// animationScroll();
	// open perfomance graphics
	document.querySelector(".perf-graph-link a").addEventListener('click', function (event) {
		event.preventDefault();
		if (windowWidth > mobBreakpoint) {
			if (popupPerfAnime.reversed) popupPerfAnime.reverse();
			popupPerfAnime.play();
		} else {
			if (popupPerfMobAnime.reversed) popupPerfMobAnime.reverse();
			popupPerfMobAnime.play();
		}
	});
	// close perfomace graphics
	document.querySelector(".perf-graph-button").addEventListener('click', function (event) {
		event.preventDefault();
		popupPerfAnime.reverse();
		popupPerfAnime.play();
	});
	document.querySelector(".perf-graph-button-mob").addEventListener('click', function (event) {
		event.preventDefault();
		popupPerfMobAnime.reverse();
		popupPerfMobAnime.play();
	});
	// mobile screen contact button
	document.querySelector(".on-top-contact-mob").addEventListener('click', function (event) {
		window.location.href = "#contact";
	});
	// change behave of links in mobile menu
	let mobMenuLinks = document.querySelectorAll(".menu-mob ul li a");
	for (let i = 0; i < mobMenuLinks.length; i++) {
		mobMenuLinks[i].parentNode.addEventListener('click', function (event) {
			event.preventDefault();
			menuMobAnime.reverse();
			menuMobAnime.play();
			window.location.href = mobMenuLinks[i].hash;
		});
	}
	//open mobile menu
	document.querySelector(".on-top-menu-mob button").addEventListener('click', function (event) {
		event.preventDefault();
		if (windowWidth <= mobBreakpoint) {
			if (menuMobAnime.reversed) menuMobAnime.reverse();
			menuMobAnime.play();
		}
	});
	//close mobile menu
	document.querySelector(".menu-mob button").addEventListener('click', function (event) {
		event.preventDefault();
		menuMobAnime.reverse();
		menuMobAnime.play();
	});
});

//FUNCTIONS

// update vars after resize window
function updateVars() {
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
	if (windowWidth <= mobBreakpoint) {
		menuMobHeight = document.querySelector(".menu-mob").getBoundingClientRect().height;
		document.querySelector(".menu-mob").style.top = - menuMobHeight + "px";
	} else {
		menuMobHeight = 0;
		document.querySelector(".menu-mob").style.display = "none";
	}
}

// setup animation elements
function animationElementsSetup() {
	//site elements common animation
	// offset from the screen bottom to show
	const siteElOffest = (windowWidth > mobBreakpoint) ? 100 : 180;
	// animation duration
	const siteElShowOffset = (windowWidth > mobBreakpoint) ? 100 : 200;
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

	//wedo
	wedoTitleAnime = anime({
		targets: '.wedo-title h2',
		opacity: 1,
		translateY: -siteElOffest,
		easing: 'linear',
		duration: 500,
		autoplay: false
	});

	//ontop animation elements
	// do not hide if mobile screen
	if( windowWidth > mobBreakpoint ){
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

	animationSetupFlag = true;
}

// scroll animation 
function animationScroll() {
	let windowScrollAmount = window.scrollY;
	// if animated element setuped
	if (animationSetupFlag) {
		//scramble hero title
		if( windowScrollAmount == 0 && scrambleTitleTextFlag){
			scrambleTitleTextFun();
		}
		// hide menu and decor rect when we scrolled to footer
		let animTime = (windowScrollAmount - offsetContactBlock + pxToPx(150)) * 10;
		if( windowWidth > mobBreakpoint ) ontopDecorRectAnime.seek(animTime);
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
	}
}
//scramble title
function scrambleText() {
	const numberTime = 200;

	scrambleWedoTitle = new ScrambleText(
		document.getElementById('wedo-title'),
		{
			timeOffset: 8,
			chars: chars,
			callback: function () { }
		}
	).stop();

	scrambleTeamTitle = new ScrambleText(
		document.getElementById('team-title'),
		{
			timeOffset: 10,
			chars: chars,
			callback: function () { }
		}
	).stop();

	scrambleNum1 = new ScrambleText(
		document.getElementById('number-1'),
		{
			timeOffset: numberTime,
			chars: chars,
			callback: function () { }
		}
	).stop();
	scrambleNum2 = new ScrambleText(
		document.getElementById('number-2'),
		{
			timeOffset: numberTime,
			chars: chars,
			callback: function () { }
		}
	).stop();
	scrambleNum3 = new ScrambleText(
		document.getElementById('number-3'),
		{
			timeOffset: numberTime,
			chars: chars,
			callback: function () { }
		}
	).stop();
	scrambleNum4 = new ScrambleText(
		document.getElementById('number-4'),
		{
			timeOffset: numberTime,
			chars: chars,
			callback: function () { }
		}
	).stop();
}
// scramble hero title
function scrambleTitleTextFun() {
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
function vmToPx(str) {
	str = str.replace(/[^\d.]/ig, '');
	return Math.round(str * windowWidth / 100);
}
// convert px to vm using design layout propotions
function pxToVm(num) {
	return (num * 100 / 1480) + "vw";
}
// convert px from design layout to window px 
function pxToPx(num) {
	num = pxToVm(num);
	return vmToPx(num);
}

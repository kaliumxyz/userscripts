// ==UserScript==
// @name         euphist
// @namespace    https://kalium.xyz/
// @version      1
// @description  bash like history suppor for Heim
// @author       Kalium
// @include      https://euphoria.io/room/*
// @include      https://euphoria.leet.nu/room/*
// @grant        none
// ==/UserScript==

(setTimeout(_ => {
if(!Heim) {
    setTimeout(main, 1000);
} else {
    main();
}

function main () {
console.log('euphist init!')
const euphist = {
	msgStack: [],
	msgIndex: 0,
};

Heim.actions._sendMessage = Heim.actions.sendMessage;
Heim.dirty = true;

Heim.actions.sendMessage = (text, ...etc) => {
	euphist.msgStack.push(text);
	euphist.msgIndex = euphist.msgStack.length;
	Heim.actions._sendMessage(text, ...etc);
}

euphist.keyDownEvent = ev => {
	let input = document.querySelector('.entry-text');

	if(input.value === '' || input.value === euphist.msgStack[euphist.msgIndex])
	if(ev.ctrlKey) {
		switch(ev.keyCode) {
			//up
			case 38:
				if(euphist.msgIndex > 0)
					input.value = euphist.msgStack[--euphist.msgIndex];
				break;
			//down
			case 40:
				if(euphist.msgIndex >= euphist.msgStack.length -1) {
					input.value = '';
					euphist.msgIndex = euphist.msgStack.length;
                } else {
					input.value = euphist.msgStack[++euphist.msgIndex];
                }
				break;

		}
	}
}

document.addEventListener('keydown', euphist.keyDownEvent);
}}, 1000))()

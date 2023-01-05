let state = {
	amountRequired: 100000,
	amountRaised: 89914,
	backers: 5007,
	bambooStock: 101,
	blackStock: 64,
	mahoganyStock: 0,
	bookmarked: false,
};

// Set bookmark status
const bookmarkBtn = document.getElementById('bookmark');
bookmarkBtn.setAttribute('data-bookmarked', state.bookmarked);

// Set Dashboard Metrics
document.getElementById(
	'raised'
).innerText = `$${state.amountRaised.toLocaleString()}`;

document.getElementById(
	'backers'
).innerText = `${state.backers.toLocaleString()}`;

let progressBar = document.getElementById('progress-bar');
progressBar.style.width = `${
	(state.amountRaised / state.amountRequired) * 100
}%`;

// Set Stock Amounts
document.getElementById('bambooStock-main').innerText = state.bambooStock;
document.getElementById('blackStock-main').innerText = state.blackStock;
document.getElementById('mahoganyStock-main').innerText = state.mahoganyStock;

document.getElementById('bambooStock-dialog').innerText = state.bambooStock;
document.getElementById('blackStock-dialog').innerText = state.blackStock;
document.getElementById('mahoganyStock-dialog').innerText = state.mahoganyStock;

// Open and close Modals
let pledgeDialog = document.getElementById('pledge-dialog');
let thanksDialog = document.getElementById('thanks-dialog');

function openPledgeDialog() {
	pledgeDialog.showModal();
	document.body.style = 'overflow-y:hidden; position: relative;';
}

function closePledgeDialog() {
	document.getElementById('pledge-dialog-form').reset();
	pledgeDialog.close();
	document.body.style = 'overflow-y:visible; position: static;';
}

function openThanksDialog() {
	thanksDialog.showModal();
	document.body.style = 'overflow-y:hidden; position: relative;';
}

function closeThanksDialog() {
	thanksDialog.close();
	document.body.style = 'overflow-y:visible; position: static;';
}

function formSubmit(e) {
	e.preventDefault();
	const formData = new FormData(e.target);
	const formProps = Object.fromEntries(formData);

	let pledgeType = formProps['pledge-radio-option'];

	if (pledgeType.length === 0) return;

	let amountKey = `amount[${formProps['pledge-radio-option']}]`;

	// Update amount raised value
	let pledgeAmount = parseInt(formProps[amountKey]);

	state.amountRaised += pledgeAmount;
	document.getElementById(
		'raised'
	).innerText = `$${state.amountRaised.toLocaleString()}`;

	// Update no. backers
	state.backers += 1;
	document.getElementById(
		'backers'
	).innerText = `${state.backers.toLocaleString()}`;

	// Update progress bar
	progressBar.style.width = `${
		(state.amountRaised / state.amountRequired) * 100
	}%`;

	// Update stock values
	updateStock(pledgeType);

	document.getElementById('pledge-dialog-form').reset();
	openThanksDialog();
	closePledgeDialog();
}

function updateStock(pledgeType) {
	if (pledgeType === 'no-reward') return;

	if (pledgeType === 'bamboo') {
		if (state.bambooStock === 0) return;
		if (state.bambooStock === 1) {
			state.bambooStock -= 1;
			document.getElementById('bambooStock-main').innerText = state.bambooStock;
			document.getElementById('bambooStock-dialog').innerText =
				state.bambooStock;

			// Disable option if out of stock
			const elements = document.querySelectorAll(`[data-pledge=${pledgeType}]`);
			elements.forEach((el) => {
				if (el.classList.contains('option')) el.classList.add('out-of-stock');
			});
		} else {
			state.bambooStock -= 1;
			document.getElementById('bambooStock-main').innerText = state.bambooStock;
			document.getElementById('bambooStock-dialog').innerText =
				state.bambooStock;
		}
	}

	if (pledgeType === 'black') {
		if (state.blackStock === 0) return;
		if (state.blackStock === 1) {
			state.blackStock -= 1;
			document.getElementById('blackStock-main').innerText = state.blackStock;
			document.getElementById('blackStock-dialog').innerText = state.blackStock;

			// Disable option if out of stock
			const elements = document.querySelectorAll(`[data-pledge=${pledgeType}]`);
			elements.forEach((el) => {
				if (el.classList.contains('option')) el.classList.add('out-of-stock');
			});
		} else {
			state.blackStock -= 1;
			document.getElementById('blackStock-main').innerText = state.blackStock;
			document.getElementById('blackStock-dialog').innerText = state.blackStock;
		}
	}

	if (pledgeType === 'mahogany') {
		if (state.mahoganyStock === 0) return;
		if (state.mahoganyStock === 1) {
			state.mahoganyStock -= 1;
			document.getElementById('mahoganyStock-main').innerText =
				state.mahoganyStock;
			document.getElementById('mahoganyStock-dialog').innerText =
				state.mahoganyStock;

			// Disable option if out of stock
			const elements = document.querySelectorAll(`[data-pledge=${pledgeType}]`);
			elements.forEach((el) => {
				if (el.classList.contains('option')) el.classList.add('out-of-stock');
			});
		} else {
			state.mahoganyStock -= 1;
			document.getElementById('mahoganyStock-main').innerText =
				state.mahoganyStock;
			document.getElementById('mahoganyStock-dialog').innerText =
				state.mahoganyStock;
		}
	}
}

// Select dialog pledge option

let dialogOption = document.querySelectorAll('.pledge-dialog-option');

dialogOption.forEach((option) => {
	option.addEventListener('click', () => {
		let pledgeType = option.dataset.pledge;
		let radioInput = document.querySelector(
			`input[type='radio'][data-pledge=${pledgeType}]`
		);

		document.querySelectorAll("input[type='number']").forEach((input) => {
			input.removeAttribute('required');
		});

		let numberInput = document.querySelector(
			`input[type='number'][data-pledge=${pledgeType}]`
		);

		numberInput.setAttribute('required', 'true');
		radioInput.checked = true;
	});
});

// Menu

let menuBtn = document.getElementById('mobile-nav-toggle');
let menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
	const visibility = menu.getAttribute('data-visible');

	if (visibility === 'false') {
		menu.setAttribute('data-visible', true);
		menuBtn.setAttribute('aria-expanded', true);
	} else {
		menu.setAttribute('data-visible', false);
		menuBtn.setAttribute('aria-expanded', false);
	}
});

// Bookmark

function bookmark() {
	const bookmarkBtn = document.getElementById('bookmark');
	const bookmarkText = document.querySelector('.bookmark-span');
	const bookmarked = bookmarkBtn.getAttribute('data-bookmarked');

	if (bookmarked === 'false') {
		state.bookmarked = true;
		bookmarkBtn.setAttribute('data-bookmarked', true);
		bookmarkText.innerText = 'Bookmarked';
	} else {
		state.bookmarked = false;
		bookmarkBtn.setAttribute('data-bookmarked', false);
		bookmarkText.innerText = 'Bookmark';
	}
}

const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArray = [];

// Drag Functionality


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
	if (localStorage.getItem('backlogItems')) {
		backlogListArray = JSON.parse(localStorage.backlogItems);
		progressListArray = JSON.parse(localStorage.progressItems);
		completeListArray = JSON.parse(localStorage.completeItems);
		onHoldListArray = JSON.parse(localStorage.onHoldItems);
	} else {
		backlogListArray = ['Release the course', 'Sit back and relax'];
		progressListArray = ['Work on projects', 'Listen to music'];
		completeListArray = ['Being cool', 'Getting stuff done'];
		onHoldListArray = ['Being uncool'];
	}
}

getSavedColumns();
updateSavedColumns();

// Set localStorage Arrays
function updateSavedColumns() {
	listArray = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
	const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];

	arrayNames.forEach((arrayname, index) => {
		localStorage.setItem(`${arrayname}Items`, JSON.stringify(listArray[index]));
	})

}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
	// List Item
	const listEl = document.createElement('li');
	listEl.classList.add('drag-item');
	listEl.textContent = item;
	columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
	// Check localStorage once
	if (!updatedOnLoad) {
		getSavedColumns();
		updatedOnLoad = true;
	}
	// Backlog Column
	backlogList.textContent = '';
	backlogListArray.forEach((backLogItem, index) => {
		createItemEl(backlogList, 0, backLogItem, index);
	})

	// Progress Column
	progressList.textContent = '';
	progressListArray.forEach((progressItem, index) => {
		createItemEl(progressList, 0, progressItem, index);
	})

	// Complete Column
	completeList.textContent = '';
	completeListArray.forEach((completeItem, index) => {
		createItemEl(completeList, 0, completeItem, index);
	})

	// On Hold Column
	onHoldList.textContent = '';
	onHoldListArray.forEach((onHoldItem, index) => {
		createItemEl(onHoldList, 0, onHoldItem, index);
	})

	// Run getSavedColumns only once, Update Local Storage


}

updateDOM();

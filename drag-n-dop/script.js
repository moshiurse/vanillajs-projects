const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
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
let draggedItem;
let dragging = false;
let currentColumn;

// Update Item or delete item
function updateItem(id, column) {
	const selectedArray = listArray[column];
	const selectedColumnEl = listColumns[column].children;
	console.log(selectedArray, selectedColumnEl, selectedColumnEl[id].textContent);
	if(!dragging){
		if(selectedColumnEl[id].textContent === '') {
			delete selectedArray[id];
			selectedArray.length = selectedArray.length - 1;
		}else{
			selectedArray[id] = selectedColumnEl[id].textContent;
		}
	
		updateDOM();
	}
	
}


// Add text to column
function addToColumn(column) {
	const itemtext = addItems[column].textContent;
	const selectedArray = listArray[column];
	selectedArray.push(itemtext);
	addItems[column].textContent = '';
	updateDOM();
}

// Show Input Box
function showInputBox(column) {
	addBtns[column].style.visibility = 'hidden';
	saveItemBtns[column].style.display = 'flex';
	addItemContainers[column].style.display = 'flex';

}

// Hide Input Box
function hideInputBox(column) {
	addBtns[column].style.visibility = 'visible';
	saveItemBtns[column].style.display = 'none';
	addItemContainers[column].style.display = 'none';
	addToColumn(column);
}

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
	if (localStorage.getItem('backlogItems')) {
		backlogListArray = JSON.parse(localStorage.backlogItems);
		progressListArray = JSON.parse(localStorage.progressItems);
		completeListArray = JSON.parse(localStorage.completeItems);
		onHoldListArray = JSON.parse(localStorage.onHoldItems);
	} else {
		backlogListArray = ['Release the course', 'Sit back and relax', 'Hello There'];
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
	listEl.draggable = true;
	listEl.setAttribute('ondragstart', 'drag(event)');
	listEl.contentEditable = true;
	listEl.id = index;
	listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
	columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
	// Check localStorage once
	if (!updatedOnLoad) {
		getSavedColumns();
	}
	console.log('inside DOM', backlogListArray);
	// Backlog Column
	backlogList.textContent = '';
	backlogListArray.forEach((backLogItem, index) => {
		createItemEl(backlogList, 0, backLogItem, index);
	})

	// Progress Column
	progressList.textContent = '';
	progressListArray.forEach((progressItem, index) => {
		createItemEl(progressList, 1, progressItem, index);
	})

	// Complete Column
	completeList.textContent = '';
	completeListArray.forEach((completeItem, index) => {
		createItemEl(completeList, 2, completeItem, index);
	})

	// On Hold Column
	onHoldList.textContent = '';
	onHoldListArray.forEach((onHoldItem, index) => {
		createItemEl(onHoldList, 3, onHoldItem, index);
	})
	// Run getSavedColumns only once, Update Local Storage
	updatedOnLoad = true;
	updateSavedColumns();	

}

function rebuildArrays() {
	let backlogListArray = [];
	let progressListArray = [];
	let completeListArray = [];
	let onHoldListArray = [];

	for (let i = 0; i < backlogList.children.length; i++) {
		backlogListArray.push(backlogList.children[i].textContent);
	}
	for (let i = 0; i < progressList.children.length; i++) {
		progressListArray.push(progressList.children[i].textContent);
	}
	for (let i = 0; i < completeList.children.length; i++) {
		completeListArray.push(completeList.children[i].textContent);
	}
	for (let i = 0; i < onHoldList.children.length; i++) {
		onHoldListArray.push(onHoldList.children[i].textContent);
	}

	console.log('rebuildArrays', backlogListArray);
	updateDOM();
}

function drag(e) {
	draggedItem = e.target;
	dragging = true;
}

// allow drop on any column
function allowDrop(e) {
	e.preventDefault();
}

// drag enter
function dragEnter(column) {
	listColumns[column].classList.add('over');
	currentColumn = column;
}

// drop on column
function drop(e) {
	e.preventDefault();

	listColumns.forEach(column => {
		column.classList.remove('over');
	})

	let parent = listColumns[currentColumn];
	parent.appendChild(draggedItem);
	console.log(parent, currentColumn, backlogList);
	// After dragging complete
	dragging = false;
	rebuildArrays();
}

updateDOM();

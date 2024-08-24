

document.addEventListener('DOMContentLoaded', () => {
    const item = document.querySelectorAll('.item');
    item.forEach((element, index) => {
        console.log(element, index);

        element.querySelector('.item-header').addEventListener('click', (event) => onClickQuestion(event, element))
    })
})

function onClickQuestion(e, element) {
    element.classList.toggle('active');
}

function prepareAccordion() {
    let html = ``
    data.map(d => {
        html += `<div class="item">
        <div class="item-header">
            <h3 class="item-title">${d.qeustion}</h3>
            <span class="toggle-icon"><i class="fa-solid fa-truck-fast"></i></span>
        </div>
            <div class="item-content">${d.answer}</div>
        </div>`
    })

    const container = document.querySelector('.accordion-container');
    container.innerHTML = html
}
prepareAccordion()
console.log('App is working', data);
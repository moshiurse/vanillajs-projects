const data = [
    {
        title: 'hello',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
    },
    {
        title: 'hello2',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
    },
    {
        title: 'hello3',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
    }
]

function prepareAccordion() {
    let html = ``
    data.map(d => {
        html += `<div class="item active">
        <div class="item-header">
            <h3 class="item-title">${d.title}</h3>
            <span class="toggle-icon">+</span>
        </div>
            <div class="item-content">${d.desc}</div>
        </div>`
    })

    const container = document.querySelector('.accordion-container');
    container.innerHTML = html
}
prepareAccordion()
console.log('App is working', data);
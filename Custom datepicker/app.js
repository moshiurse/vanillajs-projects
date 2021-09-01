

window.addEventListener('DOMContentLoaded', (event) => {

    const weekArray = ['SU', 'MO',,'TU','WE','TH','FR','SA'];
    const datepicker = document.getElementsByClassName('datepicker');
    console.log(datepicker.length);
    for (var index = 0; index < datepicker.length; index++) {
        let element = datepicker[index];
        element.addEventListener("click", onFocusDatePicker);
    }

    let weekhtml = '';
    weekArray.map(day => {
        weekhtml += `<span>${day}</span>`;
    })
    const weekName = document.getElementsByClassName('week-list');
    // weekName[0].append(weekhtml);
});

function onFocusDatePicker(e) {
    console.log(e);
}
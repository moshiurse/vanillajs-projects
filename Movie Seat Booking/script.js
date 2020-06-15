const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// save selected movie index & price
function saveMovieData(movieIdx, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIdx);
    localStorage.setItem('selectedMoviePrice', moviePrice);
    console.log('222')
}

// updated seat selected count & total
    function selectedSeatCount() {
        const selectedSeat = document.querySelectorAll('.row .seat.selected');

        const seatIndex = [...selectedSeat].map(seat => [...seats].indexOf(seat));
        localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

        const countSelectedSeat = selectedSeat.length;
        count.innerText = countSelectedSeat;
        total.innerText = countSelectedSeat * ticketPrice;
    }

    // Get Data from localstorage
    function populateUI() {
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        if(selectedSeats !== null && selectedSeats.length > 0){
            seats.forEach((seat, index) => {
                if(selectedSeats.indexOf(index) > -1){
                    seat.classList.add("selected");
                }
            });
        }

        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
        if(selectedMovieIndex !== null){
            movieSelect.selectedIndex = selectedMovieIndex;
        }
    }

    // movie select event listener for change
    movieSelect.addEventListener('change', (e) => {
        ticketPrice = +e.target.value;
        saveMovieData(e.target.selectedIndex, e.target.value);
        selectedSeatCount();
    })

    // seat click lstener
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        selectedSeatCount();
    }
})

// init the selected count
selectedSeatCount();
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.seat');
const orderText = document.querySelector('.order-text');
const moviesDropdown = document.querySelector('.movies__menu');

const movies = document.querySelectorAll('.movies__menu__item');
let selectedSeats = 0;
let finalPrice = 0;
let price = parseInt(movies[moviesDropdown.selectedIndex].dataset.price);
moviesDropdown.addEventListener('change', function () {
    for (let movie of movies) {
        if (movie.value === moviesDropdown.value) {
            price = parseInt(movie.dataset.price);
            finalPrice = selectedSeats * price;
            orderText.innerHTML = `You have selected <span>${selectedSeats}</span> seats for a price of <span>$${finalPrice}</span>`
        }
    }
})


for (let seat of seats) {

    seat.addEventListener('click', function () {
        if (!seat.classList.contains('selected')) {
            seat.classList.add('selected');
            selectedSeats++;
            finalPrice += price;
        } else {
            seat.classList.remove('selected');
            selectedSeats--;
            finalPrice -= price;
        }
        orderText.innerHTML = `You have selected <span>${selectedSeats}</span> seats for a price of <span>$${finalPrice}</span>`

    });
}
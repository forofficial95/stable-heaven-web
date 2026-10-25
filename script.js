
const bookingForm = document.getElementById("booking-form");
const bookingMessage = document.getElementById("booking-message");
const dateInput = document.getElementById("date");

// Set the minimum booking date to today.
const today = new Date();
const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

dateInput.min = localToday;

// Display the current year in the footer.
document.getElementById("year").textContent =
    new Date().getFullYear();

// Handle the booking form.
bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const lesson = document.getElementById("lesson").value;
    const date = dateInput.value;

    // Check that the date is not in the past.
    if (date < localToday) {
        bookingMessage.textContent =
            "Please select today or a future date.";
        return;
    }

    const booking = {
        name: name,
        email: email,
        lesson: lesson,
        date: date,
        requestedAt: new Date().toISOString()
    };

    // Read existing demo bookings.
    let bookings = [];

    try {
        bookings = JSON.parse(
            localStorage.getItem("stableHavenBookings") || "[]"
        );

        if (!Array.isArray(bookings)) {
            bookings = [];
        }
    } catch {
        bookings = [];
    }

    bookings.push(booking);

    // Save the new booking in the browser.
    try {
        localStorage.setItem(
            "stableHavenBookings",
            JSON.stringify(bookings)
        );

        bookingMessage.textContent =
            "Thank you, " + name + "! Your request for " +
            lesson + " on " + date +
            " has been saved. Please contact the stable to confirm availability.";

        bookingForm.reset();
    } catch {
        bookingMessage.textContent =
            "Your form was completed, but the request could not be saved. Please try again.";
    }

    // Keep the date restriction after resetting the form.
    dateInput.min = localToday;
});

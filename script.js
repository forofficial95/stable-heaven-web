
document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");
    const dateInput = document.getElementById("date");
    const bookingMessage = document.getElementById("booking-message");
    const yearElement = document.getElementById("year");

    // Display the current year in the footer.
    yearElement.textContent = new Date().getFullYear();

    // Use the user's local date rather than UTC.
    const today = new Date();
    const localDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = localDate;

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!bookingForm.reportValidity()) {
            return;
        }

        if (dateInput.value < localDate) {
            bookingMessage.textContent =
                "Please select today or a future date.";
            dateInput.focus();
            return;
        }

        const formData = new FormData(bookingForm);
        const name = formData.get("name").trim();

        bookingMessage.textContent =
            `Thank you, ${name}! Your lesson request has been prepared. ` +
            "Please contact the stable to confirm your booking.";

        bookingForm.reset();
        dateInput.min = localDate;
    });
});

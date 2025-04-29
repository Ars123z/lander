
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('ambassador-form');
    const submitButton = form.querySelector('.submit-button');

    function checkFormFields() {
        const inputs = form.querySelectorAll('input[required], select[required]');
        let allFilled = true;
        
        inputs.forEach(function(input) {
            if (!input.value.trim()) {
                allFilled = false;
            }
        });

        submitButton.disabled = !allFilled;
    }

    form.addEventListener('input', checkFormFields); // Check on every input
    checkFormFields(); // Initial check on page load
});

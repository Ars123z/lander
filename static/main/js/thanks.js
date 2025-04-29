document.addEventListener('DOMContentLoaded', function () {
    const formWrapper = document.getElementById('form-wrapper');
    const thankYouWrapper = document.getElementById('thank-you-wrapper');
    const registerModal = document.getElementById('registerModal');
    const submitButton = document.getElementById('submit-button');


    document.getElementById('ambassador-form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const formData = new FormData(this);
        const submitButton = document.getElementById('submit-button');
    
        submitButton.disabled = true; // optional: disable the button
        submitButton.innerText = 'Submitting...';
    
        setTimeout(() => {
            fetch("/", {
                method: "POST",
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': '{{ csrf_token }}'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    formWrapper.style.display = 'none';
                    thankYouWrapper.style.display = 'block';
                } else {
                    alert('Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`An error occurred. Please try again. ${error}`);
            });
        }, 50); // small delay to allow UI update
    });    
});
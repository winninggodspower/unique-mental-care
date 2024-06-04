let form = document.querySelector('form');
let errorElement = document.getElementById('errorElement');

document.querySelector('form').addEventListener('submit', async (event) => {
    errorElement.innerText = '';
    event.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
        });

        if (response.redirected) {
            window.location.assign(response.url);
        }
        else if (!response.ok) {
            const errorMessage = await response.text();
            errorElement.innerText = errorMessage;
        }
    } catch (error) {
        errorElement.innerText = "An error occurred. Please try again.";
    }
})
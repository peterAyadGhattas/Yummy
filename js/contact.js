///<reference types="../@types/jquery"/>

$('.bex').on('click', function () {
    $('.sidebar').animate({ width: 'toggle', paddingInline: 'toggle' }, 600);
    $('.bex').toggleClass('fa-times');
});

$(function () {
    $('.loader').fadeOut(1000, function () {
        $('.loading').fadeOut(1000);
        $('body').css('overflow', 'auto');
    });
});






const rowData = document.getElementById('rowData');
const fields = ['name', 'email', 'phone', 'age', 'password', 'repassword'];
let inputTouched = {};

// Show contact form
function showContacts() {
    rowData.innerHTML = `
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 text-center">
                <div class="row g-4">
                    ${fields.map(field => `
                        <div class="col-md-6">
                            <input id="${field}Input" onkeyup="validateField('${field}')" type="${field === 'age' ? 'number' : 'text'}" class="form-control" placeholder="Enter Your ${capitalizeFirstLetter(field)}">
                            <div id="${field}Alert" class="alert alert-danger w-100 mt-2 d-none"></div>
                        </div>`).join('')}
                </div>
                <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
            </div>
        </div>`;

    fields.forEach(field => {
        document.getElementById(`${field}Input`).addEventListener("focus", () => {
            inputTouched[field] = true;
        });
    });
}

// Validate a specific field
function validateField(field) {
    const isValid = validationFunctions[field]();
    document.getElementById(`${field}Alert`).classList.toggle("d-block", !isValid);
    document.getElementById(`${field}Alert`).classList.toggle("d-none", isValid);
    checkSubmitButtonState();
}

// Check if all fields are valid for enabling the submit button
function checkSubmitButtonState() {
    const allValid = fields.every(field => validationFunctions[field]());
    document.getElementById("submitBtn").disabled = !allValid;
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Validation functions
const validationFunctions = {
    name: () => /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value),
    email: () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("emailInput").value),
    phone: () => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value),
    age: () => /^(0?[1-9]|[1-9][0-9]|1[01][0-9]|200)$/.test(document.getElementById("ageInput").value),
    password: () => /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value),
    repassword: () => document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value
};

// Call showContacts on page load
showContacts();


document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    if (!form) return;

    // Gmail Configuration
    const gmail = "habibur630@gmail@gmail.com";

    form.action = "https://formsubmit.co/" + gmail;
    form.method = "POST";
    form.enctype = "multipart/form-data";

    // Email Subject
    const subject = document.createElement("input");
    subject.type = "hidden";
    subject.name = "_subject";
    subject.value = "New School Admission Application";

    form.appendChild(subject);

    // Form Submission
    form.addEventListener("submit", function (event) {

        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
            return;
        }

        const confirmation = confirm(
            "Are you sure you want to submit the admission form?"
        );

        if (!confirmation) {
            event.preventDefault();
        }

    });

});

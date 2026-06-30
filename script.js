// script.js

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-visible');
            }
        });
    });

    document.querySelectorAll('.slide-in').forEach(section => {
        observer.observe(section);
    });
});

function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImage.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

// Close the modal when the close button is clicked
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

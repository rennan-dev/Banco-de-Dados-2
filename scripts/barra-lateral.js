document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector(".toggle");

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    });

    // Mova a declaração da variável searchBtn para dentro deste escopo
    const searchBtn = document.querySelector(".search-box");

    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && event.target !== toggle && event.target !== searchBtn) {
            sidebar.classList.add("close");
        }
    });
});

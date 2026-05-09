// Fungsi interaktif sederhana
function addToCart(itemName) {
    alert(itemName + " telah ditambahkan ke pesanan Anda!");
}

// Efek scroll navbar
window.addEventListener("scroll", function() {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
    } else {
        nav.style.boxShadow = "none";
    }
});
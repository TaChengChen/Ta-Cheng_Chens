document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuButton || !navMenu) {
        console.error("❌ 無法找到 menu-button 或 nav-menu，請檢查 HTML 結構！");
        return;
    }

    function updateMenuState() {
        if (window.innerWidth > 768) {
            navMenu.style.maxHeight = "none"; // 在大於 768px 時保持展開
        } else {
            navMenu.style.maxHeight = navMenu.scrollHeight + "px"; // 在 768px 以下時預設打開
        }
    }

    // 監聽視窗大小變化
    window.addEventListener("resize", updateMenuState);
    updateMenuState(); // 初始加載時設定

    let lastScrollY = window.scrollY;

    // 滾動時自動收起選單（僅在 768px 以下觸發）
    window.addEventListener("scroll", function () {
        if (window.innerWidth <= 768) {
            let currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                navMenu.style.maxHeight = "0px";
            }
            lastScrollY = currentScrollY;
        }
    });

    // 點擊按鈕時手動展開/收起選單（僅在 768px 以下觸發）
    menuButton.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
            if (navMenu.style.maxHeight === "0px" || navMenu.style.maxHeight === "") {
                navMenu.style.maxHeight = navMenu.scrollHeight + "px";
            } else {
                navMenu.style.maxHeight = "0px";
            }
        }
    });

    // 確保動畫結束後清除 maxHeight 避免影響未來行為
    navMenu.addEventListener("transitionend", function () {
        if (navMenu.style.maxHeight === "0px") {
            navMenu.style.maxHeight = "";
        }
    });
});

// chnage backGround-color of navbar while scrolling
const aboutTopPosition = $("#about").offset().top;

$(window).on("scroll",function () {
    if ($(window).scrollTop() > aboutTopPosition) {
        $("#navbar-example").addClass("nav-fixed");
        $(".scroll-to-top").fadeIn(200);
    } else {
        $("#navbar-example").removeClass("nav-fixed");
        $(".scroll-to-top").fadeOut(200);
    }
});

// scroll to top button
$(".scroll-to-top").on("click", function () {
    $("html, body").animate({
        scrollTop: 0
    }, 800);
});

//dark button
const dark_mode_btn = document.querySelector(".dark-mode");
const icon = dark_mode_btn.querySelector("i");
dark_mode_btn.addEventListener("click", function () {
    if(document.documentElement.getAttribute("data-bs-theme") == 'light') {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.querySelector(".navbar-brand").classList.replace("text-black","text-light");
        document.querySelector("#navbar-example").classList.add("bg-dark");
        document.querySelector("#navbar-example").classList.add("text-light");
        icon.classList.replace("fa-moon", "fa-sun"); // replace icon to sun in light-mode 
    } else {
        document.documentElement.setAttribute("data-bs-theme", "light");
        document.querySelector(".navbar-brand").classList.remove("text-light");
        document.querySelector("#navbar-example").classList.remove("bg-dark");
        document.querySelector("#navbar-example").classList.remove("text-light");
        icon.classList.replace("fa-sun", "fa-moon"); // replace icon to moon in the dark-mode
    }
})

// smooth scroll
$(".nav-link").on("click", function (event) {
    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $("html, body").animate({
            scrollTop: $(hash).offset().top
        }, 1000);
    }
});

// Window Loading
$(".loading").fadeOut(3000, function(){
    $("body").css({overflow: "auto"});
});


// go to any section in a page
$(".navbar-nav a").on("click", function () {
    const targetSection = $(this).attr("href");
    const blogSectionOffset = $(targetSection).offset().top;
    $("html, body").animate({
        scrollTop: blogSectionOffset
    }, 2000);
});


// ColorBox
let isOpen = false;
const colorBoxWidth = $(".settings").outerWidth();

  // Click handler for gear icon
$(".gear-icon").on("click", function(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    
    if (isOpen) {
      // Open the panel
      $(".settings").addClass("open").animate({ left: "0" }, 1000);
      // Change to X icon
      $(".gear-icon i").removeClass("fa-gear fa-spin").addClass("fa-xmark");
    } else {
      // Close the panel
      $(".settings").animate({ left: `-${colorBoxWidth}px` }, 500, function() {
        $(this).removeClass("open");
      });
      // Change back to spinning gear icon
      $(".gear-icon i").removeClass("fa-xmark").addClass("fa-gear fa-spin");
    }
});
// CHANGE COLOR IN THE PANEL (PAGE) 
$(".colors li").on("click", function() {
    const currentColor = $(this).css("backgroundColor");
    // console.log(currentColor);
    $("h1, h2, h3, h4, h5, h6, .text-main").css({color: currentColor});
    $(":root").css({ "--main-color": currentColor });
})
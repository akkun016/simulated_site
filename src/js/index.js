$(function(){
  $('.slider')
  .on("init", function (event, slick) {
    $(".current-count").text(slick.currentSlide + 1);
    $(".total-count").text(slick.slideCount);
  })
  .slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 2000,
    fade: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    prevArrow: '<button class="slide-arrow prev-arrow"><span class="before-line"><span></span></span><span class="after-line"><span></span></span></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><span class="before-line"><span></span></span><span class="after-line"><span></span></span></button>',
  })
  .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    $(".prev-btn > span").addClass("rotateOn");
    $(".current-count").on("animationend", function(){
      $(".prev-btn > span").removeClass("rotateOn");
    })
    setTimeout(function(){
      $(".current-count").text(nextSlide + 1);
    }, 500);
  })
  .on('afterChange', function(event, slick, currentSlide) {
    $('.slider').find("img").removeClass('animated-image');
    $('.slick-current').addClass('animated-image');
  });

  $('.prev-btn').on('click', function() {
    $('.slider').slick('slickPrev');
  });
  $('.next-btn').on('click', function() {
    $('.slider').slick('slickNext');
  });
  $(".slide-arrow").on("mouseover", function(){
    $(this).addClass("active");
    $(this).on("animationend", function(){
      $(this).removeClass("active");
    });
  });



  const selfIntroduction = $("#self-introduction");
  const adoption = $("#adoption");

  const NewsBoxInterval = setInterval(function(){
    selfIntroduction.fadeToggle(2000);
    adoption.fadeToggle(2000);
  },5000);

  const newsBox = $(".news-box");
  const crossMark = $(".news-box__cross-mark");
  const crossMarkCover = $(".mark-cover");

  crossMark.on("click", function(){
    newsBox.css("animation", "slideDown .5s ease-in-out both");
    clearInterval(NewsBoxInterval);
  });
  newsBox.hover(
    function(){
      crossMarkCover.css("animation", "coverIn .5s ease-in-out");
    },
    function(){
      crossMarkCover.on("animationend", function(){
        crossMarkCover.css("animation", "");
      })
    }
  );



  $(".vertical-line").on("mouseover", function(){
    $(this).addClass("active");
    $(this).on("animationend", function(){
      $(this).removeClass("active");
    });
  });
  $(".vertical-line--one-line").on("mouseover", function(){
    $(this).addClass("active");
    $(this).prev().addClass("right-side-only");
    $(this).on("animationend", function(){
      $(this).removeClass("active");
      $(this).prev().removeClass("right-side-only");
    });
  });
  $(".line-text").on("mouseover", function(){
    $(this).addClass("active");
    $(this).on("animationend", function(){
      $(this).removeClass("active");
    });
  });



  $(".zoom-image").hover(
    function(){
      $(this).find('img').addClass("shrink");
    },
    function(){
      $(this).find('img').removeClass("shrink");
    }
  );



  const diagonaStartLine = $(".hamburger-btn > div > div > span:first-child");
  const diagonaEndLine = $(".hamburger-btn > div > div > span:last-child");
  const firstStartLine = $(".hamburger-btn > div:first-child > span:first-child");
  const firstEndLine = $(".hamburger-btn > div:first-child > span:last-child");
  const nextStartLine = $(".hamburger-btn > div:nth-child(2) > span:first-child");
  const nextEndLine = $(".hamburger-btn > div:nth-child(2) > span:last-child");

  diagonaEndLine.on("animationend", function(){
    if (firstEndLine.css("animation-name") === "circleEnd") {
      setTimeout(function(){
        firstStartLine.css("animation", "disappearingActionStart .4s linear 0s both");
        firstEndLine.css("animation", "disappearingActionEnd .4s linear 0s both");
        nextStartLine.css("animation", "disappearingActionStart .4s linear 0s both");
        nextEndLine.css("animation", "disappearingActionEnd .4s linear 0s both");
        diagonaStartLine.css("animation", "disappearingActionStart .4s linear 0s both");
        diagonaEndLine.css("animation", "disappearingActionEnd .4s linear 0s both");
      },200);
    } else if (firstEndLine.css("animation-name") === "disappearingActionEnd") {
      setTimeout(function(){
        firstStartLine.css("animation", "circleStart .4s ease-in 0s both");
        firstEndLine.css("animation", "circleEnd .4s ease-out 0s both");
        nextStartLine.css("animation", "circleStart .4s ease-in .6s both");
        nextEndLine.css("animation", "circleEnd .4s ease-out .6s both");
        diagonaStartLine.css("animation", "circleStart .4s ease-in 1.2s both");
        diagonaEndLine.css("animation", "circleEnd .4s ease-out 1.2s both");
      },600);
    };
  });


  const closeCover = $(".close-mark-cover");
  const menuInner = $(".menu-page__inner");
  const numbersFirst = $(".numbers > span > span:nth-child(1)");
  const numbersLast = $(".numbers > span > span:nth-child(2)");
  $(".hamburger-btn").on("click", function(){
    $(".menu-page").fadeIn(500);
    setTimeout(function(){
      closeCover.css({"transform-origin":"bottom","transform":"scaleY(0)"});
      menuInner.css("opacity", "1");
      numbersFirst.css("animation", "halfRotateStart .5s ease-in backwards");
      numbersLast.css("animation", "halfRotateStart .5s ease-in .1s backwards");
      $(".numbers > span > span").on("animationend", function(){
        $(this).css("animation","");
      });
    },400);
  })
  $(".menu-page__close").on("click", function(){
    closeCover.css({"transform-origin":"top","transform":"scaleY(1)"});
    menuInner.css("opacity", "0");
    numbersFirst.css("animation", "halfRotateEnd .5s ease-out");
    numbersLast.css("animation", "halfRotateEnd .5s ease-out .1s");
    setTimeout(function(){
      $(".menu-page").fadeOut(500);
    },600);
  })



  let beforePos = 0;
  function ScrollAnime() {
    const elemTop = $('.theme').offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    const pageHeight = $(document).height();
    const scrollItems = $(".scroll-items");
    const header = $('#header');
    const numberCount = $('.number-count');
    const logo = $('.logo');
    const backYellowCover = $(".back-cover");


    scrollItems.each(function () {
      const targetSectionTop = $(this).offset().top;
      const targetSectionBottom = targetSectionTop + $(this).height();
      if (scroll > targetSectionTop - windowHeight + 100 && targetSectionBottom - 300 > scroll) {
        $(this).addClass("fadein");
      }
    });

    if (pageHeight - 100 < windowHeight + scroll) {
      backYellowCover.css("animation","backCoverUpAction .5s linear forwards");
    } else {
      backYellowCover.css("animation","backCoverDownAction .5s linear forwards");
    };

    if (scroll > elemTop && 0 > scroll - beforePos) {
      header.removeClass('close-move');
      header.addClass('open-move');
    } else if (scroll === 0) {
      setTimeout(function(){
        header.removeClass('close-move');
        header.addClass('open-move');
        numberCount.removeClass('hidden');
        numberCount.addClass('visible');
        logo.removeClass('visible');
        logo.addClass('hidden');
      },700);
    } else {
      header.removeClass('open-move');
      header.addClass('close-move');
      setTimeout(function(){
        numberCount.removeClass('visible');
        numberCount.addClass('hidden');
        logo.removeClass('hidden');
        logo.addClass('visible');
      },700);
    }
    beforePos = scroll;
  }

  $(window).scroll(function () {
    ScrollAnime();
  });
  $(window).on('load', function () {
    ScrollAnime();
  });
})
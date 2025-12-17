// Dean Attali / Beautiful Jekyll 2023

let BeautifulJekyllJS = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    setTimeout(BeautifulJekyllJS.initNavbar, 10);

    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
        } else {
            $(".navbar").removeClass("top-nav-short");
        }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // show the big header image
    BeautifulJekyllJS.initImgs();

    BeautifulJekyllJS.initSearch();
  },

  initNavbar : function() {
    // Set the navbar-dark/light class based on its background color
    const rgb = $('.navbar').css("background-color").replace(/[^\d,]/g,'').split(",");
    const brightness = Math.round(( // http://www.w3.org/TR/AERT#color-contrast
      parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114
    ) / 1000);
    if (brightness <= 125) {
      $(".navbar").removeClass("navbar-light").addClass("navbar-dark");
    } else {
      $(".navbar").removeClass("navbar-dark").addClass("navbar-light");
    }
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
      BeautifulJekyllJS.numImgs = BeautifulJekyllJS.bigImgEl.attr("data-num-img");

      // 2fc73a3a967e97599c9763d05e564189
      // set an initial image
      const imgInfo = BeautifulJekyllJS.getImgInfo();
      const src = imgInfo.src;
      const desc = imgInfo.desc;
      BeautifulJekyllJS.setImg(src, desc);

      // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      const getNextImg = function() {
        const imgInfo = BeautifulJekyllJS.getImgInfo();
        const src = imgInfo.src;
        const desc = imgInfo.desc;

        const prefetchImg = new Image();
        prefetchImg.src = src;
        // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

        setTimeout(function(){
          const img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
          $(".intro-header.big-img").prepend(img);
          setTimeout(function(){ img.css("opacity", "1"); }, 50);

          // after the animation of fading in the new image is done, prefetch the next one
          //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          setTimeout(function() {
            BeautifulJekyllJS.setImg(src, desc);
            img.remove();
            getNextImg();
          }, 1000);
          //});
        }, 6000);
      };

      // If there are multiple images, cycle through them
      if (BeautifulJekyllJS.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo : function() {
    const randNum = Math.floor((Math.random() * BeautifulJekyllJS.numImgs) + 1);
    const src = BeautifulJekyllJS.bigImgEl.attr("data-img-src-" + randNum);
    const desc = BeautifulJekyllJS.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  },

  initSearch : function() {
    if (!document.getElementById("beautifuljekyll-search-overlay")) {
      return;
    }

    $("#nav-search-link").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").show();
      $("#nav-search-input").focus().select();
      $("body").addClass("overflow-hidden");
    });
    $("#nav-search-exit").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").hide();
      $("body").removeClass("overflow-hidden");
    });
    $(document).on('keyup', function(e) {
      if (e.key == "Escape") {
        $("#beautifuljekyll-search-overlay").hide();
        $("body").removeClass("overflow-hidden");
      }
    });
  }
};

// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', BeautifulJekyllJS.init);

var demoButtons;

/* =========================
   UI / CARD LOGIC (UNCHANGED)
========================= */

function start () {

  demoButtons = document.querySelectorAll('.js-modify');
  for (var i = 0; i < demoButtons.length; i++) {
    demoButtons[i].addEventListener('click', toggleEffect);
  }

  var saveButtons = document.querySelectorAll('.js-save');
  for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener('click', toggleActive);
  }
}

function toggleEffect () {
  var target = document.querySelector(this.dataset.target);
  target.dataset.effect = this.dataset.effect;

  for (var i = 0; i < demoButtons.length; i++) {
    demoButtons[i].classList.remove('active');
  }

  toggleActive.call(this);
}

function toggleActive () {
  this.classList.toggle('active');
}

window.addEventListener('load', start);

/* =========================
   HERO + CAPSULE AUDIO LOGIC
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const heroAudio    = document.getElementById("heroAudio");
  const heroSection  = document.getElementById("hero");

  const capsuleAudio = document.getElementById("capsuleAudio");
  const capsule      = document.getElementById("capsule");

  let unlocked = false;

  /* ---- UNLOCK AUDIO ON FIRST USER INTERACTION ---- */
  const unlockAudio = () => {
    if (unlocked) return;

    const promises = [];

    if (heroAudio) {
      heroAudio.volume = 1;
      promises.push(heroAudio.play().catch(() => {}));
    }

    if (capsuleAudio) {
      capsuleAudio.volume = 1;
      promises.push(capsuleAudio.play().catch(() => {}));
    }

    Promise.all(promises).then(() => {
      unlocked = true;
      console.log("Audio unlocked");
    });
  };

  ["click", "wheel", "keydown", "touchstart"].forEach(evt => {
    document.addEventListener(evt, unlockAudio, { once: true });
  });

  /* ---- HERO VISIBILITY ---- */
  if (heroAudio && heroSection) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!unlocked) return;

        if (entry.isIntersecting) {
          heroAudio.play();
        } else {
          heroAudio.pause();
          heroAudio.currentTime = 0;
        }
      },
      { threshold: 0.3 }
    );

    heroObserver.observe(heroSection);
  }

  /* ---- CAPSULE VISIBILITY ---- */
  if (capsuleAudio && capsule) {
    const capsuleObserver = new IntersectionObserver(
      ([entry]) => {
        if (!unlocked) return;

        if (entry.isIntersecting) {
          capsuleAudio.play();
        } else {
          capsuleAudio.pause();
          capsuleAudio.currentTime = 0;
        }
      },
      { threshold: 0.6 }
    );

    capsuleObserver.observe(capsule);
  }

});

document.addEventListener("DOMContentLoaded", () => {

  const video  = document.getElementById("capsuleVideo");
  const audio  = document.getElementById("capsuleAudio");
  const capsule = document.getElementById("capsule");

  if (!video || !audio || !capsule) return;

  let audioUnlocked = false;

  /* ---------------------------
     UNLOCK AUDIO (user gesture)
  --------------------------- */
  const unlockAudio = () => {
    if (audioUnlocked) return;

    audio.muted = false;
    audio.volume = 1;

    // 🔑 FORCE SYNC AT UNLOCK
    audio.currentTime = video.currentTime;

    audio.play().then(() => {
      audioUnlocked = true;
      console.log("Audio unlocked & synced");
    }).catch(err => {
      console.warn("Autoplay blocked:", err);
    });
  };

  ["click", "wheel", "keydown", "touchstart"].forEach(evt => {
    document.addEventListener(evt, unlockAudio, { once: true });
  });

  /* ---------------------------
     KEEP AUDIO SYNCED
  --------------------------- */
  const syncAudio = () => {
    if (!audioUnlocked) return;

    // resync if drift > 50ms
    if (Math.abs(audio.currentTime - video.currentTime) > 0.05) {
      audio.currentTime = video.currentTime;
    }
  };

  video.addEventListener("play", syncAudio);
  video.addEventListener("seeking", syncAudio);
  video.addEventListener("timeupdate", syncAudio);

  /* ---------------------------
     VISIBILITY CONTROL
  --------------------------- */
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!audioUnlocked) return;

      if (entry.isIntersecting) {
        // 🔁 Always re-sync on re-entry
        audio.currentTime = video.currentTime;
        audio.play();
      } else {
        audio.pause();
      }
    },
    { threshold: 0.6 }
  );

  observer.observe(capsule);

});

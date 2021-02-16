
function Portfolio() {
  this.selectors = {
    scrollIndicator: $('.scroll-type1'),
    scrollHint: $('.scroll__hint--left'),
    offCanvas: $('.offcanvas__wrap'),
    inputEmail: $('.input__email'),
    btnContact: $('.btn__contact'),
    dropdown: $('.nav__dropdown'),
    inputName: $('.input__name'),
    btnCircle: $('.btn__circle'),
    buttonMenu: $('.btn__menu'),
    btnAbout: $('.btn__about'),
    navList: $('.nav__list'),
    btnSend: $('.btn__send'),
    sections: $('.section'),
    header: $('.header'),
    footer: $('.footer'),
    active: $('#about'),
    form: $('.form'),
    html: $('html'),
  }
}

/**
 * Store event listeners
 */
Portfolio.prototype.addClickEventListeners = function () {
  this.selectors.buttonMenu.on('click', (e) => {
    e.preventDefault();
    this.selectors.navList.toggleClass('opacity');
  });

  this.selectors.btnCircle.on('click', (e) => {
    e.preventDefault();
    this.closeContactFormHandler();
  });

  this.selectors.btnContact.on('click', (e) => {
    e.preventDefault();
    if ($(window).scrollTop() < 50) {
      this.openContactFormHandler();
    } else {
      this.selectors.html.animate({ scrollTop: 0 }, "slow", () => {
        this.openContactFormHandler();
      });
    }
  });

  this.selectors.buttonMenu.on('click', (e) => {
    e.preventDefault();
    this.selectors.dropdown.hide().fadeIn(200);
  })
}

/**
 * Adds all necessary classes when modal closes
 */
Portfolio.prototype.openContactFormHandler = function () {
  this.selectors.footer.addClass('offcanvas__visible');
  this.selectors.offCanvas.addClass('offcanvas__wrap--right');
  this.selectors.buttonMenu.addClass('hide');
  this.selectors.header.addClass('flex--start');
  this.selectors.scrollIndicator.addClass('scroll-type1--left');
}

/**
 * Removes all necessary classes when closing contact form
 */
Portfolio.prototype.closeContactFormHandler = function () {
  this.selectors.offCanvas.removeClass('offcanvas__wrap--right');
  this.selectors.footer.removeClass('offcanvas__visible');
  this.selectors.buttonMenu.removeClass('hide');
  this.selectors.header.removeClass('flex--start');
  this.selectors.scrollIndicator.removeClass('scroll-type1--left');

  // Hide successful message
  $('.form__success').hide();
}

/**
 * Handles page navigation
 */
Portfolio.prototype.handleButtonAbout = function () {
  this.selectors.btnAbout.on('click', () => {
    this.selectors.scrollHint.text(this.selectors.active.data('letter'));
    if (this.selectors.active.length > 0) {
      this.selectors.html.animate({
        scrollTop: this.selectors.active.offset().top,
      },
        'slow',
        () => {
          this.selectors.active = this.selectors.active.next();
        })
    } else {
      this.selectors.html.animate({
        scrollTop: 0,
      }, "fast", () => {
        this.selectors.active = $('#about');
        this.selectors.scrollHint.text('About');
      })
    }
  })
}

Portfolio.prototype.closeOnScroll = function () {
  $(window).on('scroll', () => {
    const scroll = $(window).scrollTop();
    const footerHasClass = this.selectors.footer.hasClass('offcanvas__visible');
    if (scroll >= 100 && footerHasClass) {
      this.closeContactFormHandler();
    }
  })
}

Portfolio.prototype.submitForm = function () {
  this.selectors.form.on('submit', (e) => {
    e.preventDefault();
    const form = this.selectors.form;
    $.post(form.attr("action"), form.serialize()).then(function () {
      form.trigger("reset");
      $('.form__success').fadeIn(500);
    });
  })
}

Portfolio.prototype.animateCross = function () {
  this.selectors.buttonMenu.on('click', function (e) {
    e.preventDefault();;
    $(this).toggleClass('nav-close');
  })
}

// Add debounce function to avoid triggering event multiple times on scroll
// Portfolio.prototype.showHeight = function () {
//   $(window).on('scroll', _.debounce(() => this.checkSection(), 20));
// }

// Portfolio.prototype.checkSection = function () {
//   const sections = this.selectors.sections;
//   sections.each(function(section) {
//     // Hals way through the section
//     const slideInAt = (window.scrollY + window.innerHeight) - $(this).height() / 2;
//     //Bottom of the section
//     const sectionBottom = $(this).offset().top + $(this).height();
//     const isHalfShown = slideInAt > section.offset().top;
//     const isNotScrolledPast = window.scrollY < sectionBottom;
//     if(isHalfShown && isNotScrolledPast){

//     }
//   })
// }

Portfolio.prototype.particles = function () {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          value_area: 2000
        }
      },
      color: {
        value: ["#2b3c51", "#00A496", "#FF2000", "#FFCF00"]
      },
      shape: {
        type: ["circle"],
        stroke: {
          width: 0,
          color: "#fff"
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "https://cdn.freebiesupply.com/logos/large/2x/slack-logo-icon.png",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 10,
          size_min: 10,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#808080",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 5,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
}


Portfolio.prototype.init = function () {
  this.addClickEventListeners();
  this.handleButtonAbout();
  this.closeOnScroll();
  this.animateCross();
  // this.showHeight();
  this.submitForm();
  this.particles();
  AOS.init();
}


const portfolio = new Portfolio();

$(function () {
  portfolio.init();
});
// Variables
const $toggleSub = $('.js-toggle-sub');
const $toggleMenu = $('.js-toggle-menu');
const $scrollTo = $('.js-scroll-to');

// Functions
const toggleSub = function(e) {
  e.preventDefault();
  const $this = $(this);
  const $parent = $this.closest('li');

  $parent.toggleClass('is-open-sub');
};

const toggleMenu = function(e) {
  e.preventDefault();
  const $this = $(this);
  const $parent = $('html');

  $parent.toggleClass('is-open-menu');
};

const scrollToElement = function(event) {
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();

      $('html, body').animate(
        {
          scrollTop:
            target.offset().top - $('.container-sticky').innerHeight() - 50
        },
        1000,
        function() {}
      );
    }
  }
};

// Bind events & init plugins
$(document).ready(function() {
  // Make check for mobile!
  $toggleSub.on('click', toggleSub);
  $toggleMenu.on('click', toggleMenu);

  // Select all links with hashes
  $scrollTo.click(scrollToElement);
});

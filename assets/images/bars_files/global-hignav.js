/*** HELPER FUNCTIONS ***/
var helper = (function() {

  // Check if Element has Class
  var hasClass = function(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      //return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
  }

  // Add Class to Element
  var addClass = function(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else if (!hasClass(el, className)) {
      el.className += " " + className;
    }
  }

  // Remove Class to Element
  var removeClass = function(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else if (hasClass(el, className)) {
      var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
      el.className=el.className.replace(reg, " ");
    }
  }

  return {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
  };

})();

var megaMenu = (function() {
  // Remove NO JS Class
  helper.removeClass(document.documentElement, "nojs");

  // Dynamic Label
  var label = document.getElementById("disclosure-label");
  var pageName = document.body.dataset.hignavItemName;
  var current = document.querySelector("[data-hignav-item='"+ pageName +"']");
  if (current) {
    label.innerHTML = pageName;
    helper.addClass(current, "current");
  }


  var type = document.body.dataset.hignavIsBeta;
  if (type == "true") {
    var violator = document.createElement("span");
    var beta = document.createTextNode("beta");
    violator.appendChild(beta);

    var current = document.getElementById("chevron");
    current.parentNode.insertBefore(violator, current);

    helper.addClass(violator, "violator");
    helper.addClass(violator, "violator-alt");
    helper.addClass(violator, "violator-inline");
  }

  // Get Elements
  var nav = document.getElementById("localnav-wrapper");
  var navOffset = nav.offsetTop;
  var navToggle = document.getElementById("localnav-disclosure");
  var curtain = document.getElementById("localnav-curtain");
  var placeholder = document.getElementById("localnav-placeholder");
  var scrollPosY;

  // Set Checkbox Status
  navToggle.checked = false;

  // Toggle Nav Open and Listeners for Close functions
  var _toggleNavigation = function() {
    if (!navToggle.checked && helper.hasClass(nav, "localnav-open")) {
      helper.removeClass(nav, "localnav-open");
      helper.removeClass(curtain, "localnav-open");
      window.removeEventListener('scroll', _closeNavigation);
      curtain.removeEventListener('click', _closeNavigation);
      if (helper.hasClass(document.body, "noscroll")) {
        helper.removeClass(document.body, "noscroll");
      }
    } else if (navToggle.checked) {
      scrollPosY = window.scrollY;
      helper.addClass(nav, "localnav-open");
      helper.addClass(curtain, "localnav-open");
      window.addEventListener('scroll', _closeNavigation);
      curtain.addEventListener('click', _closeNavigation);
    }
  }

  // Conditionally Close Nav
  var _closeNavigation = function() {
    if (window.innerWidth <= 735) {
      helper.addClass(document.body, "noscroll");
    } else {
      navToggle.checked = false;
      _toggleNavigation();
    }
  }

  // Listen for Checkbox Toggle
  navToggle.addEventListener('change', _toggleNavigation);

  return {
    nav: nav,
    placeholder: placeholder,
    navOffset: navOffset
  };

})();

// Sticky Nav on Scroll
window.onscroll = function() {

    var YPos = window.scrollY;

    if (YPos >= megaMenu.navOffset) {
      if (!helper.hasClass(megaMenu.nav, "is-sticking")) {
        helper.addClass(megaMenu.nav, "is-sticking");
        helper.addClass(megaMenu.placeholder, "block");
      }
    } else {
      if (helper.hasClass(megaMenu.nav, "is-sticking")) {
        helper.removeClass(megaMenu.nav, "is-sticking");
        helper.removeClass(megaMenu.placeholder, "block");
      }
    }

};

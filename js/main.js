"use strict";
/* eslint-disable */

function req_hlr_lookup(phone) {
  $.ajaxSetup({async: false});  
  return $.post("/hlr_lookup.php?phone="+phone).responseText;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

if (typeof Array.prototype.forEach !== 'function') {
  Array.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
      callback.apply(this, [this[i], i, this]);
    }
  };
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

;
var errors = {
  required: 'Veuillez renseigner',
  text: 'Veuillez saisir au moins deux lettres',
  email: 'Veuillez respecter le format du courriel (exemple@domaine.fr)',
  phone: 'Veuillez renseigner un numéro de téléphone valide'
};

var customValidation = function customValidation() {
  var inputs = document.querySelectorAll('.js-validation-input');
  var button = document.querySelector('.js-run-custom-validation');
  var contactMe = document.querySelector('.js-contact-me');

  var addFocus = function addFocus(el) {
    return el.target.classList.add('focused');
  };

  var showErrors = function showErrors(el, errors) {
    var error = el.parentNode.lastElementChild;
    error.innerHTML = errors.toString();
  };

  var valIsRequired = function valIsRequired(el) {
    var field = el.name === 'nom' && 'votre nom' || el.name === 'prenom' && 'votre prénom' || el.name === 'email' && 'votre e-mail' || el.name === 'phone' && 'votre téléphone';
    return el.value.length === 0 ? "".concat(errors.required, " ").concat(field) : null;
  };

  var valIsSmall = function valIsSmall(el) {
    return el.value.length < 2 && el.value.length > 0 && el.classList.contains('focused') ? errors.text : null;
  };

  var valIsEmail = function valIsEmail(el) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(el.value).toLowerCase()) && el.value.length > 0 ? errors.email : null;
  };

  var valIsPhone = function valIsPhone(el) {
    return el.value.length > 0 && (el.value.charAt(0) !== '0' || el.value.charAt(1) === '0' || el.value.length !== 10) ? errors.phone : null;
  };

  var handlerValidation = function handlerValidation(el) {
    var errors = [];
    el = el.target ? el.target : el;
    valIsRequired(el) && errors.push(valIsRequired(el));

    if (el.name === 'nom' || el.name === 'prenom') {
      valIsSmall(el) && errors.push(valIsSmall(el));
    }

    if (el.name === 'email') {
      valIsEmail(el) && errors.push(valIsEmail(el));
    }

    if (el.name === 'phone') {
      valIsPhone(el) && errors.push(valIsPhone(el));
    }


    showErrors(el, errors);
    return errors;
  };

  if (inputs.length) {
    inputs.forEach(function (input) {
      // if(input.type === 'number') {
      //     input.addEventListener('keydown',  el => {
      //         if (el.which == 38 || el.which == 40) {
      //             return false;
      //         }
      //     });
      // }
      if (input.value && input.value.length > 0) {
        input.classList.add('focused');
      } else {
        input.addEventListener('focus', addFocus);
      }

      input.addEventListener('input', handlerValidation);
    });
  }

  button.addEventListener('click', function () {
    var validCheck = true;

    if (inputs.length) {
      inputs.forEach(function (input) {
        if (handlerValidation(input).length) {
          validCheck = false;
        }
      });
    }

    if (req_hlr_lookup($("#phone-id").val())!='OK') {
      validCheck = false;
      $(".errorPhone").html("Veuillez renseigner un numéro de téléphone valide");
    }

    if (validCheck) {
      quiz();
    }
  });
  contactMe.addEventListener('click', function (e) {
    e.preventDefault();
    var message = document.querySelector('.js-message');
    document.querySelector('[name="contactMe"]').value = 'false';
    message.classList.remove('hidden');
    setTimeout(function () {
      return message.classList.add('hidden');
    }, 5000);
  });
};

var quiz = function quiz() {
  var quiz = document.querySelectorAll('.js-toggle-for-quiz');
  var steps = document.querySelectorAll('.js-step');
  var gotoAnswer = document.querySelectorAll('.js-goto-answer');
  var gotoNextStep = document.querySelectorAll('.js-next-step');
  var gotoFinish = document.querySelector('.js-goto-finish');
  var finish = document.querySelectorAll('.js-toggle-for-finish');

  var serialize = function serialize() {
    var form = document.querySelector('.js-form');
    var formData = new FormData(form);
    var parsedData = {};

    var _iterator = _createForOfIteratorHelper(formData),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var name = _step.value;

        if (typeof parsedData[name[0]] == "undefined") {
          var tempdata = formData.getAll(name[0]);

          if (tempdata.length > 1) {
            parsedData[name[0]] = tempdata;
          } else {
            parsedData[name[0]] = tempdata[0];
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return parsedData;
  };

  var pushData = function pushData(data) {
    var url = '/functions.php'; // const url = '/quiz-nuggets/functions.php';

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data && data.name && data.name === "Contact Created") {
        addConversion();
      }
    });
  };

  var addConversion = function addConversion() {
    var img = new Image(1, 1);
    img.src = 'https://orixamedia.go2cloud.org/SLdG';
    img.classList = 'hidden';
    document.body.appendChild(img);
  };

  var showAnswer = function showAnswer(el) {
    var objects = document.querySelectorAll(".js-".concat(el.name));
    var answer = document.querySelector(".js-".concat(el.id));
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    objects.forEach(function (el) {
      return el.classList.toggle('hidden');
    });
    answer.classList.remove('hidden');
  };

  var showError = function showError(el, err) {
    var error = el.parentNode.lastElementChild;
    error.innerHTML = err;
  };

  document.getElementsByTagName('body')[0].classList.add('is-quiz');
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  quiz.forEach(function (el) {
    el.classList.toggle('hidden');
  });
  gotoAnswer.forEach(function (button) {
    var name = button.dataset.name;
    var radios = document.querySelectorAll(".js-radio[name=".concat(name, "]"));
    radios.forEach(function (radio) {
      radio.addEventListener('change', function (el) {
        showError(button, "");
      });
    });
    button.addEventListener('click', function (el) {
      var answer = document.querySelectorAll(".js-radio[name=".concat(name, "]:checked"));

      if (answer.length) {
        showAnswer(answer[0]);
      } else {
        showError(el.target, "Veuillez choisir une réponse");
      }
    });
  });
  gotoNextStep.forEach(function (button) {
    button.addEventListener('click', function (el) {
      var step = el.target.dataset.step;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      steps.forEach(function (objStep) {
        if (objStep.classList.contains("js-step-".concat(step))) {
          objStep.classList.remove('hidden');
        } else {
          objStep.classList.add('hidden');
        }
      });
    });
  });
  pushData(_objectSpread(_objectSpread({}, serialize()), {}, {
    sendWS: true
  }));
  gotoFinish.addEventListener('click', function () {
    var data = serialize();
    pushData(_objectSpread(_objectSpread({}, data), {}, {
      sendEmail: true
    }));
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    finish.forEach(function (el) {
      el.classList.toggle('hidden');
    });
    console.log('quiz ended');
    $('body').append('<!-- Offer Conversion: HANDICHIENS --><img src="https://orixamedia.go2cloud.org/SLdG" width="1" height="1" /><!-- // End Offer Conversion -->');
  });
};

var cookies = function cookies() {
  var getCookie = function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  var setCookie = function setCookie(name, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = _objectSpread({
      path: '/'
    }, options);

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (var optionKey in options) {
      updatedCookie += "; " + optionKey;
      var optionValue = options[optionKey];

      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  };

  if (getCookie('isCookie') != 1) {
    var cookiesWrapper = document.querySelector('.js-cookie');
    var cookieToggler = document.querySelector('.js-add-cookies');
    cookiesWrapper.classList.remove('hidden');
    cookieToggler.addEventListener('click', function () {
      setCookie('isCookie', 1);
      cookiesWrapper.classList.add('hidden');
    });
  }
};

var ready = function ready() {
  customValidation();
  cookies();
};

document.addEventListener('DOMContentLoaded', ready);
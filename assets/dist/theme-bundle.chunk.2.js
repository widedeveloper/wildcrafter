(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GiftCertificate; });
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.number.constructor */ "./node_modules/core-js/modules/es6.number.constructor.js");
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var GiftCertificate =
/*#__PURE__*/
function (_PageManager) {
  _inheritsLoose(GiftCertificate, _PageManager);

  function GiftCertificate(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_5__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_5__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_5__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_5__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300
    });

    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');
      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);

          if (!numberVal) {
            cb(false);
          }

          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: "You must enter a certificate amount between " + minFormatted + " and " + maxFormatted + "."
      });
    }

    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);

    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);

      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();

        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }

    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return;
      }

      var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__["api"].getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }

        modal.updateContent(content, {
          wrap: true
        });
      });
    });
    return _this;
  }

  var _proto = GiftCertificate.prototype;

  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: $balanceForm.find('input[type="submit"]')
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb(Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_4__["default"])(val));
      },
      errorMessage: 'You must enter a certificate code.'
    });
    return balanceValidator;
  };

  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvZ2lmdC1jZXJ0aWZpY2F0ZS5qcyJdLCJuYW1lcyI6WyJHaWZ0Q2VydGlmaWNhdGUiLCJjb250ZXh0IiwiJGNlcnRCYWxhbmNlRm9ybSIsIiQiLCJwdXJjaGFzZU1vZGVsIiwicmVjaXBpZW50TmFtZSIsInZhbCIsImxlbmd0aCIsInJlY2lwaWVudEVtYWlsIiwiZm9ybU1vZGVsIiwiZW1haWwiLCJzZW5kZXJOYW1lIiwic2VuZGVyRW1haWwiLCJjdXN0b21BbW91bnQiLCJ2YWx1ZSIsIm1pbiIsIm1heCIsInNldEFtb3VudCIsIm9wdGlvbnMiLCJmb3VuZCIsImZvckVhY2giLCJvcHRpb24iLCIkcHVyY2hhc2VGb3JtIiwiJGN1c3RvbUFtb3VudHMiLCJmaW5kIiwicHVyY2hhc2VWYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJkZWxheSIsIiRlbGVtZW50IiwiZGF0YSIsIm1pbkZvcm1hdHRlZCIsIm1heEZvcm1hdHRlZCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsIm51bWJlclZhbCIsIk51bWJlciIsImVycm9yTWVzc2FnZSIsInJlc3VsdCIsInRvTmFtZSIsInRvRW1haWwiLCJmcm9tTmFtZSIsImZyb21FbWFpbCIsInRyaWdnZXJlZEJ5IiwiY2VydFRoZW1lIiwiZ2V0IiwiY2hlY2tlZCIsImFncmVlVG9UZXJtcyIsImJhbGFuY2VWYWwiLCJjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yIiwib24iLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY2xpY2siLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsInByZXZpZXdVcmwiLCJjdXJyZW50VGFyZ2V0Iiwic2VyaWFsaXplIiwib3BlbiIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwidXBkYXRlQ29udGVudCIsInByZXZpZXdFcnJvciIsIndyYXAiLCIkYmFsYW5jZUZvcm0iLCJi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RDtBQXZKaUI7QUE2S3BCOzs7O1NBRURuQix5QixHQUFBLG1DQUEwQm9CLFlBQTFCLEVBQXdDO0FBQ3BDLFFBQU1DLGdCQUFnQixHQUFHOUMsMkRBQUcsQ0FBQztBQUN6QkMsWUFBTSxFQUFFNEMsWUFBWSxDQUFDL0MsSUFBYixDQUFrQixzQkFBbEI7QUFEaUIsS0FBRCxDQUE1QjtBQUlBZ0Qsb0JBQWdCLENBQUN2QyxHQUFqQixDQUFxQjtBQUNqQkMsY0FBUSxFQUFFcUMsWUFBWSxDQUFDL0MsSUFBYixDQUFrQixtQ0FBbEIsQ0FETztBQUVqQlcsY0FGaUIsb0JBRVJDLEVBRlEsRUFFSjlCLEdBRkksRUFFQztBQUNkOEIsVUFBRSxDQUFDcUMsa0ZBQWUsQ0FBQ25FLEdBQUQsQ0FBaEIsQ0FBRjtBQUNILE9BSmdCO0FBS2pCaUMsa0JBQVksRUFBRTtBQUxHLEtBQXJCO0FBUUEsV0FBT2lDLGdCQUFQO0FBQ0gsRzs7O0VBOUx3Q0UscUQiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xyXG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XHJcbmltcG9ydCBnaWZ0Q2VydENoZWNrZXIgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xyXG5pbXBvcnQgZm9ybU1vZGVsIGZyb20gJy4vY29tbW9uL21vZGVscy9mb3Jtcyc7XHJcbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IHsgZGVmYXVsdE1vZGFsIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2lmdENlcnRpZmljYXRlIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xyXG5cclxuICAgICAgICBjb25zdCAkY2VydEJhbGFuY2VGb3JtID0gJCgnI2dpZnQtY2VydGlmaWNhdGUtYmFsYW5jZScpO1xyXG5cclxuICAgICAgICBjb25zdCBwdXJjaGFzZU1vZGVsID0ge1xyXG4gICAgICAgICAgICByZWNpcGllbnROYW1lKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlY2lwaWVudEVtYWlsKC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtTW9kZWwuZW1haWwoLi4uYXJncyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWUodmFsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VuZGVyRW1haWwoLi4uYXJncykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1Nb2RlbC5lbWFpbCguLi5hcmdzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY3VzdG9tQW1vdW50KHZhbHVlLCBtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldEFtb3VudCh2YWx1ZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgJHB1cmNoYXNlRm9ybSA9ICQoJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcclxuICAgICAgICBjb25zdCAkY3VzdG9tQW1vdW50cyA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xyXG4gICAgICAgIGNvbnN0IHB1cmNoYXNlVmFsaWRhdG9yID0gbm9kKHtcclxuICAgICAgICAgICAgc3VibWl0OiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCRjdXN0b21BbW91bnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCAkZWxlbWVudCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xyXG4gICAgICAgICAgICBjb25zdCBtaW4gPSAkZWxlbWVudC5kYXRhKCdtaW4nKTtcclxuICAgICAgICAgICAgY29uc3QgbWluRm9ybWF0dGVkID0gJGVsZW1lbnQuZGF0YSgnbWluRm9ybWF0dGVkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heCA9ICRlbGVtZW50LmRhdGEoJ21heCcpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhGb3JtYXR0ZWQgPSAkZWxlbWVudC5kYXRhKCdtYXhGb3JtYXR0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1iZXJWYWwgPSBOdW1iZXIodmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFudW1iZXJWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2IobnVtYmVyVmFsID49IG1pbiAmJiBudW1iZXJWYWwgPD0gbWF4KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGBZb3UgbXVzdCBlbnRlciBhIGNlcnRpZmljYXRlIGFtb3VudCBiZXR3ZWVuICR7bWluRm9ybWF0dGVkfSBhbmQgJHttYXhGb3JtYXR0ZWR9LmAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJ0b19uYW1lXCJdJyxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwucmVjaXBpZW50TmFtZSh2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnRvTmFtZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJ0b19lbWFpbFwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudEVtYWlsKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQudG9FbWFpbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJmcm9tX25hbWVcIl0nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJOYW1lKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZnJvbU5hbWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiZnJvbV9lbWFpbFwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnNlbmRlckVtYWlsKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZnJvbUVtYWlsLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdOmZpcnN0LW9mLXR5cGUnLFxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcmVkQnk6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl06Y2hlY2tlZCcpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYih0eXBlb2YgKHZhbCkgPT09ICdzdHJpbmcnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jZXJ0VGhlbWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWVcIl0nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImFncmVlXCJdJykuZ2V0KDApLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImFncmVlMlwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiYWdyZWUyXCJdJykuZ2V0KDApLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICBpZiAoJGNlcnRCYWxhbmNlRm9ybS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHRoaXMuY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvcigkY2VydEJhbGFuY2VGb3JtKTtcclxuXHJcbiAgICAgICAgICAgICRjZXJ0QmFsYW5jZUZvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJhbGFuY2VWYWwucGVyZm9ybUNoZWNrKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFiYWxhbmNlVmFsLmFyZUFsbCgndmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcHVyY2hhc2VGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNnaWZ0LWNlcnRpZmljYXRlLXByZXZpZXcnKS5jbGljayhldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghcHVyY2hhc2VWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByZXZpZXdVcmwgPSBgJHskKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3ByZXZpZXdVcmwnKX0mJHskcHVyY2hhc2VGb3JtLnNlcmlhbGl6ZSgpfWA7XHJcblxyXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XHJcblxyXG4gICAgICAgICAgICBhcGkuZ2V0UGFnZShwcmV2aWV3VXJsLCB7fSwgKGVyciwgY29udGVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2RhbC51cGRhdGVDb250ZW50KHRoaXMuY29udGV4dC5wcmV2aWV3RXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQoY29udGVudCwgeyB3cmFwOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRiYWxhbmNlRm9ybSkge1xyXG4gICAgICAgIGNvbnN0IGJhbGFuY2VWYWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6ICRiYWxhbmNlRm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGJhbGFuY2VWYWxpZGF0b3IuYWRkKHtcclxuICAgICAgICAgICAgc2VsZWN0b3I6ICRiYWxhbmNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiZ2lmdGNlcnRpZmljYXRlY29kZVwiXScpLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZShjYiwgdmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjYihnaWZ0Q2VydENoZWNrZXIodmFsKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1lvdSBtdXN0IGVudGVyIGEgY2VydGlmaWNhdGUgY29kZS4nLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYmFsYW5jZVZhbGlkYXRvcjtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9
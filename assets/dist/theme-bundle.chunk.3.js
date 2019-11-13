(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/form-utils */ "./assets/js/theme/common/form-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 Import all product specific js
 */







var Product =
/*#__PURE__*/
function (_PageManager) {
  _inheritsLoose(Product, _PageManager);

  function Product(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    return _this;
  }

  var _proto = Product.prototype;

  _proto.onReady = function onReady() {
    var _this2 = this;

    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator; // Init collapsible

    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    var $reviewForm = Object(_common_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]($reviewForm);
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }

      return false;
    });
    this.productReviewHandler();
    this.bulkPricingHandler();
  };

  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };

  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };

  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/reviews.js":
/*!********************************************!*\
  !*** ./assets/js/theme/product/reviews.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");





var _default =
/*#__PURE__*/
function () {
  function _default($reviewForm) {
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $reviewForm.find('input[type="submit"]')
    });
    this.$reviewsContent = $('#product-reviews');
    this.$collapsible = $('[data-collapsible]', this.$reviewsContent);
    this.initLinkBind();
    this.injectPaginationLink();
    this.collapseReviews();
  }
  /**
   * On initial page load, the user clicks on "(12 Reviews)" link
   * The browser jumps to the review page and should expand the reviews section
   */


  var _proto = _default.prototype;

  _proto.initLinkBind = function initLinkBind() {
    var _this = this;

    var $content = $('#productReviews-content', this.$reviewsContent);
    $('.productView-reviewLink').on('click', function () {
      $('.productView-reviewTabLink').trigger('click');

      if (!$content.hasClass('is-open')) {
        _this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["CollapsibleEvents"].click);
      }
    });
  };

  _proto.collapseReviews = function collapseReviews() {
    // We're in paginating state, do not collapse
    if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
      return;
    } // force collapse on page load


    this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["CollapsibleEvents"].click);
  }
  /**
   * Inject ID into the pagination link
   */
  ;

  _proto.injectPaginationLink = function injectPaginationLink() {
    var $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
    var $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);

    if ($nextLink.length) {
      $nextLink.attr('href', $nextLink.attr('href') + " #product-reviews");
    }

    if ($prevLink.length) {
      $prevLink.attr('href', $prevLink.attr('href') + " #product-reviews");
    }
  };

  _proto.registerValidation = function registerValidation(context) {
    this.context = context;
    this.validator.add([{
      selector: '[name="revrating"]',
      validate: 'presence',
      errorMessage: this.context.reviewRating
    }, {
      selector: '[name="revtitle"]',
      validate: 'presence',
      errorMessage: this.context.reviewSubject
    }, {
      selector: '[name="revtext"]',
      validate: 'presence',
      errorMessage: this.context.reviewComment
    }, {
      selector: '[name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.reviewEmail
    }]);
    return this.validator;
  };

  _proto.validate = function validate() {
    return this.validator.performCheck();
  };

  return _default;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__);

var VideoGallery =
/*#__PURE__*/
function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }

  var _proto = VideoGallery.prototype;

  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };

  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };

  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };

  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };

  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;

    if (isInitialized) {
      return;
    }

    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC9yZXZpZXdzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3ZpZGVvLWdhbGxlcnkuanMiXSwibmFtZXMiOlsiUHJvZHVjdCIsImNvbnRleHQiLCJ1cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCIkcmV2aWV3TGluayIsIiQiLCIkYnVsa1ByaWNpbmdMaW5rIiwib25SZWFkeSIsImRvY3VtZW50Iiwib24iLCJpbmRleE9mIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJ2YWxpZGF0b3IiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJ2aWRlb0dhbGxlcnkiLCIkcmV2aWV3Rm9ybSIsImNsYXNzaWZ5Rm9ybSIsInJldmlldyIsIlJldmlldyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwidHJpZ2dlciIsIlBhZ2VNYW5hZ2VyIiwibm9kIiwic3VibWl0IiwiZmluZCIsIiRyZXZpZXdzQ29udGVudCIsIiRjb2xsYXBzaWJsZSIsImluaXRMaW5rQmluZCIsImluamVjdFBhZ2luYXRpb25MaW5rIiwiY29sbGFwc2VSZXZpZXdzIiwiJGNvbnRlbnQiLCJoYXNDbGFzcyIsIkNvbGxhcHNpYmxlRXZlbnRzIiwiY2xpY2siLCJoYXNoIiwiJG5leHRMaW5rIiwiJHByZXZMaW5rIiwibGVuZ3RoIiwiYXR0ciIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJlcnJvck1lc3NhZ2UiLCJyZXZpZXdSYXRpbmciLCJyZXZpZXdTdWJqZWN0IiwicmV2aWV3Q29tbWVudCIsImNiIiwidmFsIiwicmVzdWx0IiwiZm9ybXMiLCJlbWFpbCIsInJldmlld0VtYWlsIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkYXRhIiwiJHNlbGVjdGVkVGh1bWIiLCJzZXRNYWluVmlkZW8iLCJzZXRBY3RpdmVUaHVtYiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJiaW5kIiwicGx1Z2luS2V5IiwiJHZpZGVvR2FsbGVyeSIsImVhY2giLCJpbmRleCIsImVsZW1lbnQiLCIkZWwiLCJpc0luaXRpYWxpemVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxPOzs7OztBQUNqQixtQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixvQ0FBTUEsT0FBTjtBQUNBLFVBQUtDLEdBQUwsR0FBV0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUEzQjtBQUNBLFVBQUtDLFdBQUwsR0FBbUJDLENBQUMsQ0FBQyxzQ0FBRCxDQUFwQjtBQUNBLFVBQUtDLGdCQUFMLEdBQXdCRCxDQUFDLENBQUMsdUNBQUQsQ0FBekI7QUFKaUI7QUFLcEI7Ozs7U0FFREUsTyxHQUFBLG1CQUFVO0FBQUE7O0FBQ047QUFDQUYsS0FBQyxDQUFDRyxRQUFELENBQUQsQ0FBWUMsRUFBWixDQUFlLG9CQUFmLEVBQXFDLFlBQU07QUFDdkMsVUFBSSxNQUFJLENBQUNULEdBQUwsQ0FBU1UsT0FBVCxDQUFpQixlQUFqQixNQUFzQyxDQUFDLENBQXZDLElBQTRDLE9BQU9ULE1BQU0sQ0FBQ1UsT0FBUCxDQUFlQyxZQUF0QixLQUF1QyxVQUF2RixFQUFt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TDs7QUFBQSxTQXNCSUQsWUF0QkosR0FzQkksd0JBQWU7QUFDWCxTQUFLWixPQUFMLENBQWFoQixJQUFiLENBQWtCLEtBQWxCLCtCQUFvRCxLQUFLa0IsWUFBTCxDQUFrQk8sRUFBdEU7QUFDSCxHQXhCTDs7QUFBQSxTQTBCSUksY0ExQkosR0EwQkksMEJBQWlCO0FBQ2IsU0FBS1osT0FBTCxDQUFhYSxXQUFiLENBQXlCLFdBQXpCO0FBQ0EsU0FBS1osWUFBTCxDQUFrQlMsY0FBbEIsQ0FBaUNJLFFBQWpDLENBQTBDLFdBQTFDO0FBQ0gsR0E3Qkw7O0FBQUEsU0ErQklaLFVBL0JKLEdBK0JJLHNCQUFhO0FBQ1QsU0FBS0YsT0FBTCxDQUFhMUQsRUFBYixDQUFnQixPQUFoQixFQUF5QixLQUFLNkQsY0FBTCxDQUFvQlksSUFBcEIsQ0FBeUIsSUFBekIsQ0FBekI7QUFDSCxHQWpDTDs7QUFBQTtBQUFBO0FBb0NlLFNBQVM1RCxZQUFULEdBQXdCO0FBQ25DLE1BQU02RCxTQUFTLEdBQUcsZUFBbEI7QUFDQSxNQUFNQyxhQUFhLEdBQUcvRSxDQUFDLFlBQVU4RSxTQUFWLE9BQXZCO0FBRUFDLGVBQWEsQ0FBQ0MsSUFBZCxDQUFtQixVQUFDQyxLQUFELEVBQVFDLE9BQVIsRUFBb0I7QUFDbkMsUUFBTUMsR0FBRyxHQUFHbkYsQ0FBQyxDQUFDa0YsT0FBRCxDQUFiO0FBQ0EsUUFBTUUsYUFBYSxHQUFHRCxHQUFHLENBQUNaLElBQUosQ0FBU08sU0FBVCxhQUErQm5CLFlBQXJEOztBQUVBLFFBQUl5QixhQUFKLEVBQW1CO0FBQ2Y7QUFDSDs7QUFFREQsT0FBRyxDQUFDWixJQUFKLENBQVNPLFNBQVQsRUFBb0IsSUFBSW5CLFlBQUosQ0FBaUJ3QixHQUFqQixDQUFwQjtBQUNILEdBVEQ7QUFVSCxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuIEltcG9ydCBhbGwgcHJvZHVjdCBzcGVjaWZpYyBqc1xyXG4gKi9cclxuaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcclxuaW1wb3J0IFJldmlldyBmcm9tICcuL3Byb2R1Y3QvcmV2aWV3cyc7XHJcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xyXG5pbXBvcnQgUHJvZHVjdERldGFpbHMgZnJvbSAnLi9jb21tb24vcHJvZHVjdC1kZXRhaWxzJztcclxuaW1wb3J0IHZpZGVvR2FsbGVyeSBmcm9tICcuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeSc7XHJcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL2Zvcm0tdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xyXG4gICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLWJ1bGstcHJpY2luZ1wiXScpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhZHkoKSB7XHJcbiAgICAgICAgLy8gTGlzdGVuIGZvciBmb3VuZGF0aW9uIG1vZGFsIGNsb3NlIGV2ZW50cyB0byBzYW5pdGl6ZSBVUkwgYWZ0ZXIgcmV2aWV3LlxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbG9zZS5mbmR0bi5yZXZlYWwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdmFsaWRhdG9yO1xyXG5cclxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlXHJcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJCgnLnByb2R1Y3RWaWV3JyksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcclxuXHJcbiAgICAgICAgdmlkZW9HYWxsZXJ5KCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRyZXZpZXdGb3JtID0gY2xhc3NpZnlGb3JtKCcud3JpdGVSZXZpZXctZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IHJldmlldyA9IG5ldyBSZXZpZXcoJHJldmlld0Zvcm0pO1xyXG5cclxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyZXZpZXdGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcclxuICAgICAgICB0aGlzLmJ1bGtQcmljaW5nSGFuZGxlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2R1Y3RSZXZpZXdIYW5kbGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnVsa1ByaWNpbmdIYW5kbGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjYnVsa19wcmljaW5nJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluay50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xyXG5pbXBvcnQgeyBDb2xsYXBzaWJsZUV2ZW50cyB9IGZyb20gJy4uL2NvbW1vbi9jb2xsYXBzaWJsZSc7XHJcbmltcG9ydCBmb3JtcyBmcm9tICcuLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuICAgIGNvbnN0cnVjdG9yKCRyZXZpZXdGb3JtKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6ICRyZXZpZXdGb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kcmV2aWV3c0NvbnRlbnQgPSAkKCcjcHJvZHVjdC1yZXZpZXdzJyk7XHJcbiAgICAgICAgdGhpcy4kY29sbGFwc2libGUgPSAkKCdbZGF0YS1jb2xsYXBzaWJsZV0nLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdExpbmtCaW5kKCk7XHJcbiAgICAgICAgdGhpcy5pbmplY3RQYWdpbmF0aW9uTGluaygpO1xyXG4gICAgICAgIHRoaXMuY29sbGFwc2VSZXZpZXdzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPbiBpbml0aWFsIHBhZ2UgbG9hZCwgdGhlIHVzZXIgY2xpY2tzIG9uIFwiKDEyIFJldmlld3MpXCIgbGlua1xyXG4gICAgICogVGhlIGJyb3dzZXIganVtcHMgdG8gdGhlIHJldmlldyBwYWdlIGFuZCBzaG91bGQgZXhwYW5kIHRoZSByZXZpZXdzIHNlY3Rpb25cclxuICAgICAqL1xyXG4gICAgaW5pdExpbmtCaW5kKCkge1xyXG4gICAgICAgIGNvbnN0ICRjb250ZW50ID0gJCgnI3Byb2R1Y3RSZXZpZXdzLWNvbnRlbnQnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XHJcblxyXG4gICAgICAgICQoJy5wcm9kdWN0Vmlldy1yZXZpZXdMaW5rJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAkKCcucHJvZHVjdFZpZXctcmV2aWV3VGFiTGluaycpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIGlmICghJGNvbnRlbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xsYXBzZVJldmlld3MoKSB7XHJcbiAgICAgICAgLy8gV2UncmUgaW4gcGFnaW5hdGluZyBzdGF0ZSwgZG8gbm90IGNvbGxhcHNlXHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2YoJyNwcm9kdWN0LXJldmlld3MnKSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmb3JjZSBjb2xsYXBzZSBvbiBwYWdlIGxvYWRcclxuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZS50cmlnZ2VyKENvbGxhcHNpYmxlRXZlbnRzLmNsaWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluamVjdCBJRCBpbnRvIHRoZSBwYWdpbmF0aW9uIGxpbmtcclxuICAgICAqL1xyXG4gICAgaW5qZWN0UGFnaW5hdGlvbkxpbmsoKSB7XHJcbiAgICAgICAgY29uc3QgJG5leHRMaW5rID0gJCgnLnBhZ2luYXRpb24taXRlbS0tbmV4dCAucGFnaW5hdGlvbi1saW5rJywgdGhpcy4kcmV2aWV3c0NvbnRlbnQpO1xyXG4gICAgICAgIGNvbnN0ICRwcmV2TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLXByZXZpb3VzIC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XHJcblxyXG4gICAgICAgIGlmICgkbmV4dExpbmsubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICRuZXh0TGluay5hdHRyKCdocmVmJywgYCR7JG5leHRMaW5rLmF0dHIoJ2hyZWYnKX0gI3Byb2R1Y3QtcmV2aWV3c2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRwcmV2TGluay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJHByZXZMaW5rLmF0dHIoJ2hyZWYnLCBgJHskcHJldkxpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyVmFsaWRhdGlvbihjb250ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvci5hZGQoW3tcclxuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmFtZT1cInJldnJhdGluZ1wiXScsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdSYXRpbmcsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2dGl0bGVcIl0nLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3U3ViamVjdCxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0ZXh0XCJdJyxcclxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld0NvbW1lbnQsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwiZW1haWxcIl0nLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XHJcbiAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdFbWFpbCxcclxuICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XHJcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuJHBsYXllciA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLXBsYXllcl0nKTtcclxuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge307XHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0TmV3VmlkZW8oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7XHJcbiAgICAgICAgICAgIGlkOiAkdGFyZ2V0LmRhdGEoJ3ZpZGVvSWQnKSxcclxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRNYWluVmlkZW8oKTtcclxuICAgICAgICB0aGlzLnNldEFjdGl2ZVRodW1iKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWFpblZpZGVvKCkge1xyXG4gICAgICAgIHRoaXMuJHBsYXllci5hdHRyKCdzcmMnLCBgLy93d3cueW91dHViZS5jb20vZW1iZWQvJHt0aGlzLmN1cnJlbnRWaWRlby5pZH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmVUaHVtYigpIHtcclxuICAgICAgICB0aGlzLiR2aWRlb3MucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvLiRzZWxlY3RlZFRodW1iLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuJHZpZGVvcy5vbignY2xpY2snLCB0aGlzLnNlbGVjdE5ld1ZpZGVvLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb0dhbGxlcnkoKSB7XHJcbiAgICBjb25zdCBwbHVnaW5LZXkgPSAndmlkZW8tZ2FsbGVyeSc7XHJcbiAgICBjb25zdCAkdmlkZW9HYWxsZXJ5ID0gJChgW2RhdGEtJHtwbHVnaW5LZXl9XWApO1xyXG5cclxuICAgICR2aWRlb0dhbGxlcnkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICBjb25zdCAkZWwgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSAkZWwuZGF0YShwbHVnaW5LZXkpIGluc3RhbmNlb2YgVmlkZW9HYWxsZXJ5O1xyXG5cclxuICAgICAgICBpZiAoaXNJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZWwuZGF0YShwbHVnaW5LZXksIG5ldyBWaWRlb0dhbGxlcnkoJGVsKSk7XHJcbiAgICB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9
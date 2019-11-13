(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./assets/js/theme/search.js":
/*!***********************************!*\
  !*** ./assets/js/theme/search.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ "./node_modules/core-js/modules/es7.symbol.async-iterator.js");
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.symbol */ "./node_modules/core-js/modules/es6.symbol.js");
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_url_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/url-utils */ "./assets/js/theme/common/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.min.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(jstree__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");





function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }











var Search =
/*#__PURE__*/
function (_CatalogPage) {
  _inheritsLoose(Search, _CatalogPage);

  function Search() {
    return _CatalogPage.apply(this, arguments) || this;
  }

  var _proto = Search.prototype;

  _proto.formatCategoryTreeForJSTree = function formatCategoryTreeForJSTree(node) {
    var _this = this;

    var nodeData = {
      text: node.data,
      id: node.metadata.id,
      state: {
        selected: node.selected
      }
    };

    if (node.state) {
      nodeData.state.opened = node.state === 'open';
      nodeData.children = true;
    }

    if (node.children) {
      nodeData.children = [];
      node.children.forEach(function (childNode) {
        nodeData.children.push(_this.formatCategoryTreeForJSTree(childNode));
      });
    }

    return nodeData;
  };

  _proto.showProducts = function showProducts() {
    var url = _common_url_utils__WEBPACK_IMPORTED_MODULE_8__["default"].replaceParams(window.location.href, {
      section: 'product'
    });
    this.$productListingContainer.removeClass('u-hiddenVisually');
    this.$facetedSearchContainer.removeClass('u-hiddenVisually');
    this.$contentResultsContainer.addClass('u-hiddenVisually');
    $('[data-content-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-content-results-toggle]').addClass('navBar-action');
    $('[data-product-results-toggle]').removeClass('navBar-action');
    $('[data-product-results-toggle]').addClass('navBar-action-color--active');
    _common_url_utils__WEBPACK_IMPORTED_MODULE_8__["default"].goToUrl(url);
  };

  _proto.showContent = function showContent() {
    var url = _common_url_utils__WEBPACK_IMPORTED_MODULE_8__["default"].replaceParams(window.location.href, {
      section: 'content'
    });
    this.$contentResultsContainer.removeClass('u-hiddenVisually');
    this.$productListingContainer.addClass('u-hiddenVisually');
    this.$facetedSearchContainer.addClass('u-hiddenVisually');
    $('[data-product-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-product-results-toggle]').addClass('navBar-action');
    $('[data-content-results-toggle]').removeClass('navBar-action');
    $('[data-content-results-toggle]').addClass('navBar-action-color--active');
    _common_url_utils__WEBPACK_IMPORTED_MODULE_8__["default"].goToUrl(url);
  };

  _proto.onReady = function onReady() {
    var _this2 = this;

    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_7__["default"])(this.context.urls);
    var $searchForm = $('[data-advanced-search-form]');
    var $categoryTreeContainer = $searchForm.find('[data-search-category-tree]');
    var url = url__WEBPACK_IMPORTED_MODULE_9___default.a.parse(window.location.href, true);
    var treeData = [];
    this.$productListingContainer = $('#product-listing-container');
    this.$facetedSearchContainer = $('#faceted-search-container');
    this.$contentResultsContainer = $('#search-results-content'); // Init faceted search

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    } // Init collapsibles


    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_10__["default"])();
    $('[data-product-results-toggle]').on('click', function (event) {
      event.preventDefault();

      _this2.showProducts();
    });
    $('[data-content-results-toggle]').on('click', function (event) {
      event.preventDefault();

      _this2.showContent();
    });

    if (this.$productListingContainer.find('li.product').length === 0 || url.query.section === 'content') {
      this.showContent();
    } else {
      this.showProducts();
    }

    var validator = this.initValidation($searchForm).bindValidation($searchForm.find('#search_query_adv'));
    this.context.categoryTree.forEach(function (node) {
      treeData.push(_this2.formatCategoryTreeForJSTree(node));
    });
    this.categoryTreeData = treeData;
    this.createCategoryTree($categoryTreeContainer);
    $searchForm.on('submit', function (event) {
      var selectedCategoryIds = $categoryTreeContainer.jstree().get_selected();

      if (!validator.check()) {
        return event.preventDefault();
      }

      $searchForm.find('input[name="category\[\]"]').remove();

      for (var _iterator = selectedCategoryIds, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var categoryId = _ref;
        var input = $('<input>', {
          type: 'hidden',
          name: 'category[]',
          value: categoryId
        });
        $searchForm.append(input);
      }
    });
  };

  _proto.loadTreeNodes = function loadTreeNodes(node, cb) {
    var _this3 = this;

    $.ajax({
      url: '/remote/v1/category-tree',
      data: {
        selectedCategoryId: node.id,
        prefix: 'category'
      },
      headers: {
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : ''
      }
    }).done(function (data) {
      var formattedResults = [];
      data.forEach(function (dataNode) {
        formattedResults.push(_this3.formatCategoryTreeForJSTree(dataNode));
      });
      cb(formattedResults);
    });
  };

  _proto.createCategoryTree = function createCategoryTree($container) {
    var _this4 = this;

    var treeOptions = {
      core: {
        data: function data(node, cb) {
          // Root node
          if (node.id === '#') {
            cb(_this4.categoryTreeData);
          } else {
            // Lazy loaded children
            _this4.loadTreeNodes(node, cb);
          }
        },
        themes: {
          icons: true
        }
      },
      checkbox: {
        three_state: false
      },
      plugins: ['checkbox']
    };
    $container.jstree(treeOptions);
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $searchHeading = $('#search-results-heading');
    var $searchCount = $('#search-results-product-count');
    var productsPerPage = this.context.searchProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'search/product-listing',
        sidebar: 'search/sidebar',
        heading: 'search/heading',
        productCount: 'search/product-count'
      },
      config: {
        product_results: {
          limit: productsPerPage
        }
      },
      showMore: 'search/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_6__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $searchHeading.html(content.heading);
      $searchCount.html(content.productCount);
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    });
  };

  _proto.initValidation = function initValidation($form) {
    this.$form = $form;
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_12__["default"])({
      submit: $form
    });
    return this;
  };

  _proto.bindValidation = function bindValidation($element) {
    if (this.validator) {
      this.validator.add({
        selector: $element,
        validate: 'presence',
        errorMessage: $element.data('errorMessage')
      });
    }

    return this;
  };

  _proto.check = function check() {
    if (this.validator) {
      this.validator.performCheck();
      return this.validator.areAll('valid');
    }

    return false;
  };

  return Search;
}(_catalog__WEBPACK_IMPORTED_MODULE_5__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvc2VhcmNoLmpzIl0sIm5hbWVzIjpbIlNlYXJjaCIsImZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZSIsIm5vZGUiLCJub2RlRGF0YSIsInRleHQiLCJkYXRhIiwiaWQiLCJtZXRhZGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJvcGVuZWQiLCJjaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZE5vZGUiLCJwdXNoIiwic2hvd1Byb2R1Y3RzIiwidXJsIiwidXJsVXRpbHMiLCJyZXBsYWNlUGFyYW1zIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic2VjdGlvbiIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsInJlbW92ZUNsYXNzIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCIkY29udGVudFJlc3VsdHNDb250YWluZXIiLCJhZGRDbGFzcyIsIiQiLCJnb1RvVXJsIiwic2hvd0NvbnRlbnQiLCJvblJlYWR5IiwiY29tcGFyZVByb2R1Y3RzIiwiY29udGV4dCIsInVybHMiLCIkc2VhcmNoRm9ybSIsIiRjYXRlZ29yeVRyZWVDb250YWluZXIiLCJmaW5kIiwiVXJsIiwicGFyc2UiLCJ0cmVlRGF0YSIsImxlbmd0aCIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwiaG9va3MiLCJvbiIsImNvbGxhcHNpYmxlRmFjdG9yeSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJxdWVyeSIsInZhbGlkYXRvciIsImluaXRWYWxpZGF0aW9uIiwiYmluZFZhbGlkYXRpb24iLCJjYXRlZ29yeVRyZWUiLCJjYXRlZ29yeVRyZWVEYXRhIiwiY3JlYXRlQ2F0ZWdvcnlUcmVlIiwic2VsZWN0ZWRDYXRlZ29yeUlkcyIsImpzdHJlZSIsImdldF9zZWxlY3RlZCIsImNoZWNrIiwicmVtb3ZlIiwiY2F0ZWdvcnlJZCIsImlucHV0IiwidHlwZSIsIm5hbWUiLCJ2YWx1ZSIsImFwcGVuZCIsImxvYWRUcmVlTm9kZXMiLCJjYiIsImFqYXgiLCJzZWxlY3RlZENhdGVnb3J5SWQiLCJwcmVmaXgiLCJoZWFkZXJzIiwiQkNEYXRhIiwiY3NyZl90b2tlbiIsImRvbmUiLCJmb3JtYXR0ZWRSZXN1bHRzIiwiZGF0YU5vZGUiLCIkY29udGFpbmVyIiwidHJlZU9wdGlvbnMiLCJjb3JlIiwidGhlbWVzIiwiaWNvbnMiLCJjaGVja2JveCIsInRocmVlX3N0YXRlIiwicGx1Z2lucyIsIiRzZWFyY2hIZWFkaW5nIiwiJHNlYXJjaENvdW50IiwicHJvZHVjdHNQZXJQYWdlIiwic2VhcmNoUHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsImhlYWRpbmciLCJwcm9kdWN0Q291bnQiLCJjb25maWciLCJwcm9kdWN0X3Jlc3VsdHMiLCJsaW1pdCIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCIkZm9ybSIsIm5vZCIsInN1Ym1pdCIsIiRlbGVtZW50IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImVycm9yTWVzc2FnZSIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsIkNhdGFsb2dQYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFcUJBLE07Ozs7Ozs7Ozs7O1NBQ2pCQywyQixHQUFBLHFDQUE0QkMsSUFBNUIsRUFBa0M7QUFBQTs7QUFDOUIsUUFBTUMsUUFBUSxHQUFHO0FBQ2JDLFVBQUksRUFBRUYsSUFBSSxDQUFDRyxJQURFO0FBRWJDLFFBQUUsRUFBRUosSUFBSSxDQUFDSyxRQUFMLENBQWNELEVBRkw7QUFHYkUsV0FBSyxFQUFFO0FBQ0hDLGdCQUFRLEVBQUVQLElBQUksQ0FBQ087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REFBRyxDQUFDO0FBQ2pCQyxZQUFNLEVBQUVGO0FBRFMsS0FBRCxDQUFwQjtBQUlBLFdBQU8sSUFBUDtBQUNILEc7O1NBRUR0RCxjLEdBQUEsd0JBQWV5RCxRQUFmLEVBQXlCO0FBQ3JCLFFBQUksS0FBSzNELFNBQVQsRUFBb0I7QUFDaEIsV0FBS0EsU0FBTCxDQUFlNEQsR0FBZixDQUFtQjtBQUNmQyxnQkFBUSxFQUFFRixRQURLO0FBRWZHLGdCQUFRLEVBQUUsVUFGSztBQUdmQyxvQkFBWSxFQUFFSixRQUFRLENBQUN6RyxJQUFULENBQWMsY0FBZDtBQUhDLE9BQW5CO0FBS0g7O0FBRUQsV0FBTyxJQUFQO0FBQ0gsRzs7U0FFRHVELEssR0FBQSxpQkFBUTtBQUNKLFFBQUksS0FBS1QsU0FBVCxFQUFvQjtBQUNoQixXQUFLQSxTQUFMLENBQWVnRSxZQUFmO0FBQ0EsYUFBTyxLQUFLaEUsU0FBTCxDQUFlaUUsTUFBZixDQUFzQixPQUF0QixDQUFQO0FBQ0g7O0FBRUQsV0FBTyxLQUFQO0FBQ0gsRzs7O0VBL08rQkMsZ0QiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjEyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xyXG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XHJcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XHJcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91cmwtdXRpbHMnO1xyXG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XHJcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xyXG5pbXBvcnQgJ2pzdHJlZSc7XHJcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIENhdGFsb2dQYWdlIHtcclxuICAgIGZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShub2RlKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZURhdGEgPSB7XHJcbiAgICAgICAgICAgIHRleHQ6IG5vZGUuZGF0YSxcclxuICAgICAgICAgICAgaWQ6IG5vZGUubWV0YWRhdGEuaWQsXHJcbiAgICAgICAgICAgIHN0YXRlOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogbm9kZS5zZWxlY3RlZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAobm9kZS5zdGF0ZSkge1xyXG4gICAgICAgICAgICBub2RlRGF0YS5zdGF0ZS5vcGVuZWQgPSBub2RlLnN0YXRlID09PSAnb3Blbic7XHJcbiAgICAgICAgICAgIG5vZGVEYXRhLmNoaWxkcmVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIG5vZGVEYXRhLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGROb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlRGF0YS5jaGlsZHJlbi5wdXNoKHRoaXMuZm9ybWF0Q2F0ZWdvcnlUcmVlRm9ySlNUcmVlKGNoaWxkTm9kZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UHJvZHVjdHMoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdXJsVXRpbHMucmVwbGFjZVBhcmFtcyh3aW5kb3cubG9jYXRpb24uaHJlZiwge1xyXG4gICAgICAgICAgICBzZWN0aW9uOiAncHJvZHVjdCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XHJcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xyXG4gICAgICAgIHRoaXMuJGNvbnRlbnRSZXN1bHRzQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xyXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKS5yZW1vdmVDbGFzcygnbmF2QmFyLWFjdGlvbicpO1xyXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0NvbnRlbnQoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdXJsVXRpbHMucmVwbGFjZVBhcmFtcyh3aW5kb3cubG9jYXRpb24uaHJlZiwge1xyXG4gICAgICAgICAgICBzZWN0aW9uOiAnY29udGVudCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJGNvbnRlbnRSZXN1bHRzQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XHJcbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcclxuICAgICAgICB0aGlzLiRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xyXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtY29udGVudC1yZXN1bHRzLXRvZ2dsZV0nKS5yZW1vdmVDbGFzcygnbmF2QmFyLWFjdGlvbicpO1xyXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0LnVybHMpO1xyXG5cclxuICAgICAgICBjb25zdCAkc2VhcmNoRm9ybSA9ICQoJ1tkYXRhLWFkdmFuY2VkLXNlYXJjaC1mb3JtXScpO1xyXG4gICAgICAgIGNvbnN0ICRjYXRlZ29yeVRyZWVDb250YWluZXIgPSAkc2VhcmNoRm9ybS5maW5kKCdbZGF0YS1zZWFyY2gtY2F0ZWdvcnktdHJlZV0nKTtcclxuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IHRyZWVEYXRhID0gW107XHJcbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIHRoaXMuJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XHJcbiAgICAgICAgdGhpcy4kY29udGVudFJlc3VsdHNDb250YWluZXIgPSAkKCcjc2VhcmNoLXJlc3VsdHMtY29udGVudCcpO1xyXG5cclxuICAgICAgICAvLyBJbml0IGZhY2V0ZWQgc2VhcmNoXHJcbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXHJcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIuZmluZCgnbGkucHJvZHVjdCcpLmxlbmd0aCA9PT0gMCB8fCB1cmwucXVlcnkuc2VjdGlvbiA9PT0gJ2NvbnRlbnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gdGhpcy5pbml0VmFsaWRhdGlvbigkc2VhcmNoRm9ybSlcclxuICAgICAgICAgICAgLmJpbmRWYWxpZGF0aW9uKCRzZWFyY2hGb3JtLmZpbmQoJyNzZWFyY2hfcXVlcnlfYWR2JykpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuY2F0ZWdvcnlUcmVlLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgdHJlZURhdGEucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShub2RlKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlUcmVlRGF0YSA9IHRyZWVEYXRhO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2F0ZWdvcnlUcmVlKCRjYXRlZ29yeVRyZWVDb250YWluZXIpO1xyXG5cclxuICAgICAgICAkc2VhcmNoRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZENhdGVnb3J5SWRzID0gJGNhdGVnb3J5VHJlZUNvbnRhaW5lci5qc3RyZWUoKS5nZXRfc2VsZWN0ZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yLmNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkc2VhcmNoRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2F0ZWdvcnlcXFtcXF1cIl0nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnlJZCBvZiBzZWxlY3RlZENhdGVnb3J5SWRzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9ICQoJzxpbnB1dD4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NhdGVnb3J5W10nLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNlYXJjaEZvcm0uYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUcmVlTm9kZXMobm9kZSwgY2IpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICcvcmVtb3RlL3YxL2NhdGVnb3J5LXRyZWUnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhdGVnb3J5SWQ6IG5vZGUuaWQsXHJcbiAgICAgICAgICAgICAgICBwcmVmaXg6ICdjYXRlZ29yeScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICd4LXhzcmYtdG9rZW4nOiB3aW5kb3cuQkNEYXRhICYmIHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA/IHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA6ICcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLmRvbmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoZGF0YU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShkYXRhTm9kZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNiKGZvcm1hdHRlZFJlc3VsdHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNhdGVnb3J5VHJlZSgkY29udGFpbmVyKSB7XHJcbiAgICAgICAgY29uc3QgdHJlZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvcmU6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IChub2RlLCBjYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJvb3Qgbm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlkID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2IodGhpcy5jYXRlZ29yeVRyZWVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMYXp5IGxvYWRlZCBjaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRUcmVlTm9kZXMobm9kZSwgY2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aGVtZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoZWNrYm94OiB7XHJcbiAgICAgICAgICAgICAgICB0aHJlZV9zdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgICAgICAgICdjaGVja2JveCcsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJGNvbnRhaW5lci5qc3RyZWUodHJlZU9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xyXG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgJHNlYXJjaEhlYWRpbmcgPSAkKCcjc2VhcmNoLXJlc3VsdHMtaGVhZGluZycpO1xyXG4gICAgICAgIGNvbnN0ICRzZWFyY2hDb3VudCA9ICQoJyNzZWFyY2gtcmVzdWx0cy1wcm9kdWN0LWNvdW50Jyk7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LnNlYXJjaFByb2R1Y3RzUGVyUGFnZTtcclxuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnc2VhcmNoL3Byb2R1Y3QtbGlzdGluZycsXHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnc2VhcmNoL3NpZGViYXInLFxyXG4gICAgICAgICAgICAgICAgaGVhZGluZzogJ3NlYXJjaC9oZWFkaW5nJyxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RDb3VudDogJ3NlYXJjaC9wcm9kdWN0LWNvdW50JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0X3Jlc3VsdHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2hvd01vcmU6ICdzZWFyY2gvc2hvdy1tb3JlJyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcclxuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XHJcbiAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcclxuICAgICAgICAgICAgJHNlYXJjaEhlYWRpbmcuaHRtbChjb250ZW50LmhlYWRpbmcpO1xyXG4gICAgICAgICAgICAkc2VhcmNoQ291bnQuaHRtbChjb250ZW50LnByb2R1Y3RDb3VudCk7XHJcblxyXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFZhbGlkYXRpb24oJGZvcm0pIHtcclxuICAgICAgICB0aGlzLiRmb3JtID0gJGZvcm07XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6ICRmb3JtLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBiaW5kVmFsaWRhdGlvbigkZWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci5hZGQoe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICRlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICRlbGVtZW50LmRhdGEoJ2Vycm9yTWVzc2FnZScpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9
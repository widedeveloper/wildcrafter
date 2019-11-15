(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/custom/subscriptions.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/custom/subscriptions.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Subscriptions; });
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.function.name */ "./node_modules/core-js/modules/es6.function.name.js");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var Subscriptions =
/*#__PURE__*/
function (_PageManager) {
  _inheritsLoose(Subscriptions, _PageManager);

  function Subscriptions() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Subscriptions.prototype;

  _proto.onReady = function onReady() {
    this.noSubscriptionsText = 'You do not have any active subscriptions';
    this.bindEvents();
    this.customerSubscriptions();
  } // dropdown menu handler
  ;

  _proto.dropdownHandler = function dropdownHandler(current_card) {
    var self = this; // Set

    var main = jquery__WEBPACK_IMPORTED_MODULE_2___default()('div.mm-dropdown .textfirst');
    var li = jquery__WEBPACK_IMPORTED_MODULE_2___default()('div.mm-dropdown > ul > li.input-option');
    var inputoption = jquery__WEBPACK_IMPORTED_MODULE_2___default()("div.mm-dropdown .option");
    var default_text = '<img src="' + this.paymentMethodImageurl(current_card.cardType) + '" width="30" height="30" style="float: left;"/><div class="subscription-card-num">&#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 <strong>' + current_card.last4 + '</strong></div><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" width="10" height="10" class="down" />'; // Animation

    main.click(function () {
      main.html(default_text);
      li.toggle('fast');
    }); // Insert Data

    li.click(function () {
      // hide
      li.toggle('fast');
      var livalue = jquery__WEBPACK_IMPORTED_MODULE_2___default()(this).data('value');
      var lihtml = jquery__WEBPACK_IMPORTED_MODULE_2___default()(this).html();
      main.html(lihtml);
      inputoption.val(livalue);
      var payment_id = livalue;
      var subscriptionId = jquery__WEBPACK_IMPORTED_MODULE_2___default()('#subcription-delete').data('subid');
      self.customerSubscriptionPayment(subscriptionId, payment_id);
    });
  };

  _proto.customerPayment = function customerPayment(current_card) {
    var clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    var apiHost = 'https://dev-api.wildcrafter.com';
    var self = this;
    jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
          url: apiHost + '/customer/payments/',
          type: 'GET',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          success: function success(data) {
            console.log('customer payments: ');
            console.log(data);
            var credit_cards = data.results.credit_cards;

            if (credit_cards) {
              self.setpaymentmethodlist(credit_cards, current_card);
              self.dropdownHandler(current_card);
            }
          },
          // Array of customer subscriptions
          fail: function fail(jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
          }
        });
      }
    });
  };

  _proto.paymentMethodImageurl = function paymentMethodImageurl(card_type) {
    var img_url = '';

    if (card_type == "American Express") {
      img_url = '/stencil/00000000-0000-0000-0000-000000000001/img/payment-methods/american_express.svg';
    }

    return img_url;
  }
  /**
   * Set all payment method in select box
   * input param - credit_cards : payment method array
   */
  ;

  _proto.setpaymentmethodlist = function setpaymentmethodlist(credit_cards, current_card) {
    var _this = this;

    var html = '';
    html = '<div class="textfirst"><img src="' + this.paymentMethodImageurl(current_card.cardType) + '" width="30" height="30" style="float: left;" /><div class="subscription-card-num">&#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 <strong>' + current_card.last4 + '</strong></div></div><ul>';
    credit_cards.forEach(function (cards) {
      html += '<li class="input-option" data-value="' + cards.uniqueNumberIdentifier + '">' + '<img src="' + _this.paymentMethodImageurl(cards.cardType) + '" alt="" width="30" height="30" style="float: left;"/><div class="subscription-card-num">&#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 <strong>' + cards.last4 + '</strong></div> </li>';
    });
    html += '</ul> <input type="hidden" class="option" name="namesubmit" value="" />';
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#payment-method-select').append(html);
  };

  _proto.customerSubscriptionPayment = function customerSubscriptionPayment(subScriptonId, payment_id) {
    var clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    var apiHost = 'https://dev-api.wildcrafter.com';
    var self = this;
    jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
          url: apiHost + '/customer/subscriptions/' + subScriptonId + '/payment',
          type: 'Post',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          data: {
            payment_id: payment_id
          },
          success: function success(data) {
            console.log('customer subscription payment: ');
            console.log(data);
          },
          // Array of customer subscriptions
          fail: function fail(jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
          }
        });
      }
    });
  }
  /**
   * Get subscriptions
   */
  ;

  _proto.customerSubscriptions = function customerSubscriptions() {
    var clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    var apiHost = 'https://dev-api.wildcrafter.com';

    var subscriptionItem = function subscriptionItem(_ref) {
      var data = _ref.data,
          productCount = _ref.productCount,
          itemCount = _ref.itemCount;
      return "\n    <div class=\"subscription-item\">\n      <div class=\"item-info\">\n        <div class=\"icon\"></div>\n        <div class=\"left-align\">          \n          <p><span class=\"frequency\">" + frequency(data.name) + "</span></p>\n          <p><span class=\"number\">Subscription #: " + data.id + "</span></p>\n          <p><span class=\"products\">" + productCount + " products | " + itemCount + " Items</span></p>          \n        </div>\n        <span class=\"date\">" + data.billingPeriodStartDate + "</span>\n      </div>\n      <div class=\"ship-to\">\n        <div class=\"icon\"></div>\n        <div>\n          <p><span class=\"shipping-title\">Ships To</span></p>\n          <p><span class=\"shipping\">" + data.shipping[0].street_1 + " " + data.shipping[0].city + ", " + data.shipping[0].state + ", " + data.shipping[0].zip + "</span></p>\n        </div>\n      </div>    \n      <div class=\"manage-button\">\n        <button class=\"button form-prefixPostfix-button--postfix button--tertiary optimizedCheckout-buttonSecondary mdc-button mdc-button--x-small secondary manage_button\" data-subId=\"" + data.id + "\">Manage</button>\n      </div>      \n    </div>\n  ";
    }; // TODO: Map the frequency titles to plans


    var frequency = function frequency(type) {
      return type;
    };

    var self = this;
    jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        console.log('success ' + data);
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
          url: apiHost + '/customer/subscriptions',
          type: 'GET',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          success: function success(data) {
            var subscriptions = data.results.subscriptions;
            console.log("subscriptions====", subscriptions);
            var item = [];
            var x = 0;
            var itemCount = 0;
            var productCount = 0;

            if (subscriptions) {
              subscriptions.forEach(function (product) {
                var subaddOns = product.addOns;
                subaddOns.forEach(function (addOns) {
                  productCount++;
                  itemCount = parseInt(itemCount) + parseInt(addOns.quantity);
                });
                item[x] = {
                  data: product,
                  productCount: productCount,
                  itemCount: itemCount
                };
                x++;
              });
              jquery__WEBPACK_IMPORTED_MODULE_2___default()('#subscriptions').html(item.map(subscriptionItem).join('')).show();
              self.managerButtonHandler();
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_2___default()('#subscriptions').text(noSubscriptionsText).show();
            }
          } // Array of customer subscriptions

        });
      }
    });
  } // manager button handler
  ;

  _proto.managerButtonHandler = function managerButtonHandler() {
    var _this2 = this;

    jquery__WEBPACK_IMPORTED_MODULE_2___default()('.manage_button').on('click', function (event) {
      console.log('managebutton clicked');
      event.preventDefault();
      var subscriptionId = jquery__WEBPACK_IMPORTED_MODULE_2___default()(event.currentTarget).data('subid');
      console.log("ID", subscriptionId); //call second ajax 

      _this2.customerSubscription(subscriptionId); // console.log('plan id: ' + this.data('planId'));


      jquery__WEBPACK_IMPORTED_MODULE_2___default()('#subscriptions').hide();
    });
  };

  _proto.customerSubscription = function customerSubscription(subscriptionId) {
    var clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    var apiHost = 'https://dev-api.wildcrafter.com';
    console.log('attempt customer subscription');
    var self = this;
    jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
          url: apiHost + '/customer/subscriptions/' + subscriptionId,
          type: 'GET',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          success: function success(data) {
            console.log('customer subscription: ');
            console.log(data);
            var subscription = data.results.subscription;

            if (subscription) {
              self.edit_subscription(subscription);
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_2___default()('.has-no-subscriptions').show();
            }
          },
          // Array of customer subscriptions
          fail: function fail(jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
          }
        });
      }
    });
  };

  _proto.deleteSubscription = function deleteSubscription(subscriptionId) {
    var clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    var apiHost = 'https://dev-api.wildcrafter.com';
    console.log('attempt to delete subscription');
    jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
          url: apiHost + '/customer/subscriptions/' + subscriptionId,
          type: 'DELETE',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          success: function success(data) {
            console.log('customer subscription deleted: ');
            console.log(data);
          },
          // Array of customer subscriptions
          fail: function fail(jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
          }
        });
      }
    });
  };

  _proto.edit_subscription = function edit_subscription(subscription) {
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#plan_id').html(subscription.name);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#order_id').html(subscription.id);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#ship_to').html(subscription.shipping[0].street_1 + " " + subscription.shipping[0].city + ", " + subscription.shipping[0].state + ", " + subscription.shipping[0].zip);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#active_status').html(subscription.status);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#first_bill_date').html(subscription.firstBillingDate);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#current_bill_period').html(subscription.billingPeriodStartDate + "-" + subscription.billingPeriodEndDate);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#next_bill_date').html(subscription.nextBillingDate);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#next_bill_amount').html(subscription.nextBillAmount);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#recurrence').html(subscription.name);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#subcription-delete').data('subid', subscription.id);
    var discountAmount = subscription.discounts[0].amount;
    this.subscriptionList(subscription.addOns, discountAmount);
    var current_card = subscription.transactions[0].creditCard;
    this.customerPayment(current_card);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#edit-subscriptions').show();
  };

  _proto.subscriptionList = function subscriptionList(subproduct, discountAmount) {
    var html = '';
    var subtotal = 0;
    subproduct.forEach(function (product) {
      var disAmount = parseInt(product.amount) - parseInt(discountAmount);
      html += '<div class="shopping-cart__product cart-page-products">' + '<a target="_top" href="">' + '<div class="shopping-cart__product-img-container">' + '<img class="shopping-cart__product-img  lazyload" data-sizes="auto"' + 'src="https://cdn.wildcrafter.com/wp-content/uploads/2019/06/02071130/Inner-Warrior-Vertical-Box-w-K-Cups-Left-768x576.png"' + 'alt="{{image.alt}}" title="{{image.alt}}">' + '</div>' + '</a>' + '<div class="shopping-cart__product-info-container">' + '<a target="_top" href="">' + '<div class="shopping-cart__product-info-label">' + product.name + '</div>' + '</a>' + '<div class="shopping-cžart__product-info-sub">Quantity</div>' + '<div class="quantity">' + product.quantity + ' Pods</div>' + '</div>' + '<div class="shopping-cart__product_price  price--discounted">$' + product.amount + '</div>' + '<div class="shopping-cart__product_price">$' + disAmount + '.00</div>' + '</div>';
      subtotal = parseInt(subtotal) + parseInt(product.amount);
    });
    var total = parseInt(subtotal) + 2.5;
    jquery__WEBPACK_IMPORTED_MODULE_2___default()("#subscription_list").append(html);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#sub_total').children().html(subtotal);
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#taxes').children().html('2.5');
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#shopping').children().html('Free');
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#total').children().html(total);
  };

  _proto.bindEvents = function bindEvents() {
    var _this3 = this;

    /**
    * Delete subscriptions
    */
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#subcription-delete').on('click', function (event) {
      console.log('subscription delete handler');
      event.preventDefault();
      var subscriptionId = jquery__WEBPACK_IMPORTED_MODULE_2___default()(event.currentTarget).data('subid');
      console.log("ID", subscriptionId);

      _this3.deleteSubscription(subscriptionId);
    }); // payment method select handler
    // $('#payment-method-select').on('click', event => {
    //   console.log("select change");
    //   const $select = $(event.currentTarget);
    //   const payment_id = $select.data('paymentId');
    //   const subscriptionId = $('#subcription-delete').data('subid');
    //   this.customerSubscriptionPayment(subscriptionId, payment_id);
    // });
  };

  return Subscriptions;
}(_page_manager__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL3N1YnNjcmlwdGlvbnMuanMiXSwibmFtZXMiOlsiU3Vic2NyaXB0aW9ucyIsIm9uUmVhZHkiLCJub1N1YnNjcmlwdGlvbnNUZXh0IiwiYmluZEV2ZW50cyIsImN1c3RvbWVyU3Vic2NyaXB0aW9ucyIsImRyb3Bkb3duSGFuZGxlciIsImN1cnJlbnRfY2FyZCIsInNlbGYiLCJtYWluIiwiJCIsImxpIiwiaW5wdXRvcHRpb24iLCJkZWZhdWx0X3RleHQiLCJwYXltZW50TWV0aG9kSW1hZ2V1cmwiLCJjYXJkVHlwZSIsImxhc3Q0IiwiY2xpY2siLCJodG1sIiwidG9nZ2xlIiwibGl2YWx1ZSIsImRhdGEiLCJsaWh0bWwiLCJ2YWwiLCJwYXltZW50X2lkIiwic3Vic2NyaXB0aW9uSWQiLCJjdXN0b21lclN1YnNjcmlwdGlvblBheW1lbnQiLCJjdXN0b21lclBheW1lbnQiLCJjbGllbnRJZCIsImFwaUhvc3QiLCJhamF4IiwidXJsIiwic3VjY2VzcyIsInRva2VuIiwidHlwZSIsImJlZm9yZVNlbmQiLCJ4aHIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiY29uc29sZSIsImxvZyIsImNyZWRpdF9jYXJkcyIsInJlc3VsdHMiLCJzZXRwYXltZW50bWV0aG9kbGlzdCIsImZhaWwiLCJqcVhIUiIsInRleHRTdGF0dXMiLCJhbGVydCIsImNhcmRfdHlwZSIsImltZ191cmwiLCJmb3JFYWNoIiwiY2FyZHMiLCJ1bmlxdWVOdW1iZXJJZGVudGlmaWVyIiwiYXBwZW5kIiwic3ViU2NyaXB0b25JZCIsInN1YnNjcmlwdGlvbkl0ZW0iLCJwcm9kdWN0Q291bnQiLCJpdGVtQ291bnQiLCJmcmVxdWVuY3kiLCJuYW1lIiwiaWQiLCJiaWxsaW5nUGVyaW9kU3RhcnREYXRlIiwic2hpcHBpbmciLCJzdHJlZXRfMSIsImNpdHkiLCJzdGF0ZSIsInppcCIsInN1YnNjcmlwdGlvbnMiLCJpdGVtIiwieCIsInByb2R1Y3QiLCJzdWJhZGRPbnMiLCJhZGRPbnMiLCJwYXJzZUludCIsInF1YW50aXR5IiwibWFwIiwiam9pbiIsInNob3ciLCJtYW5hZ2VyQnV0dG9uSGFuZGxlciIsInRleHQiLCJvbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwiY3VzdG9tZXJTdWJzY3JpcHRpb24iLCJoaWRlIiwic3Vic2NyaXB0aW9uIiwiZWRpdF9zdWJzY3JpcHRpb24iLCJkZWxldGVTdWJzY3JpcHRpb24iLCJzdGF0dXMiLCJmaXJzdEJpbGxpbmdEYXRlIiwiYmlsbGluZ1BlcmlvZEVuZERhdGUiLCJuZXh0QmlsbGluZ0RhdGUiLCJuZXh0QmlsbEFtb3VudCIsImRpc2NvdW50QW1vdW50IiwiZGlzY291bnRzIiwiYW1vdW50Iiwic3Vic2NyaXB0aW9uTGlzdCIsInRyYW5zYWN0aW9ucyIsImNyZWRpdENhcmQiLCJzdWJwcm9kdWN0Iiwic3VidG90YWwiLCJkaXNBbW91bnQiLCJ0b3RhbCIsImNoaWxkcmVuIiwiUGFnZU1hbmFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0lBQ3FCQSxhOzs7Ozs7Ozs7OztTQUNuQkMsTyxHQUFBLG1CQUFVO0FBQ1IsU0FBS0MsbUJBQUwsR0FBMkIsMENBQTNCO0FBRUEsU0FBS0MsVUFBTDtBQUNBLFNBQUtDLHFCQUFMO0FBQ0QsRyxDQUVEOzs7U0FDQUMsZSxHQUFBLHlCQUFnQkMsWUFBaEIsRUFBOEI7QUFDNUIsUUFBSUMsSUFBSSxHQUFHLElBQVgsQ0FENEIsQ0FFNUI7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHQyw2Q0FBQyxDQUFDLDRCQUFELENBQVo7QUFDQSxRQUFJQyxFQUFFLEdBQUdELDZDQUFDLENBQUMsd0NBQUQsQ0FBVjtBQUNBLFFBQUlFLFdBQVcsR0FBR0YsNkNBQUMsQ0FBQyx5QkFBRCxDQUFuQjtBQUNBLFFBQUlHLFlBQVksR0FBRyxlQUFhLEtBQUtDLHFCQUFMLENBQTJCUCxZQUFZLENBQUNRLFFBQXhDLENBQWIsR0FB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QUFLLEdBQUc5QixRQUFRLENBQUM0QixRQUFELENBQVIsR0FBcUIsR0FBakM7QUFDQTFGLGlEQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUF3QjBDLE1BQXhCLENBQStCbEMsSUFBL0I7QUFDQVIsaURBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0I2RixRQUFoQixHQUEyQnJGLElBQTNCLENBQWdDa0YsUUFBaEM7QUFDQTFGLGlEQUFDLENBQUMsUUFBRCxDQUFELENBQVk2RixRQUFaLEdBQXVCckYsSUFBdkIsQ0FBNEIsS0FBNUI7QUFDQVIsaURBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZTZGLFFBQWYsR0FBMEJyRixJQUExQixDQUErQixNQUEvQjtBQUNBUixpREFBQyxDQUFDLFFBQUQsQ0FBRCxDQUFZNkYsUUFBWixHQUF1QnJGLElBQXZCLENBQTRCb0YsS0FBNUI7QUFFRCxHOztTQUdEbEcsVSxHQUFBLHNCQUFhO0FBQUE7O0FBRVg7OztBQUdBTSxpREFBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUJxRSxFQUF6QixDQUE0QixPQUE1QixFQUFxQyxVQUFDQyxLQUFELEVBQVc7QUFDOUMxQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBWjtBQUNBeUMsV0FBSyxDQUFDQyxjQUFOO0FBQ0EsVUFBTXhELGNBQWMsR0FBR2YsNkNBQUMsQ0FBQ3NFLEtBQUssQ0FBQ0UsYUFBUCxDQUFELENBQXVCN0QsSUFBdkIsQ0FBNEIsT0FBNUIsQ0FBdkI7QUFDQWlCLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVosRUFBa0JkLGNBQWxCOztBQUNBLFlBQUksQ0FBQzhELGtCQUFMLENBQXdCOUQsY0FBeEI7QUFDRCxLQU5ELEVBTFcsQ0FhWDtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBR0QsRzs7O0VBOVh3QytFLHFEIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Vic2NyaXB0aW9ucyBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLm5vU3Vic2NyaXB0aW9uc1RleHQgPSAnWW91IGRvIG5vdCBoYXZlIGFueSBhY3RpdmUgc3Vic2NyaXB0aW9ucyc7XG4gIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMuY3VzdG9tZXJTdWJzY3JpcHRpb25zKCk7XG4gIH1cblxuICAvLyBkcm9wZG93biBtZW51IGhhbmRsZXJcbiAgZHJvcGRvd25IYW5kbGVyKGN1cnJlbnRfY2FyZCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBTZXRcbiAgICB2YXIgbWFpbiA9ICQoJ2Rpdi5tbS1kcm9wZG93biAudGV4dGZpcnN0JylcbiAgICB2YXIgbGkgPSAkKCdkaXYubW0tZHJvcGRvd24gPiB1bCA+IGxpLmlucHV0LW9wdGlvbicpXG4gICAgdmFyIGlucHV0b3B0aW9uID0gJChcImRpdi5tbS1kcm9wZG93biAub3B0aW9uXCIpXG4gICAgdmFyIGRlZmF1bHRfdGV4dCA9ICc8aW1nIHNyYz1cIicrdGhpcy5wYXltZW50TWV0aG9kSW1hZ2V1cmwoY3VycmVudF9jYXJkLmNhcmRUeXBlKSsnXCIgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgc3R5bGU9XCJmbG9hdDogbGVmdDtcIi8+PGRpdiBjbGFzcz1cInN1YnNjcmlwdGlvbi1jYXJkLW51bVwiPiYjOTY3OSYjOTY3OSYjOTY3OSYjOTY3OSAmIzk2NzkmIzk2NzkmIzk2NzkmIzk2NzkgJiM5Njc5JiM5Njc5JiM5Njc5JiM5Njc5IDxzdHJvbmc+JytjdXJyZW50X2NhcmQubGFzdDQrJzwvc3Ryb25nPjwvZGl2PjxpbWcgc3JjPVwiaHR0cHM6Ly9jZG40Lmljb25maW5kZXIuY29tL2RhdGEvaWNvbnMvaW9uaWNvbnMvNTEyL2ljb24tYXJyb3ctZG93bi1iLTEyOC5wbmdcIiB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiMTBcIiBjbGFzcz1cImRvd25cIiAvPic7XG4gIFxuICAgIC8vIEFuaW1hdGlvblxuICAgIG1haW4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBtYWluLmh0bWwoZGVmYXVsdF90ZXh0KTtcbiAgICAgIGxpLnRvZ2dsZSgnZmFzdCcpO1xuICAgIH0pO1xuICBcbiAgICAvLyBJbnNlcnQgRGF0YVxuICAgIGxpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaGlkZVxuICAgICAgbGkudG9nZ2xlKCdmYXN0Jyk7XG4gICAgICB2YXIgbGl2YWx1ZSA9ICQodGhpcykuZGF0YSgndmFsdWUnKTtcbiAgICAgIHZhciBsaWh0bWwgPSAkKHRoaXMpLmh0bWwoKTtcbiAgICAgIG1haW4uaHRtbChsaWh0bWwpO1xuICAgICAgaW5wdXRvcHRpb24udmFsKGxpdmFsdWUpO1xuXG4gICAgICBjb25zdCBwYXltZW50X2lkID0gbGl2YWx1ZTtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbklkID0gJCgnI3N1YmNyaXB0aW9uLWRlbGV0ZScpLmRhdGEoJ3N1YmlkJyk7XG4gICAgICBzZWxmLmN1c3RvbWVyU3Vic2NyaXB0aW9uUGF5bWVudChzdWJzY3JpcHRpb25JZCwgcGF5bWVudF9pZCk7XG4gICAgfSk7XG4gIH1cbiAgY3VzdG9tZXJQYXltZW50KGN1cnJlbnRfY2FyZCl7XG4gICAgY29uc3QgY2xpZW50SWQgPSAnazk3emNtdDc1bjkwcmxhZnV1b3d4emY5N29qNmFvZCc7XG4gICAgY29uc3QgYXBpSG9zdCA9ICdodHRwczovL2Rldi1hcGkud2lsZGNyYWZ0ZXIuY29tJztcbiAgICBcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9jdXN0b21lci9jdXJyZW50Lmp3dD9hcHBfY2xpZW50X2lkPScgKyBjbGllbnRJZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGRhdGE7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgdXJsOiBhcGlIb3N0ICsgJy9jdXN0b21lci9wYXltZW50cy8nLFxuICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUF1dGgtQ2xpZW50JywgY2xpZW50SWQpO1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXV0aC1Ub2tlbicsIHRva2VuKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgcGF5bWVudHM6ICcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB2YXIgY3JlZGl0X2NhcmRzID0gZGF0YS5yZXN1bHRzLmNyZWRpdF9jYXJkcztcbiAgICAgICAgICAgIGlmKGNyZWRpdF9jYXJkcyl7XG4gICAgICAgICAgICAgIHNlbGYuc2V0cGF5bWVudG1ldGhvZGxpc3QoY3JlZGl0X2NhcmRzLCBjdXJyZW50X2NhcmQpO1xuICAgICAgICAgICAgICBzZWxmLmRyb3Bkb3duSGFuZGxlcihjdXJyZW50X2NhcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgfSwgLy8gQXJyYXkgb2YgY3VzdG9tZXIgc3Vic2NyaXB0aW9uc1xuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgYWxlcnQoJ1JlcXVlc3QgZmFpbGVkOiAnICsgdGV4dFN0YXR1cyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcGF5bWVudE1ldGhvZEltYWdldXJsKGNhcmRfdHlwZSkge1xuICAgIHZhciBpbWdfdXJsID0gJyc7XG4gICAgaWYoY2FyZF90eXBlID09IFwiQW1lcmljYW4gRXhwcmVzc1wiKXtcbiAgICAgIGltZ191cmwgPSAnL3N0ZW5jaWwvMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxL2ltZy9wYXltZW50LW1ldGhvZHMvYW1lcmljYW5fZXhwcmVzcy5zdmcnO1xuICAgIH1cbiAgICByZXR1cm4gaW1nX3VybDtcbiAgfVxuICAvKipcbiAgICogU2V0IGFsbCBwYXltZW50IG1ldGhvZCBpbiBzZWxlY3QgYm94XG4gICAqIGlucHV0IHBhcmFtIC0gY3JlZGl0X2NhcmRzIDogcGF5bWVudCBtZXRob2QgYXJyYXlcbiAgICovXG4gIHNldHBheW1lbnRtZXRob2RsaXN0KGNyZWRpdF9jYXJkcywgY3VycmVudF9jYXJkKXtcbiAgICB2YXIgaHRtbCA9ICcnO1xuICAgIGh0bWwgPSAnPGRpdiBjbGFzcz1cInRleHRmaXJzdFwiPjxpbWcgc3JjPVwiJyt0aGlzLnBheW1lbnRNZXRob2RJbWFnZXVybChjdXJyZW50X2NhcmQuY2FyZFR5cGUpKydcIiB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiBzdHlsZT1cImZsb2F0OiBsZWZ0O1wiIC8+PGRpdiBjbGFzcz1cInN1YnNjcmlwdGlvbi1jYXJkLW51bVwiPiYjOTY3OSYjOTY3OSYjOTY3OSYjOTY3OSAmIzk2NzkmIzk2NzkmIzk2NzkmIzk2NzkgJiM5Njc5JiM5Njc5JiM5Njc5JiM5Njc5IDxzdHJvbmc+JysgY3VycmVudF9jYXJkLmxhc3Q0Kyc8L3N0cm9uZz48L2Rpdj48L2Rpdj48dWw+JztcblxuICAgIGNyZWRpdF9jYXJkcy5mb3JFYWNoKGNhcmRzPT4ge1xuICAgICAgaHRtbCArPSAnPGxpIGNsYXNzPVwiaW5wdXQtb3B0aW9uXCIgZGF0YS12YWx1ZT1cIicrY2FyZHMudW5pcXVlTnVtYmVySWRlbnRpZmllcisnXCI+JytcbiAgICAgICc8aW1nIHNyYz1cIicrdGhpcy5wYXltZW50TWV0aG9kSW1hZ2V1cmwoY2FyZHMuY2FyZFR5cGUpKydcIiBhbHQ9XCJcIiB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiBzdHlsZT1cImZsb2F0OiBsZWZ0O1wiLz48ZGl2IGNsYXNzPVwic3Vic2NyaXB0aW9uLWNhcmQtbnVtXCI+JiM5Njc5JiM5Njc5JiM5Njc5JiM5Njc5ICYjOTY3OSYjOTY3OSYjOTY3OSYjOTY3OSAmIzk2NzkmIzk2NzkmIzk2NzkmIzk2NzkgPHN0cm9uZz4nKyBjYXJkcy5sYXN0NCsnPC9zdHJvbmc+PC9kaXY+IDwvbGk+JztcbiAgICB9KTtcbiAgICBodG1sICs9ICc8L3VsPiA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGNsYXNzPVwib3B0aW9uXCIgbmFtZT1cIm5hbWVzdWJtaXRcIiB2YWx1ZT1cIlwiIC8+JztcbiAgICAgICAgICBcbiAgICAkKCcjcGF5bWVudC1tZXRob2Qtc2VsZWN0JykuYXBwZW5kKGh0bWwpO1xuICAgIFxuICB9XG5cbiAgY3VzdG9tZXJTdWJzY3JpcHRpb25QYXltZW50KHN1YlNjcmlwdG9uSWQsIHBheW1lbnRfaWQpe1xuICAgIGNvbnN0IGNsaWVudElkID0gJ2s5N3pjbXQ3NW45MHJsYWZ1dW93eHpmOTdvajZhb2QnO1xuICAgIGNvbnN0IGFwaUhvc3QgPSAnaHR0cHM6Ly9kZXYtYXBpLndpbGRjcmFmdGVyLmNvbSc7XG4gICAgXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvY3VzdG9tZXIvY3VycmVudC5qd3Q/YXBwX2NsaWVudF9pZD0nICsgY2xpZW50SWQsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgdG9rZW4gPSBkYXRhO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIHVybDogYXBpSG9zdCArICcvY3VzdG9tZXIvc3Vic2NyaXB0aW9ucy8nICsgc3ViU2NyaXB0b25JZCArICcvcGF5bWVudCcsXG4gICAgICAgICAgdHlwZTogJ1Bvc3QnLFxuICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUF1dGgtQ2xpZW50JywgY2xpZW50SWQpO1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXV0aC1Ub2tlbicsIHRva2VuKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHsgcGF5bWVudF9pZDogcGF5bWVudF9pZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lciBzdWJzY3JpcHRpb24gcGF5bWVudDogJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICB9LCAvLyBBcnJheSBvZiBjdXN0b21lciBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBhbGVydCgnUmVxdWVzdCBmYWlsZWQ6ICcgKyB0ZXh0U3RhdHVzKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHN1YnNjcmlwdGlvbnNcbiAgICovXG4gIGN1c3RvbWVyU3Vic2NyaXB0aW9ucygpIHtcbiAgICBjb25zdCBjbGllbnRJZCA9ICdrOTd6Y210NzVuOTBybGFmdXVvd3h6Zjk3b2o2YW9kJztcbiAgICBjb25zdCBhcGlIb3N0ID0gJ2h0dHBzOi8vZGV2LWFwaS53aWxkY3JhZnRlci5jb20nO1xuXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uSXRlbSA9ICh7IGRhdGEsIHByb2R1Y3RDb3VudCwgaXRlbUNvdW50IH0pID0+IGBcbiAgICA8ZGl2IGNsYXNzPVwic3Vic2NyaXB0aW9uLWl0ZW1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWluZm9cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZnQtYWxpZ25cIj4gICAgICAgICAgXG4gICAgICAgICAgPHA+PHNwYW4gY2xhc3M9XCJmcmVxdWVuY3lcIj4ke2ZyZXF1ZW5jeShkYXRhLm5hbWUpfTwvc3Bhbj48L3A+XG4gICAgICAgICAgPHA+PHNwYW4gY2xhc3M9XCJudW1iZXJcIj5TdWJzY3JpcHRpb24gIzogJHtkYXRhLmlkfTwvc3Bhbj48L3A+XG4gICAgICAgICAgPHA+PHNwYW4gY2xhc3M9XCJwcm9kdWN0c1wiPiR7cHJvZHVjdENvdW50fSBwcm9kdWN0cyB8ICR7aXRlbUNvdW50fSBJdGVtczwvc3Bhbj48L3A+ICAgICAgICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlXCI+JHtkYXRhLmJpbGxpbmdQZXJpb2RTdGFydERhdGV9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2hpcC10b1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPjwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPjxzcGFuIGNsYXNzPVwic2hpcHBpbmctdGl0bGVcIj5TaGlwcyBUbzwvc3Bhbj48L3A+XG4gICAgICAgICAgPHA+PHNwYW4gY2xhc3M9XCJzaGlwcGluZ1wiPiR7ZGF0YS5zaGlwcGluZ1swXS5zdHJlZXRfMX0gJHtkYXRhLnNoaXBwaW5nWzBdLmNpdHl9LCAke2RhdGEuc2hpcHBpbmdbMF0uc3RhdGV9LCAke2RhdGEuc2hpcHBpbmdbMF0uemlwfTwvc3Bhbj48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgIFxuICAgICAgPGRpdiBjbGFzcz1cIm1hbmFnZS1idXR0b25cIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBmb3JtLXByZWZpeFBvc3RmaXgtYnV0dG9uLS1wb3N0Zml4IGJ1dHRvbi0tdGVydGlhcnkgb3B0aW1pemVkQ2hlY2tvdXQtYnV0dG9uU2Vjb25kYXJ5IG1kYy1idXR0b24gbWRjLWJ1dHRvbi0teC1zbWFsbCBzZWNvbmRhcnkgbWFuYWdlX2J1dHRvblwiIGRhdGEtc3ViSWQ9XCIke2RhdGEuaWR9XCI+TWFuYWdlPC9idXR0b24+XG4gICAgICA8L2Rpdj4gICAgICBcbiAgICA8L2Rpdj5cbiAgYDtcblxuICAgIC8vIFRPRE86IE1hcCB0aGUgZnJlcXVlbmN5IHRpdGxlcyB0byBwbGFuc1xuICAgIHZhciBmcmVxdWVuY3kgPSB0eXBlID0+IHtcbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH07XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9jdXN0b21lci9jdXJyZW50Lmp3dD9hcHBfY2xpZW50X2lkPScgKyBjbGllbnRJZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGRhdGE7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzICcgKyBkYXRhKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICB1cmw6IGFwaUhvc3QgKyAnL2N1c3RvbWVyL3N1YnNjcmlwdGlvbnMnLFxuICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUF1dGgtQ2xpZW50JywgY2xpZW50SWQpO1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXV0aC1Ub2tlbicsIHRva2VuKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IGRhdGEucmVzdWx0cy5zdWJzY3JpcHRpb25zO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWJzY3JpcHRpb25zPT09PVwiLCBzdWJzY3JpcHRpb25zKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBbXTtcbiAgICAgICAgICAgIHZhciB4ID0gMDtcbiAgICAgICAgICAgIHZhciBpdGVtQ291bnQgPSAwO1xuICAgICAgICAgICAgdmFyIHByb2R1Y3RDb3VudCA9IDA7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9ucykge1xuICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YmFkZE9ucyA9IHByb2R1Y3QuYWRkT25zO1xuICAgICAgICAgICAgICAgIHN1YmFkZE9ucy5mb3JFYWNoKGFkZE9ucyA9PntcbiAgICAgICAgICAgICAgICAgIHByb2R1Y3RDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgaXRlbUNvdW50ID0gcGFyc2VJbnQoaXRlbUNvdW50KSArIHBhcnNlSW50KGFkZE9ucy5xdWFudGl0eSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaXRlbVt4XSA9IHsgZGF0YTogcHJvZHVjdCwgcHJvZHVjdENvdW50OiBwcm9kdWN0Q291bnQsIGl0ZW1Db3VudDogaXRlbUNvdW50IH07XG4gICAgICAgICAgICAgICAgeCsrO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgJCgnI3N1YnNjcmlwdGlvbnMnKVxuICAgICAgICAgICAgICAgIC5odG1sKGl0ZW0ubWFwKHN1YnNjcmlwdGlvbkl0ZW0pLmpvaW4oJycpKVxuICAgICAgICAgICAgICAgIC5zaG93KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5tYW5hZ2VyQnV0dG9uSGFuZGxlcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCgnI3N1YnNjcmlwdGlvbnMnKVxuICAgICAgICAgICAgICAgIC50ZXh0KG5vU3Vic2NyaXB0aW9uc1RleHQpXG4gICAgICAgICAgICAgICAgLnNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG4gICAgICAgICAgfSwgLy8gQXJyYXkgb2YgY3VzdG9tZXIgc3Vic2NyaXB0aW9uc1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBtYW5hZ2VyIGJ1dHRvbiBoYW5kbGVyXG4gIG1hbmFnZXJCdXR0b25IYW5kbGVyKCl7XG4gICAgJCgnLm1hbmFnZV9idXR0b24nKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdtYW5hZ2VidXR0b24gY2xpY2tlZCcpO1xuICAgICAgXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3N1YmlkJyk7XG4gICAgICBjb25zb2xlLmxvZyhcIklEXCIsIHN1YnNjcmlwdGlvbklkKVxuXG4gICAgICAvL2NhbGwgc2Vjb25kIGFqYXggXG4gICAgICB0aGlzLmN1c3RvbWVyU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbklkKVxuICAgICAgLy8gY29uc29sZS5sb2coJ3BsYW4gaWQ6ICcgKyB0aGlzLmRhdGEoJ3BsYW5JZCcpKTtcbiAgICAgICQoJyNzdWJzY3JpcHRpb25zJykuaGlkZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICBjdXN0b21lclN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb25JZCkge1xuICAgIGNvbnN0IGNsaWVudElkID0gJ2s5N3pjbXQ3NW45MHJsYWZ1dW93eHpmOTdvajZhb2QnO1xuICAgIGNvbnN0IGFwaUhvc3QgPSAnaHR0cHM6Ly9kZXYtYXBpLndpbGRjcmFmdGVyLmNvbSc7XG5cbiAgICBjb25zb2xlLmxvZygnYXR0ZW1wdCBjdXN0b21lciBzdWJzY3JpcHRpb24nKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9jdXN0b21lci9jdXJyZW50Lmp3dD9hcHBfY2xpZW50X2lkPScgKyBjbGllbnRJZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGRhdGE7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgdXJsOiBhcGlIb3N0ICsgJy9jdXN0b21lci9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZCxcbiAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1BdXRoLUNsaWVudCcsIGNsaWVudElkKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUF1dGgtVG9rZW4nLCB0b2tlbik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2N1c3RvbWVyIHN1YnNjcmlwdGlvbjogJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBkYXRhLnJlc3VsdHMuc3Vic2NyaXB0aW9uO1xuXG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG5cbiAgICAgICAgICAgICAgc2VsZi5lZGl0X3N1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKCcuaGFzLW5vLXN1YnNjcmlwdGlvbnMnKVxuICAgICAgICAgICAgICAgIC5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgLy8gQXJyYXkgb2YgY3VzdG9tZXIgc3Vic2NyaXB0aW9uc1xuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgYWxlcnQoJ1JlcXVlc3QgZmFpbGVkOiAnICsgdGV4dFN0YXR1cyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbklkKSB7XG4gICAgY29uc3QgY2xpZW50SWQgPSAnazk3emNtdDc1bjkwcmxhZnV1b3d4emY5N29qNmFvZCc7XG4gICAgY29uc3QgYXBpSG9zdCA9ICdodHRwczovL2Rldi1hcGkud2lsZGNyYWZ0ZXIuY29tJztcblxuICAgIGNvbnNvbGUubG9nKCdhdHRlbXB0IHRvIGRlbGV0ZSBzdWJzY3JpcHRpb24nKTtcblxuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvY3VzdG9tZXIvY3VycmVudC5qd3Q/YXBwX2NsaWVudF9pZD0nICsgY2xpZW50SWQsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgdG9rZW4gPSBkYXRhO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIHVybDogYXBpSG9zdCArICcvY3VzdG9tZXIvc3Vic2NyaXB0aW9ucy8nICsgc3Vic2NyaXB0aW9uSWQsXG4gICAgICAgICAgdHlwZTogJ0RFTEVURScsXG4gICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXV0aC1DbGllbnQnLCBjbGllbnRJZCk7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1BdXRoLVRva2VuJywgdG9rZW4pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lciBzdWJzY3JpcHRpb24gZGVsZXRlZDogJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICB9LCAvLyBBcnJheSBvZiBjdXN0b21lciBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBhbGVydCgnUmVxdWVzdCBmYWlsZWQ6ICcgKyB0ZXh0U3RhdHVzKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBlZGl0X3N1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICAkKCcjcGxhbl9pZCcpLmh0bWwoc3Vic2NyaXB0aW9uLm5hbWUpO1xuICAgICQoJyNvcmRlcl9pZCcpLmh0bWwoc3Vic2NyaXB0aW9uLmlkKTtcbiAgICAkKCcjc2hpcF90bycpLmh0bWwoc3Vic2NyaXB0aW9uLnNoaXBwaW5nWzBdLnN0cmVldF8xICsgXCIgXCIgKyBzdWJzY3JpcHRpb24uc2hpcHBpbmdbMF0uY2l0eSArXCIsIFwiKyBzdWJzY3JpcHRpb24uc2hpcHBpbmdbMF0uc3RhdGUgKyBcIiwgXCIgKyBzdWJzY3JpcHRpb24uc2hpcHBpbmdbMF0uemlwKTtcbiAgICBcbiAgICAkKCcjYWN0aXZlX3N0YXR1cycpLmh0bWwoc3Vic2NyaXB0aW9uLnN0YXR1cyk7XG4gICAgJCgnI2ZpcnN0X2JpbGxfZGF0ZScpLmh0bWwoc3Vic2NyaXB0aW9uLmZpcnN0QmlsbGluZ0RhdGUpO1xuICAgICQoJyNjdXJyZW50X2JpbGxfcGVyaW9kJykuaHRtbChzdWJzY3JpcHRpb24uYmlsbGluZ1BlcmlvZFN0YXJ0RGF0ZSArIFwiLVwiICsgc3Vic2NyaXB0aW9uLmJpbGxpbmdQZXJpb2RFbmREYXRlKTtcbiAgICAkKCcjbmV4dF9iaWxsX2RhdGUnKS5odG1sKHN1YnNjcmlwdGlvbi5uZXh0QmlsbGluZ0RhdGUpO1xuICAgICQoJyNuZXh0X2JpbGxfYW1vdW50JykuaHRtbChzdWJzY3JpcHRpb24ubmV4dEJpbGxBbW91bnQpO1xuICAgICQoJyNyZWN1cnJlbmNlJykuaHRtbChzdWJzY3JpcHRpb24ubmFtZSk7XG4gICAgXG4gICAgJCgnI3N1YmNyaXB0aW9uLWRlbGV0ZScpLmRhdGEoJ3N1YmlkJywgc3Vic2NyaXB0aW9uLmlkKTtcblxuICAgIHZhciBkaXNjb3VudEFtb3VudCA9IHN1YnNjcmlwdGlvbi5kaXNjb3VudHNbMF0uYW1vdW50O1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uTGlzdChzdWJzY3JpcHRpb24uYWRkT25zLCBkaXNjb3VudEFtb3VudCk7XG5cbiAgICB2YXIgY3VycmVudF9jYXJkID0gc3Vic2NyaXB0aW9uLnRyYW5zYWN0aW9uc1swXS5jcmVkaXRDYXJkO1xuICAgIFxuICAgIHRoaXMuY3VzdG9tZXJQYXltZW50KGN1cnJlbnRfY2FyZCk7XG4gICAgXG4gICAgJCgnI2VkaXQtc3Vic2NyaXB0aW9ucycpLnNob3coKTtcblxuXG4gIH1cblxuICBzdWJzY3JpcHRpb25MaXN0KHN1YnByb2R1Y3QsIGRpc2NvdW50QW1vdW50KXtcbiAgICB2YXIgaHRtbCA9ICcnO1xuICAgIHZhciBzdWJ0b3RhbCA9IDA7XG4gICAgc3VicHJvZHVjdC5mb3JFYWNoKHByb2R1Y3QgPT4ge1xuICAgICAgICB2YXIgZGlzQW1vdW50ID0gcGFyc2VJbnQocHJvZHVjdC5hbW91bnQpIC0gcGFyc2VJbnQoZGlzY291bnRBbW91bnQpO1xuICAgICAgICBodG1sICs9JzxkaXYgY2xhc3M9XCJzaG9wcGluZy1jYXJ0X19wcm9kdWN0IGNhcnQtcGFnZS1wcm9kdWN0c1wiPicrXG4gICAgICAgICc8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cIlwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNob3BwaW5nLWNhcnRfX3Byb2R1Y3QtaW1nLWNvbnRhaW5lclwiPicrXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cInNob3BwaW5nLWNhcnRfX3Byb2R1Y3QtaW1nICBsYXp5bG9hZFwiIGRhdGEtc2l6ZXM9XCJhdXRvXCInK1xuICAgICAgICAgICAgICAgICdzcmM9XCJodHRwczovL2Nkbi53aWxkY3JhZnRlci5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTkvMDYvMDIwNzExMzAvSW5uZXItV2Fycmlvci1WZXJ0aWNhbC1Cb3gtdy1LLUN1cHMtTGVmdC03Njh4NTc2LnBuZ1wiJytcbiAgICAgICAgICAgICAgICAnYWx0PVwie3tpbWFnZS5hbHR9fVwiIHRpdGxlPVwie3tpbWFnZS5hbHR9fVwiPicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvYT4nK1xuICBcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJzaG9wcGluZy1jYXJ0X19wcm9kdWN0LWluZm8tY29udGFpbmVyXCI+JytcbiAgICAgICAgICAgICc8YSB0YXJnZXQ9XCJfdG9wXCIgaHJlZj1cIlwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNob3BwaW5nLWNhcnRfX3Byb2R1Y3QtaW5mby1sYWJlbFwiPicgKyBwcm9kdWN0Lm5hbWUgKyAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2E+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwic2hvcHBpbmctY8W+YXJ0X19wcm9kdWN0LWluZm8tc3ViXCI+UXVhbnRpdHk8L2Rpdj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJxdWFudGl0eVwiPicrIHByb2R1Y3QucXVhbnRpdHkgKycgUG9kczwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzaG9wcGluZy1jYXJ0X19wcm9kdWN0X3ByaWNlICBwcmljZS0tZGlzY291bnRlZFwiPiQnKyBwcm9kdWN0LmFtb3VudCArJzwvZGl2PicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNob3BwaW5nLWNhcnRfX3Byb2R1Y3RfcHJpY2VcIj4kJysgZGlzQW1vdW50ICsnLjAwPC9kaXY+JytcbiAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHN1YnRvdGFsID0gcGFyc2VJbnQoc3VidG90YWwpICsgcGFyc2VJbnQocHJvZHVjdC5hbW91bnQpO1xuICAgIH0pO1xuXG4gICAgdmFyIHRvdGFsID0gcGFyc2VJbnQoc3VidG90YWwpICsgMi41XG4gICAgJChcIiNzdWJzY3JpcHRpb25fbGlzdFwiKS5hcHBlbmQoaHRtbClcbiAgICAkKCcjc3ViX3RvdGFsJykuY2hpbGRyZW4oKS5odG1sKHN1YnRvdGFsKTtcbiAgICAkKCcjdGF4ZXMnKS5jaGlsZHJlbigpLmh0bWwoJzIuNScpO1xuICAgICQoJyNzaG9wcGluZycpLmNoaWxkcmVuKCkuaHRtbCgnRnJlZScpO1xuICAgICQoJyN0b3RhbCcpLmNoaWxkcmVuKCkuaHRtbCh0b3RhbCk7XG5cbiAgfVxuXG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICBcbiAgICAvKipcbiAgICAqIERlbGV0ZSBzdWJzY3JpcHRpb25zXG4gICAgKi9cbiAgICAkKCcjc3ViY3JpcHRpb24tZGVsZXRlJykub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc3Vic2NyaXB0aW9uIGRlbGV0ZSBoYW5kbGVyJyk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3N1YmlkJyk7XG4gICAgICBjb25zb2xlLmxvZyhcIklEXCIsIHN1YnNjcmlwdGlvbklkKVxuICAgICAgdGhpcy5kZWxldGVTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uSWQpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIHBheW1lbnQgbWV0aG9kIHNlbGVjdCBoYW5kbGVyXG4gICAgLy8gJCgnI3BheW1lbnQtbWV0aG9kLXNlbGVjdCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwic2VsZWN0IGNoYW5nZVwiKTtcbiAgICAvLyAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgXG4gICAgLy8gICBjb25zdCBwYXltZW50X2lkID0gJHNlbGVjdC5kYXRhKCdwYXltZW50SWQnKTtcbiAgICAvLyAgIGNvbnN0IHN1YnNjcmlwdGlvbklkID0gJCgnI3N1YmNyaXB0aW9uLWRlbGV0ZScpLmRhdGEoJ3N1YmlkJyk7XG5cbiAgICAvLyAgIHRoaXMuY3VzdG9tZXJTdWJzY3JpcHRpb25QYXltZW50KHN1YnNjcmlwdGlvbklkLCBwYXltZW50X2lkKTtcbiAgICAvLyB9KTtcblxuICAgIFxuICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
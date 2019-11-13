(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/custom/subscriptions.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/custom/subscriptions.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($, jQuery) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Subscriptions; });
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.function.name */ "./node_modules/core-js/modules/es6.function.name.js");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../page-manager */ "./assets/js/theme/page-manager.js");


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

    var main = $('div.mm-dropdown .textfirst');
    var li = $('div.mm-dropdown > ul > li.input-option');
    var inputoption = $("div.mm-dropdown .option");
    var default_text = '<img src="' + this.paymentMethodImageurl(current_card.cardType) + '" width="30" height="30" style="float: left;"/><div class="subscription-card-num">&#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 <strong>' + current_card.last4 + '</strong></div><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" width="10" height="10" class="down" />'; // Animation

    main.click(function () {
      main.html(default_text);
      li.toggle('fast');
    }); // Insert Data

    li.click(function () {
      // hide
      li.toggle('fast');
      var livalue = $(this).data('value');
      var lihtml = $(this).html();
      main.html(lihtml);
      inputoption.val(livalue);
      var payment_id = livalue;
      var subscriptionId = $('#subcription-delete').data('subid');
      self.customerSubscriptionPayment(subscriptionId, payment_id);
    });
  };

  _proto.customerPayment = function customerPayment(current_card) {
    var clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    var apiHost = 'https://dev-api.wildcrafter.com';
    var self = this;
    jQuery.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        jQuery.ajax({
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
    $('#payment-method-select').append(html);
  };

  _proto.customerSubscriptionPayment = function customerSubscriptionPayment(subScriptonId, payment_id) {
    var clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    var apiHost = 'https://dev-api.wildcrafter.com';
    var self = this;
    jQuery.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        jQuery.ajax({
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
    jQuery.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        console.log('success ' + data);
        jQuery.ajax({
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
              jQuery('#subscriptions').html(item.map(subscriptionItem).join('')).show();
              self.managerButtonHandler();
            } else {
              jQuery('#subscriptions').text(noSubscriptionsText).show();
            }
          } // Array of customer subscriptions

        });
      }
    });
  } // manager button handler
  ;

  _proto.managerButtonHandler = function managerButtonHandler() {
    var _this2 = this;

    $('.manage_button').on('click', function (event) {
      console.log('managebutton clicked');
      event.preventDefault();
      var subscriptionId = $(event.currentTarget).data('subid');
      console.log("ID", subscriptionId); //call second ajax 

      _this2.customerSubscription(subscriptionId); // console.log('plan id: ' + this.data('planId'));


      jQuery('#subscriptions').hide();
    });
  };

  _proto.customerSubscription = function customerSubscription(subscriptionId) {
    var clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    var apiHost = 'https://dev-api.wildcrafter.com';
    console.log('attempt customer subscription');
    var self = this;
    jQuery.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        jQuery.ajax({
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
              jQuery('.has-no-subscriptions').show();
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
    jQuery.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function success(data) {
        var token = data;
        jQuery.ajax({
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
    jQuery('#plan_id').html(subscription.name);
    jQuery('#order_id').html(subscription.id);
    jQuery('#ship_to').html(subscription.shipping[0].street_1 + " " + subscription.shipping[0].city + ", " + subscription.shipping[0].state + ", " + subscription.shipping[0].zip);
    jQuery('#active_status').html(subscription.status);
    jQuery('#first_bill_date').html(subscription.firstBillingDate);
    jQuery('#current_bill_period').html(subscription.billingPeriodStartDate + "-" + subscription.billingPeriodEndDate);
    jQuery('#next_bill_date').html(subscription.nextBillingDate);
    jQuery('#next_bill_amount').html(subscription.nextBillAmount);
    jQuery('#recurrence').html(subscription.name);
    jQuery('#subcription-delete').data('subid', subscription.id);
    var discountAmount = subscription.discounts[0].amount;
    this.subscriptionList(subscription.addOns, discountAmount);
    var current_card = subscription.transactions[0].creditCard;
    this.customerPayment(current_card);
    jQuery('#edit-subscriptions').show();
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
    $("#subscription_list").append(html);
    $('#sub_total').children().html(subtotal);
    $('#taxes').children().html('2.5');
    $('#shopping').children().html('Free');
    $('#total').children().html(total);
  };

  _proto.bindEvents = function bindEvents() {
    var _this3 = this;

    /**
    * Delete subscriptions
    */
    $('#subcription-delete').on('click', function (event) {
      console.log('subscription delete handler');
      event.preventDefault();
      var subscriptionId = $(event.currentTarget).data('subid');
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


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL3N1YnNjcmlwdGlvbnMuanMiXSwibmFtZXMiOlsiU3Vic2NyaXB0aW9ucyIsIm9uUmVhZHkiLCJub1N1YnNjcmlwdGlvbnNUZXh0IiwiYmluZEV2ZW50cyIsImN1c3RvbWVyU3Vic2NyaXB0aW9ucyIsImRyb3Bkb3duSGFuZGxlciIsImN1cnJlbnRfY2FyZCIsInNlbGYiLCJtYWluIiwiJCIsImxpIiwiaW5wdXRvcHRpb24iLCJkZWZhdWx0X3RleHQiLCJwYXltZW50TWV0aG9kSW1hZ2V1cmwiLCJjYXJkVHlwZSIsImxhc3Q0IiwiY2xpY2siLCJodG1sIiwidG9nZ2xlIiwibGl2YWx1ZSIsImRhdGEiLCJsaWh0bWwiLCJ2YWwiLCJwYXltZW50X2lkIiwic3Vic2NyaXB0aW9uSWQiLCJjdXN0b21lclN1YnNjcmlwdGlvblBheW1lbnQiLCJjdXN0b21lclBheW1lbnQiLCJjbGllbnRJZCIsImFwaUhvc3QiLCJqUXVlcnkiLCJhamF4IiwidXJsIiwic3VjY2VzcyIsInRva2VuIiwidHlwZSIsImJlZm9yZVNlbmQiLCJ4aHIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiY29uc29sZSIsImxvZyIsImNyZWRpdF9jYXJkcyIsInJlc3VsdHMiLCJzZXRwYXltZW50bWV0aG9kbGlzdCIsImZhaWwiLCJqcVhIUiIsInRleHRTdGF0dXMiLCJhbGVydCIsImNhcmRfdHlwZSIsImltZ191cmwiLCJmb3JFYWNoIiwiY2FyZHMiLCJ1bmlxdWVOdW1iZXJJZGVudGlmaWVyIiwiYXBwZW5kIiwic3ViU2NyaXB0b25JZCIsInN1YnNjcmlwdGlvbkl0ZW0iLCJwcm9kdWN0Q291bnQiLCJpdGVtQ291bnQiLCJmcmVxdWVuY3kiLCJuYW1lIiwiaWQiLCJiaWxsaW5nUGVyaW9kU3RhcnREYXRlIiwic2hpcHBpbmciLCJzdHJlZXRfMSIsImNpdHkiLCJzdGF0ZSIsInppcCIsInN1YnNjcmlwdGlvbnMiLCJpdGVtIiwieCIsInByb2R1Y3QiLCJzdWJhZGRPbnMiLCJhZGRPbnMiLCJwYXJzZUludCIsInF1YW50aXR5IiwibWFwIiwiam9pbiIsInNob3ciLCJtYW5hZ2VyQnV0dG9uSGFuZGxlciIsInRleHQiLCJvbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwiY3VzdG9tZXJTdWJzY3JpcHRpb24iLCJoaWRlIiwic3Vic2NyaXB0aW9uIiwiZWRpdF9zdWJzY3JpcHRpb24iLCJkZWxldGVTdWJzY3JpcHRpb24iLCJzdGF0dXMiLCJmaXJzdEJpbGxpbmdEYXRlIiwiYmlsbGluZ1BlcmlvZEVuZERhdGUiLCJuZXh0QmlsbGluZ0RhdGUiLCJuZXh0QmlsbEFtb3VudCIsImRpc2NvdW50QW1vdW50IiwiZGlzY291bnRzIiwiYW1vdW50Iiwic3Vic2NyaXB0aW9uTGlzdCIsInRyYW5zYWN0aW9ucyIsImNyZWRpdENhcmQiLCJzdWJwcm9kdWN0Iiwic3VidG90YWwiLCJkaXNBbW91bnQiLCJ0b3RhbCIsImNoaWxkcmVuIiwiUGFnZU1hbmFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJBLGE7Ozs7Ozs7Ozs7O1NBQ25CQyxPLEdBQUEsbUJBQVU7QUFDUixTQUFLQyxtQkFBTCxHQUEyQiwwQ0FBM0I7QUFFQSxTQUFLQyxVQUFMO0FBQ0EsU0FBS0MscUJBQUw7QUFDRCxHLENBRUQ7OztTQUNBQyxlLEdBQUEseUJBQWdCQyxZQUFoQixFQUE4QjtBQUM1QixRQUFJQyxJQUFJLEdBQUcsSUFBWCxDQUQ0QixDQUU1Qjs7QUFDQSxRQUFJQyxJQUFJLEdBQUdDLENBQUMsQ0FBQyw0QkFBRCxDQUFaO0FBQ0EsUUFBSUMsRUFBRSxHQUFHRCxDQUFDLENBQUMsd0NBQUQsQ0FBVjtBQUNBLFFBQUlFLFdBQVcsR0FBR0YsQ0FBQyxDQUFDLHlCQUFELENBQW5CO0FBQ0EsUUFBSUcsWUFBWSxHQUFHLGVBQWEsS0FBS0MscUJBQUwsQ0FBMkJQLFlBQVksQ0FBQ1EsUUFBeEMsQ0FBYixHQUErRCx1S0FBL0QsR0FBdU9SLFlBQVksQ0FBQ1MsS0FBcFAsR0FBMFAsZ0pBQTdRLENBTjRCLENBUTVCOztBQUNBUCxRQUFJLENBQUNRLEtBQUwsQ0FBVyxZQUFXO0FBQ3BCUixVQUFJLENBQUNTLElBQUwsQ0FBVUwsWUFBVjtBQUNBRixRQUFFLENBQUNRLE1BQUgsQ0FBVSxNQUFWO0FBQ0QsS0FIRCxFQVQ0QixDQWM1Qjs7QUFDQVIsTUFBRSxDQUFDTSxLQUFILENBQVMsWUFBVztBQUNsQjtBQUNBTixRQUFFLENBQUNRLE1BQUgsQ0FBVSxNQUFWO0FBQ0EsVUFBSUMsT0FBTyxHQUFHVixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFXLElBQVIsQ0FBYSxPQUFiLENBQWQ7QUFDQSxVQUFJQyxNQUFNLEdBQUdaLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVEsSUFBUixFQUFiO0FBQ0FULFVBQUksQ0FBQ1MsSUFBTCxDQUFVSSxNQUFWO0FBQ0FWLGlCQUFXLENBQUNXLEdBQVosQ0FBZ0JILE9BQWhCO0FBRUEsVUFBTUksVUFBVSxHQUFHSixPQUFuQjtBQUNBLFVBQU1LLGNBQWMsR0FBR2YsQ0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUJXLElBQXpCLENBQThCLE9BQTlCLENBQXZCO0FBQ0FiLFVBQUksQ0FBQ2tCLDJCQUFMLENBQWlDRCxjQUFqQyxFQUFpREQsVUFBakQ7QUFDRCxLQVhEO0FBWUQsRzs7U0FDREcsZSxHQUFBLHlCQUFnQnBCLFlBQWhCLEVBQTZCO0FBQzNCLFFBQU1xQixRQUFRLEdBQUcsaUNBQWpCO0FBQ0EsUUFBTUMsT0FBTyxHQUFHLGlDQUFoQjtBQUVBLFFBQUlyQixJQUFJLEdBQUcsSUFBWDtBQUNBc0IsVUFBTSxDQUFDQyxJQUFQLENBQVk7QUFDVkMsU0FBRyxFQUFFLHlDQUF5Q0osUUFEcEM7QUFFVkssYUFBTyxFQUFFLGlCQUFVWixJQUFWLEVBQWdCO0FBQ3ZCLFlBQUlhLEtBQUssR0FBR2IsSUFBWjtBQUNBUyxjQUFNLENBQUNDLElBQVAsQ0FBWTtBQUNWQyxhQUFHLEVBQUVILE9BQU8sR0FBRyxxQkFETDtBQUVWTSxjQUFJLEVBQUUsS0FGSTtBQUdWQyxvQkFBVSxFQUFFLG9CQUFVQyxHQUFWLEVBQWU7QUFDekJBLGVBQUcsQ0FBQ0MsZ0JBQUosQ0FBcUIsZUFBckIsRUFBc0NWLFFBQXRDO0FBQ0FTLGVBQUcsQ0FBQ0MsZ0JBQUosQ0FBcUIsY0FBckIsRUFBcUNKLEtBQXJDO0FBQ0QsV0FOUztBQU9WRCxpQkFBTyxFQUFFLGlCQUFVWixJQUFWLEVBQWdCO0FBQ3ZCa0IsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaO0FBQ0FELG1CQUFPLENBQUNDLEdBQVIsQ0FBWW5CLElBQVo7QUFDQSxnQkFBSW9CLFlBQVksR0FBR3BCLElBQUksQ0FBQ3FCLE9BQUwsQ0FBYUQsWUFBaEM7O0FBQ0EsZ0JBQUdBLFlBQUgsRUFBZ0I7QUFDZGpDLGtCQUFJLENBQUNtQyxvQkFBTCxDQUEwQkYsWUFBMUIsRUFBd0NsQyxZQUF4QztBQUNBQyxrQkFBSSxDQUFDRixlQUFMLENBQXFCQyxZQUFyQjtBQUNEO0FBRUYsV0FoQlM7QUFnQlA7QUFDSHFDLGNBQUksRUFBRSxjQUFVQyxLQUFWLEVBQWlCQyxVQUFqQixFQUE2QjtBQUNqQ0MsaUJBQUssQ0FBQyxxQkFBcUJELFVBQXRCLENBQUw7QUFDRDtBQW5CUyxTQUFaO0FBcUJEO0FBekJTLEtBQVo7QUEyQkQsRzs7U0FFRGhDLHFCLEdBQUEsK0JBQXNCa0MsU0FBdEIsRUFBaUM7QUFDL0IsUUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0FBQ0EsUUFBR0QsU0FBUyxJQUFJLGtCQUFoQixFQUFtQztBQUNqQ0MsYUFBTyxHQUFHLHdGQUFWO0FBQ0Q7O0FBQ0QsV0FBT0EsT0FBUDtBQUNEO0FBQ0Q7Ozs7OztTQUlBTixvQixHQUFBLDhCQUFxQkYsWUFBckIsRUFBbUNsQyxZQUFuQyxFQUFnRDtBQUFBOztBQUM5QyxRQUFJVyxJQUFJLEdBQUcsRUFBWDtBQUNBQSxRQUFJLEdBQUcsc0NBQW9DLEtBQUtKLHFCQUFMLENBQTJCUCxZQUFZLENBQUNRLFFBQXhDLENBQXBDLEdBQXNGLHdLQUF0RixHQUFnUVIsWUFBWSxDQUFDUyxLQUE3USxHQUFtUiwyQkFBMVI7QUFFQXlCLGdCQUFZLENBQUNTLE9BQWIsQ0FBcUIsVUFBQUMsS0FBSyxFQUFHO0FBQzNCakMsVUFBSSxJQUFJLDBDQUF3Q2lDLEtBQUssQ0FBQ0Msc0JBQTlDLEdBQXFFLElBQXJFLEdBQ1IsWUFEUSxHQUNLLEtBQUksQ0FBQ3RDLHFCQUFMLENBQTJCcUMsS0FBSyxDQUFDcEMsUUFBakMsQ0FETCxHQUNnRCw4S0FEaEQsR0FDZ09vQyxLQUFLLENBQUNuQyxLQUR0TyxHQUM0Tyx1QkFEcFA7QUFFRCxLQUhEO0FBSUFFLFFBQUksSUFBSSx5RUFBUjtBQUVBUixLQUFDLENBQUMsd0JBQUQsQ0FBRCxDQUE0QjJDLE1BQTVCLENBQW1DbkMsSUFBbkM7QUFFRCxHOztTQUVEUSwyQixHQUFBLHFDQUE0QjRCLGFBQTVCLEVBQTJDOUIsVUFBM0MsRUFBc0Q7QUFDcEQsUUFBTUksUUFBUSxHQUFHLGlDQUFqQjtBQUNBLFFBQU1DLE9BQU8sR0FBRyxpQ0FBaEI7QUFFQSxRQUFJckIsSUFBSSxHQUFHLElBQVg7QUFDQXNCLFVBQU0sQ0FBQ0MsSUFBUCxDQUFZO0FBQ1ZDLFNBQUcsRUFBRSx5Q0FBeUNKLFFBRHBDO0FBRVZLLGFBQU8sRUFBRSxpQkFBVVosSUFBVixFQUFnQjtBQUN2QixZQUFJYSxLQUFLLEdBQUdiLElBQVo7QUFDQVMsY0FBTSxDQUFDQyxJQUFQLENBQVk7QUFDVkMsYUFBRyxFQUFFSCxPQUFPLEdBQUcsMEJBQVYsR0FBdUN5QixhQUF2QyxHQUF1RCxVQURsRDtBQUVWbkIsY0FBSSxFQUFFLE1BRkk7QUFHVkMsb0JBQVUsRUFBRSxvQkFBVUMsR0FBVixFQUFlO0FBQ3pCQSxlQUFHLENBQUNDLGdCQUFKLENBQXFCLGVBQXJCLEVBQXNDVixRQUF0QztBQUNBUyxlQUFHLENBQUNDLGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDSixLQUFyQztBQUNELFdBTlM7QUFPVmIsY0FBSSxFQUFFO0FBQUVHLHNCQUFVLEVBQUVBO0FBQWQsV0FQSTtBQVFWUyxpQkFBTyxFQUFFLGlCQUFVWixJQUFWLEVBQWdCO0FBQ3ZCa0IsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZLGlDQUFaO0FBQ0FELG1CQUFPLENBQUNDLEdBQVIsQ0FBWW5CLElBQVo7QUFDRCxXQVhTO0FBV1A7QUFDSHVCLGNBQUksRUFBRSxjQUFVQyxLQUFWLEVBQWlCQyxVQUFqQixFQUE2QjtBQUNqQ0MsaUJBQUssQ0FBQyxxQkFBcUJELFVBQXRCLENBQUw7QUFDRDtBQWRTLFNBQVo7QUFnQkQ7QUFwQlMsS0FBWjtBQXNCRDtBQUVEOzs7OztTQUdBekMscUIsR0FBQSxpQ0FBd0I7QUFDdEIsUUFBTXVCLFFBQVEsR0FBRyxpQ0FBakI7QUFDQSxRQUFNQyxPQUFPLEdBQUcsaUNBQWhCOztBQUVBLFFBQU0wQixnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsVUFBR2xDLElBQUgsUUFBR0EsSUFBSDtBQUFBLFVBQVNtQyxZQUFULFFBQVNBLFlBQVQ7QUFBQSxVQUF1QkMsU0FBdkIsUUFBdUJBLFNBQXZCO0FBQUEscU5BS1VDLFNBQVMsQ0FBQ3JDLElBQUksQ0FBQ3NDLElBQU4sQ0FMbkIseUVBTXVCdEMsSUFBSSxDQUFDdUMsRUFONUIsMkRBT1NKLFlBUFQsb0JBT29DQyxTQVBwQyxrRkFTQXBDLElBQUksQ0FBQ3dDLHNCQVRMLHdOQWVTeEMsSUFBSSxDQUFDeUMsUUFBTCxDQUFjLENBQWQsRUFBaUJDLFFBZjFCLFNBZXNDMUMsSUFBSSxDQUFDeUMsUUFBTCxDQUFjLENBQWQsRUFBaUJFLElBZnZELFVBZWdFM0MsSUFBSSxDQUFDeUMsUUFBTCxDQUFjLENBQWQsRUFBaUJHLEtBZmpGLFVBZTJGNUMsSUFBSSxDQUFDeUMsUUFBTCxDQUFjLENBQWQsRUFBaUJJLEdBZjVHLHVSQW1CNko3QyxJQUFJLENBQUN1QyxFQW5CbEs7QUFBQSxLQUF6QixDQUpzQixDQTRCdEI7OztBQUNBLFFBQUlGLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUF2QixJQUFJLEVBQUk7QUFDdEIsYUFBT0EsSUFBUDtBQUNELEtBRkQ7O0FBSUEsUUFBSTNCLElBQUksR0FBRyxJQUFYO0FBQ0FzQixVQUFNLENBQUNDLElBQVAsQ0FBWTtBQUNWQyxTQUFHLEVBQUUseUNBQXlDSixRQURwQztBQUVWSyxhQUFPLEVBQUUsaUJBQVVaLElBQVYsRUFBZ0I7QUFDdkIsWUFBSWEsS0FBSyxHQUFHYixJQUFaO0FBQ0FrQixlQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFhbkIsSUFBekI7QUFDQVMsY0FBTSxDQUFDQyxJQUFQLENBQVk7QUFDVkMsYUFBRyxFQUFFSCxPQUFPLEdBQUcseUJBREw7QUFFVk0sY0FBSSxFQUFFLEtBRkk7QUFHVkMsb0JBQVUsRUFBRSxvQkFBVUMsR0FBVixFQUFlO0FBQ3pCQSxlQUFHLENBQUNDLGdCQUFKLENBQXFCLGVBQXJCLEVBQXNDVixRQUF0QztBQUNBUyxlQUFHLENBQUNDLGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDSixLQUFyQztBQUNELFdBTlM7QUFPVkQsaUJBQU8sRUFBRSxpQkFBVVosSUFBVixFQUFnQjtBQUN2QixnQkFBSThDLGFBQWEsR0FBRzlDLElBQUksQ0FBQ3FCLE9BQUwsQ0FBYXlCLGFBQWpDO0FBQ0E1QixtQkFBTyxDQUFDQyxHQUFSLENBQVksbUJBQVosRUFBaUMyQixhQUFqQztBQUVBLGdCQUFJQyxJQUFJLEdBQUcsRUFBWDtBQUNBLGdCQUFJQyxDQUFDLEdBQUcsQ0FBUjtBQUNBLGdCQUFJWixTQUFTLEdBQUcsQ0FBaEI7QUFDQSxnQkFBSUQsWUFBWSxHQUFHLENBQW5COztBQUNBLGdCQUFJVyxhQUFKLEVBQW1CO0FBQ2pCQSwyQkFBYSxDQUFDakIsT0FBZCxDQUFzQixVQUFBb0IsT0FBTyxFQUFJO0FBQy9CLG9CQUFJQyxTQUFTLEdBQUdELE9BQU8sQ0FBQ0UsTUFBeEI7QUFDQUQseUJBQVMsQ0FBQ3JCLE9BQVYsQ0FBa0IsVUFBQXNCLE1BQU0sRUFBRztBQUN6QmhCLDhCQUFZO0FBQ1pDLDJCQUFTLEdBQUdnQixRQUFRLENBQUNoQixTQUFELENBQVIsR0FBc0JnQixRQUFRLENBQUNELE1BQU0sQ0FBQ0UsUUFBUixDQUExQztBQUNELGlCQUhEO0FBSUFOLG9CQUFJLENBQUNDLENBQUQsQ0FBSixHQUFVO0FBQUVoRCxzQkFBSSxFQUFFaUQsT0FBUjtBQUFpQmQsOEJBQVksRUFBRUEsWUFBL0I7QUFBNkNDLDJCQUFTLEVBQUVBO0FBQXhELGlCQUFWO0FBQ0FZLGlCQUFDO0FBQ0YsZUFSRDtBQVNBdkMsb0JBQU0sQ0FBQyxnQkFBRCxDQUFOLENBQ0daLElBREgsQ0FDUWtELElBQUksQ0FBQ08sR0FBTCxDQUFTcEIsZ0JBQVQsRUFBMkJxQixJQUEzQixDQUFnQyxFQUFoQyxDQURSLEVBRUdDLElBRkg7QUFHRXJFLGtCQUFJLENBQUNzRSxvQkFBTDtBQUNILGFBZEQsTUFjTztBQUNMaEQsb0JBQU0sQ0FBQyxnQkFBRCxDQUFOLENBQ0dpRCxJQURILENBQ1E1RSxtQkFEUixFQUVHMEUsSUFGSDtBQUdEO0FBR0YsV0FwQ1MsQ0FvQ1A7O0FBcENPLFNBQVo7QUFzQ0Q7QUEzQ1MsS0FBWjtBQTZDRCxHLENBRUQ7OztTQUNBQyxvQixHQUFBLGdDQUFzQjtBQUFBOztBQUNwQnBFLEtBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9Cc0UsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQ0MsS0FBRCxFQUFXO0FBQ3pDMUMsYUFBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7QUFFQXlDLFdBQUssQ0FBQ0MsY0FBTjtBQUNBLFVBQU16RCxjQUFjLEdBQUdmLENBQUMsQ0FBQ3VFLEtBQUssQ0FBQ0UsYUFBUCxDQUFELENBQXVCOUQsSUFBdkIsQ0FBNEIsT0FBNUIsQ0FBdkI7QUFDQWtCLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVosRUFBa0JmLGNBQWxCLEVBTHlDLENBT3pDOztBQUNBLFlBQUksQ0FBQzJELG9CQUFMLENBQTBCM0QsY0FBMUIsRUFSeUMsQ0FTekM7OztBQUNBSyxZQUFNLENBQUMsZ0JBQUQsQ0FBTixDQUF5QnVELElBQXpCO0FBQ0QsS0FYRDtBQVlELEc7O1NBR0RELG9CLEdBQUEsOEJBQXFCM0QsY0FBckIsRUFBcUM7QUFDbkMsUUFBTUcsUUFBUSxHQUFHLGlDQUFqQjtBQUNBLFFBQU1DLE9BQU8sR0FBRyxpQ0FBaEI7QUFFQVUsV0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQVo7QUFDQSxRQUFJaEMsSUFBSSxHQUFHLElBQVg7QUFDQXNCLFVBQU0sQ0FBQ0MsSUFBUCxDQUFZO0FBQ1ZDLFNBQUcsRUFBRSx5Q0FBeUNKLFFBRHBDO0FBRVZLLGFBQU8sRUFBRSxpQkFBVVosSUFBVixFQUFnQjtBQUN2QixZQUFJYSxLQUFLLEdBQUdiLElBQVo7QUFDQVMsY0FBTSxDQUFDQyxJQUFQLENBQVk7QUFDVkMsYUFBRyxFQUFFSCxPQUFPLEdBQUcsMEJBQVYsR0FBdUNKLGNBRGxDO0FBRVZVLGNBQUksRUFBRSxLQUZJO0FBR1ZDLG9CQUFVLEVBQUUsb0JBQVVDLEdBQVYsRUFBZTtBQUN6QkEsZUFBRyxDQUFDQyxnQkFBSixDQUFxQixlQUFyQixFQUFzQ1YsUUFBdEM7QUFDQVMsZUFBRyxDQUFDQyxnQkFBSixDQUFxQixjQUFyQixFQUFxQ0osS0FBckM7QUFDRCxXQU5TO0FBT1ZELGlCQUFPLEVBQUUsaUJBQVVaLElBQVYsRUFBZ0I7QUFDdkJrQixtQkFBTyxDQUFDQyxHQUFSLENBQVkseUJBQVo7QUFDQUQsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZbkIsSUFBWjtBQUNBLGdCQUFJaUUsWUFBWSxHQUFHakUsSUFBSSxDQUFDcUIsT0FBTCxDQUFhNEMsWUFBaEM7O0FBRUEsZ0JBQUlBLFlBQUosRUFBa0I7QUFFaEI5RSxrQkFBSSxDQUFDK0UsaUJBQUwsQ0FBdUJELFlBQXZCO0FBRUQsYUFKRCxNQUlPO0FBQ0x4RCxvQkFBTSxDQUFDLHVCQUFELENBQU4sQ0FDRytDLElBREg7QUFFRDtBQUNGLFdBcEJTO0FBb0JQO0FBQ0hqQyxjQUFJLEVBQUUsY0FBVUMsS0FBVixFQUFpQkMsVUFBakIsRUFBNkI7QUFDakNDLGlCQUFLLENBQUMscUJBQXFCRCxVQUF0QixDQUFMO0FBQ0Q7QUF2QlMsU0FBWjtBQXlCRDtBQTdCUyxLQUFaO0FBK0JELEc7O1NBRUQwQyxrQixHQUFBLDRCQUFtQi9ELGNBQW5CLEVBQW1DO0FBQ2pDLFFBQU1HLFFBQVEsR0FBRyxpQ0FBakI7QUFDQSxRQUFNQyxPQUFPLEdBQUcsaUNBQWhCO0FBRUFVLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGdDQUFaO0FBRUFWLFVBQU0sQ0FBQ0MsSUFBUCxDQUFZO0FBQ1ZDLFNBQUcsRUFBRSx5Q0FBeUNKLFFBRHBDO0FBRVZLLGFBQU8sRUFBRSxpQkFBVVosSUFBVixFQUFnQjtBQUN2QixZQUFJYSxLQUFLLEdBQUdiLElBQVo7QUFDQVMsY0FBTSxDQUFDQyxJQUFQLENBQVk7QUFDVkMsYUFBRyxFQUFFSCxPQUFPLEdBQUcsMEJBQVYsR0FBdUNKLGNBRGxDO0FBRVZVLGNBQUksRUFBRSxRQUZJO0FBR1ZDLG9CQUFVLEVBQUUsb0JBQVVDLEdBQVYsRUFBZTtBQUN6QkEsZUFBRyxDQUFDQyxnQkFBSixDQUFxQixlQUFyQixFQUFzQ1YsUUFBdEM7QUFDQVMsZUFBRyxDQUFDQyxnQkFBSixDQUFxQixjQUFyQixFQUFxQ0osS0FBckM7QUFDRCxXQU5TO0FBT1ZELGlCQUFPLEVBQUUsaUJBQVVaLElBQVYsRUFBZ0I7QUFDdkJrQixtQkFBTyxDQUFDQyxHQUFSLENBQVksaUNBQVo7QUFDQUQsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZbkIsSUFBWjtBQUNELFdBVlM7QUFVUDtBQUNIdUIsY0FBSSxFQUFFLGNBQVVDLEtBQVYsRUFBaUJDLFVBQWpCLEVBQTZCO0FBQ2pDQyxpQkFBSyxDQUFDLHFCQUFxQkQsVUFBdEIsQ0FBTDtBQUNEO0FBYlMsU0FBWjtBQWVEO0FBbkJTLEtBQVo7QUFxQkQsRzs7U0FFRHlDLGlCLEdBQUEsMkJBQWtCRCxZQUFsQixFQUFnQztBQUM5QnhELFVBQU0sQ0FBQyxVQUFELENBQU4sQ0FBbUJaLElBQW5CLENBQXdCb0UsWUFBWSxDQUFDM0IsSUFBckM7QUFDQTdCLFVBQU0sQ0FBQyxXQUFELENBQU4sQ0FBb0JaLElBQXBCLENBQXlCb0UsWUFBWSxDQUFDMUIsRUFBdEM7QUFDQTlCLFVBQU0sQ0FBQyxVQUFELENBQU4sQ0FBbUJaLElBQW5CLENBQXdCb0UsWUFBWSxDQUFDeEIsUUFBYixDQUFzQixDQUF0QixFQUF5QkMsUUFBekIsR0FBb0MsR0FBcEMsR0FBMEN1QixZQUFZLENBQUN4QixRQUFiLENBQXNCLENBQXRCLEVBQXlCRSxJQUFuRSxHQUF5RSxJQUF6RSxHQUErRXNCLFlBQVksQ0FBQ3hCLFFBQWIsQ0FBc0IsQ0FBdEIsRUFBeUJHLEtBQXhHLEdBQWdILElBQWhILEdBQXVIcUIsWUFBWSxDQUFDeEIsUUFBYixDQUFzQixDQUF0QixFQUF5QkksR0FBeEs7QUFFQXBDLFVBQU0sQ0FBQyxnQkFBRCxDQUFOLENBQXlCWixJQUF6QixDQUE4Qm9FLFlBQVksQ0FBQ0csTUFBM0M7QUFDQTNELFVBQU0sQ0FBQyxrQkFBRCxDQUFOLENBQTJCWixJQUEzQixDQUFnQ29FLFlBQVksQ0FBQ0ksZ0JBQTdDO0FBQ0E1RCxVQUFNLENBQUMsc0JBQUQsQ0FBTixDQUErQlosSUFBL0IsQ0FBb0NvRSxZQUFZLENBQUN6QixzQkFBYixHQUFzQyxHQUF0QyxHQUE0Q3lCLFlBQVksQ0FBQ0ssb0JBQTdGO0FBQ0E3RCxVQUFNLENBQUMsaUJBQUQsQ0FBTixDQUEwQlosSUFBMUIsQ0FBK0JvRSxZQUFZLENBQUNNLGVBQTVDO0FBQ0E5RCxVQUFNLENBQUMsbUJBQUQsQ0FBTixDQUE0QlosSUFBNUIsQ0FBaUNvRSxZQUFZLENBQUNPLGNBQTlDO0FBQ0EvRCxVQUFNLENBQUMsYUFBRCxDQUFOLENBQXNCWixJQUF0QixDQUEyQm9FLFlBQVksQ0FBQzNCLElBQXhDO0FBRUE3QixVQUFNLENBQUMscUJBQUQsQ0FBTixDQUE4QlQsSUFBOUIsQ0FBbUMsT0FBbkMsRUFBNENpRSxZQUFZLENBQUMxQixFQUF6RDtBQUVBLFFBQUlrQyxjQUFjLEdBQUdSLFlBQVksQ0FBQ1MsU0FBYixDQUF1QixDQUF2QixFQUEwQkMsTUFBL0M7QUFDQSxTQUFLQyxnQkFBTCxDQUFzQlgsWUFBWSxDQUFDZCxNQUFuQyxFQUEyQ3NCLGNBQTNDO0FBRUEsUUFBSXZGLFlBQVksR0FBRytFLFlBQVksQ0FBQ1ksWUFBYixDQUEwQixDQUExQixFQUE2QkMsVUFBaEQ7QUFFQSxTQUFLeEUsZUFBTCxDQUFxQnBCLFlBQXJCO0FBRUF1QixVQUFNLENBQUMscUJBQUQsQ0FBTixDQUE4QitDLElBQTlCO0FBR0QsRzs7U0FFRG9CLGdCLEdBQUEsMEJBQWlCRyxVQUFqQixFQUE2Qk4sY0FBN0IsRUFBNEM7QUFDMUMsUUFBSTVFLElBQUksR0FBRyxFQUFYO0FBQ0EsUUFBSW1GLFFBQVEsR0FBRyxDQUFmO0FBQ0FELGNBQVUsQ0FBQ2xELE9BQVgsQ0FBbUIsVUFBQW9CLE9BQU8sRUFBSTtBQUMxQixVQUFJZ0MsU0FBUyxHQUFHN0IsUUFBUSxDQUFDSCxPQUFPLENBQUMwQixNQUFULENBQVIsR0FBMkJ2QixRQUFRLENBQUNxQixjQUFELENBQW5EO0FBQ0E1RSxVQUFJLElBQUcsNERBQ1AsMkJBRE8sR0FFSCxvREFGRyxHQUdILHFFQUhHLEdBSUMsNEhBSkQsR0FLQyw0Q0FMRCxHQU1ILFFBTkcsR0FPUCxNQVBPLEdBU1AscURBVE8sR0FVSCwyQkFWRyxHQVdILGlEQVhHLEdBV2lEb0QsT0FBTyxDQUFDWCxJQVh6RCxHQVdnRSxRQVhoRSxHQVlILE1BWkcsR0FhSCw4REFiRyxHQWNILHdCQWRHLEdBY3VCVyxPQUFPLENBQUNJLFFBZC9CLEdBY3lDLGFBZHpDLEdBZVAsUUFmTyxHQWdCSCxnRUFoQkcsR0FnQitESixPQUFPLENBQUMwQixNQWhCdkUsR0FnQitFLFFBaEIvRSxHQWlCSCw2Q0FqQkcsR0FpQjRDTSxTQWpCNUMsR0FpQnVELFdBakJ2RCxHQWtCUCxRQWxCQTtBQW1CQUQsY0FBUSxHQUFHNUIsUUFBUSxDQUFDNEIsUUFBRCxDQUFSLEdBQXFCNUIsUUFBUSxDQUFDSCxPQUFPLENBQUMwQixNQUFULENBQXhDO0FBQ0gsS0F0QkQ7QUF3QkEsUUFBSU8sS0FBSyxHQUFHOUIsUUFBUSxDQUFDNEIsUUFBRCxDQUFSLEdBQXFCLEdBQWpDO0FBQ0EzRixLQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUF3QjJDLE1BQXhCLENBQStCbkMsSUFBL0I7QUFDQVIsS0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQjhGLFFBQWhCLEdBQTJCdEYsSUFBM0IsQ0FBZ0NtRixRQUFoQztBQUNBM0YsS0FBQyxDQUFDLFFBQUQsQ0FBRCxDQUFZOEYsUUFBWixHQUF1QnRGLElBQXZCLENBQTRCLEtBQTVCO0FBQ0FSLEtBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZThGLFFBQWYsR0FBMEJ0RixJQUExQixDQUErQixNQUEvQjtBQUNBUixLQUFDLENBQUMsUUFBRCxDQUFELENBQVk4RixRQUFaLEdBQXVCdEYsSUFBdkIsQ0FBNEJxRixLQUE1QjtBQUVELEc7O1NBR0RuRyxVLEdBQUEsc0JBQWE7QUFBQTs7QUFFWDs7O0FBR0FNLEtBQUMsQ0FBQyxxQkFBRCxDQUFELENBQXlCc0UsRUFBekIsQ0FBNEIsT0FBNUIsRUFBcUMsVUFBQ0MsS0FBRCxFQUFXO0FBQzlDMUMsYUFBTyxDQUFDQyxHQUFSLENBQVksNkJBQVo7QUFDQXlDLFdBQUssQ0FBQ0MsY0FBTjtBQUNBLFVBQU16RCxjQUFjLEdBQUdmLENBQUMsQ0FBQ3VFLEtBQUssQ0FBQ0UsYUFBUCxDQUFELENBQXVCOUQsSUFBdkIsQ0FBNEIsT0FBNUIsQ0FBdkI7QUFDQWtCLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVosRUFBa0JmLGNBQWxCOztBQUNBLFlBQUksQ0FBQytELGtCQUFMLENBQXdCL0QsY0FBeEI7QUFDRCxLQU5ELEVBTFcsQ0FhWDtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBR0QsRzs7O0VBOVh3Q2dGLHFEIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuLi9wYWdlLW1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJzY3JpcHRpb25zIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICBvblJlYWR5KCkge1xuICAgIHRoaXMubm9TdWJzY3JpcHRpb25zVGV4dCA9ICdZb3UgZG8gbm90IGhhdmUgYW55IGFjdGl2ZSBzdWJzY3JpcHRpb25zJztcbiAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5jdXN0b21lclN1YnNjcmlwdGlvbnMoKTtcbiAgfVxuXG4gIC8vIGRyb3Bkb3duIG1lbnUgaGFuZGxlclxuICBkcm9wZG93bkhhbmRsZXIoY3VycmVudF9jYXJkKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIFNldFxuICAgIHZhciBtYWluID0gJCgnZGl2Lm1tLWRyb3Bkb3duIC50ZXh0Zmlyc3QnKVxuICAgIHZhciBsaSA9ICQoJ2Rpdi5tbS1kcm9wZG93biA+IHVsID4gbGkuaW5wdXQtb3B0aW9uJylcbiAgICB2YXIgaW5wdXRvcHRpb24gPSAkKFwiZGl2Lm1tLWRyb3Bkb3duIC5vcHRpb25cIilcbiAgICB2YXIgZGVmYXVsdF90ZXh0ID0gJzxpbWcgc3JjPVwiJyt0aGlzLnBheW1lbnRNZXRob2RJbWFnZXVybChjdXJyZW50X2NhcmQuY2FyZFR5cGUpKydcIiB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiBzdHlsZT1cImZsb2F0OiBsZWZ0O1wiLz48ZGl2IGNsYXNzPVwic3Vic2NyaXB0aW9uLWNhcmQtbnVtXCI+JiM5Njc5JiM5Njc5JiM5Njc5JiM5Njc5ICYjOTY3OSYjOTY3OSYjOTY3OSYjOTY3OSAmIzk2NzkmIzk2NzkmIzk2NzkmIzk2NzkgPHN0cm9uZz4nK2N1cnJlbnRfY2FyZC5sYXN0NCsnPC9zdHJvbmc+PC9kaXY+PGltZyBzcmM9XCJodHRwczovL2NkbjQuaWNvbmZpbmRlci5jb20vZGF0YS9pY29ucy9pb25pY29ucy81MTIvaWNvbi1hcnJvdy1kb3duLWItMTI4LnBuZ1wiIHdpZHRoPVwiMTBcIiBoZWlnaHQ9XCIxMFwiIGNsYXNzPVwiZG93blwiIC8+JztcbiAgXG4gICAgLy8gQW5pbWF0aW9uXG4gICAgbWFpbi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIG1haW4uaHRtbChkZWZhdWx0X3RleHQpO1xuICAgICAgbGkudG9nZ2xlKCdmYXN0Jyk7XG4gICAgfSk7XG4gIFxuICAgIC8vIEluc2VydCBEYXRhXG4gICAgbGkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAvLyBoaWRlXG4gICAgICBsaS50b2dnbGUoJ2Zhc3QnKTtcbiAgICAgIHZhciBsaXZhbHVlID0gJCh0aGlzKS5kYXRhKCd2YWx1ZScpO1xuICAgICAgdmFyIGxpaHRtbCA9ICQodGhpcykuaHRtbCgpO1xuICAgICAgbWFpbi5odG1sKGxpaHRtbCk7XG4gICAgICBpbnB1dG9wdGlvbi52YWwobGl2YWx1ZSk7XG5cbiAgICAgIGNvbnN0IHBheW1lbnRfaWQgPSBsaXZhbHVlO1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uSWQgPSAkKCcjc3ViY3JpcHRpb24tZGVsZXRlJykuZGF0YSgnc3ViaWQnKTtcbiAgICAgIHNlbGYuY3VzdG9tZXJTdWJzY3JpcHRpb25QYXltZW50KHN1YnNjcmlwdGlvbklkLCBwYXltZW50X2lkKTtcbiAgICB9KTtcbiAgfVxuICBjdXN0b21lclBheW1lbnQoY3VycmVudF9jYXJkKXtcbiAgICBjb25zdCBjbGllbnRJZCA9ICdrOTd6Y210NzVuOTBybGFmdXVvd3h6Zjk3b2o2YW9kJztcbiAgICBjb25zdCBhcGlIb3N0ID0gJ2h0dHBzOi8vZGV2LWFwaS53aWxkY3JhZnRlci5jb20nO1xuICAgIFxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICB1cmw6ICcvY3VzdG9tZXIvY3VycmVudC5qd3Q/YXBwX2NsaWVudF9pZD0nICsgY2xpZW50SWQsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgdG9rZW4gPSBkYXRhO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgdXJsOiBhcGlIb3N0ICsgJy9jdXN0b21lci9wYXltZW50cy8nLFxuICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUF1dGgtQ2xpZW50JywgY2xpZW50SWQpO1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXV0aC1Ub2tlbicsIHRva2VuKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgcGF5bWVudHM6ICcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB2YXIgY3JlZGl0X2NhcmRzID0gZGF0YS5yZXN1bHRzLmNyZWRpdF9jYXJkcztcbiAgICAgICAgICAgIGlmKGNyZWRpdF9jYXJkcyl7XG4gICAgICAgICAgICAgIHNlbGYuc2V0cGF5bWVudG1ldGhvZGxpc3QoY3JlZGl0X2NhcmRzLCBjdXJyZW50X2NhcmQpO1xuICAgICAgICAgICAgICBzZWxmLmRyb3Bkb3duSGFuZGxlcihjdXJyZW50X2NhcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgfSwgLy8gQXJyYXkgb2YgY3VzdG9tZXIgc3Vic2NyaXB0aW9uc1xuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgYWxlcnQoJ1JlcXVlc3QgZmFpbGVkOiAnICsgdGV4dFN0YXR1cyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcGF5bWVudE1ldGhvZEltYWdldXJsKGNhcmRfdHlwZSkge1xuICAgIHZhciBpbWdfdXJsID0gJyc7XG4gICAgaWYoY2FyZF90eXBlID09IFwiQW1lcmljYW4gRXhwcmVzc1wiKXtcbiAgICAgIGltZ191cmwgPSAnL3N0ZW5jaWwvMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxL2ltZy9wYXltZW50LW1ldGhvZHMvYW1lcmljYW5fZXhwcmVzcy5zdmcnO1xuICAgIH1cbiAgICByZXR1cm4gaW1nX3VybDtcbiAgfVxuICAvKipcbiAgICogU2V0IGFsbCBwYXltZW50IG1ldGhvZCBpbiBzZWxlY3QgYm94XG4gICAqIGlucHV0IHBhcmFtIC0gY3JlZGl0X2NhcmRzIDogcGF5bWVudCBtZXRob2QgYXJyYXlcbiAgICovXG4gIHNldHBheW1lbnRtZXRob2RsaXN0KGNyZWRpdF9jYXJkcywgY3VycmVudF9jYXJkKXtcbiAgICB2YXIgaHRtbCA9ICcnO1xuICAgIGh0bWwgPSAnPGRpdiBjbGFzcz1cInRleHRmaXJzdFwiPjxpbWcgc3JjPVwiJyt0aGlzLnBheW1lbnRNZXRob2RJbWFnZXVybChjdXJyZW50X2NhcmQuY2FyZFR5cGUpKydcIiB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiBzdHlsZT1cImZsb2F0OiBsZWZ0O1wiIC8+PGRpdiBjbGFzcz1cInN1YnNjcmlwdGlvbi1jYXJkLW51bVwiPiYjOTY3OSYjOTY3OSYjOTY3OSYjOTY3OSAmIzk2NzkmIzk2NzkmIzk2NzkmIzk2NzkgJiM5Njc5JiM5Njc5JiM5Njc5JiM5Njc5IDxzdHJvbmc+JysgY3VycmVudF9jYXJkLmxhc3Q0Kyc8L3N0cm9uZz48L2Rpdj48L2Rpdj48dWw+JztcblxuICAgIGNyZWRpdF9jYXJkcy5mb3JFYWNoKGNhcmRzPT4ge1xuICAgICAgaHRtbCArPSAnPGxpIGNsYXNzPVwiaW5wdXQtb3B0aW9uXCIgZGF0YS12YWx1ZT1cIicrY2FyZHMudW5pcXVlTnVtYmVySWRlbnRpZmllcisnXCI+JytcbiAgICAgICc8aW1nIHNyYz1cIicrdGhpcy5wYXltZW50TWV0aG9kSW1hZ2V1cmwoY2FyZHMuY2FyZFR5cGUpKydcIiBhbHQ9XCJcIiB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiBzdHlsZT1cImZsb2F0OiBsZWZ0O1wiLz48ZGl2IGNsYXNzPVwic3Vic2NyaXB0aW9uLWNhcmQtbnVtXCI+JiM5Njc5JiM5Njc5JiM5Njc5JiM5Njc5ICYjOTY3OSYjOTY3OSYjOTY3OSYjOTY3OSAmIzk2NzkmIzk2NzkmIzk2NzkmIzk2NzkgPHN0cm9uZz4nKyBjYXJkcy5sYXN0NCsnPC9zdHJvbmc+PC9kaXY+IDwvbGk+JztcbiAgICB9KTtcbiAgICBodG1sICs9ICc8L3VsPiA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGNsYXNzPVwib3B0aW9uXCIgbmFtZT1cIm5hbWVzdWJtaXRcIiB2YWx1ZT1cIlwiIC8+JztcbiAgICAgICAgICBcbiAgICAkKCcjcGF5bWVudC1tZXRob2Qtc2VsZWN0JykuYXBwZW5kKGh0bWwpO1xuICAgIFxuICB9XG5cbiAgY3VzdG9tZXJTdWJzY3JpcHRpb25QYXltZW50KHN1YlNjcmlwdG9uSWQsIHBheW1lbnRfaWQpe1xuICAgIGNvbnN0IGNsaWVudElkID0gJ2s5N3pjbXQ3NW45MHJsYWZ1dW93eHpmOTdvajZhb2QnO1xuICAgIGNvbnN0IGFwaUhvc3QgPSAnaHR0cHM6Ly9kZXYtYXBpLndpbGRjcmFmdGVyLmNvbSc7XG4gICAgXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGpRdWVyeS5hamF4KHtcbiAgICAgIHVybDogJy9jdXN0b21lci9jdXJyZW50Lmp3dD9hcHBfY2xpZW50X2lkPScgKyBjbGllbnRJZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGRhdGE7XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICB1cmw6IGFwaUhvc3QgKyAnL2N1c3RvbWVyL3N1YnNjcmlwdGlvbnMvJyArIHN1YlNjcmlwdG9uSWQgKyAnL3BheW1lbnQnLFxuICAgICAgICAgIHR5cGU6ICdQb3N0JyxcbiAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1BdXRoLUNsaWVudCcsIGNsaWVudElkKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUF1dGgtVG9rZW4nLCB0b2tlbik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7IHBheW1lbnRfaWQ6IHBheW1lbnRfaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tZXIgc3Vic2NyaXB0aW9uIHBheW1lbnQ6ICcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgfSwgLy8gQXJyYXkgb2YgY3VzdG9tZXIgc3Vic2NyaXB0aW9uc1xuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgYWxlcnQoJ1JlcXVlc3QgZmFpbGVkOiAnICsgdGV4dFN0YXR1cyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBzdWJzY3JpcHRpb25zXG4gICAqL1xuICBjdXN0b21lclN1YnNjcmlwdGlvbnMoKSB7XG4gICAgY29uc3QgY2xpZW50SWQgPSAnazk3emNtdDc1bjkwcmxhZnV1b3d4emY5N29qNmFvZCc7XG4gICAgY29uc3QgYXBpSG9zdCA9ICdodHRwczovL2Rldi1hcGkud2lsZGNyYWZ0ZXIuY29tJztcblxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbkl0ZW0gPSAoeyBkYXRhLCBwcm9kdWN0Q291bnQsIGl0ZW1Db3VudCB9KSA9PiBgXG4gICAgPGRpdiBjbGFzcz1cInN1YnNjcmlwdGlvbi1pdGVtXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1pbmZvXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LWFsaWduXCI+ICAgICAgICAgIFxuICAgICAgICAgIDxwPjxzcGFuIGNsYXNzPVwiZnJlcXVlbmN5XCI+JHtmcmVxdWVuY3koZGF0YS5uYW1lKX08L3NwYW4+PC9wPlxuICAgICAgICAgIDxwPjxzcGFuIGNsYXNzPVwibnVtYmVyXCI+U3Vic2NyaXB0aW9uICM6ICR7ZGF0YS5pZH08L3NwYW4+PC9wPlxuICAgICAgICAgIDxwPjxzcGFuIGNsYXNzPVwicHJvZHVjdHNcIj4ke3Byb2R1Y3RDb3VudH0gcHJvZHVjdHMgfCAke2l0ZW1Db3VudH0gSXRlbXM8L3NwYW4+PC9wPiAgICAgICAgICBcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZVwiPiR7ZGF0YS5iaWxsaW5nUGVyaW9kU3RhcnREYXRlfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNoaXAtdG9cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj48L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD48c3BhbiBjbGFzcz1cInNoaXBwaW5nLXRpdGxlXCI+U2hpcHMgVG88L3NwYW4+PC9wPlxuICAgICAgICAgIDxwPjxzcGFuIGNsYXNzPVwic2hpcHBpbmdcIj4ke2RhdGEuc2hpcHBpbmdbMF0uc3RyZWV0XzF9ICR7ZGF0YS5zaGlwcGluZ1swXS5jaXR5fSwgJHtkYXRhLnNoaXBwaW5nWzBdLnN0YXRlfSwgJHtkYXRhLnNoaXBwaW5nWzBdLnppcH08L3NwYW4+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgICBcbiAgICAgIDxkaXYgY2xhc3M9XCJtYW5hZ2UtYnV0dG9uXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gZm9ybS1wcmVmaXhQb3N0Zml4LWJ1dHRvbi0tcG9zdGZpeCBidXR0b24tLXRlcnRpYXJ5IG9wdGltaXplZENoZWNrb3V0LWJ1dHRvblNlY29uZGFyeSBtZGMtYnV0dG9uIG1kYy1idXR0b24tLXgtc21hbGwgc2Vjb25kYXJ5IG1hbmFnZV9idXR0b25cIiBkYXRhLXN1YklkPVwiJHtkYXRhLmlkfVwiPk1hbmFnZTwvYnV0dG9uPlxuICAgICAgPC9kaXY+ICAgICAgXG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgICAvLyBUT0RPOiBNYXAgdGhlIGZyZXF1ZW5jeSB0aXRsZXMgdG8gcGxhbnNcbiAgICB2YXIgZnJlcXVlbmN5ID0gdHlwZSA9PiB7XG4gICAgICByZXR1cm4gdHlwZTtcbiAgICB9O1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGpRdWVyeS5hamF4KHtcbiAgICAgIHVybDogJy9jdXN0b21lci9jdXJyZW50Lmp3dD9hcHBfY2xpZW50X2lkPScgKyBjbGllbnRJZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IGRhdGE7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzICcgKyBkYXRhKTtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgIHVybDogYXBpSG9zdCArICcvY3VzdG9tZXIvc3Vic2NyaXB0aW9ucycsXG4gICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXV0aC1DbGllbnQnLCBjbGllbnRJZCk7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1BdXRoLVRva2VuJywgdG9rZW4pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gZGF0YS5yZXN1bHRzLnN1YnNjcmlwdGlvbnM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1YnNjcmlwdGlvbnM9PT09XCIsIHN1YnNjcmlwdGlvbnMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaXRlbSA9IFtdO1xuICAgICAgICAgICAgdmFyIHggPSAwO1xuICAgICAgICAgICAgdmFyIGl0ZW1Db3VudCA9IDA7XG4gICAgICAgICAgICB2YXIgcHJvZHVjdENvdW50ID0gMDtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICAgIHN1YnNjcmlwdGlvbnMuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc3ViYWRkT25zID0gcHJvZHVjdC5hZGRPbnM7XG4gICAgICAgICAgICAgICAgc3ViYWRkT25zLmZvckVhY2goYWRkT25zID0+e1xuICAgICAgICAgICAgICAgICAgcHJvZHVjdENvdW50Kys7XG4gICAgICAgICAgICAgICAgICBpdGVtQ291bnQgPSBwYXJzZUludChpdGVtQ291bnQpICsgcGFyc2VJbnQoYWRkT25zLnF1YW50aXR5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpdGVtW3hdID0geyBkYXRhOiBwcm9kdWN0LCBwcm9kdWN0Q291bnQ6IHByb2R1Y3RDb3VudCwgaXRlbUNvdW50OiBpdGVtQ291bnQgfTtcbiAgICAgICAgICAgICAgICB4Kys7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBqUXVlcnkoJyNzdWJzY3JpcHRpb25zJylcbiAgICAgICAgICAgICAgICAuaHRtbChpdGVtLm1hcChzdWJzY3JpcHRpb25JdGVtKS5qb2luKCcnKSlcbiAgICAgICAgICAgICAgICAuc2hvdygpO1xuICAgICAgICAgICAgICAgIHNlbGYubWFuYWdlckJ1dHRvbkhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGpRdWVyeSgnI3N1YnNjcmlwdGlvbnMnKVxuICAgICAgICAgICAgICAgIC50ZXh0KG5vU3Vic2NyaXB0aW9uc1RleHQpXG4gICAgICAgICAgICAgICAgLnNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG4gICAgICAgICAgfSwgLy8gQXJyYXkgb2YgY3VzdG9tZXIgc3Vic2NyaXB0aW9uc1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBtYW5hZ2VyIGJ1dHRvbiBoYW5kbGVyXG4gIG1hbmFnZXJCdXR0b25IYW5kbGVyKCl7XG4gICAgJCgnLm1hbmFnZV9idXR0b24nKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdtYW5hZ2VidXR0b24gY2xpY2tlZCcpO1xuICAgICAgXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3N1YmlkJyk7XG4gICAgICBjb25zb2xlLmxvZyhcIklEXCIsIHN1YnNjcmlwdGlvbklkKVxuXG4gICAgICAvL2NhbGwgc2Vjb25kIGFqYXggXG4gICAgICB0aGlzLmN1c3RvbWVyU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbklkKVxuICAgICAgLy8gY29uc29sZS5sb2coJ3BsYW4gaWQ6ICcgKyB0aGlzLmRhdGEoJ3BsYW5JZCcpKTtcbiAgICAgIGpRdWVyeSgnI3N1YnNjcmlwdGlvbnMnKS5oaWRlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIGN1c3RvbWVyU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbklkKSB7XG4gICAgY29uc3QgY2xpZW50SWQgPSAnazk3emNtdDc1bjkwcmxhZnV1b3d4emY5N29qNmFvZCc7XG4gICAgY29uc3QgYXBpSG9zdCA9ICdodHRwczovL2Rldi1hcGkud2lsZGNyYWZ0ZXIuY29tJztcblxuICAgIGNvbnNvbGUubG9nKCdhdHRlbXB0IGN1c3RvbWVyIHN1YnNjcmlwdGlvbicpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICB1cmw6ICcvY3VzdG9tZXIvY3VycmVudC5qd3Q/YXBwX2NsaWVudF9pZD0nICsgY2xpZW50SWQsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgdG9rZW4gPSBkYXRhO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgdXJsOiBhcGlIb3N0ICsgJy9jdXN0b21lci9zdWJzY3JpcHRpb25zLycgKyBzdWJzY3JpcHRpb25JZCxcbiAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1BdXRoLUNsaWVudCcsIGNsaWVudElkKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUF1dGgtVG9rZW4nLCB0b2tlbik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2N1c3RvbWVyIHN1YnNjcmlwdGlvbjogJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBkYXRhLnJlc3VsdHMuc3Vic2NyaXB0aW9uO1xuXG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG5cbiAgICAgICAgICAgICAgc2VsZi5lZGl0X3N1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBqUXVlcnkoJy5oYXMtbm8tc3Vic2NyaXB0aW9ucycpXG4gICAgICAgICAgICAgICAgLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAvLyBBcnJheSBvZiBjdXN0b21lciBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBhbGVydCgnUmVxdWVzdCBmYWlsZWQ6ICcgKyB0ZXh0U3RhdHVzKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uSWQpIHtcbiAgICBjb25zdCBjbGllbnRJZCA9ICdrOTd6Y210NzVuOTBybGFmdXVvd3h6Zjk3b2o2YW9kJztcbiAgICBjb25zdCBhcGlIb3N0ID0gJ2h0dHBzOi8vZGV2LWFwaS53aWxkY3JhZnRlci5jb20nO1xuXG4gICAgY29uc29sZS5sb2coJ2F0dGVtcHQgdG8gZGVsZXRlIHN1YnNjcmlwdGlvbicpO1xuXG4gICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgdXJsOiAnL2N1c3RvbWVyL2N1cnJlbnQuand0P2FwcF9jbGllbnRfaWQ9JyArIGNsaWVudElkLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHRva2VuID0gZGF0YTtcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgIHVybDogYXBpSG9zdCArICcvY3VzdG9tZXIvc3Vic2NyaXB0aW9ucy8nICsgc3Vic2NyaXB0aW9uSWQsXG4gICAgICAgICAgdHlwZTogJ0RFTEVURScsXG4gICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXV0aC1DbGllbnQnLCBjbGllbnRJZCk7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1BdXRoLVRva2VuJywgdG9rZW4pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdXN0b21lciBzdWJzY3JpcHRpb24gZGVsZXRlZDogJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICB9LCAvLyBBcnJheSBvZiBjdXN0b21lciBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBhbGVydCgnUmVxdWVzdCBmYWlsZWQ6ICcgKyB0ZXh0U3RhdHVzKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBlZGl0X3N1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICBqUXVlcnkoJyNwbGFuX2lkJykuaHRtbChzdWJzY3JpcHRpb24ubmFtZSk7XG4gICAgalF1ZXJ5KCcjb3JkZXJfaWQnKS5odG1sKHN1YnNjcmlwdGlvbi5pZCk7XG4gICAgalF1ZXJ5KCcjc2hpcF90bycpLmh0bWwoc3Vic2NyaXB0aW9uLnNoaXBwaW5nWzBdLnN0cmVldF8xICsgXCIgXCIgKyBzdWJzY3JpcHRpb24uc2hpcHBpbmdbMF0uY2l0eSArXCIsIFwiKyBzdWJzY3JpcHRpb24uc2hpcHBpbmdbMF0uc3RhdGUgKyBcIiwgXCIgKyBzdWJzY3JpcHRpb24uc2hpcHBpbmdbMF0uemlwKTtcbiAgICBcbiAgICBqUXVlcnkoJyNhY3RpdmVfc3RhdHVzJykuaHRtbChzdWJzY3JpcHRpb24uc3RhdHVzKTtcbiAgICBqUXVlcnkoJyNmaXJzdF9iaWxsX2RhdGUnKS5odG1sKHN1YnNjcmlwdGlvbi5maXJzdEJpbGxpbmdEYXRlKTtcbiAgICBqUXVlcnkoJyNjdXJyZW50X2JpbGxfcGVyaW9kJykuaHRtbChzdWJzY3JpcHRpb24uYmlsbGluZ1BlcmlvZFN0YXJ0RGF0ZSArIFwiLVwiICsgc3Vic2NyaXB0aW9uLmJpbGxpbmdQZXJpb2RFbmREYXRlKTtcbiAgICBqUXVlcnkoJyNuZXh0X2JpbGxfZGF0ZScpLmh0bWwoc3Vic2NyaXB0aW9uLm5leHRCaWxsaW5nRGF0ZSk7XG4gICAgalF1ZXJ5KCcjbmV4dF9iaWxsX2Ftb3VudCcpLmh0bWwoc3Vic2NyaXB0aW9uLm5leHRCaWxsQW1vdW50KTtcbiAgICBqUXVlcnkoJyNyZWN1cnJlbmNlJykuaHRtbChzdWJzY3JpcHRpb24ubmFtZSk7XG4gICAgXG4gICAgalF1ZXJ5KCcjc3ViY3JpcHRpb24tZGVsZXRlJykuZGF0YSgnc3ViaWQnLCBzdWJzY3JpcHRpb24uaWQpO1xuXG4gICAgdmFyIGRpc2NvdW50QW1vdW50ID0gc3Vic2NyaXB0aW9uLmRpc2NvdW50c1swXS5hbW91bnQ7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25MaXN0KHN1YnNjcmlwdGlvbi5hZGRPbnMsIGRpc2NvdW50QW1vdW50KTtcblxuICAgIHZhciBjdXJyZW50X2NhcmQgPSBzdWJzY3JpcHRpb24udHJhbnNhY3Rpb25zWzBdLmNyZWRpdENhcmQ7XG4gICAgXG4gICAgdGhpcy5jdXN0b21lclBheW1lbnQoY3VycmVudF9jYXJkKTtcbiAgICBcbiAgICBqUXVlcnkoJyNlZGl0LXN1YnNjcmlwdGlvbnMnKS5zaG93KCk7XG5cblxuICB9XG5cbiAgc3Vic2NyaXB0aW9uTGlzdChzdWJwcm9kdWN0LCBkaXNjb3VudEFtb3VudCl7XG4gICAgdmFyIGh0bWwgPSAnJztcbiAgICB2YXIgc3VidG90YWwgPSAwO1xuICAgIHN1YnByb2R1Y3QuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgdmFyIGRpc0Ftb3VudCA9IHBhcnNlSW50KHByb2R1Y3QuYW1vdW50KSAtIHBhcnNlSW50KGRpc2NvdW50QW1vdW50KTtcbiAgICAgICAgaHRtbCArPSc8ZGl2IGNsYXNzPVwic2hvcHBpbmctY2FydF9fcHJvZHVjdCBjYXJ0LXBhZ2UtcHJvZHVjdHNcIj4nK1xuICAgICAgICAnPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzaG9wcGluZy1jYXJ0X19wcm9kdWN0LWltZy1jb250YWluZXJcIj4nK1xuICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJzaG9wcGluZy1jYXJ0X19wcm9kdWN0LWltZyAgbGF6eWxvYWRcIiBkYXRhLXNpemVzPVwiYXV0b1wiJytcbiAgICAgICAgICAgICAgICAnc3JjPVwiaHR0cHM6Ly9jZG4ud2lsZGNyYWZ0ZXIuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzA2LzAyMDcxMTMwL0lubmVyLVdhcnJpb3ItVmVydGljYWwtQm94LXctSy1DdXBzLUxlZnQtNzY4eDU3Ni5wbmdcIicrXG4gICAgICAgICAgICAgICAgJ2FsdD1cInt7aW1hZ2UuYWx0fX1cIiB0aXRsZT1cInt7aW1hZ2UuYWx0fX1cIj4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2E+JytcbiAgXG4gICAgICAgICc8ZGl2IGNsYXNzPVwic2hvcHBpbmctY2FydF9fcHJvZHVjdC1pbmZvLWNvbnRhaW5lclwiPicrXG4gICAgICAgICAgICAnPGEgdGFyZ2V0PVwiX3RvcFwiIGhyZWY9XCJcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzaG9wcGluZy1jYXJ0X19wcm9kdWN0LWluZm8tbGFiZWxcIj4nICsgcHJvZHVjdC5uYW1lICsgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9hPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNob3BwaW5nLWPFvmFydF9fcHJvZHVjdC1pbmZvLXN1YlwiPlF1YW50aXR5PC9kaXY+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicXVhbnRpdHlcIj4nKyBwcm9kdWN0LnF1YW50aXR5ICsnIFBvZHM8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwic2hvcHBpbmctY2FydF9fcHJvZHVjdF9wcmljZSAgcHJpY2UtLWRpc2NvdW50ZWRcIj4kJysgcHJvZHVjdC5hbW91bnQgKyc8L2Rpdj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzaG9wcGluZy1jYXJ0X19wcm9kdWN0X3ByaWNlXCI+JCcrIGRpc0Ftb3VudCArJy4wMDwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nO1xuICAgICAgICBzdWJ0b3RhbCA9IHBhcnNlSW50KHN1YnRvdGFsKSArIHBhcnNlSW50KHByb2R1Y3QuYW1vdW50KTtcbiAgICB9KTtcblxuICAgIHZhciB0b3RhbCA9IHBhcnNlSW50KHN1YnRvdGFsKSArIDIuNVxuICAgICQoXCIjc3Vic2NyaXB0aW9uX2xpc3RcIikuYXBwZW5kKGh0bWwpXG4gICAgJCgnI3N1Yl90b3RhbCcpLmNoaWxkcmVuKCkuaHRtbChzdWJ0b3RhbCk7XG4gICAgJCgnI3RheGVzJykuY2hpbGRyZW4oKS5odG1sKCcyLjUnKTtcbiAgICAkKCcjc2hvcHBpbmcnKS5jaGlsZHJlbigpLmh0bWwoJ0ZyZWUnKTtcbiAgICAkKCcjdG90YWwnKS5jaGlsZHJlbigpLmh0bWwodG90YWwpO1xuXG4gIH1cblxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgXG4gICAgLyoqXG4gICAgKiBEZWxldGUgc3Vic2NyaXB0aW9uc1xuICAgICovXG4gICAgJCgnI3N1YmNyaXB0aW9uLWRlbGV0ZScpLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3N1YnNjcmlwdGlvbiBkZWxldGUgaGFuZGxlcicpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbklkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdzdWJpZCcpO1xuICAgICAgY29uc29sZS5sb2coXCJJRFwiLCBzdWJzY3JpcHRpb25JZClcbiAgICAgIHRoaXMuZGVsZXRlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbklkKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBwYXltZW50IG1ldGhvZCBzZWxlY3QgaGFuZGxlclxuICAgIC8vICQoJyNwYXltZW50LW1ldGhvZC1zZWxlY3QnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhcInNlbGVjdCBjaGFuZ2VcIik7XG4gICAgLy8gICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgIFxuICAgIC8vICAgY29uc3QgcGF5bWVudF9pZCA9ICRzZWxlY3QuZGF0YSgncGF5bWVudElkJyk7XG4gICAgLy8gICBjb25zdCBzdWJzY3JpcHRpb25JZCA9ICQoJyNzdWJjcmlwdGlvbi1kZWxldGUnKS5kYXRhKCdzdWJpZCcpO1xuXG4gICAgLy8gICB0aGlzLmN1c3RvbWVyU3Vic2NyaXB0aW9uUGF5bWVudChzdWJzY3JpcHRpb25JZCwgcGF5bWVudF9pZCk7XG4gICAgLy8gfSk7XG5cbiAgICBcbiAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9
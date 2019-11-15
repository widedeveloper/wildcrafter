import PageManager from '../page-manager';
import $ from 'jquery'
export default class Subscriptions extends PageManager {
  onReady() {
    this.noSubscriptionsText = 'You do not have any active subscriptions';
  
    this.bindEvents();
    this.customerSubscriptions();
  }

  // dropdown menu handler
  dropdownHandler(current_card) {
    var self = this;
    // Set
    var main = $('div.mm-dropdown .textfirst')
    var li = $('div.mm-dropdown > ul > li.input-option')
    var inputoption = $("div.mm-dropdown .option")
    var default_text = '<img src="'+this.paymentMethodImageurl(current_card.cardType)+'" width="30" height="30" style="float: left;"/><div class="subscription-card-num">&#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 <strong>'+current_card.last4+'</strong></div><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" width="10" height="10" class="down" />';
  
    // Animation
    main.click(function() {
      main.html(default_text);
      li.toggle('fast');
    });
  
    // Insert Data
    li.click(function() {
      // hide
      li.toggle('fast');
      var livalue = $(this).data('value');
      var lihtml = $(this).html();
      main.html(lihtml);
      inputoption.val(livalue);

      const payment_id = livalue;
      const subscriptionId = $('#subcription-delete').data('subid');
      self.customerSubscriptionPayment(subscriptionId, payment_id);
    });
  }
  customerPayment(current_card){
    const clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    const apiHost = 'https://dev-api.wildcrafter.com';
    
    var self = this;
    $.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function (data) {
        var token = data;
        $.ajax({
          url: apiHost + '/customer/payments/',
          type: 'GET',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          success: function (data) {
            console.log('customer payments: ');
            console.log(data);
            var credit_cards = data.results.credit_cards;
            if(credit_cards){
              self.setpaymentmethodlist(credit_cards, current_card);
              self.dropdownHandler(current_card);
            }
            
          }, // Array of customer subscriptions
          fail: function (jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
          },
        });
      },
    });
  }

  paymentMethodImageurl(card_type) {
    var img_url = '';
    if(card_type == "American Express"){
      img_url = '/stencil/00000000-0000-0000-0000-000000000001/img/payment-methods/american_express.svg';
    }
    return img_url;
  }
  /**
   * Set all payment method in select box
   * input param - credit_cards : payment method array
   */
  setpaymentmethodlist(credit_cards, current_card){
    var html = '';
    html = '<div class="textfirst"><img src="'+this.paymentMethodImageurl(current_card.cardType)+'" width="30" height="30" style="float: left;" /><div class="subscription-card-num">&#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 <strong>'+ current_card.last4+'</strong></div></div><ul>';

    credit_cards.forEach(cards=> {
      html += '<li class="input-option" data-value="'+cards.uniqueNumberIdentifier+'">'+
      '<img src="'+this.paymentMethodImageurl(cards.cardType)+'" alt="" width="30" height="30" style="float: left;"/><div class="subscription-card-num">&#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 &#9679&#9679&#9679&#9679 <strong>'+ cards.last4+'</strong></div> </li>';
    });
    html += '</ul> <input type="hidden" class="option" name="namesubmit" value="" />';
          
    $('#payment-method-select').append(html);
    
  }

  customerSubscriptionPayment(subScriptonId, payment_id){
    const clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    const apiHost = 'https://dev-api.wildcrafter.com';
    
    var self = this;
    $.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function (data) {
        var token = data;
        $.ajax({
          url: apiHost + '/customer/subscriptions/' + subScriptonId + '/payment',
          type: 'Post',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          data: { payment_id: payment_id},
          success: function (data) {
            console.log('customer subscription payment: ');
            console.log(data);
          }, // Array of customer subscriptions
          fail: function (jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
          },
        });
      },
    });
  }

  /**
   * Get subscriptions
   */
  customerSubscriptions() {
    const clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    const apiHost = 'https://dev-api.wildcrafter.com';

    const subscriptionItem = ({ data, productCount, itemCount }) => `
    <div class="subscription-item">
      <div class="item-info">
        <div class="icon"></div>
        <div class="left-align">          
          <p><span class="frequency">${frequency(data.name)}</span></p>
          <p><span class="number">Subscription #: ${data.id}</span></p>
          <p><span class="products">${productCount} products | ${itemCount} Items</span></p>          
        </div>
        <span class="date">${data.billingPeriodStartDate}</span>
      </div>
      <div class="ship-to">
        <div class="icon"></div>
        <div>
          <p><span class="shipping-title">Ships To</span></p>
          <p><span class="shipping">${data.shipping[0].street_1} ${data.shipping[0].city}, ${data.shipping[0].state}, ${data.shipping[0].zip}</span></p>
        </div>
      </div>    
      <div class="manage-button">
        <button class="button form-prefixPostfix-button--postfix button--tertiary optimizedCheckout-buttonSecondary mdc-button mdc-button--x-small secondary manage_button" data-subId="${data.id}">Manage</button>
      </div>      
    </div>
  `;

    // TODO: Map the frequency titles to plans
    var frequency = type => {
      return type;
    };

    var self = this;
    $.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function (data) {
        var token = data;
        console.log('success ' + data);
        $.ajax({
          url: apiHost + '/customer/subscriptions',
          type: 'GET',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          success: function (data) {
            var subscriptions = data.results.subscriptions;
            console.log("subscriptions====", subscriptions);
            
            var item = [];
            var x = 0;
            var itemCount = 0;
            var productCount = 0;
            if (subscriptions) {
              subscriptions.forEach(product => {
                var subaddOns = product.addOns;
                subaddOns.forEach(addOns =>{
                  productCount++;
                  itemCount = parseInt(itemCount) + parseInt(addOns.quantity);
                });
                item[x] = { data: product, productCount: productCount, itemCount: itemCount };
                x++;
              });
              $('#subscriptions')
                .html(item.map(subscriptionItem).join(''))
                .show();
                self.managerButtonHandler();
            } else {
              $('#subscriptions')
                .text(noSubscriptionsText)
                .show();
            }

            
          }, // Array of customer subscriptions
        });
      },
    });
  }

  // manager button handler
  managerButtonHandler(){
    $('.manage_button').on('click', (event) => {
      console.log('managebutton clicked');
      
      event.preventDefault();
      const subscriptionId = $(event.currentTarget).data('subid');
      console.log("ID", subscriptionId)

      //call second ajax 
      this.customerSubscription(subscriptionId)
      // console.log('plan id: ' + this.data('planId'));
      $('#subscriptions').hide();
    });
  }


  customerSubscription(subscriptionId) {
    const clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    const apiHost = 'https://dev-api.wildcrafter.com';

    console.log('attempt customer subscription');
    var self = this;
    $.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function (data) {
        var token = data;
        $.ajax({
          url: apiHost + '/customer/subscriptions/' + subscriptionId,
          type: 'GET',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          success: function (data) {
            console.log('customer subscription: ');
            console.log(data);
            var subscription = data.results.subscription;

            if (subscription) {

              self.edit_subscription(subscription);

            } else {
              $('.has-no-subscriptions')
                .show();
            }
          }, // Array of customer subscriptions
          fail: function (jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
          },
        });
      },
    });
  }

  deleteSubscription(subscriptionId) {
    const clientId = 'k97zcmt75n90rlafuuowxzf97oj6aod';
    const apiHost = 'https://dev-api.wildcrafter.com';

    console.log('attempt to delete subscription');

    $.ajax({
      url: '/customer/current.jwt?app_client_id=' + clientId,
      success: function (data) {
        var token = data;
        $.ajax({
          url: apiHost + '/customer/subscriptions/' + subscriptionId,
          type: 'DELETE',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Auth-Client', clientId);
            xhr.setRequestHeader('X-Auth-Token', token);
          },
          success: function (data) {
            console.log('customer subscription deleted: ');
            console.log(data);
          }, // Array of customer subscriptions
          fail: function (jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
          },
        });
      },
    });
  }

  edit_subscription(subscription) {
    $('#plan_id').html(subscription.name);
    $('#order_id').html(subscription.id);
    $('#ship_to').html(subscription.shipping[0].street_1 + " " + subscription.shipping[0].city +", "+ subscription.shipping[0].state + ", " + subscription.shipping[0].zip);
    
    $('#active_status').html(subscription.status);
    $('#first_bill_date').html(subscription.firstBillingDate);
    $('#current_bill_period').html(subscription.billingPeriodStartDate + "-" + subscription.billingPeriodEndDate);
    $('#next_bill_date').html(subscription.nextBillingDate);
    $('#next_bill_amount').html(subscription.nextBillAmount);
    $('#recurrence').html(subscription.name);
    
    $('#subcription-delete').data('subid', subscription.id);

    var discountAmount = subscription.discounts[0].amount;
    this.subscriptionList(subscription.addOns, discountAmount);

    var current_card = subscription.transactions[0].creditCard;
    
    this.customerPayment(current_card);
    
    $('#edit-subscriptions').show();


  }

  subscriptionList(subproduct, discountAmount){
    var html = '';
    var subtotal = 0;
    subproduct.forEach(product => {
        var disAmount = parseInt(product.amount) - parseInt(discountAmount);
        html +='<div class="shopping-cart__product cart-page-products">'+
        '<a target="_top" href="">'+
            '<div class="shopping-cart__product-img-container">'+
            '<img class="shopping-cart__product-img  lazyload" data-sizes="auto"'+
                'src="https://cdn.wildcrafter.com/wp-content/uploads/2019/06/02071130/Inner-Warrior-Vertical-Box-w-K-Cups-Left-768x576.png"'+
                'alt="{{image.alt}}" title="{{image.alt}}">'+
            '</div>'+
        '</a>'+
  
        '<div class="shopping-cart__product-info-container">'+
            '<a target="_top" href="">'+
            '<div class="shopping-cart__product-info-label">' + product.name + '</div>'+
            '</a>'+
            '<div class="shopping-cžart__product-info-sub">Quantity</div>'+
            '<div class="quantity">'+ product.quantity +' Pods</div>'+
        '</div>'+
            '<div class="shopping-cart__product_price  price--discounted">$'+ product.amount +'</div>'+
            '<div class="shopping-cart__product_price">$'+ disAmount +'.00</div>'+
        '</div>';
        subtotal = parseInt(subtotal) + parseInt(product.amount);
    });

    var total = parseInt(subtotal) + 2.5
    $("#subscription_list").append(html)
    $('#sub_total').children().html(subtotal);
    $('#taxes').children().html('2.5');
    $('#shopping').children().html('Free');
    $('#total').children().html(total);

  }


  bindEvents() {
    
    /**
    * Delete subscriptions
    */
    $('#subcription-delete').on('click', (event) => {
      console.log('subscription delete handler');
      event.preventDefault();
      const subscriptionId = $(event.currentTarget).data('subid');
      console.log("ID", subscriptionId)
      this.deleteSubscription(subscriptionId);
    });
    
    // payment method select handler
    // $('#payment-method-select').on('click', event => {
    //   console.log("select change");
    //   const $select = $(event.currentTarget);
      
    //   const payment_id = $select.data('paymentId');
    //   const subscriptionId = $('#subcription-delete').data('subid');

    //   this.customerSubscriptionPayment(subscriptionId, payment_id);
    // });

    
  }
}


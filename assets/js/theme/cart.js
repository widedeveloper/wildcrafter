/* eslint-disable */
import PageManager from './page-manager';
import _ from 'lodash';
import giftCertCheck from './common/gift-certificate-validator';
import utils from '@bigcommerce/stencil-utils';
import ShippingEstimator from './cart/shipping-estimator';
import { defaultModal } from './global/modal';
import swal from './global/sweet-alert';

export default class Cart extends PageManager {
  onReady() {
    this.$cartContent = $('[data-cart-content]');
    this.$menucartContent = $('[data-cart-content-menu]');
    this.$relatedCartContent = $('[related-cards--products]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.bindEvents();
  }
  /**
   * Get cart contents
   *
   * @param {String} cartItemId
   * @param {Function} onComplete
   */
  getCartContent(cartItemId, onComplete) {
    const options = {
      template: 'products/card-related',
      params: {
        suggest: cartItemId,
      },
      config: {
        cart: {
          suggestions: {
            limit: 2,
          },
        },
      },
    };
    utils.api.cart.getContent(options, onComplete);
  }
  cartUpdate($target) {
    const itemId = $target.data('cartItemid');
    const $el = $(`#qty-${itemId}`);
    const oldQty = parseInt($el.val(), 10);
    const maxQty = parseInt($el.data('quantityMax'), 10);
    const minQty = parseInt($el.data('quantityMin'), 10);
    const minError = $el.data('quantityMinError');
    const maxError = $el.data('quantityMaxError');
    const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return swal({
        text: minError,
        type: 'error',
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return swal({
        text: maxError,
        type: 'error',
      });
    }

    this.$overlay.show();

    utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
      this.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        const remove = newQty === 0;

        this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        swal({
          text: response.data.errors.join('\n'),
          type: 'error',
        });
      }
    });
  }

  cartUpdateQtyTextChange($target, preVal = null) {
    const itemId = $target.data('cartItemid');
    const $el = $(`#qty-${itemId}`);
    const maxQty = parseInt($el.data('quantityMax'), 10);
    const minQty = parseInt($el.data('quantityMin'), 10);
    const oldQty = preVal !== null ? preVal : minQty;
    const minError = $el.data('quantityMinError');
    const maxError = $el.data('quantityMaxError');
    const newQty = parseInt(Number($el.val()), 10);
    let invalidEntry;

    // Does not quality for min/max quantity
    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return swal({
        text: `${invalidEntry} is not a valid entry`,
        type: 'error',
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return swal({
        text: minError,
        type: 'error',
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return swal({
        text: maxError,
        type: 'error',
      });
    }

    this.$overlay.show();
    utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
      this.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        const remove = newQty === 0;

        this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        swal({
          text: response.data.errors.join('\n'),
          type: 'error',
        });
      }
    });
  }

  getProductModifiers(cartIDs) {
    const promisAll = [];
    cartIDs.map(id =>
      promisAll.push($.get(`${window.wpUrl}/wp-json/bc/v3/catalog/products/${id}/modifiers`))
    );
    return new Promise((resolve, reject) => {
      Promise.all(promisAll).then(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getRelatedProducts() {
    return new Promise((resolve, reject) => {
      $.get(`${window.wpUrl}/wp-json/bc-custom/upsells`, res => {
        try {
          resolve(res.data);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  cartRemoveItem(itemId) {
    this.$overlay.show();
    utils.api.cart.itemRemove(itemId, (err, response) => {
      if (response.data.status === 'succeed') {
        this.refreshContent(true);
      } else {
        swal({
          text: response.data.errors.join('\n'),
          type: 'error',
        });
      }
    });
  }

  cartEditOptions(itemId) {
    const modal = defaultModal();
    const options = {
      template: 'cart/modals/configure-product',
    };

    modal.open();

    utils.api.productAttributes.configureInCart(itemId, options, (err, response) => {
      modal.updateContent(response.content);

      this.bindGiftWrappingForm();
    });

    utils.hooks.on('product-option-change', (event, option) => {
      const $changedOption = $(option);
      const $form = $changedOption.parents('form');
      const $submit = $('input.button', $form);
      const $messageBox = $('.alertMessageBox');
      const item = $('[name="item_id"]', $form).attr('value');

      utils.api.productAttributes.optionChange(item, $form.serialize(), (err, result) => {
        const data = result.data || {};

        if (err) {
          swal({
            text: err,
            type: 'error',
          });
          return false;
        }

        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  }

  refreshContent(remove) {
    const $cartItemsRows = $('[data-item-row]', this.$cartContent);
    const $cartPageTitle = $('[data-cart-page-title]');
    const options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
      },
    };
    const optionsmenu = {
      template: {
        content: 'cart/cart-content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
      },
    };

    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }

    utils.api.cart.getContent(optionsmenu, (err, response) => {
      this.$menucartContent.html(response.content);
      const $MenuCartItemsRows = $('[data-item-row]', this.$menucartContent);
      if ($MenuCartItemsRows.length > 0) {
        $('[data-cart-show-menu]').show();
        $('[empty-cart-view-menu]').hide();
      } else {
        $('[data-cart-show-menu]').hide();
        $('[empty-cart-view-menu]').show();
      }
      this.bindEvents();
    });

    utils.api.cart.getContent(options, (err, response) => {
      this.$cartContent.html(response.content);
      this.$cartTotals.html(response.totals);
      this.$cartMessages.html(response.statusMessages);

      $cartPageTitle.replaceWith(response.pageTitle);
      this.bindEvents();
      this.$overlay.hide();
      const quantity =
        $('[data-cart-quantity]', this.$cartContent)
          .add($('[data-cart-quantity]', this.$menucartContent))
          .data('cartQuantity') || 0;

      $('body').trigger('cart-quantity-update', quantity);
    });
  }
  bindCartEvents() {
    const debounceTimeout = 400;
    const cartUpdate = _.bind(_.debounce(this.cartUpdate, debounceTimeout), this);
    const cartUpdateQtyTextChange = _.bind(
      _.debounce(this.cartUpdateQtyTextChange, debounceTimeout),
      this
    );
    const cartRemoveItem = _.bind(_.debounce(this.cartRemoveItem, debounceTimeout), this);
    let preVal;
    // cart update
    $('[data-cart-update]', this.$cartContent)
      .add($('[data-cart-update]', this.$menucartContent))
      .on('click', event => {
        const $target = $(event.currentTarget);

        event.preventDefault();
        // update cart quantity
        cartUpdate($target);
      });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent)
      .on('focus', function onQtyFocus() {
        preVal = this.value;
      })
      .change(event => {
        const $target = $(event.currentTarget);
        event.preventDefault();

        // update cart quantity
        cartUpdateQtyTextChange($target, preVal);
      });

    $('.cart-remove', this.$cartContent)
      .add($('.cart-remove', this.$menucartContent))
      .on('click', event => {
        const itemId = $(event.currentTarget).data('cartItemid');
        const string = $(event.currentTarget).data('confirmDelete');
        swal({
          text: string,
          type: 'warning',
          showCancelButton: true,
        }).then(() => {
          // remove item from cart
          cartRemoveItem(itemId);
        });
        event.preventDefault();
      });

    $('[data-item-edit]', this.$cartContent)
      .add($('[data-item-edit]', this.$menucartContent))
      .on('click', event => {
        const itemId = $(event.currentTarget).data('itemEdit');

        event.preventDefault();
        // edit item in cart
        this.cartEditOptions(itemId);
      });
  }
  bindPromoCodeEvents() {
    const $couponContainer = $('.coupon-code');
    const $couponForm = $('.coupon-form');
    const $codeInput = $('[name="couponcode"]', $couponForm);

    $('.coupon-code-add').on('click', event => {
      event.preventDefault();

      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });

    $('.coupon-code-cancel').on('click', event => {
      event.preventDefault();

      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });

    $couponForm.on('submit', event => {
      const code = $codeInput.val();

      event.preventDefault();

      // Empty code
      if (!code) {
        return swal({
          text: $codeInput.data('error'),
          type: 'error',
        });
      }

      utils.api.cart.applyCode(code, (err, response) => {
        if (response.data.status === 'success') {
          this.refreshContent();
        } else {
          swal({
            text: response.data.errors.join('\n'),
            type: 'error',
          });
        }
      });
    });
  }

  bindGiftCertificateEvents() {
    const $certContainer = $('.gift-certificate-code');
    const $certForm = $('.cart-gift-certificate-form');
    const $certInput = $('[name="certcode"]', $certForm);

    $('.gift-certificate-add').on('click', event => {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });

    $('.gift-certificate-cancel').on('click', event => {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });

    $certForm.on('submit', event => {
      const code = $certInput.val();

      event.preventDefault();

      if (!giftCertCheck(code)) {
        return swal({
          text: $certInput.data('error'),
          type: 'error',
        });
      }

      utils.api.cart.applyGiftCertificate(code, (err, resp) => {
        if (resp.data.status === 'success') {
          this.refreshContent();
        } else {
          swal({
            text: resp.data.errors.join('\n'),
            type: 'error',
          });
        }
      });
    });
  }

  bindGiftWrappingEvents() {
    const modal = defaultModal();

    $('[data-item-giftwrap]').on('click', event => {
      const itemId = $(event.currentTarget).data('itemGiftwrap');
      const options = {
        template: 'cart/modals/gift-wrapping-form',
      };

      event.preventDefault();

      modal.open();

      utils.api.cart.getItemGiftWrappingOptions(itemId, options, (err, response) => {
        modal.updateContent(response.content);

        this.bindGiftWrappingForm();
      });
    });
  }

  bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', event => {
      const $select = $(event.currentTarget);
      const id = $select.val();
      const index = $select.data('index');

      if (!id) {
        return;
      }

      const allowMessage = $select.find(`option[value=${id}]`).data('allowMessage');

      $(`.giftWrapping-image-${index}`).hide();
      $(`#giftWrapping-image-${index}-${id}`).show();

      if (allowMessage) {
        $(`#giftWrapping-message-${index}`).show();
      } else {
        $(`#giftWrapping-message-${index}`).hide();
      }
    });

    $('.giftWrapping-select').trigger('change');

    function toggleViews() {
      const value = $('input:radio[name ="giftwraptype"]:checked').val();
      const $singleForm = $('.giftWrapping-single');
      const $multiForm = $('.giftWrapping-multiple');

      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }

    $('[name="giftwraptype"]').on('click', toggleViews);

    toggleViews();
  }

  setTimeForCookies() {
    const now = new Date();
    let time = now.getTime();
    time = time + 100 * 60 * 60 * 1000 * 60;
    now.setTime(time);
    return now;
  }
  readCookie() {
    const nameEQ = 'cart_count=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }
  setCookie() {
    document.cookie = `cart_count = ; expires=Thu, 01 Jan 1970 00:00:01; domain=${window.cookieDomain}; path=/`;
    const cartCount = $('.shopping-cart_page_products').attr('data-cart-quantity');
    const timeData = this.setTimeForCookies();
    if (typeof cartCount === 'undefined') {
      document.cookie = `cart_count = 0; expires= ${timeData}; domain=${window.cookieDomain}; path=/`;
    } else {
      document.cookie = `cart_count = ${cartCount}; expires= ${timeData}; domain=${window.cookieDomain}; path=/`;
    }
  }

  relatedProducts() {
    $('.related-cards__products').html(' ');
    this.getRelatedProducts().then(jsonData => {
      const cartIDs = [];
      $('.cart-page-products').each(function() {
        cartIDs.push($(this).attr('data-card-productid'));
      });
      const relatedProductsIds = [];
      jsonData.forEach(item => {
        item.related_products.forEach(proID => {
          if (
            relatedProductsIds.indexOf(proID) === -1 &&
            cartIDs.indexOf(proID.toString()) === -1
          ) {
            relatedProductsIds.push(proID);
          }
        });
      });
      $('.related-cards__products').html(' ');
      this.relatedProductContens(relatedProductsIds, jsonData);
    });
  }
  relatedProductContens(relatedProductIds, allProducts) {
    let productsContent = ' ';
    $('.related-cards__products').html(' ');
    this.getProductModifiers(relatedProductIds).then(res => {
      allProducts.forEach(item => {
        const index = relatedProductIds.indexOf(item.id);
        if (index >= 0) {
          const subTilte = item.custom_fields.filter(custom => custom.name === 'Sub Title');
          const Bgcolor = item.custom_fields.filter(custom => custom.name === 'color');
          const cups = item.custom_fields.filter(custom => custom.name === 'cups');
          const boxes = item.custom_fields.filter(custom => custom.name === 'boxes');
          const upsellheadline = item.custom_fields.filter(
            custom => custom.name === 'upsell_headline'
          );
          const upselltag = item.custom_fields.filter(custom => custom.name === 'upsell_tag');
          const wplink = item.custom_fields.filter(custom => custom.name === 'wp_url');
          if (res[index].length === 0) {
            productsContent = `${productsContent}
                        ${
                          upsellheadline.length > 0
                            ? `<div class="products-text-title">${upsellheadline[0].value}</div>`
                            : ''
                        }
                        <div class="shopping-cart__product" data-item-row="" id="${item.id}">
                        <a target ="_top" href="${wplink.length > 0 ? wplink[0].value : '#'}">
                        <div class="shopping-cart__product-img-container ${
                          Bgcolor.length > 0 ? Bgcolor[0].value : ''
                        }">
                            <img class="shopping-cart__product-img  lazyautosizes lazyloaded" data-sizes="auto" src="${
                              item.image_url
                            }" alt="" title="" sizes="149px">
                        </div>
                        </a>
                        <div class="shopping-cart__product-info-container">
                        <a target ="_top" href="${
                          wplink.length > 0 ? wplink[0].value : '#'
                        }"><div class="shopping-cart__product-info-label">${item.name}</div></a>
                                    <div class="shopping-cart__product-info-sub">${
                                      subTilte.length > 0 ? subTilte[0].value : ''
                                    }</div>
                            <div class="shopping-cart__hline"></div>
                            <div class="shopping-cart__product-info-3part">
                            $${item.price} 
                            ${boxes.length > 0 ? ` | ${boxes[0].value}` : ''}
                            ${cups.length > 0 ? ` | ${cups[0].value}` : ''}
                            </div>
                            <div class="shopping-cart__hline"></div>
                            <form class="form" method="post" action="/cart.php" enctype="multipart/form-data" data-cart-item-add="">
                                <input type="hidden" name="action" value="add">
                                <input type="hidden" name="product_id" value="${item.id}">
                                <button data-wait-message="Adding to cart…" class="button mdc-button  button--primary" type="submit" value="Add to Cart">Add Pack</button>
                            </form>
                        </div>
                            ${
                              upselltag.length > 0
                                ? `<div class="shopping-cart__product-save-icon">
                                    <span>${upselltag[0].value}</span>
                                </div>`
                                : ''
                            }
                        </div>`;
          } else {
            let modifierContent = '';
            res[index].data.forEach(modiItem => {
              modifierContent = `${modifierContent}<input class="form-radio" type="hidden" name="attribute[${modiItem.id}]" value="${modiItem.option_values[0].id}" checked="" required="" data-state="true">`;
            });
            productsContent = `${productsContent}
                                ${
                                  upsellheadline.length > 0
                                    ? `<div class="products-text-title">${upsellheadline[0].value}</div>`
                                    : ''
                                }
                                <div class="shopping-cart__product" data-item-row="" id="${
                                  item.id
                                }">
                                
                                <div class="shopping-cart__product-img-container  ${
                                  Bgcolor.length > 0 ? Bgcolor[0].value : ''
                                }">
                                <a target ="_top" href="${
                                  wplink.length > 0 ? wplink[0].value : '#'
                                }">
                                    <img class="shopping-cart__product-img  lazyautosizes lazyloaded" data-sizes="auto" src="${
                                      item.image_url
                                    }" alt="" title="" sizes="149px">
                                </a>
                                </div>
                                
                                <div class="shopping-cart__product-info-container">
                                <a target ="_top" href="${
                                  wplink.length > 0 ? wplink[0].value : '#'
                                }"><div class="shopping-cart__product-info-label">${
              item.name
            }</div></a>
                                        <div class="shopping-cart__product-info-sub">${
                                          subTilte.length > 0 ? subTilte[0].value : ''
                                        }</div>
                                    <div class="shopping-cart__hline"></div>
                                    <div class="shopping-cart__product-info-3part">
                                    ${
                                      item.sale_price > 0
                                        ? ` <span class="sale_price_true">$${item.price} </span> | $${item.sale_price}`
                                        : `$${item.price}`
                                    }
                                    ${boxes.length > 0 ? ` | ${boxes[0].value}` : ''}
                                    ${cups.length > 0 ? ` | ${cups[0].value}` : ''}
                                    </div>
                                    <div class="shopping-cart__hline"></div>
                                    <form class="form" method="post" action="/cart.php" enctype="multipart/form-data" data-cart-item-add="">
                                        <input type="hidden" name="action" value="add">
                                        <input type="hidden" name="product_id" value="${item.id}">
                                        ${modifierContent}
                                        <button data-wait-message="Adding to cart…" class="button mdc-button  button--primary" type="submit" value="Add to Cart">Add Pack</button>
                                    </form>
                                </div>
                                ${
                                  upselltag.length > 0
                                    ? `<div class="shopping-cart__product-save-icon">
                                        <span>${upselltag[0].value}</span>
                                    </div>`
                                    : ''
                                }
                            </div>`;
          }
        }
        $('.related-cards__products').html(productsContent);
      });
    });
  }
  bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();
    this.setCookie();
    this.relatedProducts();
    // initiate shipping estimator module
    this.shippingEstimator = new ShippingEstimator($('[data-shipping-estimator]'));
  }
}

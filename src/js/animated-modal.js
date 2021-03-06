/*=========================================
 * animatedModal.js: Version 1.0
 * author: João Pereira
 * website: http://www.joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT
=========================================*/

(function($) {

  $.fn.animatedModal = function(options) {
    var modal = $(this);

    //Defaults
    var settings = $.extend({
      modalTarget: 'animatedModal',
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      right: '0px',
      moveBody: false,
      zIndexIn: '9999',
      zIndexOut: '-9999',
      color: '#39BEB9',
      opacityIn: '1',
      opacityOut: '0',
      animatedIn: 'zoomIn',
      animatedOut: 'zoomOut',
      animationDuration: '.6s',
      overflow: 'auto',
      location: 'left',
      // Callbacks
      beforeOpen: function() {},
      afterOpen: function() {},
      beforeClose: function() {},
      afterClose: function() {}
    }, options);

    var closeBt = $('.close-' + settings.modalTarget);
    var $body = $('body');

    var href = $(modal).attr('href'),
      id = $('body').find('#' + settings.modalTarget),
      idConc = '#' + id.attr('id');
    //console.log(idConc);
    // Default Classes
    id.addClass('animated');
    id.addClass(settings.modalTarget + '-off');

    //Init styles
    var initStyles = {
      'position':settings.position,
      'width':settings.width,
      'height':settings.height,
      'top':settings.top,
      'left': settings.location === 'left' ? settings.left : '',
      'right': settings.location === 'right' ? settings.right : '',
      'background-color':settings.color,
      'overflow-y':settings.overflow,
      'z-index':settings.zIndexOut,
      'opacity':settings.opacityOut,
      '-webkit-animation-duration':settings.animationDuration,
      '-moz-animation-duration':settings.animationDuration,
      '-ms-animation-duration':settings.animationDuration,
      'animation-duration':settings.animationDuration
    };

    initBodyStyles = {
      '-webkit-transition': settings.location+' '+settings.animationDuration,
      '-moz-transition': settings.location+' '+settings.animationDuration,
      '-ms-transition': settings.location+' '+settings.animationDuration,
      'transition': settings.location+' '+settings.animationDuration
    };

    //Apply styles
    id.css(initStyles);
    if(settings.moveBody) {
      $body.css(initBodyStyles);
    }


    modal.click(function(event) {
      event.preventDefault();
      $('body, html').css({
        'overflow': 'hidden'
      });
      if (href == idConc) {

        if (id.hasClass(settings.modalTarget + '-off')) {
          id.removeClass(settings.animatedOut);
          id.removeClass(settings.modalTarget + '-off');
          id.addClass(settings.modalTarget + '-on');
        }

        if (id.hasClass(settings.modalTarget + '-on')) {
          settings.beforeOpen();
          id.css({
            'opacity': settings.opacityIn,
            'z-index': settings.zIndexIn
          });
          id.addClass(settings.animatedIn);
          id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
        }

        if (settings.moveBody) {
          var bodyStyles = {
            'position': 'relative',
            'top': settings.top,
            'left': settings.location === 'left' ? settings.width : '',
            'right': settings.location === 'right' ? settings.width : ''
          };

          $body.css(bodyStyles);
        }

      }
    });



    closeBt.click(function(event) {
      event.preventDefault();
      $('body, html').css({
        'overflow': 'auto'
      });

      settings.beforeClose(); //beforeClose
      if (id.hasClass(settings.modalTarget + '-on')) {
        id.removeClass(settings.modalTarget + '-on');
        id.addClass(settings.modalTarget + '-off');
      }

      if (id.hasClass(settings.modalTarget + '-off')) {
        id.removeClass(settings.animatedIn);
        id.addClass(settings.animatedOut);
        id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
      }

      if (settings.moveBody) {
        var bodyResetStyles = {
          'top': 0,
          'left': settings.location === 'left' ? 0 : '',
          'right': settings.location === 'right' ? 0 : '',
          '-webkit-transition': settings.location+' '+settings.animationDuration,
          '-moz-transition': settings.location+' '+settings.animationDuration,
          '-ms-transition': settings.location+' '+settings.animationDuration,
          'transition': settings.location+' '+settings.animationDuration
        };

        $('body').css(bodyResetStyles);
      }

    });

    function afterClose() {
      /*id.css({
        'z-index': settings.zIndexOut
      });*/
      // id.css({'z-index':settings.zIndexOut, display: 'none'});
      id.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
      id.css({'z-index':settings.zIndexOut});
      settings.afterClose(); //afterClose
    }

    function afterOpen() {
      settings.afterOpen(); //afterOpen
    }

  }; // End animatedModal.js

}(jQuery));

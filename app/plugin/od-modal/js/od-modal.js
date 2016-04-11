/**
 * Created by ZhiyuanSun on 16/4/11.
 */
(function($){
  'use strict';

  var Modal = function(element){
    this.$element = $(element);
    this.isShown = null;
  };

  Modal.prototype.show = function(){
    this.$element.css({
      display: 'block'
    });
    this.isShown = true;
  };

  Modal.prototype.hide = function(){
    this.$element.css({
      display: 'none'
    });
    this.isShown = false;
  };


  function Plugin(option){
    return this.each(function(){
      var modal = new Modal(this);
      if(typeof option == 'string') modal[option]();
    });
  }



  var old = $.fn.odModal;

  $.fn.odModal             = Plugin;
  $.fn.odModal.Constructor = Modal;


  // MODAL NO CONFLICT
  // =================

  $.fn.odModal.noConflict = function () {
    $.fn.odModal = old;
    return this;
  }

})(jQuery);
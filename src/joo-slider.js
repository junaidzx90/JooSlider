class JooSlider {
  constructor(options) {
    this.wrapper = options.warpper;
    this.slider = options.slider;
    this.next = options.next;
    this.prev = options.prev;
    this.speed = options.speed;
    this.thumbnails = options.thumbnails;
    this.thumb = options.thumb;
    this.thumbSize = options.thumbSize;
    this.zoombtn = options.zoomClass;
    this.closeScreen = options.closeZoom;
    this.update();

    let obj = this;
    jQuery(jQuery(this.wrapper)[0]).on('fullscreenchange', function () {
      if (!document.fullscreenElement) {
        obj.closeFullscreen();
      }
    });
  }

  update() {
    let obj = this;
    let thumb = obj.thumb;
    let thumbSize = obj.thumbSize;
    let zoombtn = obj.zoombtn;
    let closeZoom = obj.closeScreen;
    let wrapper = obj.wrapper;
    let slider = obj.slider;
    let position = 0;
    let length = jQuery(obj.slider).children().length;

    jQuery(slider).css('width', length * 100 + '%');
    jQuery(slider).css('left', 0);

    let itemPos = 0;
    jQuery(slider)
      .children()
      .each(function (ind, el) {
        if (ind == 0) {
          jQuery(this).addClass('current');
        }
        jQuery(this).attr('data-pos', itemPos);
        itemPos += 100;
      });

    jQuery(obj.prev).on('click', function () {
      if (jQuery(slider).find('.current').prev().length > 0) {
        jQuery(slider)
          .find('.current')
          .removeClass('current')
          .prev()
          .addClass('current');

        position = jQuery(slider).find('.current').attr('data-pos');
        jQuery(slider).animate({ left: -position + '%' }, obj.speed);
        if (document.fullscreenElement) {
          jQuery(slider).find('.current').css("background-size", "contain");
        }
      }
    });

    jQuery(obj.next).on('click', function () {
      if (jQuery(slider).find('.current').next().length > 0) {
        jQuery(slider)
          .find('.current')
          .removeClass('current')
          .next()
          .addClass('current');

        position = jQuery(slider).find('.current').attr('data-pos');
        jQuery(slider).animate({ left: -position + '%' }, obj.speed);
        if (document.fullscreenElement) {
          jQuery(slider).find('.current').css("background-size", "contain");
        }
      }
    });

    let itemPos2 = 0;
    for (let th = 0; th < thumbSize; th++) {
      let imgUrl = jQuery(slider)
        .find("[data-pos='" + itemPos2 + "']")
        .attr('data-url');
        if(length > th){
          jQuery(obj.thumbnails).append(
              `<li data-pos="${itemPos2}" class="thumb"><img src="${imgUrl}"></li>`
          );
          itemPos2 += 100;
      }
    }

    jQuery(obj.thumbnails).children("li").last().append(`<span class="zoom"><svg class="zoom" xmlns="http://www.w3.org/2000/svg" style="width:28px;height:28px" viewBox="0 0 24 24"><path fill="currentColor" d="M13 10h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2zm8.172 14l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"></path></svg></span>`)

    jQuery(thumb).on('click', function () {
      let thumbPos = jQuery(this).attr('data-pos');
      if (jQuery(slider).find("[data-pos='" + thumbPos + "']").length > 0) {
        jQuery(slider).find('.current').removeClass('current');
        jQuery(slider)
          .find("[data-pos='" + thumbPos + "']")
          .addClass('current');

        jQuery(slider).animate({ left: -thumbPos + '%' }, obj.speed);
      }
    });

    jQuery(document).on('click', "."+zoombtn, function (e) {
      jQuery(closeZoom).css('display', 'flex');
      jQuery('.zoom_wrapper').hide();
      jQuery(slider).find('.current').css("background-size", "contain");
      obj.openFullscreen(jQuery(wrapper)[0]);
    });

    jQuery(closeZoom).on('click', function () {
      obj.closeFullscreen();
    });
  }

  openFullscreen(currentSlide) {
    if (currentSlide.requestFullscreen) {
      currentSlide.requestFullscreen();
    } else if (currentSlide.webkitRequestFullscreen) {
      /* Safari */
      currentSlide.webkitRequestFullscreen();
    } else if (currentSlide.msRequestFullscreen) {
      /* IE11 */
      currentSlide.msRequestFullscreen();
    }
  }
  closeFullscreen() {
    if (document.fullscreenElement ) {
      document.exitFullscreen();
      jQuery('.zoom_wrapper').show();
      jQuery(this.closeScreen).hide();
      jQuery(slider).find('.current').css("background-size", "cover");
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
      jQuery('.zoom_wrapper').show();
      jQuery(this.closeScreen).hide();
      jQuery(slider).find('.current').css("background-size", "cover");
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
      jQuery('.zoom_wrapper').show();
      jQuery(this.closeScreen).hide();
      jQuery(slider).find('.current').css("background-size", "cover");
    }
  }
}
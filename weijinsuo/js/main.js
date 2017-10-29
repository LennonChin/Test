'use strict';

$(function () {
	
	// 获取屏幕的宽度，window.innerWidth也可以获取
	function resize() {
		var windowWidth = $(window).width();

		var isSmallScreen = windowWidth < 768;

		$('#main_ad > .carousel-inner > .item').each(function (index, item) {

			var $item = $(item); // 因为拿到的是DOM对象，需要转换
			
			// 我们需要小图时尺寸等比例变化，小图时需要用img方式
			$item.css('backgroundImage', 'url("'+ $item.data(isSmallScreen ? 'image-xs' : 'image-lg') +'")');

			if (isSmallScreen) {
				// 在字符串中使用ememt语法，用 ctrl + e 快捷键
				$item.html('<img src="' + $item.data(isSmallScreen ? 'image-xs' : 'image-lg') +'" alt="" />');

			} else {

				$item.empty();
			}
		});

	}

	$(window).on('resize', resize).trigger('resize');

});
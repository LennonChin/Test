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

	$('[data-toggle="tooltip"]').tooltip();

	var $ulContainer = $('.nav-tabs');
	var width = 0;
	$ulContainer.children().each(function(index, item) {
		width += item.clientWidth;
	});

	if (width > $(window).width()) {
		$ulContainer.css('width', width + 40).parent().css('overflow-x', 'scroll');
	}

	var $newTitle = $('.new-title');
	$('#news .nav-pills a').on('click', function() {

		var $this = $(this);
		var title = $this.data('title');
		$newTitle.text(title);

	});

	// 获取界面上的轮播图容器
  var $carousels = $('.carousel');
  var startX, endX;
  var offset = 50;
  // 注册滑动事件
  $carousels.on('touchstart', function(e) {
    // 手指触摸开始时记录一下手指所在的坐标X
    startX = e.originalEvent.touches[0].clientX;
    // console.log(startX);
  });

  $carousels.on('touchmove', function(e) {
    // 变量重复赋值
    endX = e.originalEvent.touches[0].clientX;
    // console.log(endX);
  });
  $carousels.on('touchend', function(e) {
    console.log(e);
    // 结束触摸一瞬间记录最后的手指所在坐标X
    // 比大小
    // console.log(endX);
    // 控制精度
    // 获取每次运动的距离，当距离大于一定值时认为是有方向变化
    var distance = Math.abs(startX - endX);
    if (distance > offset) {
      // 有方向变化
      // console.log(startX > endX ? '←' : '→');
      // 2. 根据获得到的方向选择上一张或者下一张
      //     - $('a').click();
      //     - 原生的carousel方法实现 http://v3.bootcss.com/javascript/#carousel-methods
      $(this).carousel(startX > endX ? 'next' : 'prev');
    }
  });

});
;
(function($){
	function Banner({imgs,width,height,duration,addPrevNextBtn}){
		this.imgs = imgs;
		this.width = width;
		this.height = height;
		this.duration = duration || 3000;//轮播切换时间
		this.addPrevNextBtn = addPrevNextBtn;//是否添加向前、向后翻页按钮
		
		this.container = null;
		this.lis = null;
		this.circles = null;
		this.len = imgs.length;
		this.currentIndex = 0;
		this.nextIndex = 1;
		this.timer = null;
		this.prev = null;
		this.next = null;
	}
	//向Banner.prototype中添加属性
	$.extend(Banner.prototype, {
		createDom:function(container){
			this.container = $(container);
			this.container.addClass("sk-container");
			
			//li布局
			var lis = "",
				circles = "";
			for (var i = 0,len = this.imgs.length;i<len;i++) {
				lis += `<li ${ i==0 ? 'style="display:block;"':''}>
							<a href="${this.imgs[i].href}">
								<img src="${this.imgs[i].src}">
							</a>
						</li>`;
				circles += `<i ${ i==0 ? 'class="current"' : ''}></i>`;
			}
			
			//向前、向后翻页DOM结构
			var prevNext = "";
			if (this.addPrevNextBtn) {
				prevNext = `<div class="prev">&lt;</div>
							<div class="next">&gt;</div>`;
			}
			
			//完整布局
			var html = `<ul class="imgs">${lis}</ul>
						<div class="pages">${circles}</div>${prevNext}`;
			//添加到容器中
			this.container.html(html);
			
			//设置CSS样式
			this.container.css({
				width:this.width,
				height:this.height
			});
			$(".imgs,li",this.container).css({
				width:this.width,
				height:this.height
			});
			$(".pages",this.container).css("width",this.width);
			
			//保存属性
			this.lis = $("li",this.container);
			this.circles = $("i",this.container);
			this.prev = $(".prev",this.container);
			this.next = $(".next",this.container);
			
			//注册事件监听
			this.registerEventListener();
		},
		
		autoPlay:function(){
			this.timer = setInterval($.proxy(this.move,this),this.duration);
		},
		
		move:function(){
			this.lis.eq(this.currentIndex).stop().fadeOut();
			this.lis.eq(this.nextIndex).stop().fadeIn();
			
			this.circles.eq(this.currentIndex).removeClass("current");
			this.circles.eq(this.nextIndex).addClass("current");
			
			this.currentIndex = this.nextIndex;
			this.nextIndex++;
			if (this.nextIndex >= this.len) {
				this.nextIndex = 0;
			}
		},
		
		registerEventListener:function(){
			this.container.hover($.proxy(this.stopPlay,this),$.proxy(this.autoPlay,this));
			
			this.circles.mouseover($.proxy(this.over,this));
			
			this.prev.on("click",$.proxy(this.previous,this));
			this.next.on("click",$.proxy(this.move,this));
		},
		
		stopPlay:function(){
			clearInterval(this.timer);
		},
		
		over:function(e){
			var _index = $(e.target).index();
			if (this.currentIndex == _index) {
				return;
			}
			this.nextIndex = _index;
			this.move();
		},
		
		previous:function(){
			this.nextIndex = this.currentIndex - 1;
			if (this.nextIndex < 0) {
				this.nexIndex = this.len - 1;
			}
			this.move();
		}
	});
	
	$.fn.banner = function(options){
		this.each(function(index,element){
			var c = new Banner(options);
			c.createDom(element);
			c.autoPlay();
		});
	}
})(jQuery);

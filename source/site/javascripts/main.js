$(document).ready(function(){
	
	$("a.fancybox").fancybox({
		speedIn: 300,
		speedOut: 250,
		titlePosition: 'over',
		transitionIn: 'elastic',
		transitionOut: 'elastic',
		// easingIn: 'easeOutBack',
		// easingOut: 'easeInBack',
		onComplete:	function() {
			$("#fancybox-wrap").hover(function(){
				$("#fancybox-title").fadeIn();
			}, function() {
				$("#fancybox-title").fadeOut();
			});
		}
	}).hover(function(){
		var self = $(this);
		if (self.children("img").length > 0 && !self.hasClass("no-title")) {
			if (self.children("i").length == 0) {
				var alt = self.attr("title");
				if (alt === "") alt = self.children("img").attr("alt");
				var limit = self.width() / 6;
				if (alt !== '') {
					if (alt.length > limit) {
						alt = $.trim(alt.substr(0, limit)) + "...";
					};
					self.append("<i>" + alt + "</i>");
				};
			};
			self.children("i").fadeIn();
		};
	},function(){
		var self = $(this);
		if (self.children("img").length > 0 && !self.hasClass("no-title")) {
			self.children("i").fadeOut();
		};
	});
	
});
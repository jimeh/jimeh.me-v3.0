$(document).ready(function(){
	if (navigator.userAgent.match(/Mobile.*Safari|Safari.*Mobile/i) !== null) {
		$("body").css("position", "static").css("overflow-y", "auto").css("overflow-x", "auto");
	};
});
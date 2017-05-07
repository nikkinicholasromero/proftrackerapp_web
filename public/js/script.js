$(document).ready(function() {
	if(isLoginFailed()) {
		$('#login-failed-warning-div').show();
	}

	$("#search-field").keyup(function(event){
		if(event.keyCode == 13){
			filterProfessors();
		}
	});

	$(".search-button").click(function() {
		filterProfessors();
	});

	$(".view-profile-button").click(function() {
		toggleScheduleVisibility(this);
	}); 
});

function filterProfessors() {
	var searchKey = $("#search-field").val();

	$('.professor-info').each(function(i, obj) {
		var professor = $(obj).find('div > div > h2').text();
		var department = $(obj).find('div > div > p').text();

		if (professor.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1) {
			$(obj).parent().parent().parent().show();
		} else if (department.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1) {
			$(obj).parent().parent().parent().show();
		} else {
			$(obj).parent().parent().parent().hide();
		}
	});
}

function toggleScheduleVisibility(obj) {
	if ($(obj).text() == 'Show schedule') {
		$(obj).parent().children('.schedule').show();
		$(obj).text("Hide schedule");
	} else {
		$(obj).parent().children('.schedule').hide();
		$(obj).text("Show schedule");
	}
}

function isLoginFailed() {
	var field = 'failed';
	var url = window.location.href;
	if (url.indexOf('?' + field) != -1) {
    	return true;
	} else if(url.indexOf('&' + field) != -1) {
    	return true;
	} else {
		return false
	}
}
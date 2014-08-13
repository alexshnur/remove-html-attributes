(function(){
	var $raRead,
		$raInsert,
		$btn,
		$raAttributes,
		$radio,
		$raTextareaContainer,
		$raUrlContainer,
		$raUrl,
		$HTMLContainer,
		$iframe,
		$raParseForm,
		type,
		arrayAttr,
		RegExpUrl = new RegExp('^(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:[0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?$', 'i');

	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {

			// Check if the XMLHttpRequest object has a "withCredentials" property.
			// "withCredentials" only exists on XMLHTTPRequest2 objects.
			xhr.open(method, url, true);

		} else if (typeof XDomainRequest != "undefined") {

			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
			xhr = new XDomainRequest();
			xhr.open(method, url);

		} else {

			// Otherwise, CORS is not supported by the browser.
			xhr = null;

		}
		return xhr;
	}

	function removeHTMLAttr() {
		arrayAttr = $raAttributes.val().split(',');
		$HTMLContainer = $('<div/>');
		if (type === 'insert') {
			$HTMLContainer.html($raRead.val());
		}
		if (type === 'link'){
			if (RegExpUrl.test($raUrl.val())) {
				$raUrl.closest('.form-group').removeClass('has-error');

				$.ajax({
					type: 'GET',
					url: $raUrl.val(),
					crossDomain: true,
					/*xhrFields: {
						withCredentials: false
					},
					headers: {
						'Origin': 'http://colesa.ru/',
						'Access-Control-Request-Method': 'PUT',
						'Access-Control-Request-Headers': 'X-Custom-Header',
						'Host': 'colesa.ru',
						'Accept-Language': 'en-US',
						'Connection': 'keep-alive',
						'User-Agent': 'Mozilla/5.0...'
					},*/
					success: function() {
					},
					error: function() {
					}
				});
/*
				var xhr = createCORSRequest('GET', $raUrl.val());
				xhr.setRequestHeader('X-Custom-Header', 'value');
				if (!xhr) {
					throw new Error('CORS not supported');
				}
				xhr.onload = function() {
					var responseText = xhr.responseText;
					console.log(responseText);
				};
				xhr.onerror = function() {
					console.log('There was an error!');
				};
				xhr.send();*/
			} else {
				$raUrl.closest('.form-group').addClass('has-error');
			}
		}
		console.log($HTMLContainer);
		$HTMLContainer.find('*').each(function(){
			var $this = $(this);
			arrayAttr.forEach(function(value){
				$this.removeAttr(value);
			})
		});
		$raInsert.val($HTMLContainer.html());
	}
	function isEmpty(){
		if (($raAttributes.val() && $raRead.val() && $raTextareaContainer.is(':visible')) || ($raAttributes.val() && $raUrl.val() && $raUrlContainer.is(':visible'))) {
			$btn.removeAttr('disabled');
		} else {
			$btn.attr('disabled', true);
		}
	}
	function isReadType() {
		$radio.each(function(){
			if ($(this).is(':checked')) {
				type = $(this).val();
				return false;
			}
		});
		if (type === 'insert') {
			$raTextareaContainer.show();
			$raUrlContainer.hide();
		}
		if (type === 'link'){
			$raTextareaContainer.hide();
			$raUrlContainer.show();
		}
		isEmpty();
	}

	$(function(){
		$raRead = $('.ra-read');
		$raInsert = $('.ra-insert');
		$btn = $('.btn');
		$raAttributes = $('.ra-attributes');
		$raTextareaContainer = $('.ra-textarea-container');
		$raUrlContainer = $('.ra-url-container');
		$raUrl = $('.ra-url');
		$radio = $('input[type="radio"]');
		$raParseForm = $('#ra-parse-form');
		$iframe = $('iframe');

		$raRead.on('input propertychange', isEmpty);
		$raAttributes.on('input propertychange', isEmpty);
		$raUrl.on('input propertychange', isEmpty);

		$radio.on('click', isReadType);

		isReadType();
		isEmpty();

		$('iframe').attr('src', '');

		$btn.on('click', removeHTMLAttr);
	});
})();
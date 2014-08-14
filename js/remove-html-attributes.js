(function(){
	var $raRead,
		$raInsert,
		$raBtn,
		$raAttributes,
		$HTMLContainer,
		arrayAttr;

	function removeHTMLAttr() {
		arrayAttr = $raAttributes.val().split(',');
		$.cookie('attributes', $raAttributes.val());
		$HTMLContainer = $('<div/>').html($raRead.val());
		$HTMLContainer.find('*').each(function(){
			var $this = $(this);
			arrayAttr.forEach(function(value){
				$this.removeAttr(value);
			})
		});
		$raInsert.val($HTMLContainer.html());
	}

	function isEmpty(){
		if ($raAttributes.val() && $raRead.val()) {
			$raBtn.removeAttr('disabled');
		} else {
			$raBtn.attr('disabled', true);
		}
	}

	$(function(){
		$raRead = $('.ra-read');
		$raInsert = $('.ra-insert');
		$raBtn = $('.ra-btn');
		$raAttributes = $('.ra-attributes');

		if ($.cookie('attributes')) {
			$raAttributes.val($.cookie('attributes'));
		}
		$raRead.on('input propertychange', isEmpty);
		$raAttributes.on('input propertychange', isEmpty);

		isEmpty();

		$raBtn.on('click', removeHTMLAttr);
	});
})();
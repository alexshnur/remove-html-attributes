(function(){
	var $raRead, $raInsert, $btn, $raAttributes, $HTMLContainer, arrayAttr;
	function removeHTMLAttr() {
		arrayAttr = $raAttributes.val().split(',');
		$HTMLContainer = $('<div/>').html($raRead.val());
		$HTMLContainer.find('*').each(function(){
			var $this = $(this);
			arrayAttr.forEach(function(value){
				$this.removeAttr(value);
			})
		});
		$raInsert.val($HTMLContainer.html());
	}
	function isEmptyTextarea(){
		if ($raRead.val() && $raAttributes.val()) {
			$btn.removeAttr('disabled');
		} else {
			$btn.attr('disabled', true);
		}
	}
	$(function(){
		$raRead = $('.ra-read');
		$raInsert = $('.ra-insert');
		$btn = $('.btn');
		$raAttributes = $('.ra-attributes');

		$raRead.on('input propertychange', isEmptyTextarea);
		$raAttributes.on('input propertychange', isEmptyTextarea);
		isEmptyTextarea();
		$btn.on('click', removeHTMLAttr);
	});
})();
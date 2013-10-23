var mkForm = {
	config :{
		allRightFlag : 'true'
	},

	init: function(){
		$('.form').on('blur', '[data-valid]', mkForm.toValidateText);
		$('.form').on('submit', mkForm.toValidateAll);
	},

	toValidateAll: function(){
		mkForm.config.allRightFlag = true;
		$('[data-valid]').trigger('blur');
		mkForm.toValidateCheckbox();


		if(mkForm.config.allRightFlag == true)
			return true;
		return false;
	},

	toValidateCheckbox: function(){
		var helptext = 'chose one';
		$('.checkbox').each(function(){
			$(this).find('.help-text').text(' ');
			var that = this;
			var checkedCount = 0;
			$(this).find(':checkbox').each(function(){
				if($(this).is(':checked')){
					checkedCount += 1; 
				}
			});
			if(checkedCount == 0){
				mkForm.addHelptext(that, helptext);
				mkForm.config.allRightFlag = false;
			}
		});
	},

	toValidateText: function(){
		var $that = $(this);
		var target = $(this).parent('.controls')[0];
		var validType = $(this).attr('data-valid').split(' ');
		var data = $(this).val();
		var validFlag = true;
		var helptext = '';
		$(this).parent().find('.help-text').text(helptext);
		$.each(validType, function(index, value){
			switch (value){
			case 'require':
				validFlag = mkForm.validRequire(data);
				var errortext = 'its required'
				break;
			case 'num':
				validFlag = mkForm.validNum(data);
				var errortext = 'it must a num'
				break;
			case 'maxlength':
				var maxlength = $that.attr('maxlength')
				validFlag = mkForm.validMaxlength(data, maxlength);
				var errortext = 'maxlength is'+maxlength;
			default:
				break;
			}
			if(!validFlag){
				mkForm.addHelptext(target, errortext);
				mkForm.config.allRightFlag = false;
			}
		
		});
		
				
	},

	addHelptext : function(target, text){
		var a = $(target).find('.help-text')[0];
		if(!a){
			var helptextP = document.createElement('P');
			$(helptextP).appendTo($(target)).addClass('help-text');
		}
		var helptext = $(target).find('.help-text').text();
		helptext += ' '+text;
		$(target).find('.help-text').text(helptext);
	},

	validRequire: function(data){
		if(data == '')
			return false;
		return true;
	},

	validNum: function(data){
		var pattern = new RegExp(/^[0-9-+]+$/);
		if(!pattern.test(data))
			return false;
		return true;
	},

	validMaxlength: function(data, max){
		if(data.length>max*1)
			return false;
		return true;
	}
}

mkForm.init();
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
		mkForm.toValidateSelect();

		if(mkForm.config.allRightFlag == true)
			return true;
		return false;
	},

	toValidateSelect: function(){
		var helptext = "select a car at least";
		$('[data-valid="select"]').each(function(){
			$(this).find('.help-inline').remove();
			$(this).parents('.control-group').removeClass('error');

			if($(this).find('option:selected').val()==='0'){
				mkForm.addHelptext(this, helptext);
				mkForm.config.allRightFlag = false;
				$(this).parents('.control-group').addClass('error');
			}
		});
	},

	toValidateCheckbox: function(){
		var helptext = 'you must choose one';
		$('[data-valid="checkbox"]').each(function(){
			$(this).find('.help-inline').remove();
			$(this).parents('.control-group').removeClass('error');
			var that = this;
			var checkedCount = 0;
			$(this).find(':checkbox').each(function(){
				if($(this).is(':checked')){
					checkedCount += 1; 
				}
			});
			if(checkedCount == 0){
				$(this).parents('.control-group').addClass('error');
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
		$that.parents('.control-group').removeClass('error');
		$(this).parent().find('.help-inline').remove();
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
				$that.parents('.control-group').addClass('error');
				mkForm.addHelptext(target, errortext);
				mkForm.config.allRightFlag = false;
			}
		
		});
		
				
	},

	addHelptext : function(target, text){
		var a = $(target).find('.help-inline')[0];
		if(!a){
			var helptextP = document.createElement('span');
			$(helptextP).appendTo($(target)).addClass('help-inline');
		}
		var helptext = $(target).find('.help-inline').text();
		helptext += ' '+text;
		$(target).find('.help-inline').text(helptext);
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

	//可利用正则表达式增加验证法则
}

mkForm.init();
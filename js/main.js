$(document).ready(function() {

    // page2scroll
    $("header a,a[href='#top'],a[rel='m_PageScroll2id'],a.PageScroll2id").mPageScroll2id({
	    highlightSelector:"header a"
	});
    
    // filter_mix
    $('#portfolio-mix').mixItUp();
    
    // active_button
    $('.selector__button').on('click', function() {
            
        if ($('.selector__button').hasClass('selector__button--active')) {
            $('.selector__button').removeClass('selector__button--active');
        }
        
        $(this).toggleClass('selector__button--active');
        
    });
    
    //fancy_box
    $(".fancybox").fancybox({
        // Default - with fix from scroll to top
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
    
    // form_validate 
    $("#contact-form").validate({
        rules: {
            name: {required: true},
            email: {required: true, email: true},
            message: {required: true}
        },
        
        messages: {
            name: "Пожалуйста, введите своё имя",
            email: {
                required: "Пожалуйста, введите свой email",
                email: "Email адрес указан неправильно"
            },
            message: "Пожалуйста, введите текст сообщения"
        },
        
        submitHandler: function(form) {
		  ajaxFormSubmit();
		}
    })
    
    // Функция AJAX запрса на сервер
	function ajaxFormSubmit(){
		var string = $("#contact-form").serialize(); // Соханяем данные введенные в форму в строку. 

		// Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string
			
			// Функция если все прошло успешно
			success: function(html){
				$("#contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});

		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false; 
	}
    
}); 

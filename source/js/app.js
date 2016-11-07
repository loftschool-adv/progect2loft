// Создание модуля.
// 1) Cоздаем файл с модулем в папке sourse/js/modules
// 2) Желательно называть файлы с нижнего подчеркивания(Что бы не отходить от традиций)
// 3) Копируем структуру из файла _login или любого другово модуля(но не base).
// 4) в return модуля нужно вставить объект с методом init.
// 5) в метод init записываем функции, которые будут вызываться автоматически при инициализации модуля.
// 6) Что бы получить доступ к библиотеке, в начале модуля нужно ее объявить, напирмер так var base = new BaseModule;
// теперь все свойства и методы библиотеки доступны через точку, напирмер так base.ajaxData(form);
// 7) В библиотеку можно дописывать все что угодно, главное чтобы функция начиналась с this, так модуль base является конструктором.
// 8) Для того чтобы модуль собрался в один файл app.js его нужно прописать в в gulpfile.js.
// Документация по фунциям base, будет чуть позже...

var socket = io.connect('http://85.143.214.16:4000');

socket.on('eventClient', function (data) {

	var src = data.thumb;
	src =String(src).replace(/\\/g, "/");
	src = src.substr(6);
	console.log(src);

	var li = $('<li/>').addClass('img-item').appendTo($('ul#img-list'));
	var ImgCont = $('<div/>').addClass('img-cont').appendTo(li);
	var image =$('<img>', {
		src: '/'+src});

	// Когда картинка загрузится, ставим её на фон
	image.on("load", function(){
		ImgCont.css('background-image', 'url("/'+src+'")');
	});
	$('.modal__load-img').hide();

});
socket.emit('eventServer', {data: 'Hello Server'});

//////////////////////////////////////////////////////////

$( document ).ready(function() {
    var base = new BaseModule; // Инициализируем библиотеку. (Пока не нужно)
    commonModule.init();
    loginModule.init();
    mainPageModule.init();
    albumModule.init();
    albumModule.edit.init();
});

	// Кастомный вид для загрузки файлов
	(function() {
		var el = $('.upload');

		if(el.length === 0) return;

		$(document).on('click', '.upload', function(e) {
			var el    = $(this);
			var input = el.children('[type=file]');

			input[0].click();
		});
	})();
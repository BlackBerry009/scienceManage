$(function () {
	// Waves初始化
	Waves.displayEffect();
	// 输入框获取焦点后出现下划线
	$('.form-control').focus(function () {
		$(this).parent().addClass('fg-toggled');
	}).blur(function () {
		$(this).parent().removeClass('fg-toggled');
	});
});

$(function () {
	// 点击登录按钮
	$('#login-bt').click(function () {
		login();
	});
	// 回车事件
	$('#username, #password').keypress(function (event) {
		if (13 == event.keyCode) {
			login();
		}
	});
});

// 登录
function login() {
	var content = {
		teacherID: $('#username').val(),
		password: $('#password').val(),
		type: $('input:radio:checked').val()
	}
	$.ajax({
		url: '/common/login',
		type: 'post',
		data: content,
		success(res) {
			console.log(res)
			if(res.forbid){
				alert('账号密码不正确，请检查重试')
				return;
			}
			let result = res.data[0];
			//老师
			if (res.type == 'teacher' ) {
				sessionStorage.setItem('type', 0)
				sessionStorage.setItem('teacherID', result.teacherID)
				sessionStorage.setItem('teacherName', result.teacherName)
				sessionStorage.setItem('section', result.section)
				window.location.href = '/index.html'
			}
			//管理
			if (res.type == 'manager') {
				sessionStorage.setItem('type', 1)
				sessionStorage.setItem('teacherName', result.name)
				sessionStorage.setItem('mid', result.mid)

				sessionStorage.setItem('position', result.position)
				sessionStorage.setItem('section', result.section)
				window.location.href = '/index.html'
			}
			
		},
		error() {
			console.log('error');
		}
	});
}
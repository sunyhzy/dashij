$(function() {
        //  点击注册账号
        $('#link_reg').on('click', function() {
                // 隐藏
                $('.login-box').hide()
                    // 显示
                $('.reg-box').show()
            })
            // 点击登录
        $('#link_login').on('click', function() {
                // 显示
                $('.login-box').show()
                    // 隐藏
                $('.reg-box').hide()
            })
            // 从layui 里获取form 
        var form = layui.form
        var layer = layui.layer
        form.verify({
            // 自定义了一个叫做 pwd 校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.reg-box [name = password]').val()
                if (pwd !== value) {
                    return "两次密码不一致"
                }
            }
        })
    })
    //监听注册
$('#form_reg').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
            if (res.status != 0) {
                // return console.log(res.message);
                // layer方法
                return layer.msg(res.message)
            }
            // console.log('注册成功');
            layer.msg('注册成功，请登录')
                // 模拟点击事件
            $('#link_login').click()
        })
    })
    //监听登录
$('#form_login').on('submit', function(e) {
    // 阻止默认行为
    e.preventDefault()
    $.ajax({
        url: 'http://api-breakingnews-web.itheima.net/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')
                // 跳转后台
                // console.log(res.token); token 是Network的获取值
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
                //     // 跳转到后台主页
            location.href = '/index.html'
        }

    })
})
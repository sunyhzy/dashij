$(function() {
    // 调用用户基本信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // console.log('ok') //打印
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
                // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)

        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res); // 打印res 成功
            if (res.status != 0) {
                return layui.layer.msg('获取身份失败')
            }
            // 调用渲染用户头像
            renderAvatar(res.data)
        },
        complete: function(res) {
            // console.log('执行了')
            // console.log(res)
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                    // 2. 强制跳转到登录页面
                location.href = '/login.html'


            }
        }
    })
}

function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
        // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 需要渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}
var Params_callback;
$(function($) {
    //显示删除图标的html
    var deleteHtml =
        '<div class="delete-imagesList-item" ' +
        'style="cursor: pointer;width: 107px;height: 107px;position: absolute;top: 0;left: 0;z-index: 2;border: 0;background-repeat: no-repeat;' +
        'z-index: 9999;border: 3px solid #1094fa;">' +
        '<span class="delete-imagesList-item-icon" style="background-image: url(images/icons.png);background-position: -41px -17px;' +
        'background-repeat: no-repeat;width: 32px;height: 32px;' +
        ' background-color: rgba(16, 148, 250, 0.3);display: inline-block;"></span>' +
        '</div>';
    //显示确认层的html
    var confirmHtml =
        '<div class="delete-imagesList-item-confirm" ' +
        'style="cursor: pointer;width: 113px;height: 113px;position: absolute;top: 0;left: 0;border: 0; z-index:6666;' +
        'background: rgba(64, 64, 64, 0.62);color: #fff;text-align: center;">' +
            '<div style="padding-top: 30px;">确定删除？</div>' +
            '<div style="padding: 5px 0 70px;">' +
                '<span class="confirm-ok" style="margin-right: 7px" title="确定">' +
                    '<i class="iconfont icon-OK" style="font-size: 20px;"></i></span>' +
                '<span class="confirm-cannel" style="margin-left: 7px" title="取消">' +
                    '<i class="iconfont icon-CANNEL" style="font-size: 22px;position: relative;top: 1px;"></i></span>' +
            '</div>' +
        '</div>';

    //图片没有被选中的时候，鼠标在图片上，显示删除图标的html
    $(document).on('mouseenter', '#imageList li',function(){
        if(!$(this).hasClass('selected') && !$(this).find('.delete-imagesList-item-confirm').length > 0 ){
            $(this).append(deleteHtml);
        }
    });
    //鼠标离开图片，删除图标的html、删除确认层的html
    $(document).on('mouseleave', '#imageList li',function(){
        $(this).find('.delete-imagesList-item').remove();
        $(this).find('.delete-imagesList-item-confirm').remove();
    });

    //点击图片，判断是否选中，选中：移除html.未选中：添加html
    $(document).on('click', '#imageList li',function(){
        if(!$(this).hasClass('selected') && !$(this).find('.delete-imagesList-item-confirm').length > 0 ){
            $(this).append(deleteHtml)
        }else{
            $(this).find('.delete-imagesList-item').remove();
            $(this).find('.delete-imagesList-item-confirm').remove();
        }
    });

    //鼠标进入删除图标区域，更改图标
    $(document).on('mouseenter', '#imageList li .delete-imagesList-item-icon',function(e){
        $(this).css('background-position','-41px 7px')
    });
    //鼠标离开删除图标区域，更改图标
    $(document).on('mouseleave', '#imageList li .delete-imagesList-item-icon',function(e){
        $(this).css('background-position','-41px -17px')
    });

    //鼠标进入OK图标区域，更改图标颜色
    $(document).on('mouseenter', '#imageList li .icon-CANNEL, #imageList li .icon-OK',function(e){
        $(this).css('color','#1094fa')
    });
    //鼠标离开Cannel图标区域，更改图标颜色
    $(document).on('mouseleave', '#imageList li .icon-CANNEL, #imageList li .icon-OK',function(e){
        $(this).css('color','#fff')
    });

    //点击确认层，阻止时间传播
    $(document).on('click', '#imageList li .delete-imagesList-item-confirm',function(e){
        e.stopPropagation();
    });

    //点击删除图标事件,显示询问程序
    $(document).on('click', '#imageList li .delete-imagesList-item-icon',function(e){
        var DOM_current_li = $(this).parent().parent();
        DOM_current_li.find('.delete-imagesList-item').remove();
        DOM_current_li.append(confirmHtml)
        e.stopPropagation();
    });

    //点击取消图标事件
    $(document).on('click', '#imageList li .icon-CANNEL',function(e){
        var DOM_current_li = $(this).parent().parent().parent().parent();
        DOM_current_li.find('.delete-imagesList-item-confirm').remove();
        DOM_current_li.append(deleteHtml);
    })
    //显示信息
    var ShowMessage = function (){
        //点击取消图标事件
        $(document).on('click', '#DelteMsgArea .icon-CANNEL',function(e){
            $('#DelteMsgArea').remove();
        })

        var setMsgHtml = function (bgColor,Msg, timer) {
            timer = timer||2000
            var showMsgDOM = $('body');
            showMsgDOM.find('#DelteMsgArea').remove();
            var msgHtml =
                '<div id="DelteMsgArea" style="width:'+ (document.body.scrollWidth-18) +'px; padding: 0 10px;' +
                'position: fixed;bottom: 9px;">' +
                '<div style="height: 45px; line-height: 45px;' +
                'color:#fff; background: '+ bgColor +';padding: 0 20px;">' +
                '<span style="float: right;" title="关闭">' +
                '<i class="iconfont icon-CANNEL" style="font-size: 22px;cursor: pointer"></i></span>' +
                '<span>'+ Msg +'</span>' +
                '</div></div>';

            showMsgDOM.append(msgHtml);
            setTimeout(function () {
                showMsgDOM.find('#DelteMsgArea').remove();
            },timer)
        }

        var success = function(msg, timer){
            setMsgHtml('#6FB96F', msg, timer);
        }
        var error = function(msg, timer){
            setMsgHtml('#B94823', msg, timer);
        }
        return {
            success:success,
            error:error
        }
    }
    //点击确认图标事件
    $(document).on('click', '#imageList li .icon-OK',function(e){
        //获取当前需要删除图片的链接
        var DOM_current_li = $(this).parent().parent().parent().parent();
        var imageSrc = DOM_current_li.find('img').attr('src');
        var deleteImages = function(){
            DOM_current_li.remove();
        }
        if(Params_callback){
            var showMsg = new ShowMessage();
            Params_callback(imageSrc, showMsg, deleteImages);
        }
    })
});

function ueditorDeleteImages (callback){
    if(typeof callback !== 'function'){
        console.error('ueditorDeleteImages方法传入的参数错误');
    }else{
        Params_callback =  callback;
    }
}



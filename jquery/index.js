$(document).ready(function() {
    var current_user_name, user_input;
    var comment_name, comment;
    var comment_block_id = 1;
    var cancel_reply_id = 1;

    var comment_block = '<div class="comment_block" id="{{i}}">\
    <h5 class="inner_comment_name">{{name}}</h5><p class="inner_comment_content">{{reply}}</p>\
    <h6 class="reply_btn"id="{{reply_id}}" reply_target="{{r_target}}" first_click="1">回覆</h6><h6 class="cancel"\
     id="{{target_id}}" target="{{target_name}}">X</h6></div>'

    var reply_input = '<div class="reply_input" id="{{reply_input_id}}">\
    <textarea placeholder="Reply Here..." class="reply_textarea" id="{{textarea_reply_id}}"></textarea>\
    </div>'

    var reply_block = '<div class="user_reply {{reply_class_block}}" id="{{reply_block_id}}">\
        <h5>To {{name}}</h5>\
        <p class="reply_content">{{content}}</p>\
        <h6 class="cancel_reply" id="{{cancel_reply_id}}" del_id="{{del_id}}">X</h6>\
      	</div>'

    $(".post_btn").click(function(event) {
        current_user_name = $(".name").val();
        user_input = $(".user_content").val();

        // 更新forum名子與內容
        $(".user_name_forum").text(current_user_name + '說 : ');
        $(".user_content_forum").text(user_input);
        //show forum
        $(".forum").css('opacity', '1');

        //清空input
        $(".name").val('');
        $(".user_content").val('');

    });
    $(".user_comment_forum").keypress(function(event) {
        //按下enter觸發事件
        if (event.keyCode == 13) {
            comment_name = $(".comment_name").val();
            comment = $(this).val();

            //更新comment_block
            var current_comment_block = comment_block.replace("{{name}}", comment_name)
                .replace("{{r_target}}", comment_name)
                .replace("{{reply}}", comment)
                .replace("{{i}}", comment_block_id + 'x')
                .replace("{{target_id}}", comment_block_id)
                .replace("{{target_name}}", comment_name)
                .replace("{{reply_id}}", comment_block_id + 'r');


            //加入block
            $(".comment_inner").prepend(current_comment_block);

            //清空input
            $(".comment_name").val('');


            //id + 1
            comment_block_id += 1;
        }

    });
    $(".user_comment_forum").keyup(function(event) {
        if (event.keyCode == 13) {
            //清空textarea
            $(this).val('');

            //指定一個reply input 給current_comment_block用，各發一組ID
            var current_reply_input_id = comment_block_id + 'ri';
            var current_reply_input = reply_input.replace("{{reply_input_id}}", current_reply_input_id)
                .replace("{{textarea_reply_id}}", current_reply_input_id + 't');

            //顯示回覆input給使用者輸入
            var current_reply_id = $(".reply_btn").attr('id');
            $("#" + current_reply_id).click(function(event) { //點擊回覆後在每個留言下方加入reply input
                var reply_target = $(this).attr('reply_target'); //更新reply對象
                var first_click = $(this).attr('first_click');

                if (first_click == '1') {
                    $('#' + current_comment_bolck).after(current_reply_input);

                    //顯示reply內容
                    $(".reply_input textarea").keypress(function(event) {
                        if (event.keyCode == 13) {
                            console.log("enter press");
                            //顯示reply訊息
                            var reply_content = $(".reply_textarea").val();
                            var current_reply_block = reply_block.replace("{{name}}", reply_target)
                                .replace("{{content}}", reply_content)
                                .replace("{{reply_block_id}}", comment_block_id + 'xr')
                                .replace("{{del_id}}", comment_block_id + 'xr')
                                .replace("{{reply_class_block}}", reply_target)
                                .replace("{{cancel_reply_id}}", 'cancel_reply_' + cancel_reply_id);

                            //如果回覆有輸入值才新增回復block
                            if (reply_content != '') {
                            	$('#' + current_reply_input_id).after(current_reply_block);
                            }
                            
                            //回覆後移除reply input，把first_click = 1
                            $('#' + current_reply_input_id).remove();
                            $("#" + current_reply_id).attr('first_click', '1');

                            //刪除reply訊息                          
                            $('#' + 'cancel_reply_' + cancel_reply_id).click(function(event) {
                                var del_id = $(this).attr("del_id");
                                console.log(del_id);
                                $('#' + del_id).remove();
                            });
                            comment_block_id += 1;
                            cancel_reply_id += 1;

                        }

                    });
                    //清空textarea
                    $(".reply_input textarea").keyup(function(event) {
                        if (event.keyCode == 13) {
                            $(this).val('');
                        }

                    })

                    //沒有輸入reply再次點擊回覆
                    $("#" + current_reply_id).attr('first_click', '0');

                } else if(first_click == '0') {
                    $('#' + current_reply_input_id).remove();
                    $("#" + current_reply_id).attr('first_click', '1');
                }

            });

            //如果Ｘ被按，刪除當前留言
            var current_id = $(".cancel").attr('id');
            var current_comment_bolck = current_id + 'x';

            $("#" + current_id).click(function(event) {
                $('#' + current_comment_bolck).remove();
                $('#' + current_reply_input_id).remove();
                if ($(".cancel_reply") === null) {
                    //do nothing
                } else {
                    var target = $(this).attr('target');
                    $("." + target).remove();
                }

            });


        }

    });

});

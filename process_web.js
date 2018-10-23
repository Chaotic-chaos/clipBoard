//函数定义
//显示历史数据
function display(){
    $.post("./process_web.php?action=query", {}, function (res) {
        //查询回调
        if (res == "No Records in database!") {
            $("#tbody").empty();
        }
        else {
            var result = eval(res);
            $("#tbody").empty();
            for (i = 0; i < result.length; i++) {
                var table_row_0 = '<tr class="table-dafault" id="row_' + result[i].record_id + '">\n' +
                    '                <th scope="row">' + result[i].record_date + '</th>\n' +
                    '                <td>' + result[i].key_words + '</td>\n' +
                    '                <td>' + result[i].main_content + '</td>\n' +
                    '                <td><button type="button" class="btn btn-danger btn-sm">Open in Browse</button></td>\n' +
                    '            </tr>'
                var table_row_1 = '<tr class="table-active" id="row_' + result[i].record_id + '">\n' +
                    '                <th scope="row">' + result[i].record_date + '</th>\n' +
                    '                <td>' + result[i].key_words + '</td>\n' +
                    '                <td>' + result[i].main_content + '</td>\n' +
                    '                <td><button type="button" class="btn btn-danger btn-sm">Open in Browse</button></td>\n' +
                    '            </tr>'
                if(i%2 == 0){
                    $("#tbody").append(table_row_0);
                }
                else{
                    $("#tbody").append(table_row_1);
                }
            }
        }
    })
}

function scrollToEnd(){//滚动到底部
    var h = $(document).height()-$(window).height();
    $(document).scrollTop(h);
}



//函数入口
$(document).ready(
    //进入加载查询函数
    display()
)

$("#submit").click(//插入新的
    function() {
        //插入新数据
        var key_words = $("#key_words").val();
        var url = $("#url").val();
        if(key_words == '' || url == ''){
            $("#submit").text("请输入内容");
            $("#submit").attr("class", "btn btn-warning btn-lg btn-block");
        }
        else {
            $.post("./process_web.php?action=insert", {key_words: key_words, url: url}, function (res) {
                //post回调
                if(res == "success"){
                    $("#submit").text("搞定了！");
                    $("#submit").attr("class", "btn btn-success btn-lg btn-block");
                    $("#key_words").val("");
                    $("#url").val("");
                    display();
                    scrollToEnd();
                }
                else{
                    $("#submit").text("服务器挂了，快去检查");
                    $("#submit").attr("class", "btn btn-danger btn-lg btn-block");
                }
            })
        }
    }
)
/**
 * Created by island on 2017/7/26.
 */
$(document).ready(function () {
    checkCookie();
    var clothesID = (decodeURIComponent(getArgsFromHref(window.location.href, 'id')).split('#')[0]);
    findClothesByID(clothesID);
});

function findClothesByID(clothesID) {
    $('#clothesID').val(clothesID);
    jQuery.ajax({
        type: 'POST',
        url: '/clothesAction/findClothesByID',
        data: {
            "clothesID": clothesID
        },
        dataType: 'json',
        success: function (data) {
            // alert("success");
            if (data && data.success == "true") {
                $('#title').html(data.clothes.schoolName + '-' + data.clothes.clothesType);
                $('#title').click(function () {
                    window.open("../jsp/clothesDetails.jsp?id=" + clothesID);
                });
                $('#user').html(data.user.username);
                $('#user').click(function () {
                    //todo
                    window.open("");
                });
                $('#school').html(data.clothes.schoolName);
                $('#type').html(data.clothes.clothesType);
                $('#gender').html(data.clothes.gender);
                $('#size').html(data.clothes.clothessize);
                $('#pic').attr("src", data.pics[0]);
                $('#price').html("¥ " + data.price);
                // $('#largePic1').attr("src", data.clothes.picurl);
                $('#priceLabel').html("¥ " + data.price);

            } else {
                fail_alert("无结果");
            }
        },
        error: function () {
            fail_alert("哎呀呀，网络似乎不太好...")
        }
    });
}

function pay() {
    $.ajax({
        url: "/orderAction/createOrder",
        type: "POST",
        dataType: "json",
        data: {
            "buyer": getCookie("id"),
            "clothesID": $('#clothesID').val()
        },
        async: false,
        success: function (data) {
            if (data.result == "success") {

                var orderID = data.orderID;
                window.location.href = "../jsp/pay.jsp?orderID=" + orderID;
                return;
            }
            if (data.result == "fail") {
                fail_alert("哎呀，创建订单失败...");
                return;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            fail_alert("哎呀，网络似乎不太好...");
        }

    });
}

function findOrderByID(id) {
    $.ajax({
        url: "/orderAction/getOrderByID",
        type: "POST",
        dataType: "json",
        data: {
            "orderID": id
        },
        async: false,
        success: function (data) {
            if (data.result == "success") {
                $('#data').html(data.order.startTime);
                var status = parseInt(data.order.orderStatus);
                if (status == -1) {
                    $('#status').html("已撤销订单");
                    $('#doButton').val("删除订单");
                    $('#image').css("display", "none");
                }
                if (status == 1) {
                    $('#status').html("待交易订单");
                    $('#doButton').val("确认交易");
                    $('#image').attr("src", "../static/images/procedure3.png");
                }
                if (status == 2) {
                    $('#status').html("待付款订单");
                    $('#doButton').val("立即付款");
                    $('#cancelButton').css("display", "inline-block");
                    $('#image').attr("src", "../static/images/procedure2.png");
                }
                if (status == 3) {
                    $('#status').html("已完成订单");
                    $('#doButton').val("删除订单");
                    $('#image').attr("src", "../static/images/procedure4.png");
                }
                $('#pic').attr("src", data.pic);
                $('#title').html(data.clothes.school + data.clothes.clothesType);
                $('#school').html(data.clothes.school);
                $('#type').html(data.clothes.clothesType);
                $('#size').html(data.clothes.clothessize);
                $('#gender').html(data.clothes.gender);
                $('#price').html(data.clothes.orderPrice);

                return;
            }
            if (data.result == "fail") {
                fail_alert("哎呀，获取订单失败...");
                return;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            fail_alert("哎呀，网络似乎不太好...");
        }

    });
}

function processOrder() {
    var buttonType = $('#doButton').val();
    //todo 订单操作
    if (buttonType == "删除订单") {

    }
    if (buttonType == "确认交易") {

    }
    if (buttonType == "立即付款") {

    }
}

function cancelOrder() {
    var orderID = $('#orderID').val();
    //todo 取消订单
}
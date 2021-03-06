/**
 * Created by island on 2017/7/26.
 */

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
                if (data.user.personID == getCookie('id')) {
                    $('#user').click(function () {
                        window.open("../jsp/userInfo.jsp");

                    });
                }
                else {
                    $('#user').click(function () {
                        window.open("../jsp/friendInfo.jsp?id=" + data.user.personID);
                    });
                }
                $('#school').html(data.clothes.schoolName);
                $('#type').html(data.clothes.clothesType);
                $('#gender').html(data.clothes.gender);
                $('#size').html(data.clothes.clothesHeight);
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
                if (data.success == "true") {

                    var orderID = data.orderID;
                    window.location.href = "../jsp/pay.jsp?id=" + orderID;
                    return;
                }
                if (data.success == "fail") {
                    if (data.error == "same") {
                        fail_alert("不能购买自己捐赠的衣物！");
                    }
                    else {
                        fail_alert("哎呀，衣服已被卖出...");
                    }
                }
                return;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                fail_alert("哎呀，网络似乎不太好...");
            }

        }
    )
    ;
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
            if (data.success == "true") {
                $('#data').html(data.time);
                $('#pic').attr("src", data.pic);
                $('#title').html(data.clothes.schoolName + '-' + data.clothes.clothesType);
                $('#school').html(data.clothes.schoolName);
                $('#type').html(data.clothes.clothesType);
                $('#size').html(data.clothes.clothesHeight);
                $('#gender').html(data.clothes.gender);
                $('#price').html('¥ ' + data.orderPrice);

                $('#user').text(data.username);
                $('#user').click(function () {
                   window.open('../jsp/friendInfo.jsp?id=' + data.clothes.donorID);
                });

                var status = parseInt(data.order.orderStatus);
                if (status == -1) {
                    $('#status').html("已撤销订单");
                    $('#doButton').css("display", "none");
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
                    $('#doButton').css("display", "none");
                    $('#image').attr("src", "../static/images/procedure4.png");
                }


                return;
            }
            if (data.success == "false") {
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
    var type = $('#doButton').val();
    if (type == "确认交易") {
        jQuery.ajax({
            type: 'POST',
            url: '/orderAction/finishOrder',
            data: {
                "orderID": orderID
            },
            dataType: 'json',
            success: function (data) {
                if (data && data.success == "true") {
                    window.location.href = ("../jsp/order.jsp");
                    success_alert("确认成功");
                } else {
                    fail_alert("确认失败，网络似乎不太好...");
                }
            },
            error: function () {
                fail_alert("哎呀呀，网络似乎不太好...")
            }
        });
    }
    if (type == "立即付款") {
        window.location.href("../jsp/pay.jsp?id=" + orderID);
    }
}

function cancelOrder() {
    var orderID = $('#orderID').html();
    jQuery.ajax({
        type: 'POST',
        url: '/orderAction/cancelOrder',
        data: {
            "orderID": orderID
        },
        dataType: 'json',
        success: function (data) {
            if (data && data.success == "true") {
                window.location.href = ("../jsp/orderDetails.jsp?id=" + orderID);
                success_alert("取消订单成功");
            } else {
                fail_alert("确认失败，网络似乎不太好...");
            }
        },
        error: function () {
            fail_alert("哎呀呀，网络似乎不太好...")
        }
    });
}

function payOrder(orderID) {
    jQuery.ajax({
        type: 'POST',
        url: '/orderAction/payOrder',
        data: {
            "orderID": orderID
        },
        dataType: 'json',
        success: function (data) {
            if (data && data.success == "true") {
                window.location.href = "../jsp/payed.jsp?id=" + orderID;
                success_alert("付款成功");
            } else {
                fail_alert("确认失败，网络似乎不太好...");
            }
        },
        error: function () {
            fail_alert("哎呀呀，网络似乎不太好...")
        }
    });
}

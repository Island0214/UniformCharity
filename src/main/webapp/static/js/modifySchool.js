/**
 * Created by island on 2017/8/27.
 */
Dropzone.options.myDropzone = {
    init: function () {
        this.on("addedfile", function (file) {

            // Create the remove button
            var removeButton = Dropzone.createElement("<button></button>");
            removeButton.className = "removeButton";

            // Capture the Dropzone instance as closure.
            var _this = this;

            // Listen to the click event
            removeButton.addEventListener("click", function (e) {
                // Make sure the button click doesn't submit the form:
                e.preventDefault();
                e.stopPropagation();

                // Remove the file preview.
                _this.removeFile(file);
                // If you want to the delete the file on the server as well,
                // you can do the AJAX request here.
            });

            // Add the button to the file preview element.
            file.previewElement.appendChild(removeButton);
        });

        this.on("successmultiple", function(file, data) {
            success_alert(data.success);
        });

        var submitButton = document.querySelector("#submit-all")
        myDropzone = this; // closure

        submitButton.addEventListener("click", function () {
            // if(myDropzone.files.length == 0){
            //     fail_alert("请至少添加一张图片！");
            // }else {
            //     // var school = $('#uploadSchoolDrop option:selected').text();
            //     var type = $('#uploadTypeDrop option:selected').text();
            //     var gender = $('#uploadGenderDrop option:selected').text();
            //     var size = $('#uploadSizeDrop option:selected').text();
            //     var donor = $('#id').val();
            //     // alert(donor);
            //     if ( type == "" || gender == "" || size == "") {
            //         fail_alert("请填写完整信息！");
            //     } else {
            //         $.ajax({
            //             url: "/clothesAction/uploadClothes",
            //             type: "POST",
            //             dataType: "json",
            //             data: {
            //                 "id": donor,
            //                 // "school": school,
            //                 "type": type,
            //                 "gender": gender,
            //                 "size": size
            //             },
            //             async: false,
            //             success: function (data) {
            //                 if (data.success == "true") {
            //                     $('#clothesID').val(data.clothesID);
            //                     myDropzone.processQueue(); // Tell Dropzone to process all queued files.
            //                     window.location.href = "../jsp/uploadClothes.jsp";
            //                     return;
            //                 }
            //                 if (data.success == "false") {
            //                     fail_alert("上传失败！");
            //                     return;
            //                 }
            //             },
            //             error: function (XMLHttpRequest, textStatus, errorThrown) {
            //                 fail_alert("哎呀，网络似乎不太好...");
            //             }
            //         });
            //
            //         // myDropzone.processQueue(); // Tell Dropzone to process all queued files.
            //     }
            // }
        });

    }
};
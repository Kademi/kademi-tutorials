function initManageFiles() {
    initUpload();
    initDelete();
}

function initUpload() {
    Dropzone.autoDiscover = false;
    $(".dropzone").dropzone({
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 500.0, // MB
        addRemoveLinks: true,
        parallelUploads: 1,
        uploadMultiple: true
    });
    var dz = Dropzone.forElement("#uploadFileDropzone");
    dz.on("success", function (file) {
        flog("added file", file);
    });
    dz.on("error", function (file, errorMessage) {
        Msg.error("An error occured uploading: " + file.name + " because: " + errorMessage);
    });

    $('body').on('hidden.bs.modal', '#modal-upload', function () {
        dz.removeAllFiles();
        $('#filesBody').reloadFragment();
    });
}

function initDelete() {
    $('body').on('click', '.btn-delete-file', function (e) {
        e.preventDefault();
        var btn = $(this);
        var tr = btn.closest('tr');
        var href = btn.attr('href');
        confirmDelete(href, href, function () {
            tr.hide(150, function () {
                $(this).remove();
            });
        });
    });
}
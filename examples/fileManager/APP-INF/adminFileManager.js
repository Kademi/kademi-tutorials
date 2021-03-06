function handleFileUpload(page, params, files) {
    log.info("handleFileUpload > page {} params {} files {}", page, params, files);

    var jsonDB = page.find('/jsondb');
    var filesDB = jsonDB.child('files');

    if (filesDB === null) {
        filesDB = jsonDB.createDb('files', 'Files App', 'files');
    }

    if (files !== null || !files.isEmpty()) {
        var fileArray = files.entrySet().toArray();
        for (var i = 0; i < fileArray.length; i++) {
            var file = fileArray[i].getValue();
            var hash = fileManager.uploadFile(file);

            var fileJson = {
                fileName: file.name,
                type: file.contentType,
                size: file.size,
                uploaded_date: new Date(),
                hash: hash
            };
            log.info("File json {}", JSON.stringify(fileJson));

            var checkExisting = filesDB.child(file.name);

            if (checkExisting !== null) {
                page.throwBadRequest("File already exists");
            }

            filesDB.createNew(file.name, JSON.stringify(fileJson), 'file');
        }
    }
}

function serveAdminFile(page, params) {
    log.info("serveAdminFile > page {} params {}", page, params);

    var jsonDB = page.find('/jsondb');
    var filesDB = jsonDB.child('files');
    var fileName = page.attributes.fileName;

    if (filesDB === null) {
        page.throwNotFound("File " + fileName + " not found");
    }

    var fileRecord = filesDB.child(fileName);

    if (fileRecord === null) {
        page.throwNotFound("File " + fileName + " not found");
    }

    var json = fileRecord.jsonObject;

    return views.fileView(json.hash, json.type);
}

function deleteAdminFile(page) {
    log.info("deleteAdminFile > page {}", page);
    
    var jsonDB = page.find('/jsondb');
    var filesDB = jsonDB.child('files');
    var fileName = page.attributes.fileName;

    if (filesDB === null) {
        page.throwNotFound("File " + fileName + " not found");
    }

    var fileRecord = filesDB.child(fileName);

    if (fileRecord === null) {
        page.throwNotFound("File " + fileName + " not found");
    }
    
    fileRecord.delete();
}
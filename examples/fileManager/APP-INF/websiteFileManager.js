function serveWebsiteFile(page, params) {
    log.info("serveWebsiteFile > page {} params {}", page, params);

    var jsonDB = page.find('/jsondb');
    var filesDB = jsonDB.child('files');
    var fileName = page.attributes.fileName;

    if (filesDB === null) {
        page.throwNotFound("File " + fileName + " not found");
    }

    var imageRecord = filesDB.child(fileName);

    if (imageRecord === null) {
        page.throwNotFound("File " + fileName + " not found");
    }

    var json = imageRecord.jsonObject;

    return views.fileView(json.hash, json.type);
}
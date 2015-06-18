controllerMappings
        .adminController()
        .path("/filesApp/")
        .enabled(true)
        .defaultView(views.templateView("files-app/manageFiles.html"))
        .addMethod("POST", "handleFileUpload", "uploadFiles")
        .build();

controllerMappings
        .adminController()
        .path("/filesApp/(?<fileName>.*)")
        .enabled(true)
        .addMethod("GET", "serveAdminFile")
        .addMethod("DELETE", "deleteAdminFile")
        .build();
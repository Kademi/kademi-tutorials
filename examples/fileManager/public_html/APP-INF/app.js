controllerMappings
        .adminController()
        .path("/files/")
        .enabled(true)
        .defaultView(views.templateView("files-app/manageFiles.html"))
        .addMethod("POST", "handleFileUpload", "file")
        .build();

controllerMappings
        .adminController()
        .path("/files/(?<fileName>.*)")
        .enabled(true)
        .addMethod("GET", "serveAdminFile")
        .addMethod("DELETE", "deleteAdminFile")
        .build();
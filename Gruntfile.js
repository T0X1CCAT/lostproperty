module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  uglify: {
    // options: {
    //   mangle: false,
    //   beautify: true
    // },
    static_mappings: {
      // Because these src-dest file mappings are manually specified, every
      // time a new file is added or removed, the Gruntfile has to be updated.
      files: [
        {src: ['public/app/lost-property-app.component.js',
                'public/app/home.component.js',
                'public/app/services/authentication-service.js',
                'public/app/login.component.js',
                'public/app/register.component.js',
                "public/app/find.component.js",
                "public/app/add.component.js",
                "public/app/place.component.js",
                "public/app/add-category.component.js",
                "public/app/list-categories.component.js"],
          dest: 'public/app/lostproperty.min.js'},
          {src: ['public/vendor/jquery/dist/jquery.min.js'
                 ,'public/vendor/bootstrap/dist/js/bootstrap.min.js'
                 ,"public/vendor/angular/angular.min.js"
                 ,"public/vendor/angular-resource/angular-resource.min.js"
                 ,"public/vendor/angular-messages/angular-messages.min.js"
                 ,"public/vendor/angular_1_router.js"
                 ,"public/vendor/angular-animate/angular-animate.min.js"
                 ,"public/vendor/angular-touch/angular-touch.min.js"
                 ,"public/vendor/ui-bootstrap-tpls-2.5.0.min.js"
                 ,"public/vendor/AngularJS-Toaster/toaster.min.js"
                 ,"public/vendor/ie10-viewport-bug-workaround.js"
                 ,"public/vendor/ie-emulation-modes-warning.js"],
          dest: 'public/app/vendor.min.js'}

      ]
    }
  }});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};


 

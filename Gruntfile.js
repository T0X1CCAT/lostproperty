module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap:true
      },
      build: {
        src: ['public/app/lost-property-app.component.js',
                'public/app/home.component.js',
                'public/app/services/authentication-service.js',
                'public/app/login.component.js',
                'public/app/register.component.js',
                "public/app/find.component.js",
                "public/app/add.component.js",
                "public/app/place.component.js",
                "public/app/add-category.component.js",
                "public/app/list-categories.component.js"],
        dest: 'public/app/lostproperty.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
module.exports = function(grunt) {
    grunt.initConfig({
        distFolder: 'web/assets/build',
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            files: {
                src: 'web/assets/scripts/*.js',
                dest: 'web/assets/build/',
                expand: true,
                flatten: true
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'web/assets/styles',
                    src: ['*.css', '!*.min.css'],
                    dest: 'web/assets/build',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['uglify', 'cssmin']);
};
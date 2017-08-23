/**
 * Created by rpan22 on 8/23/2017.
 */
/*
grunt.initConfig({
    sass: {                              // Task
        dist: {                            // Target
            options: {                       // Target options
                style: 'expanded'
            },
            files: {                         // Dictionary of files
                'main.css': 'app/css/minesweeper.scss',       // 'destination': 'source'
                'widgets.css': 'widgets.scss'
            }
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-sass');

grunt.registerTask('default', ['sass']);
*/


module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'app/dist/main.css': 'app/css/*.scss'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
   // grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['uglify']);

};
'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*!\n' +
                '* <%= pkg.name %>\n' +
                '* v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* (c) <%= pkg.author %>;' +
                ' <%= pkg.license %> License\n' +
                '* Contributors: <%= pkg.contributors.join(", ") %>\n' +
                '*/\n'
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.js': ['lib/_languageData.js', 'lib/<%= pkg.name %>.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'lib/_languageData.js',
                'lib/GuessLanguage.js'
            ]
        }
    });

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('dist', [
        'jshint',
        'concat',
        'uglify'
    ]);
};

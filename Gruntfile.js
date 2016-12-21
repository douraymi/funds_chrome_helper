module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var mnf = grunt.file.readJSON('code/manifest.json');

  var fileMaps = { browserify: {}, uglify: {} };
  // var file, files = grunt.file.expand({cwd:'code/js'}, ['*.js', 'client/*.js']);
  var file, files = grunt.file.expand({cwd:'code/js'}, ['*.js']);
  for (var i = 0; i < files.length; i++) {
    file = files[i];
    fileMaps.browserify['build/unpacked-dev/js/' + file] = 'code/js/' + file;
    fileMaps.uglify['build/unpacked-prod/js/' + file] = 'build/unpacked-dev/js/' + file;
  }
  var file2, files2 = grunt.file.expand({cwd:'code/client'}, ['*.js']);
  for (var i = 0; i < files2.length; i++) {
    file2 = files2[i];
    fileMaps.browserify['build/unpacked-dev/client/' + file2] = 'code/client/' + file2;
    fileMaps.uglify['build/unpacked-prod/client/' + file2] = 'build/unpacked-dev/client/' + file2;
  }
  // var file3, files3 = grunt.file.expand({cwd:'code/js/libs/'}, ['*.js']);
  // for (var i = 0; i < files3.length; i++) {
  //   file3 = files3[i];
  //   fileMaps.browserify['build/unpacked-dev/js/libs/' + file3] = 'code/js/libs/' + file3;
  //   fileMaps.uglify['build/unpacked-prod/js/libs/' + file3] = 'build/unpacked-dev/js/libs/' + file3;
  // }

  //
  // config
  //

  grunt.initConfig({

    clean: ['build/unpacked-dev', 'build/unpacked-prod', 'build/*.crx'],

    mkdir: {
      unpacked: { options: { create: ['build/unpacked-dev', 'build/unpacked-prod'] } },
      js: { options: { create: ['build/unpacked-dev/js'] } }
      // js: { options: { create: ['build/unpacked-dev/js', 'build/unpacked-dev/js/client', 'build/unpacked-dev/js/libs'] } }
    },

    jshint: {
      options: grunt.file.readJSON('lint-options.json'), // see http://www.jshint.com/docs/options/
      all: { src: ['package.json', 'lint-options.json', 'Gruntfile.js', 'code/**/*.js',
                   'code/**/*.json', '!code/js/libs/*'] }
    },

    mochaTest: {
      options: { colors: true, reporter: 'spec' },
      files: ['code/**/*.spec.js']
    },

    copy: {
      main: { files: [ {
        expand: true,
        cwd: 'code/',
        src: ['**', '!js/**', '!**/*.md'],
        dest: 'build/unpacked-dev/'
      } ] },
      prod: { files: [ {
        expand: true,
        cwd: 'build/unpacked-dev/',
        src: ['**', '!js/*.js'],
        dest: 'build/unpacked-prod/'
      } ] },
      artifact: { files: [ {
        expand: true,
        cwd: 'build/',
        src: [pkg.name + '-' + pkg.version + '.crx'],
        dest: process.env.CIRCLE_ARTIFACTS
      } ] }
    },

    browserify: {
      build: {
        files: fileMaps.browserify,
        options: { browserifyOptions: {
          debug: true,  // for source maps
          standalone: pkg['export-symbol']
        } }
      }
    },

    exec: {
      crx: {
        cmd: [
          './crxmake.sh build/unpacked-prod ./mykey.pem',
          'mv -v ./unpacked-prod.crx build/' + pkg.name + '-' + pkg.version + '.crx'
        ].join(' && ')
      }
    },

    uglify: {
      min: { files: fileMaps.uglify }
    },

    watch: {
      js: {
        files: ['package.json', 'lint-options.json', 'Gruntfile.js', 'code/**/*.js',
                'code/**/*.json', '!code/js/libs/*'],
        tasks: ['test']
      },
      hc: {
        files: ['code/css/**/*.css', 'code/html/**/*.html', 'code/**/*.mdx'],
        tasks: ['hc']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //
  // custom tasks
  //

  grunt.registerTask(
    'manifest', 'Extend manifest.json with extra fields from package.json',
    function() {
      var fields = ['name', 'version', 'description'];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        mnf[field] = pkg[field];
      }
      grunt.file.write('build/unpacked-dev/manifest.json', JSON.stringify(mnf, null, 4) + '\n');
      grunt.log.ok('manifest.json generated');
    }
  );

  grunt.registerTask(
    'circleci', 'Store built extension as CircleCI arfitact',
    function() {
      if (process.env.CIRCLE_ARTIFACTS) { grunt.task.run('copy:artifact'); }
      else { grunt.log.ok('Not on CircleCI, skipped'); }
    }
  );

  //
  // testing-related tasks
  //

  grunt.registerTask('test', ['jshint', 'mochaTest']);
  // grunt.registerTask('test-cont', ['test', 'watch']);
  grunt.registerTask('test-cont', ['test', 'watch:js']);

  // @douraymi@ css auto
  grunt.registerTask('hc', ['copy:main', 'manifest']);
  grunt.registerTask('html-css', ['watch:hc']);

  //
  // DEFAULT
  //
  grunt.registerTask('dev', ['clean', 'mkdir:unpacked', 'copy:main', 'manifest',
    'mkdir:js', 'browserify']);

  grunt.registerTask('default', ['clean', 'test', 'mkdir:unpacked', 'copy:main', 'manifest',
    'mkdir:js', 'browserify', 'copy:prod', 'uglify', 'exec', 'circleci']);

};

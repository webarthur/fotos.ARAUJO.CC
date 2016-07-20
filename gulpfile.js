var fileinclude = require('gulp-file-include')
  , gulp = require('gulp')
  , path = require('path')
  , rename = require("gulp-rename")
  , fs = require('fs')
  , glob = require('glob')
  , marked = require('marked')
  , page = {}
  , md = ''
  , filename = ''
  , index = []
  , theme = './themes/eva00/'
  
var app = require('./package.json')

gulp.task('default', function() {
	
	console.log('Fire in the hole!');
	
	// home template
	gulp.src([theme+'home.html'])
		.pipe(fileinclude({
			prefix: '@',
			context: {
				app: app,
				page: page
			}
			// basepath: '@file'
		}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./'))
	
	console.log('- index.html ');

	// each path
  glob.sync('./*').forEach(function(filePath) {
    
   // if is path
    if (fs.statSync(filePath).isDirectory()) {
			
			var filedata = filePath+'/data.json'
			
			// if data.json exists
			if(fs.existsSync(filedata)) {
				try{
					
					filename = path.basename(filePath)+'.html'
					
					// get article data
					page = JSON.parse(fs.readFileSync(filedata))
					
					// push index
					index.push({
						title: page.title
						, slug: path.basename(filePath)
						, image: page.image
						, datetime: page.datetime
						, tags: page.tags
					})
					
					// get article md content
					md = fs.readFileSync(filePath+'/article.md', 'utf-8')
					page.content = marked(md);
					
					// write template rendered
					gulp.src([theme+'article.html'])
						.pipe(fileinclude({
							prefix: '@',
							context: {
								app: app,
								page: page
							}
							// basepath: '@file'
						}))
						.pipe(rename(filename))
						.pipe(gulp.dest('./'))
					
					console.log('- '+filename+' ');
				}
				catch(err) {
					console.log('ERRO! Impossível ler '+filedata, err);
				}
			}
			
    }
  })
  
  // sort index
  index.sort(function (a,b) {
		if (a.datetime < b.datetime)
			return -1;
		if (a.datetime > b.datetime)
			return 1;
		return 0;
	});
  
  // write index.js
  fs.writeFileSync('./index.js', 'var index = '+JSON.stringify(index));
  console.log('- index.js ');

});

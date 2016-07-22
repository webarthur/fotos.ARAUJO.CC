
/*
 * Remember to install: 
 * sudo apt-get install imagemagick graphicsmagick
 * 
 */

var fs = require('fs')
  , path = require('path')
  , gulp = require('gulp')
  , glob = require('glob')
  , marked = require('marked')
	, fileinclude = require('gulp-file-include')
  , imageResize = require('gulp-image-resize')
  , rename = require("gulp-rename")
  , app = require('./package.json')
  
var theme = './themes/eva00/'
	, thumb_w = 500
	, thumb_h = 304
  , page = {}
  , md = ''
  , filename = ''
  , index = []

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
			
			var filedata  = filePath+'/data.json'
			var thumbnail = filePath+'/thumb.jpg'
			
			// if data.json exists
			if(fs.existsSync(filedata)) {
				try{
					
					filename = path.basename(filePath)+'.html'
					
					// get article data
					page = JSON.parse(fs.readFileSync(filedata))
					page.slug = path.basename(filePath)
					
					// push index
					index.push({
						title: page.title
						, slug: page.slug
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
				
				// if thumbnail exists
				if(!fs.existsSync(thumbnail)) {
					gulp.src('./'+page.slug+'/'+page.image)
						.pipe(imageResize({ 
							width : thumb_w,
							height : thumb_h,
							format : 'jpeg'
						}))
						.pipe(rename('thumb.jpg'))
						.pipe(gulp.dest('./'+page.slug+'/'))
					
					console.log('  -> thumbnail generated for '+page.image+'!');
				}
				
			}
			
    }
  })
  
  // sort index
  index.sort(function (a,b) {
		if (a.datetime < b.datetime)
			return 1;
		if (a.datetime > b.datetime)
			return -1;
		return 0;
	});
  
  // write index.js
  fs.writeFileSync('./index.js', 'var index = '+JSON.stringify(index));
  console.log('- index.js ');

});

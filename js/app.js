
$e = function (e) { return document.getElementById(e) }
$s = function (q) { return document.querySelector(q) }

function shareButtons(title, url, desc){

  var height = 300
    , weight = 600;

  try{
    return '<a target="_blank" text="1.9em" style="color:#3B5998" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u='+url+'&amp;t='+title+'\',\'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height='+height+',width='+weight+'\')"><i class="fa fa-facebook-square"></i></a>'
    +' <a target="_blank" text="1.9em" style="color:#00ABF1" onclick="window.open(\'https://twitter.com/intent/tweet?source='+url+'&amp;text='+title+': '+url+'\', \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height='+height+',width='+weight+'\')"><i class="fa fa-twitter-square"></i></a>'
    +' <a target="_blank" text="1.9em" style="color:#0083BE" onclick="window.open(\'http://www.linkedin.com/shareArticle?mini=true&amp;url='+url+'&amp;title='+title+'&amp;summary='+title+'&amp;source='+url+'\', \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height='+height+',width='+weight+'\')"><i class="fa fa-linkedin-square"></i></a>'
    +' <a target="_blank" text="1.9em" style="color:#CA2127" onclick="window.open(\'http://www.reddit.com/submit?url='+url+'&amp;title='+title+'\', \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height='+height+',width='+weight+'\')"><i class="fa fa-reddit-square"></i></a>'
    +' <a target="_blank" text="1.9em" style="color:#44556B" onclick="window.open(\'http://www.tumblr.com/share?v=3&amp;u='+url+'&amp;t='+title+'&amp;s=\', \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height='+height+',width='+weight+'\')"><i class="fa fa-tumblr-square"></i></a>'
    +' <a target="_blank" text="1.9em" style="color:#CA2127" onclick="window.open(\'http://pinterest.com/pin/create/button/?url='+url+'&amp;description='+title+'\', \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height='+height+',width='+weight+'\')"><i class="fa fa-pinterest-square"></i></a>'
    +' <a target="_blank" text="1.9em" style="color:#D0422A" onclick="window.open(\'https://plus.google.com/share?url='+url+'\', \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height='+height+',width='+weight+'\')"><i class="fa fa-google-plus-square"></i></a>'
    +' <a target="_blank" text="1.9em" style="color:#CA2127; fill:#F57D00; position:relative; top:2px" onclick="window.open(\'https://www.blogger.com/blog-this.g?u='+url+'&n='+title+'\', \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height='+height+',width='+weight+'\')">'
      +'<svg xmlns="http://www.w3.org/2000/svg" width="28" viewBox="0 0 1000 1000" version="1.1"><path class="fill" d="M195.88 .156c-107.72 0 -195.9 88.2 -195.9 195.88l0 607.851c0 107.7 88.2 195.8 195.9 195.849l607.851 0c107.72 0 195.8 -88.1 195.8 -195.849l0 -607.851c0 -107.7 -88.1 -195.9 -195.8 -195.88l-607.851 0zm338.012 186.777c94.026 7.6 148.6 68.3 155.1 145.9 5 40 3.6 69.6 -2.1 91.4 53.6 1.8 116.4 25.8 120.4 113.098l0 85.911c-5.561 75 -32.3 167.7 -169.2 187.3 -30.8 4.4 -65.5 1.5 -110.3 1.2 -45.1 -1.2 -84.5 -1 -118.9 -0.3 -138.9 2.5 -215.5 -58.5 -216.2 -189.3 -1.1 -44.5 0.7 -92.7 0.5 -152.6 -0.6 -37.9 -0.8 -77.5 0.1 -114.4 0.3 -7.2 -0.7 -15.1 1.2 -22.8 6 -84.3 73.7 -133.7 152.7 -144.665l186.745 -.814zm-156.148 117.259c-80.036 13.1 -84 104.4 0 115.726l151.924 0c80.036 -13.1 84 -104.4 0 -115.726l-151.924 0zm-34.508 252.82c-82.395 12.8 -83.6 116.5 2.9 127.271l279.1 1.001c81.695 -12.7 81.5 -116.3 -2.9 -127.302l-279.1 -.97z"/></svg>'
    +'</a>';
  } catch(e) {
    console.log(e);
  }
}

// ---------- //

// TAGS
if($e('tags')) {
	var tag_attributes = ' text="white .8em" layout="inline-block few-rounded gray-90 h-padding-5"'
	$e('tags').innerHTML = '<span '+tag_attributes+'> '+$e('tags').innerHTML.split(',').join(' </span> <span '+tag_attributes+'>')+' </span>'

	// SHARE MENU
	$s('article menu').innerHTML = shareButtons(document.title, location.href, document.title)

	// MARKDOWN
	// $s('pre').outerHTML = mmd($s('pre').innerHTML)

	// IMAGE META
	EXIF.getData($e('picture'), function() {
		
		var metas = this.exifdata;
		var info = []
		
		console.log(metas);
		
		metas.Model && info.push('<p layout="padding-10 no-margin"> <b>Modelo</b><br /> '+metas.Model+' </p>');
		metas.ExposureTime && info.push('<p layout="padding-10 no-margin"> <b>Exposição</b><br /> '+metas.ExposureTime.numerator + '/' + metas.ExposureTime.denominator+' </p>');
		metas.ISOSpeedRatings && info.push('<p layout="padding-10 no-margin"> <b>ISO</b><br /> '+metas.ISOSpeedRatings+' </p>');
		metas.Software && info.push('<p layout="padding-10 no-margin"> <b>Edição</b><br /> '+metas.Software+' </p>');
		// metas.ShutterSpeedValue && info.push('<p> <b>ISO</b><br /> f/'+metas.ShutterSpeedValue+' </p>');
		
		$e('metas').innerHTML = info.join('')
	});
}


var app = {
	
	name: 'fotos.ARAUJO.CC',
	template: '',
	
	init: function () {
		
		var html = ''
		var gallery = $e('gallery')
		
		// if is home
		if(gallery) {
			
			// save template
			if(!this.template) {
				template = gallery.innerHTML
			}
			
			gallery.innerHTML = ''
			
			index.forEach(function (item) {
				html += template
									.replace(/\{slug\}/gi, item.slug)
									.replace(/\{title\}/gi, item.title)
									.replace(/\msrc/gi, 'src')
			})
			
			gallery.innerHTML = html
		}
	}, 
	
	fitFlex: function (container, target, smallestWidth) {

		smallestWidth = smallestWidth? smallestWidth : 300 ;

		var flexGroup = container.querySelectorAll(target);
		var flexArray = Array.prototype.slice.call(flexGroup, 0);

		for(var i in flexArray) {
			var img = flexArray[i].querySelector('img');
			img.aspectRatio = img.naturalWidth / img.naturalHeight;
		};

		flexArray.sort(function (a, b) {
			imageAspectRatioA = a.firstElementChild.aspectRatio;
			imageAspectRatioB = b.firstElementChild.aspectRatio;
			if (imageAspectRatioA < imageAspectRatioB) { return 1; }
			if (imageAspectRatioA > imageAspectRatioB) { return -1; }
			return 0;
		});

		var widest = flexArray[0].firstElementChild.aspectRatio;

		flexArray.forEach(function(box) {
			var flex = 1 / (widest / box.firstElementChild.aspectRatio);
			if (flex == 0) { flex = 1; }
			boxWidth = smallestWidth * flex;
			box.style.cssText = "flex: "+flex+"; min-width: "+boxWidth+"px;";
		});
	},

}


function initAbout() {
	document.getElementById('about').innerHTML = data.about;
}

function initMain() {
	var postsrev = data.posts.reverse()
	postsrev.forEach((postInfo) => {
		var blogpost = postInfo.title + "<br>";
		document.getElementById('main').innerHTML = "<div id='title'></div> <div id='heading'></div> <div id='post'></div>";
		document.getElementById('title').innerHTML = "title";
		document.getElementById('heading').innerHTML = "heading";
		blogpost = blogpost + postInfo.date + "<br>";
		blogpost = blogpost + postInfo.location + "<br>";
		blogpost = blogpost + postInfo.blogpost + "<br>";
		document.getElementById('main').innerHTML = document.getElementById('main').innerHTML + "<br><br>" + blogpost;
	})
}
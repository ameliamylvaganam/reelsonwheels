function initAbout() {
	document.getElementById('about').innerHTML = data.about;
}

function initMain() {
	var postsrev = data.posts.reverse()
	postsrev.forEach((postInfo) => {
		var newBlogPost = "<div id='title'>" + postInfo.title + "</div> <div id='heading'>"
		+ postInfo.date + " 📍" + postInfo.location + "</div><br> <div id='text'>" + postInfo.text + "</div> <br><br>";
		document.getElementById('main').innerHTML = document.getElementById('main').innerHTML + newBlogPost;
	})
}

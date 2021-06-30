/* constants */
//var TITLE_SUFFIX = ' * MAYA MAN'

// homepage (main) //
function initMain() {
    document.title = document.title + TITLE_SUFFIX;
    var annoucementLink = document.getElementById('annoucement');
    annoucementLink.href = data.announcement.link;

    var annoucementText = document.createElement('span');
    annoucementText.innerText = data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title + data.announcement.title;
    annoucementLink.appendChild(annoucementText);

    var mainContainer = document.getElementById('main');
    for (var [projectPath,projectData] of Object.entries(data.projects)) {
        var images = projectData.images;
        var imageIndicies = projectData.mainImageIndices;
        var numImages = imageIndicies.length;
        for (var i = 0; i < numImages; i++) {
            var entry = document.createElement('div');
            entry.classList.add('entry');

            var link = document.createElement('a');
            link.href = '/' + projectPath + '/';

            var imageData = images[imageIndicies[i]];
            if (imageData.type && imageData.type == 'video') {
                var video = document.createElement('video');
                video.muted = true;
                video.autoplay = true;
                video.playsinline = true;
                video.loop = true;

                var sourceMP4 = document.createElement("source");
                sourceMP4.type = "video/mp4";
                sourceMP4.src = 'assets/projects/' + projectPath + '/' + imageData.path_mp4;
                video.appendChild(sourceMP4);

                var sourceWebM = document.createElement("source");
                sourceWebM.type = "video/webm";
                sourceWebM.src = 'assets/projects/' + projectPath + '/' + imageData.path_webm;
                video.appendChild(sourceWebM);

                var videoAlt = document.createElement('div');
                videoAlt.innerText = imageData.alt;
                var videoAltID = imageData.path_mp4.split('.')[0];
                videoAlt.id = videoAltID;
                videoAlt.classList.add('visually-hidden');
                video.setAttribute('aria-describedby', videoAltID);
                entry.appendChild(videoAlt);

                link.appendChild(video);
            } else {
                var image = new Image();
                image.src = 'assets/projects/' + projectPath + '/' + imageData.path;
                image.alt = imageData.alt;
                image.loading = 'lazy';
                link.appendChild(image);
            }
            entry.appendChild(link);
            mainContainer.appendChild(entry);
        }
    }

    data.other.forEach((imageData)=>{
        var entry = document.createElement('div');
        entry.classList.add('entry');

        var link = document.createElement('a');
        link.href = imageData.link;
        link.target = '_blank';
        link.innerText = imageData.title;

        if (imageData.type && imageData.type == 'video') {
            var video = document.createElement('video');
            video.muted = true;
            video.autoplay = true;
            video.playsinline = true;
            video.loop = true;

            var sourceMP4 = document.createElement("source");
            sourceMP4.type = "video/mp4";
            sourceMP4.src = '/assets/other/' + imageData.path_mp4;
            video.appendChild(sourceMP4);

            var sourceWebM = document.createElement("source");
            sourceWebM.type = "video/webm";
            sourceWebM.src = '/assets/other/' + imageData.path_webm;
            video.appendChild(sourceWebM);

            var videoAlt = document.createElement('div');
            videoAlt.innerText = imageData.alt;
            var videoAltID = imageData.path_mp4.split('.')[0];
            videoAlt.id = videoAltID;
            videoAlt.classList.add('visually-hidden');
            video.setAttribute('aria-describedby', videoAltID);
            link.appendChild(video);
        } else {
            var image = new Image();
            image.src = '/assets/other/' + imageData.image;
            image.alt = imageData.title;
            image.loading = 'lazy';
            link.appendChild(image);
        }

        entry.appendChild(link);
        mainContainer.appendChild(entry);
    }
    )

    placeEntries();
}



function initProject(projectPath) {
    var projectData = data.projects[projectPath];
    document.title = projectData.title.toUpperCase() + TITLE_SUFFIX;

    var navContainer = document.getElementById('nav-container');
    addCloseNav(navContainer);

    var projectContainer = document.createElement('div');
    projectContainer.id = projectPath;
    projectContainer.classList.add('copy-container');

    var title = document.createElement('h1');
    title.innerText = projectData.title;
    title.classList.add('text-L');
    title.id = 'active-link';
    projectContainer.appendChild(title);

    var linkData = projectData.link;
    if (linkData) {
        var link = document.createElement('a');
        link.href = linkData.url;
        link.innerText = linkData.text;
        // get rid of http
        link.target = "_blank";
        projectContainer.appendChild(link);
    }

    // Description
    var description = document.createElement('div');
    description.innerHTML = projectData.description;
    description.classList.add('project-description');
    projectContainer.appendChild(description);

    // Video
    var videoData = projectData.videos;
    if (videoData) {
        videoData.forEach((video)=>{
            var videoElt = document.createElement('div');
            if (video.platform == 'vimeo') {
                videoElt.innerHTML = vimeoString1 + video.id + vimeoString2;
            } else if (video.platform == 'youtube') {
                videoElt.innerHTML = youtubeString1 + video.id + youtubeString2;
            }
            videoElt.classList.add('project-video');
            projectContainer.appendChild(videoElt);
        }
        );
    }

    // Images
    projectData.images.forEach((imageData)=>{
        if (imageData.type && imageData.type == 'video') {
            var video = document.createElement('video');
            video.muted = true;
            video.autoplay = true;
            video.playsinline = true;
            video.loop = true;
            video.classList.add('project-image');

            var sourceMP4 = document.createElement("source");
            sourceMP4.type = "video/mp4";
            sourceMP4.src = '/assets/projects/' + projectPath + '/' + imageData.path_mp4;
            video.appendChild(sourceMP4);

            var sourceWebM = document.createElement("source");
            sourceWebM.type = "video/webm";
            sourceWebM.src = '/assets/projects/' + projectPath + '/' + imageData.path_webm;
            video.appendChild(sourceWebM);

            var videoAlt = document.createElement('div');
            videoAlt.innerText = imageData.alt;
            var videoAltID = imageData.path_mp4.split('.')[0];
            videoAlt.id = videoAltID;
            videoAlt.classList.add('visually-hidden');
            projectContainer.appendChild(videoAlt);
            video.setAttribute('aria-describedby', videoAltID);

            projectContainer.appendChild(video);
        } else {
            var image = new Image();
            image.src = '/assets/projects/' + projectPath + '/' + imageData.path;
            image.alt = imageData.alt;
            image.classList.add('project-image');
            projectContainer.appendChild(image);
        }

    }
    );

    // Writing
    var writingData = projectData.writing;
    if (writingData) {
        var writing = document.createElement('div');
        writing.classList.add('project-description');
        var writingTitle = document.createElement('div');
        writingTitle.innerText = 'WRITING';
        writing.appendChild(writingTitle);

        var writingBody = document.createElement('div');
        var numWritingEntries = writingData.length;
        for (var i = 0; i < numWritingEntries; i++) {
            var currentWriting = writingData[i];
            var link = document.createElement('a');
            link.href = currentWriting.url;
            link.innerText = currentWriting.title;
            link.target = "_blank";
            writingBody.appendChild(link);
            if (i != numWritingEntries - 1) {
                writingBody.innerHTML = writingBody.innerHTML + ', ';
            }
        }
        writing.appendChild(writingBody);
        projectContainer.appendChild(writing);
    }

    // Press/Awards
    var pressData = projectData.press;
    if (pressData) {
        var press = document.createElement('div');
        press.classList.add('project-description');
        var pressTitle = document.createElement('div');
        pressTitle.innerText = 'PRESS/RECOGNITION';
        press.appendChild(pressTitle);

        var pressBody = document.createElement('div');
        var numPressEntries = pressData.length;
        for (var i = 0; i < numPressEntries; i++) {
            var currentPress = pressData[i];
            var link = document.createElement('a');
            link.href = currentPress.url;
            link.innerText = currentPress.title;
            link.target = "_blank";
            pressBody.appendChild(link);
            if (i != numPressEntries - 1) {
                pressBody.innerHTML = pressBody.innerHTML + ', ';
            }
        }
        press.appendChild(pressBody);
        projectContainer.appendChild(press);
    }

    document.getElementsByClassName('container')[0].appendChild(projectContainer);
}



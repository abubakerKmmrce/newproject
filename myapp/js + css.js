//catch HTML Elements
const fileElement = document.querySelector('#file-element');
const dropArea = document.querySelector('#drop-area');
const gallery = document.querySelector('#gallery');

//catch and handle 'dragenter', 'dragover', 'dragleave', 'drop'
const dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];


/* ----------------------------- events catcher ----------------------------- */

//first remove default browser behavior from each event
dragEvents.forEach(eventName => {
	dropArea.addEventListener(eventName, preventDefaults, false)
});

//highlight the drop area when the user enters it
['dragenter', 'dragover'].forEach(eventName => {
	dropArea.addEventListener(eventName, highlight, false)
});

//un highlight the drop area when the user leaves it
['dragleave', 'drop'].forEach(eventName => {
	dropArea.addEventListener(eventName, unHighlight, false)
});

//upload the file when the user drops it
dropArea.addEventListener('drop', handleDrop, false);

//*catch the file input and upload the file
fileElement.addEventListener('change', function(e){
	const files = e.target.files;
	//loop through the files and preview them
	[...files].forEach(file => previewFile(file));
},)


/* ----------------------------- events handlers ---------------------------- */

//*prevent default browser behavior for the events
function preventDefaults(e) {
	e.preventDefault();
	e.stopPropagation();
}

//*highlight the drop area
function highlight() {
	dropArea.classList.add('highlight');
}

//*un highlight the drop area
function unHighlight() {
	dropArea.classList.remove('highlight');
}

//*catch dragged files and prepare them for upload
function handleDrop(e) {
	const files = e.dataTransfer.files;
	//loop through the files and preview them
	[...files].forEach(file => previewFile(file));
}



//*preview the file
function previewFile(file) {
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function () {
		gallery.innerHTML += renderItem(file, reader.result);
	}
}


/* ----------------------------- rendering ------------------------------ */
function renderItem(fileData, imgSrc) {
	const HTML = `
		<div class="card mb-3">
			<div class="row g-0">
				<div class="col-md-4">
					<img src="${imgSrc}" class="img-fluid rounded-start" alt="...">
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<input type="text" class="form-control form-group mb-3" placeholder="Title" value=${fileData.name}>
						<input type="text" class="form-control form-group" placeholder="Tag">	
					</div>
					<div class="card-footer bg-body border-0 card-footer d-flex justify-content-between">
						<a href="#" class="btn btn-primary">Update</a>
						<a href="#" class="btn btn-danger">Remove</a>
					</div>
				</div>
			</div>
		</div>
	`;
	return HTML;
}


##############################################################
body{
	margin: 0px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
#drop-area {
    max-width: 1000px;
	height: 180px;
	border: 2px dashed #ccc;
	border-radius: 5px;
	background-color: #fafafa;
	font-family: Open Sans,Arial,sans-serif;
	font-size: 80%;
	font-weight: 500;
	padding: 20px;
	align-items: center;
	justify-content: center;
	text-align: center;
	margin-bottom: 1em;
	cursor: pointer;
}

#drop-area.highlight {
	border-color: purple;
}

p {
	margin-top: 0;
}

.my-form {
	margin-bottom: 10px;
}

#gallery {
	margin-top: 10px;
}

#gallery img {
	width: 150px;
	margin-bottom: 10px;
	margin-right: 10px;
	vertical-align: middle;
}

.button {

	display: inline-block;
	padding: 10px;
	background: DodgerBlue;
	cursor: pointer;
	border-radius: 6px;
	border: 1px solid #e6e6e6;
	padding: 0.9em 1.2em;
	font-size: 100%;
	font-weight: 300;
	font-family: Open Sans,Arial,sans-serif;
	width: 60%;
}
.button:hover {
	background: #ddd;
}
.button:hover {
  background-color: #007d7e;
}

#fileElem {
	display: none;
}

.gallery-item{
	display: flex;
	width: 100%;
	border: 1px solid #ccc;
}

##########################################
{% extends 'oscar/dashboard/layout.html' %}
{% load i18n %}
{% load static %}

{% block title %}
    {% if media %}{% trans "Edit media" %}{% else %}{% trans "New media" %}{% endif %} | {{ block.super }}
{% endblock %}

{% block breadcrumbs %}
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="{% url 'dashboard:cms-media-list' %}">{% trans "Media" %}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {% if media %}{% trans "Edit" %} {{ model_name }}{% else %}{% trans "New" %} {{ model_name }}{% endif %}
            </li>
        </ol>
    </nav>
{% endblock %}

{% block headertext %}
{% if media %}{% trans "Edit" %} {{ model_name }}{% else %}{% trans "New" %} {{ model_name }}{% endif %}
{% endblock %}


{% block dashboard_content %}

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/assets/favicon.ico">
	<title>Drag Drop File Uploader</title>
	<!-- bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

	<!-- custom css -->
	 <link rel="stylesheet" href="{% static "oscar/css/main.css" %}">
	<!-- javascript -->
	 <script src="{% static "oscar/js/main.js" %}?version=1"defer></script>
</head>
<body>
	<div id="drop-area" class="w-50 my-5">
		<form class="my-form">
			<p>Drag and drop images into this area to upload immediately</p>
            <p>Supported formats: GIF, JPEG, PNG. Maximum filesize: 10.0 MB.</p>
			<input type="file" id="file-element" hidden multiple accept="image/*">
{#<button      type="button" class="btn btn-primary"><span class="bi bi-plus"></span> Sample Button</button>#}
           <label class="button" for="file-element">OR CHOOSE FROM YOUR COMPUTER No file chosen</label>
		</form>
	</div>
	<div id="gallery" class="w-50"></div>
</body>
</html>

            {% block fixed_actions_group %}
                <div class="fixed-actions-group">
                    <div class="form-group">
                        <div class="left">
                        </div>
                        <div class="right">
{#                            <button type="submit" class="btn btn-green">{% trans "Save" %}</button>#}
                        </div>
                    </div>
                </div>
            {% endblock fixed_actions_group %}
        </div>
    </form>
</div>
{% endblock dashboard_content %}

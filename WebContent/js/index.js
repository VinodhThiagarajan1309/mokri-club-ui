$(document).ready(function(){

	var proceedButton = document.createElement('button');
	proceedButton.textContent = 'Proceed'; 
	proceedButton.className = 'upload_proceed';
	proceedButton.onclick = function() { 
		$("#myModal").modal('show'); 
	};

	initFileUploader("#zdrop");
		function initFileUploader(target) {
			var previewNode = document.querySelector("#zdrop-template");
			previewNode.id = "";
			var previewTemplate = previewNode.parentNode.innerHTML;
			previewNode.parentNode.removeChild(previewNode);


			var zdrop = new Dropzone(target, {
				url: 'https://vinodh.adaptainer.io/services/upload/',
				acceptedFiles: ".mp3",
                maxFiles:1,
				maxFilesize:10,
				previewTemplate: previewTemplate,
				previewsContainer: "#previews",
				clickable: "#upload-label",
				success: function(file, response) {
					var responsetext = JSON.parse(file.xhr.responseText);
					$("#recordedFileUrl").val(responsetext.s3Location);
					$("#previews").after(proceedButton);
					$("#record_btn").removeClass('disabled');
				}
			});

			zdrop.on("addedfile", function(file) { 
				$('.preview-container').css('visibility', 'visible');
			});

			zdrop.on("totaluploadprogress", function (progress) {
				var progr = document.querySelector(".progress .determinate");
					if (progr === undefined || progr === null)
						progr.style.width = progress + "%";
					});

					zdrop.on('dragenter', function () {
						$('.fileuploader').addClass("active");
					});

					zdrop.on('dragleave', function () {
						$('.fileuploader').removeClass("active");			
					});

					zdrop.on('drop', function () {
						$('.fileuploader').removeClass("active");	
					});
					
		  }

	});
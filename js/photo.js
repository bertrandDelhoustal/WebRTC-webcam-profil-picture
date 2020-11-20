var blockPhoto = document.getElementById('photo-block');
var btnStart = document.getElementById('btn-active-camera');
var photoButton = document.getElementById('startbutton');
var modifyButton = document.getElementById('modifybutton');

photoButton.style.display = "none";
modifyButton.style.display = "none";

function readURL(input, imageBlock) {
    if ($('input[name=' + input + ']')[0].files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var input = document.getElementById('inscription-photo');
            var canvasUpload = document.getElementById('canvas');
            var context = canvasUpload.getContext('2d');
            canvasUpload.width = 500;
            canvasUpload.height = 500;

            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                if (this.width > this.height) {
                    context.drawImage(this,
                        (this.width - this.height) / 2,
                        0,
                        this.height, this.height, 0, 0, 500, 500);
                } else {
                    context.drawImage(this,
                        0,
                        (this.height - this.width) / 2,
                        this.width, this.width, 0, 0, 500, 500);
                }
                var data = canvasUpload.toDataURL('image/jpeg', 1.0);
                $(imageBlock).attr('src', data);
                input.setAttribute('value', data);
            }

            $(imageBlock).css('width', '240px');
            $(imageBlock).css('height', '240px');
        };

        reader.readAsDataURL($('input[name=' + input + ']')[0].files[0]);
        $('#cadre-video').hide();
        $('#video').hide();
        $('#output').show();
    } else {
        $('#cadre-video').show();
        $('#video').show();
        $('#output').hide();
    }
}

$('input[name="inscription-photo-file"]').on('change', function () {
    readURL("inscription-photo-file", "#photo");
});


(function () {
    if ($(window).width() / $(window).height() < 1) {
        $("#video").css("width", "240px");
        $("#video").css("height", "320px");
        $("#video").css("margin-top", "-40px");
        var width = 480;
    } else {
        $("#video").css("width", "320px");
        $("#video").css("height", "240px");
        $("#video").css("margin-left", "-40px");
        var width = 640;
    }
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    var height = 0;     // This will be computed based on the input stream

    // Show if video is workinng
    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;
    var inputFile = null;
    var cameraBlock = null;
    var modifyBtn = null;
    var cadre = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        output = document.getElementById('output');
        activebutton = document.getElementById('activebutton');
        startbutton = document.getElementById('startbutton');
        inputFile = document.getElementById('inscription-photo');
        cameraBlock = document.getElementById('camera-block');
        modifyBtn = document.getElementById('modifybutton');
        cadre = document.getElementById('cadre-video');

        blockPhoto.style.display = "block";
        startbutton.style.display = "none";

        navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
                startbutton.style.display = "block";
                activebutton.style.display = "none";
            })
            .catch(function (err) {
                // If webcam os not allowed, hide related button
                console.log("An error occurred: " + err);

                startbutton.style.display = "none";
                activebutton.style.display = "none";
            });

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function (ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        modifyBtn.addEventListener('click', function (ev) {
            clearphoto();
            ev.preventDefault();
        }, false);

        clearphoto();
    }

    // Reset

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/jpeg', 1.0);
        photo.setAttribute('src', data);
        output.style.display = "none";
        modifyBtn.style.display = "none";
        video.style.display = "block";
        cadre.style.display = "block";
        startbutton.style.display = "block";
    }

    // Screenshot from video to canvas
    // Image resize in 500x500, crop if needed and converted in jpeg

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = 500;
            canvas.height = 500;

            if (width > height) {
                context.drawImage(video,
                    (width - height) / 2,
                    0,
                    height, height, 0, 0, 500, 500);
            } else {

                context.drawImage(video,
                    0,
                    (height - width) / 2,
                    width, width, 0, 0, 500, 500);
            }

            var data = canvas.toDataURL('image/jpeg', 1.0);
            photo.setAttribute('src', data);
            inputFile.setAttribute('value', data);
            video.style.display = "none";
            cadre.style.display = "none";
            startbutton.style.display = "none";
            output.style.display = "block";
            modifyBtn.style.display = "block";
        } else {
            clearphoto();
        }
    }

    // Start process on video activation
    btnStart.addEventListener('click', startup, false);
})();
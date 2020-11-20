<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebRTC-picture-booth</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="../test/css/fontawesome/all.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
<div class="row" id="photo-block" style="margin:0;">
    <div class="col-sm-12" id="camera-block">
        <div class="camera">
            <div id="cadre-video">
                <video id="video" style="object-fit:cover;"></video>
            </div>
            <div id="output" style="display: none;">
                <img id="photo">
            </div>
            <div id="block-btn-camera">
                <div class="action-btn" id="activebutton">
                    <button id="btn-active-camera" type="button"><i aria-hidden="true" class="fa fa-power-off"></i> Activate camera</button>
                </div>
                <div class="action-btn" id="startbutton">
                    <button title="Prendre une photo" type="button"><i aria-hidden="true" class="fa fa-camera"></i> Take a picture</button>
                </div>
                <div class="action-btn" id="modifybutton">
                    <button title="Modifier ma photo" type="button"><i aria-hidden="true" class="fa fa-camera"></i> Modify picture</button>
                </div>
                <div class="action-btn" id="uploadbutton">
                    <button title="Télécharger une photo" type="button">
                        <label for="inscription-photo-file" style="margin-bottom: 0;"
                               title="Télécharger une photo"><i aria-hidden="true" class="fa fa-picture-o"></i> Upload a picture</label>
                        <input accept="image/*" class="photo-input" id="inscription-photo-file" name="inscription-photo-file" type="file"
                               value=""/>
                    </button>
                </div>
            </div>
        </div>
        <canvas id="canvas"></canvas>
        <input id="inscription-photo" name="inscription-photo" type="hidden"/>
        <input id="inscription-photo-old" name="inscription-photo-old"
               type="hidden" value=""/>
    </div>
</div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="js/photo.js"></script>
</body>
</html>
# WebRTC-picture-booth
Use the camera of your laptop or mobile device to take a picture.

You can also upload an image file.
All uploaded image are crop, resize (500x500 by default) and centered if too big directly in javascript.

## Demo
Try it here :
https://bertrand-delhoustal.com/demo-photo/

## Change image size
Change width and height by replacing 500 in js/photo.js
```javascript
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
```

## Save picture on server exemple

```php

function base64ToImage($base64_string, $output_file) {
    $file = fopen($output_file, "wb");
    
    $data = explode(',', $base64_string);
    
    fwrite($file, base64_decode($data[1]));
    fclose($file);
    
    return $output_file;
}

if (!empty($_POST['inscription-photo'])){
        
	$imgBase64 = $_POST['inscription-photo'];

	$random_number = mt_rand(100000, 999999);
	$fileName = $random_number.".jpeg";

	if(!empty($fileName)){
		    $chemin = $yourPath.$fileName;
        $imageConverted = base64ToImage($imgBase64,$chemin);
	}
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

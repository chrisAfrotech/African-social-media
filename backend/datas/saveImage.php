<?php


// getting datas from post
function saveImage($image_name) { // this function require SESSION to be started as it uses it
  $target_dir = "pulication_img/";
  $unique_rand = substr(bin2hex(random_bytes(20)),0,20);
  $target_file = $target_dir.$unique_rand.time().basename($_FILES[$image_name]["name"]).$image_name;
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  // Check if image file is a actual image or fake image

  $check = getimagesize($_FILES[$image_name]["tmp_name"]);
  if($check !== false) {
  // echo "File is an image - " . $check["mime"] . ".";
  } else {
  return "File is not an image.";
  }

  // Check if file already exists
  if (file_exists($target_file)) {
    return "Sorry, file already exists.";
  }

  // Check file size
  if ($_FILES[$image_name]["size"] > 1000000) {
    return "Sorry, your file is too large.";
  }

// Allow certain file formats
/* if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
} */

  if (move_uploaded_file($_FILES[$image_name]["tmp_name"], $target_file)) {
  	$_SESSION[$image_name] = $target_file;
    return "success";
  } else {
    return "Sorry, there was an error uploading your file.";
  }
}
?>
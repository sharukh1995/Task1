<?php
// Connect to database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_management";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (name, nickname, mobile, email, role, address, gender, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $name, $nickname, $mobile, $email, $role, $address, $gender, $profile_image);

// Loop through each row and save to database
foreach ($data as $row) {
    $name = $row['Name'];
    $nickname = $row['Nickname'];
    $mobile = $row['Mobile'];
    $email = $row['Email'];
    $role = $row['Role'];
    $address = $row['Address'];
    $gender = $row['Gender'];
    $profile_image = $row['Profile Image'];

    $stmt->execute();
}

$stmt->close();
$conn->close();

echo "Data saved successfully!";
?>

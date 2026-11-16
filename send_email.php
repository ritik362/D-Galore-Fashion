<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars(isset($_POST['fullname']) ? $_POST['fullname'] : '');
    $email = htmlspecialchars(isset($_POST['email']) ? $_POST['email'] : '');
    $phone = htmlspecialchars(isset($_POST['phone']) ? $_POST['phone'] : '');
    $product = htmlspecialchars(isset($_POST['product']) ? $_POST['product'] : '');
    $city = htmlspecialchars(isset($_POST['city']) ? $_POST['city'] : '');
    $desc = htmlspecialchars(isset($_POST['description']) ? $_POST['description'] : '');

    // Yaha apna real email daalein jaha mail aani chahiye
    $to = "rv8116677@gmail.com"; 
    $subject = "New Website Enquiry from $name";
    
    // Email ki body design
    $message = "You have received a new enquiry from your website.\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n";
    $message .= "Product Interest: $product\n";
    $message .= "City / Country: $city\n\n";
    $message .= "Description:\n$desc\n";

    // Headers
    $headers = "From: rv8116677@gmail.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Mail send function (Requires local SMTP setup on XAMPP)
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Mail sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "PHP mail() failed."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>

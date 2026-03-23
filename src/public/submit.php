<?php
// Green Dev — Shopify Training NL
// PHP proxy: receives form POST, forwards to Google Apps Script
// The Apps Script token never reaches the browser.

declare(strict_types=1);

header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Parse incoming JSON from the browser
$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Validate required fields
$name  = trim($data['name']  ?? '');
$email = trim($data['email'] ?? '');
$city  = trim($data['city']  ?? '');
$level = trim($data['level'] ?? '');

if (!$name || !$email || !$city || !$level) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

// Forward to Apps Script with the secret token
$appsScriptUrl = 'https://script.google.com/macros/s/AKfycby7ogmP4P_v7VfGl4dtJ8I7H9wj09PqibtTd7h97nzAgyNPi3cMX1U93GKcBh2C_W6E/exec';
$token         = 'gd-training-2026';

$payload = json_encode([
    'name'  => $name,
    'email' => $email,
    'city'  => $city,
    'level' => $level,
    'token' => $token,
]);

$ch = curl_init($appsScriptUrl);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true, // Apps Script redirects once
    CURLOPT_TIMEOUT        => 10,
]);

$response = curl_exec($ch);
$error    = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(502);
    echo json_encode(['success' => false, 'error' => 'Could not reach submission endpoint']);
    exit;
}

// Pass the Apps Script response back to the browser
echo $response;

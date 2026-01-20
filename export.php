<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

use Dompdf\Dompdf;
use Dompdf\Options;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo 'Méthode POST requise uniquement';
    exit;
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

if (empty($_POST['html'])) {
    http_response_code(400);
    exit('HTML manquant');
}

ob_start();
include 'cv.php';
$htmlContent = ob_get_clean();

$cssPath = __DIR__ . '/index.css';

$html = '
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CV</title>
    <style>' . file_get_contents($cssPath) . '</style>
</head>
<body>
' . $htmlContent . '
</body>
</html>';


try {
    require __DIR__ . '/vendor/autoload.php';
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isRemoteEnabled', true);
    $options->setChroot(__DIR__);

    $dompdf = new Dompdf($options);
    $dompdf->setBasePath(__DIR__);
    $dompdf->loadHtml($html);
    $dompdf->setPaper('A4', 'portrait');
    $dompdf->render();

    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="cv.pdf"');
    header('Content-Length: ' . strlen($dompdf->output()));
    header('Cache-Control: private, max-age=0, must-revalidate');

    $dompdf->setBasePath(__DIR__);
    echo $dompdf->output();

} catch (Exception $e) {
    http_response_code(500);
    echo 'Erreur: ' . $e->getMessage();
}
?>
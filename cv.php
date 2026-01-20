<?php
$prenom      = $_POST['prenom'] ?? '';
$nom         = $_POST['nom'] ?? '';
$profession  = $_POST['profession'] ?? '';
$email       = $_POST['email'] ?? '';
$tel         = $_POST['tel'] ?? '';
$profil      = $_POST['profil'] ?? '';
$loisirs     = json_decode($_POST['loisirs'] ?? '[]', true) ?: [];
$skills      = json_decode($_POST['skills'] ?? '[]', true) ?: [];
$experiences = json_decode($_POST['experiences'] ?? '[]', true) ?: [];
$diplomes    = json_decode($_POST['diplomes'] ?? '[]', true) ?: [];

ob_start();
?>
<!DOCTYPE html>
<html lang='fr'>
<head>
    <meta charset='UTF-8'>
    <title>CV - <?= e($prenom . ' ' . $nom) ?></title>
    <link rel="stylesheet" href="/index.css">
</head>
<body>
<div class='cv-container'>
    <div class='cv-sidebar'>
        <h2><?= e($prenom) ?></h2>
        <h2><?= e($nom) ?></h2>

        <p><strong>Profession</strong></p>
        <p><?= e($profession) ?: 'Exemple' ?></p>

        <p><strong>Email</strong></p>
        <p><?= e($email) ?: 'email@exemple.com' ?></p>

        <p><strong>Téléphone</strong></p>
        <p><?= e($tel) ?: '06.01.01.01.01' ?></p>

        <hr>

        <p><strong>Loisirs</strong></p>
        <?php if ($loisirs): ?>
            <ul>
                <?php foreach ($loisirs as $l): ?>
                    <li><?= e($l) ?></li>
                <?php endforeach; ?>
            </ul>
        <?php else: ?>
            <p class='cv-placeholder'>Vos loisirs apparaîtront ici...</p>
        <?php endif; ?>
    </div>

    <div class='cv-main'>
        <div class='cv-section'>
            <h3 class='cv-section-title'>Profil</h3>
            <?php if ($profil): ?>
                <p><?= nl2br(e($profil)) ?></p>
            <?php else: ?>
                <p class='cv-placeholder'>Décrivez-vous en quelques lignes...</p>
            <?php endif; ?>
        </div>

        <div class='cv-section'>
            <h3 class='cv-section-title'>Compétences</h3>
            <?php if ($skills): ?>
                <ul>
                    <?php foreach ($skills as $s): ?>
                        <li><?= e($s) ?></li>
                    <?php endforeach; ?>
                </ul>
            <?php else: ?>
                <p class='cv-placeholder'>Vos compétences apparaîtront ici...</p>
            <?php endif; ?>
        </div>

        <div class='cv-section'>
            <h3 class='cv-section-title'>Expériences</h3>
            <?php if ($experiences): ?>
                <?php foreach ($experiences as $exp): ?>
                    <div class='experience-item'>
                        <div class='experience-title'><?= e($exp['title'] ?? '') ?></div>
                        <div class='experience-date'><?= e($exp['date'] ?? '') ?></div>
                        <div class='experience-details'><?= e($exp['details'] ?? '') ?></div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p class='cv-placeholder'>Vos expériences apparaîtront ici...</p>
            <?php endif; ?>
        </div>

        <div class='cv-section'>
            <h3 class='cv-section-title'>Diplômes</h3>
            <?php if ($diplomes): ?>
                <?php foreach ($diplomes as $dip): ?>
                    <div class='diplome-item'>
                        <div class='diplome-title'><?= e($dip['title'] ?? '') ?></div>
                        <div class='diplome-date'><?= e($dip['date'] ?? '') ?></div>
                        <div class='diplome-details'><?= e($dip['details'] ?? '') ?></div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p class='cv-placeholder'>Vos diplômes apparaîtront ici...</p>
            <?php endif; ?>
        </div>
    </div>
</div>
</body>
</html>
<?php
$html = ob_get_clean();

?>
<script>
    document.getElementById('exportForm').submit();
</script>

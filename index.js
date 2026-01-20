const displayPreview = document.getElementById('display-preview')

const inputPrenom = document.getElementById('prenom');
const inputNom = document.getElementById('nom');
const inputProfession = document.getElementById('profession');
const inputEmail = document.getElementById('email');
const inputTel = document.getElementById('tel');
const inputProfil = document.getElementById('profil');

const cvPrenom = document.getElementById('cv-prenom');
const cvNom = document.getElementById('cv-nom');
const cvProfession = document.getElementById('cv-profession');
const cvEmail = document.getElementById('cv-email');
const cvTel = document.getElementById('cv-tel');
const cvProfil = document.getElementById('cv-profil');

const loisirInput = document.getElementById('loisirs-input');
const cvLoisirContainer = document.getElementById('cv-loisirs');

const skillInput = document.getElementById('skill-input');
const cvSkillsContainer = document.getElementById('cv-competences');

const experienceInput = document.getElementById('experience-input');
const dateDebutInput = document.getElementById('dateDebut-input');
const dateFinInput = document.getElementById('dateFin-input');
const detailsInput = document.getElementById('details-input');
const cvExperiencesContainer = document.getElementById('cv-experiences');

const diplomeInput = document.getElementById('diplome-input');
const dateObtentionInput = document.getElementById('dateDiplome-input');
const ecoleInput = document.getElementById('ecole-input');
const cvDiplomesContainer = document.getElementById('cv-diplomes');

const downloadBtn = document.getElementById('download-pdf');
const form = document.getElementById('pdfForm');
const input = document.getElementById('pdfHtmlInput');
const preview = document.getElementById('cv-preview');

function updatePreview() {
	const prenom = inputPrenom.value.trim() || 'Prénom';
	const nom = inputNom.value.trim().toUpperCase() || 'NOM';
	const profession = inputProfession.value.trim() || 'Exemple';
	const email = inputEmail.value.trim() || 'email@exemple.com';
	const tel = inputTel.value.trim() || '06.01.01.01.01';
	const profil = inputProfil.value.trim();

	const firstLetter = prenom.charAt(0);
	const firstLetterCap = firstLetter.toUpperCase();
	const remainingLetters = prenom.slice(1);
	const capitalizedPrenom = firstLetterCap + remainingLetters;

	cvPrenom.textContent = capitalizedPrenom;
	cvNom.textContent = nom;
	cvProfession.textContent = profession;
	cvEmail.textContent = email;
	cvTel.textContent = tel;

	if (profil) {
		cvProfil.textContent = profil;
		cvProfil.classList.remove('cv-placeholder');
	} else {
		cvProfil.textContent = 'Décrivez-vous en quelques lignes...';
		cvProfil.classList.add('cv-placeholder');
	}
}

[inputPrenom, inputNom, inputProfession, inputEmail, inputTel, inputProfil].forEach(el => {
	el.addEventListener('input', updatePreview);
});

inputTel.addEventListener('input', () => {
	inputTel.value = inputTel.value.replace(/\D/g, '');
});

function addLoisirTag(text) {
	const trimmed = text.trim();
	if (!trimmed) return;

	const placeholder = cvLoisirContainer.querySelector('.cv-placeholder');
	if (placeholder) placeholder.remove();

	const span = document.createElement('span');
	span.classList.add('loisir-tag');
	span.textContent = trimmed;

	span.addEventListener('click', () => {
		span.remove();
		if (!cvLoisirContainer.querySelector('.loisir-tag')) {
			const ph = document.createElement('span');
			ph.classList.add('cv-placeholder');
			ph.textContent = 'Vos loisirs apparaîtront ici...';
			cvLoisirContainer.appendChild(ph);
		}
	});

	cvLoisirContainer.appendChild(span);
}

loisirInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		addLoisirTag(loisirInput.value);
		loisirInput.value = '';
	}
});

function addSkillTag(text) {
	const trimmed = text.trim();
	if (!trimmed) return;

	const placeholder = cvSkillsContainer.querySelector('.cv-placeholder');
	if (placeholder) placeholder.remove();

	const span = document.createElement('span');
	span.classList.add('skill-tag');
	span.textContent = trimmed;

	span.addEventListener('click', () => {
		span.remove();
		if (!cvSkillsContainer.querySelector('.skill-tag')) {
			const ph = document.createElement('span');
			ph.classList.add('cv-placeholder');
			ph.textContent = 'Vos compétences apparaîtront ici...';
			cvSkillsContainer.appendChild(ph);
		}
	});

	cvSkillsContainer.appendChild(span);
}

skillInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		addSkillTag(skillInput.value);
		skillInput.value = '';
	}
});

function validateExperienceFields() {
	const exp = experienceInput.value.trim();
	const dateDebut = dateDebutInput.value.trim();
	const dateFin = dateFinInput.value.trim();
	const details = detailsInput.value.trim();

	if (!exp) {
		alert('Le poste/entreprise est obligatoire !');
		experienceInput.focus();
		return false;
	}
	if (!dateDebut) {
		alert('La date de début est obligatoire !');
		dateDebutInput.focus();
		return false;
	}
	if (!dateFin) {
		alert('La date de fin est obligatoire !');
		dateFinInput.focus();
		return false;
	}
	if (!details) {
		alert('Les détails sont obligatoires !');
		detailsInput.focus();
		return false;
	}
	return true;
}

function validateDiplomeFields() {
	const diplome = diplomeInput.value.trim();
	const dateObtention = dateObtentionInput.value.trim();
	const ecole = ecoleInput.value.trim();

	if (!diplome) {
		alert('Le diplome est obligatoire !');
		diplomeInput.focus();
		return false;
	}
	if (!dateObtention) {
		alert("La date d'obtention est obligatoire !");
		dateObtentionInput.focus();
		return false;
	}
	if (!ecole) {
		alert("Le nom de l'école obligatoire !");
		ecoleInput.focus();
		return false;
	}
	return true;
}

function addExperienceItem() {
	if (!validateExperienceFields()) return;

	const exp = experienceInput.value.trim();
	const dateDebut = new Date(dateDebutInput.value).toLocaleDateString('fr-FR');
	const dateFin = new Date(dateFinInput.value).toLocaleDateString('fr-FR');
	const details = detailsInput.value.trim();

	const placeholder = cvExperiencesContainer.querySelector('.cv-placeholder');
	if (placeholder) placeholder.remove();

	const div = document.createElement('div');
	div.classList.add('experience-item');
	div.innerHTML = `
		<div class="experience-title">${exp}</div>
		<div class="experience-date">${dateDebut} - ${dateFin}</div>
		<div class="experience-details">${details}</div>
	`;

	div.addEventListener('click', () => {
		div.remove();
		if (!cvExperiencesContainer.querySelector('.experience-item')) {
			const ph = document.createElement('span');
			ph.classList.add('cv-placeholder');
			ph.textContent = 'Vos expériences apparaîtront ici...';
			cvExperiencesContainer.appendChild(ph);
		}
	});

	cvExperiencesContainer.appendChild(div);

	experienceInput.value = '';
	detailsInput.value = '';
	dateDebutInput.value = dateFinInput.value;
	experienceInput.focus();
}

detailsInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		addExperienceItem();
	}
});

experienceInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		dateDebutInput.focus();
	}
});

dateDebutInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		dateFinInput.focus();
	}
});

dateFinInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		detailsInput.focus();
	}
});

function addDiplomeItem() {
	if (!validateDiplomeFields()) return;

	const diplome = diplomeInput.value.trim();
	const dateObtention = dateObtentionInput.value.trim();
	const ecole = ecoleInput.value.trim();

	const placeholder = cvDiplomesContainer.querySelector('.cv-placeholder');
	if (placeholder) placeholder.remove();

	const div = document.createElement('div');
	div.classList.add('diplome-item');
	div.innerHTML = `
		<div class="diplome-title">${diplome}</div>
		<div class="diplome-date">${dateObtention}</div>
		<div class="diplome-details">${ecole}</div>
	`;

	div.addEventListener('click', () => {
		div.remove();
		if (!cvDiplomesContainer.querySelector('.diplome-item')) {
			const ph = document.createElement('span');
			ph.classList.add('cv-placeholder');
			ph.textContent = 'Vos diplômes apparaîtront ici...';
			cvDiplomesContainer.appendChild(ph);
		}
	});

	cvDiplomesContainer.appendChild(div);

	diplomeInput.value = '';
	dateObtentionInput.value = '';
	ecoleInput.value = '';
	diplomeInput.focus();
}

diplomeInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		dateObtentionInput.focus();
	}
});

dateObtentionInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		ecoleInput.focus();
	}
});

ecoleInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		addDiplomeItem();
	}
});

document.addEventListener('DOMContentLoaded', function() {
  
  if (downloadBtn && form && input && preview) {
    downloadBtn.addEventListener('click', function() {
      input.value = preview.outerHTML;
      form.submit();
    });
  }
});

updatePreview();

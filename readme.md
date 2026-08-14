# 🏥 Meetora — Plateforme de Gestion de Cabinet Médical

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sanctum](https://img.shields.io/badge/Laravel_Sanctum-Auth-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-v1-0055E5?style=for-the-badge&logo=rest&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version_Control-F05032?style=for-the-badge&logo=git&logoColor=white)

Meetora est une plateforme web HealthTech moderne destinée à digitaliser la gestion d'un cabinet médical ou d'une clinique. Elle permet aux patients de rechercher un médecin, réserver des rendez-vous et consulter leur historique médical, tandis que les médecins et administrateurs disposent d'espaces sécurisés pour gérer les patients, rendez-vous, consultations et dossiers médicaux.

---

## 📑 Table des matières

- [À propos du projet](#-à-propos-du-projet)
- [Objectifs](#-objectifs)
- [Compétences mobilisées](#-compétences-mobilisées)
- [Fonctionnalités](#-fonctionnalités)
- [Acteurs du système](#-acteurs-du-système)
- [Architecture](#%EF%B8%8F-architecture)
- [Stack technique](#-stack-technique)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Variables d'environnement](#-variables-denvironnement)
- [Base de données](#-base-de-données)
- [Authentification](#-authentification)
- [API REST](#-api-rest)
- [Frontend React](#-frontend-react)
- [Sécurité](#-sécurité)
- [Tests](#-tests)
- [Documentation API](#-documentation-api)
- [UML](#-uml)
- [Méthodologie Agile](#-méthodologie-agile)
- [Git Workflow](#-git-workflow)
- [Docker](#-docker)
- [Déploiement](#%EF%B8%8F-déploiement)
- [Responsive Design](#-responsive-design)
- [Livrables](#-livrables)
- [Évaluation](#-évaluation)
- [Scénario de démonstration](#-scénario-de-démonstration)
- [Roadmap](#-roadmap)
- [Limitations](#-limitations)
- [Données médicales et responsabilité](#%EF%B8%8F-données-médicales-et-responsabilité)
- [Équipe](#-équipe)
- [Licence](#-licence)

---

## 📋 À propos du projet

### Le Problème
La gestion traditionnelle des cabinets médicaux repose souvent sur des processus manuels (appels téléphoniques, registres papier), entraînant :
- Des temps d'attente prolongés et des collisions de créneaux.
- Une perte de temps pour le personnel soignant et administratif.
- Une fragmentation des dossiers médicaux des patients.
- Un manque de visibilité globale sur les activités du cabinet.

### La Solution
Meetora résout ces défis en fournissant une solution web centralisée et intuitive permettant :
- **Pour les patients** : une prise de rendez-vous en ligne 24/7, une recherche simplifiée de spécialistes et un accès centralisé à leur dossier médical.
- **Pour les médecins** : une gestion fluide de l'agenda, un suivi structuré des consultations et l'émission rapide d'ordonnances.
- **Pour l'administration** : un suivi des utilisateurs, des spécialités médicales et des statistiques du cabinet.

*Note : Meetora s'inspire des standards ergonomiques des plateformes HealthTech modernes sans chercher à être une copie conforme d'une solution propriétaire existante.*

---

## 🎯 Objectifs

- Digitaliser l'ensemble des processus opérationnels du cabinet médical.
- Démocratiser et simplifier la prise de rendez-vous en ligne.
- Centraliser de manière sécurisée les dossiers et l'historique des patients.
- Permettre aux praticiens de planifier et personnaliser leurs créneaux de disponibilité.
- Conserver la traçabilité des consultations et la génération des ordonnances.
- Fournir des tableaux de bord adaptés à chaque profil utilisateur (Patient, Doctor, Admin).
- Exposer les données et règles métier via une API REST robuste et sécurisée.
- Garantir une découplage clair entre l'application Single Page Application (SPA) React et l'API Laravel backend.

---

## 🧠 Compétences mobilisées

- **Analyse des besoins & Modélisation** : Rédaction des cahiers des charges, spécifications fonctionnelles et diagrammes UML.
- **Conception de Bases de Données** : Modélisation relationnelle (ERD), normalisation SQL, migrations et seeder Eloquent.
- **Développement Backend API** : Architecture RESTful, validation par Form Requests, transformation des réponses via API Resources, contrôle d'accès avec Policies.
- **Développement Frontend SPA** : Composants modulaires React, gestion de routes avec React Router, requêtes asynchrones via Axios.
- **Sécurité Web** : Authentification par jetons API Sanctum, hashing sécurisé des mots de passe, contrôle d'accès basé sur les rôles (RBAC), prévention CORS et XSS.
- **Qualité & Tests** : Tests unitaires et d'intégration automatisés avec PHPUnit/Pest.
- **DevOps & Versionnement** : Gestion du code source avec Git (Feature Branch Workflow) et conteneurisation optionnelle via Docker.

---

## ✨ Fonctionnalités

### 🔑 Authentification & Gestion des Accès
- Inscription de nouveaux comptes patients.
- Connexion sécurisée avec génération de jeton API Sanctum.
- Déconnexion et révocation du jeton d'accès.
- Récupération de l'utilisateur actuellement authentifié via l'endpoint `/api/user`.
- Contrôle d'accès basé sur les rôles (`patient`, `doctor`, `admin`).

### 🧑‍⚕️ Gestion des Médecins & Spécialités
- Recherche multi-critères des médecins (par nom, spécialité, ville).
- Profils détaillés des praticiens avec informations de contact, spécialité et tarifs.
- Gestion des spécialités médicales par l'administrateur (ajout, modification, suppression).
- Définition et gestion des plages de disponibilités récurrentes et ponctuelles par le médecin.

### 📅 Rendez-vous
- Consultation des créneaux libres en temps réel.
- Réservation en ligne d'un créneau par le patient.
- Modification du statut d'un rendez-vous par le médecin ou le patient :
  - `Pending` (En attente)
  - `Confirmed` (Confirmé)
  - `Cancelled` (Annulé)
  - `Completed` (Terminé)
- Historique des rendez-vous passés et à venir.

### 📝 Consultations & Ordonnances
- Enregistrement des détails de consultation par le médecin (diagnostic, notes cliniques, examens requis).
- Association directe de la consultation avec le rendez-vous correspondant.
- Création d'ordonnances associées avec détails des traitements (médicaments, posologie, durée, instructions).
- Consultation sécurisée des ordonnances et comptes-rendus par le patient.

### 📂 Dossier Médical
- Centralisation des données de santé du patient.
- Consultation sécurisée de l'historique complet (consultations passées, ordonnances associées).
- Restriction stricte des accès : seul le patient concerné, son médecin traitant et l'administrateur peuvent y accéder.

### 📊 Dashboards & Administration
- **Dashboard Patient** : Synthèse des rendez-vous à venir, raccourcis vers la prise de RDV, accès rapide aux ordonnances récentes.
- **Dashboard Médecin** : Vue d'ensemble de l'agenda de la journée/semaine, statistiques de consultations, liste des patients récents.
- **Dashboard Admin** : Statistiques globales du cabinet, gestion centralisée des comptes utilisateurs, gestion de l'annuaire des médecins et spécialités.

---

## 👥 Acteurs du système

| Acteur | Description |
| :--- | :--- |
| **Guest** | Visiteur non authentifié. Peut rechercher des médecins, consulter l'annuaire des spécialités et accéder aux pages publiques. |
| **Patient** | Utilisateur authentifié. Gère son profil, réserve et annule ses rendez-vous, consulte ses ordonnances et son dossier médical. |
| **Doctor** | Praticien authentifié. Gère son emploi du temps et ses disponibilités, confirme/annule des rendez-vous, rédige les notes de consultation et émet des ordonnances. |
| **Administrator** | Super-utilisateur. Supervise la plateforme, gère les rôles, valide les comptes médecins, gère les spécialités et accède aux métriques globales. |

---

## 🏗️ Architecture

┌─────────────────────────────────────────────────────────────┐│                       React 18 SPA                          ││                   (Frontend Client)                         │└──────────────────────────────┬──────────────────────────────┘││ HTTP / JSON (REST API)│ Authorization: Bearer <Sanctum_Token>▼┌─────────────────────────────────────────────────────────────┐│                      Laravel 12 API                         ││                    (Backend Engine)                         ││                                                             ││  [ Routes API ] ──► [ Middlewares / Auth Sanctum ]          ││                               │                             ││                               ▼                             ││  [ Controllers ] ──► [ Form Requests Validation ]           ││        │                                                    ││        ├───────────► [ Services / Business Logic ]          ││        │                                                    ││        ▼                                                    ││  [ Eloquent Models / Policies ] ──► [ API Resources ]       │└──────────────────────────────┬──────────────────────────────┘││ Eloquent ORM▼┌─────────────────────────────────────────────────────────────┐│                        MySQL DB                             ││                  (Relational Database)                      │└─────────────────────────────────────────────────────────────┘
---

## 🛠️ Stack technique

| Composant | Technologie | Description |
| :--- | :--- | :--- |
| **Backend Framework** | Laravel 12.x | Framework PHP robuste pour la création d'API RESTful. |
| **Langage Backend** | PHP 8.2+ | Langage de programmation côté serveur. |
| **Authentification API**| Laravel Sanctum | Gestion des jetons d'authentification légers pour SPA. |
| **Frontend Framework** | React 18.x | Bibliothèque UI basée sur des composants réutilisables. |
| **Routage Frontend** | React Router v6 | Gestion des routes de l'application client SPA. |
| **Client HTTP** | Axios | Client HTTP basé sur les promesses pour requêter l'API REST. |
| **Base de données** | MySQL 8.0+ | Système de gestion de base de données relationnelle. |
| **Conteneurisation** | Docker / Docker Compose | Environnement d'exécution isolé (Si configuré). |
| **Gestionnaire de versions**| Git | Suivi des modifications et travail collaboratif. |

---

## 📂 Structure du projet

Meetora/├── backend/                  # Application Laravel 12 (API Backend)│   ├── app/│   │   ├── Http/│   │   │   ├── Controllers/  # Contrôleurs API│   │   │   ├── Middleware/   # Middlewares d'authentification/rôles│   │   │   ├── Requests/     # Validation des requêtes HTTP│   │   │   └── Resources/    # Transformation JSON des modèles│   │   ├── Models/           # Modèles Eloquent (User, Appointment, etc.)│   │   └── Policies/         # Règles d'autorisation/sécurité│   ├── config/               # Configuration de l'application Laravel│   ├── database/│   │   ├── factories/        # Générateurs de données de test│   │   ├── migrations/       # Structure de la base de données│   │   └── seeders/          # Données initiales et jeu de démonstration│   ├── routes/│   │   └── api.php           # Définition complète des routes REST API│   ├── tests/                # Tests automatisés PHPUnit / Pest│   ├── .env.example          # Modèle de variables d'environnement backend│   └── composer.json         # Dépendances PHP backend│├── frontend/                 # Application React 18 (Frontend SPA)│   ├── src/│   │   ├── components/       # Composants UI réutilisables (Navbar, Cards, Modals)│   │   ├── context/          # Contextes React (AuthContext, ThemeContext)│   │   ├── pages/            # Pages selon les rôles (Public, Patient, Doctor, Admin)│   │   ├── services/         # Modules d'appel API Axios│   │   ├── App.jsx           # Composant racine et configuration des routes│   │   └── main.jsx          # Point d'entrée React DOM│   ├── public/               # Fichiers statiques publics│   ├── package.json          # Dépendances Node.js / Scripts npm│   └── vite.config.js        # Configuration du bundler Vite│├── docs/                     # Documentation du projet (UML, ERD, API)│   ├── uml/                  # Diagrammes Use Case, Classe, Séquence│   └── database/             # Diagrammes ERD└── README.md                 # Documentation globale du projet
---

## 🚀 Installation

### Prérequis
S'assurer que les outils suivants sont installés sur l'environnement de développement :
- **PHP** >= 8.2
- **Composer** >= 2.x
- **Node.js** >= 18.x & **npm** >= 9.x
- **MySQL** >= 8.0
- **Git**

*(Optionnel) Docker Desktop si vous utilisez l'environnement conteneurisé.*

### Cloner le projet
```bash
git clone <GITHUB_REPOSITORY>
cd Meetora
(Si le dépôt n'est pas encore publié, remplacer <GITHUB_REPOSITORY> par le chemin local).Setup Backend (Laravel)Bash# 1. Se déplacer dans le dossier backend
cd backend

# 2. Installer les dépendances PHP
composer install

# 3. Copier le fichier de configuration d'environnement
cp .env.example .env

# 4. Générer la clé d'application Laravel
php artisan key:generate

# 5. Configurer la base de données dans le fichier .env (Voir section dédiée)

# 6. Exécuter les migrations et charger les données de test
php artisan migrate --seed

# 7. Démarrer le serveur de développement Laravel
php artisan serve
Le backend sera accessible à l'adresse : http://127.0.0.1:8000Setup Frontend (React)Bash# 1. Dans un autre terminal, se déplacer dans le dossier frontend
cd frontend

# 2. Installer les dépendances JavaScript
npm install

# 3. Démarrer le serveur de développement React (Vite)
npm run dev
Le frontend sera accessible à l'adresse : http://localhost:5173🔐 Variables d'environnementBackend (backend/.env)VariableDescriptionExemple / Valeur par défautAPP_NAMENom du backendMeetoraBackendAPP_ENVEnvironnement d'exécutionlocalAPP_URLURL de base de l'APIhttp://127.0.0.1:8000DB_CONNECTIONSGBD utilisémysqlDB_HOSTHôte MySQL127.0.0.1DB_PORTPort MySQL3306DB_DATABASENom de la base de donnéesmeetora_dbDB_USERNAMENom d'utilisateur MySQLrootDB_PASSWORDMot de passe MySQLsecretFRONTEND_URLURL de l'application React (CORS)http://localhost:5173Frontend (frontend/.env)VariableDescriptionExemple / Valeur par défautVITE_API_URLURL de base de l'API Laravel RESThttp://127.0.0.1:8000/api🗄️ Base de donnéesLa base de données MySQL est structurée pour assurer la cohérence relationnelle et la rapidité des requêtes.Entités principalesusers : Contient l'ensemble des utilisateurs (Patients, Médecins, Administrateurs) avec gestion du rôle et identifiants.doctors : Informations spécifiques au praticien (spécialité_id, tarif, biographie, numéro de licence).patients : Informations médicales complémentaires de l'usager (date de naissance, groupe sanguin, numéro de sécurité sociale).specialties : Liste des spécialités médicales dispensées dans le cabinet.availabilities : Plages horaires de disponibilité configurées par les médecins.appointments : Table centrale gérant la réservation (patient_id, doctor_id, date, créneau, statut).consultations : Actes médicaux réalisés associés à un rendez-vous (diagnostic, notes).prescriptions : Ordonnances délivrées lors d'une consultation.prescription_items : Détail des médicaments prescrits (nom, posologie, durée).Relations clésUn User possède une relation un-à-un avec un Doctor ou un Patient.Un Doctor appartient à une Specialty et possède plusieurs Availabilities.Un Appointment relie un Patient et un Doctor.Une Consultation appartient à un Appointment.Une Prescription est liée à une Consultation et contient plusieurs PrescriptionItems.ERD (Entity Relationship Diagram)L'emplacement préconisé pour visualiser le schéma de base de données est : docs/database/erd.png (À compléter).🔑 AuthentificationMeetora utilise Laravel Sanctum pour sécuriser les échanges entre la SPA React et l'API Laravel via des jetons porteurs (Bearer Tokens).┌──────────────┐                  ┌─────────────────────────┐                  ┌─────────────────────┐
│  React SPA   │                  │   POST /api/auth/login  │                  │  Laravel Backend    │
└──────┬───────┘                  └────────────┬────────────┘                  └──────────┬──────────┘
       │                                       │                                          │
       │ ─── 1. Identifiants (Email/Pass) ────►│                                          │
       │                                       │ ─── 2. Vérification DB ─────────────────►│
       │                                       │ ─── 3. Génération Token Sanctum ────────►│
       │                                       │                                          │
       │ ◄── 4. Token & User Data (JSON) ──────┼──────────────────────────────────────────┘
       │
       │ ─── 5. Requete sécurisée (Header: Bearer <Token>) ──────────────────────────────►
Les jetons sont générés lors de la connexion via l'endpoint /api/auth/login.Chaque requête vers une route protégée doit inclure le header HTTP : Authorization: Bearer <token>.Les contrôles de permissions applicatifs s'appuient sur les Policies et Middlewares d'autorisation Laravel.🔌 API RESTEndpoints principauxMéthodeEndpointDescriptionAccèsPOST/api/auth/registerInscription d'un nouveau patientPublicPOST/api/auth/loginConnexion et obtention du jeton SanctumPublicPOST/api/auth/logoutDéconnexion et annulation du jetonAuthentifiéGET/api/userInformations sur l'utilisateur connectéAuthentifiéGET/api/specialtiesListe des spécialités médicalesPublicGET/api/doctorsRecherche et liste des médecinsPublicGET/api/doctors/{id}Détails d'un médecin et ses disponibilitésPublicGET/api/appointmentsListe des RDV de l'utilisateur (Patient/Doctor)AuthentifiéPOST/api/appointmentsCréation / Réservation d'un nouveau RDVPatientPATCH/api/appointments/{id}/statusMise à jour du statut d'un RDVPatient/DoctorGET/api/consultationsListe des consultationsDoctor / AdminPOST/api/consultationsCréer un compte-rendu de consultationDoctorGET/api/prescriptions/{id}Consulter les détails d'une ordonnancePatient / DoctorGET/api/admin/statsStatistiques globales du systèmeAdminExemple de requête et réponsePOST /api/auth/loginJSON// En-tête: Content-Type: application/json
{
  "email": "patient@example.com",
  "password": "password123"
}
Réponse HTTP 200 OK :JSON{
  "status": "success",
  "message": "Connexion réussie",
  "data": {
    "user": {
      "id": 4,
      "name": "Jean Dupont",
      "email": "patient@example.com",
      "role": "patient"
    },
    "token": "1|Ql3mR...token_hash_sanctum"
  }
}
Codes HTTP de réponseCodeSignification200 OKLa requête a réussi.201 CreatedLa ressource a été créée avec succès.400 Bad RequestLa requête est mal formée.401 UnauthenticatedAuthentification requise ou jeton invalide.403 ForbiddenDroits insuffisants pour accéder à la ressource.404 Not FoundLa ressource demandée n'existe pas.422 Unprocessable EntityÉchec de la validation des données d'entrée.500 Server ErrorErreur interne du serveur.💻 Frontend ReactL'application frontend est conçue comme une Single Page Application (SPA) avec React 18 et Vite.frontend/src/
├── components/          # Composants UI globaux (Header, Footer, Sidebar, Loader)
├── context/             # Contexte React global pour l'état d'authentification
├── pages/
│   ├── public/          # LandingPage, Login, Register, DoctorsList
│   ├── patient/         # PatientDashboard, BookAppointment, MyPrescriptions
│   ├── doctor/          # DoctorDashboard, ManageSchedule, Consultations
│   └── admin/           # AdminDashboard, ManageUsers, ManageSpecialties
├── services/            # Client Axios configuré avec interceptors pour le Token
├── App.jsx              # Routing principal avec des Protected Routes par rôles
└── main.jsx             # Point d'entrée
🔒 SécuritéLa sécurité des données de santé et la protection des accès reposent sur plusieurs couches :Laravel Sanctum : Protection contre le vol d'identité d'API via authentification à jetons porteurs.Hashing fort : Tous les mots de passe utilisateurs sont hachés au moyen de l'algorithme Bcrypt.Validation stricte : Toutes les données entrantes passent par des classes FormRequest côté backend afin de contrer les injections SQL et failles XSS.Contrôle d'accès granulaire (RBAC) : Middlewares et Policies s'assurent qu'un patient ne peut consulter que ses propres données et que seul un médecin peut valider une consultation.Protection CORS : Restricton des requêtes Cross-Origin exclusivement à l'origine du client frontend configurée.⚠️ Note importante : L'application applique le principe du moindre privilège pour la protection des données. Toute mise en production réelle nécessiterait un audit complet de conformité selon la législation locale en matière de santé.🧪 TestsLes tests du backend s'assurent de la fiabilité des endpoints API critiques et des processus métier.Lancer les tests Backend (Laravel)Bashcd backend
php artisan test
Couverture des tests backend : Authentification, création et annulation des rendez-vous, validation des droits d'accès aux dossiers médicaux.Tests FrontendBashcd frontend
npm test
(Si les tests frontend sont configurés).📚 Documentation APILa collection complète Postman pour tester les endpoints de la plateforme se situe sous :docs/api/Meetora.postman_collection.json (À compléter)Documentation Swagger/OpenAPI : À compléter📐 UMLLes diagrammes de conception sont archivés dans le répertoire docs/uml/ :Use Case Diagram : docs/uml/use_cases.png (À compléter)Class Diagram : docs/uml/class_diagram.png (À compléter)Sequence Diagram : docs/uml/sequence_booking.png (À compléter)🔄 Méthodologie AgileLe développement de Meetora a été conduit selon la méthode Scrum :Product Backlog
      │
      ▼
Sprint Planning (Cycle 2 semaines)
      │
      ▼
Développement & Intégration
      │
      ▼
Tests & Revues de Sprint
      │
      ▼
Rétrospective & Livrables
Gestion des tickets et du board : À compléter🌿 Git WorkflowLe projet utilise une stratégie de branches basée sur Git Flow :main : Code stable de production.develop : Branche principale d'intégration des fonctionnalités.feature/* : Branches de fonctionnalités spécifiques (ex: feature/authentication, feature/appointments).bugfix/* : Corrections de bugs.Exemples de messages de commits standardisésfeat: add appointment booking endpointfix: resolve availability overlap validationdocs: update API documentation in READMEtest: add unit tests for doctor policy🐳 Docker(Si la configuration Docker est présente dans le projet)Pour démarrer rapidement l'ensemble des services backend, frontend et base de données avec Docker Compose :Bash# Lancer les conteneurs en arrière-plan
docker compose up -d

# Vérifier l'état des services
docker compose ps
Services conteneurisés :backend : Laravel API (PHP 8.2-FPM / Nginx)frontend : Application React (Node / Vite)db : Base de données MySQL 8.0☁️ DéploiementBackend : Hébergement possible sur VPS (Ubuntu/Nginx) ou services PaaS (Laravel Forge, Heroku, Render).Frontend : Hébergement statique optimisé (Vercel, Netlify).Base de données : Instance MySQL managée.🚧 Deployment — À compléter📱 Responsive DesignL'interface utilisateur de Meetora est pensée pour s'adapter à l'ensemble des terminaux :Desktop : Ergonomie complète avec tableaux de bord multi-colonnes pour les praticiens et administrateurs.Tablette & Mobile : Expérience fluide pour la recherche et la prise de rendez-vous rapide côté patient.📦 LivrablesLivrableStatutLien / EmplacementCahier des chargesDisponibleÀ compléterDépôt GitHubDisponibleÀ compléterBoard Jira/TrelloDisponibleÀ compléterMaquettes FigmaDisponibleÀ compléterPrésentation CanvaDisponibleÀ compléterDiagrammes UMLEn coursdocs/uml/Schéma ERDEn coursdocs/database/Documentation APIDisponibleCe document README.md🎓 ÉvaluationStructure indicative de la présentation académique du projet :PartieDuréePrésentation du contexte & objectifs10 minDémonstration en direct10 minRevue de code & architecture10 minQuestions / Réponses techniques10 minTotal40 min

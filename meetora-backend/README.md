# 🏥 Meetora Backend — Laravel 12 REST API

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sanctum](https://img.shields.io/badge/Laravel_Sanctum-Auth-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-v1-0055E5?style=for-the-badge&logo=rest&logoColor=white)
![PHPUnit](https://img.shields.io/badge/PHPUnit-Testing-3C9CD7?style=for-the-badge&logo=php&logoColor=white)

Backend REST API de Meetora, une plateforme HealthTech de gestion de cabinet médical. Développé avec Laravel 12, PHP et MySQL, il fournit les services d'authentification, de gestion des patients, médecins, rendez-vous, consultations, ordonnances, dossiers médicaux et dashboards.

---

## 📚 Table des matières

- [Présentation](#-présentation)
- [Objectifs](#-objectifs)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#%EF%B8%8F-architecture)
- [Stack technique](#-stack-technique)
- [Structure du backend](#-structure-du-backend)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#%EF%B8%8F-configuration)
- [Base de données](#%EF%B8%8F-base-de-données)
- [Authentification](#-authentification)
- [Rôles et permissions](#-rôles-et-permissions)
- [API REST](#-api-rest)
- [Format des réponses API](#-format-des-réponses-api)
- [Validation](#-validation)
- [API Resources](#-api-resources)
- [Services](#-services)
- [Authorization](#-authorization)
- [Middleware](#-middleware)
- [Sécurité](#-sécurité)
- [Tests](#-tests)
- [Factories & Seeders](#-factories--seeders)
- [Docker](#-docker)
- [Documentation API](#-documentation-api)
- [Documentation technique](#-documentation-technique)
- [Performance](#-performance)
- [Déploiement](#-déploiement)
- [Commandes utiles](#-commandes-utiles)
- [Git Workflow](#-git-workflow)
- [Roadmap](#%EF%B8%8F-roadmap)
- [Limitations](#-limitations)
- [Données médicales](#%EF%B8%8F-données-médicales)
- [Auteur](#-auteur)
- [Licence](#-licence)

---

## 📋 Présentation

Meetora Backend est le cœur applicatif API First d'une plateforme HealthTech conçue pour digitaliser les opérations d'un cabinet médical ou d'une clinique.

Conçu selon les standards RESTful avec **Laravel 12**, ce backend est entièrement découplé du client utilisateur. Il expose des points d'accès sécurisés (Endpoints API JSON) consommés par un frontend **React 18** Single Page Application (SPA).

---

## 🎯 Objectifs

- **Exposer une API RESTful** : Offrir des endpoints normalisés, prévisibles et sécurisés pour toutes les opérations métier.
- **Centraliser les données de santé** : Garantir l'intégrité, la cohérence et la traçabilité des dossiers médicaux.
- **Gestion fine de l'authentification** : Secourir les échanges via jetons porteurs (Tokens) révocables.
- **Contrôle d'accès basé sur les rôles (RBAC)** : Segmenter les privilèges entre Patients, Médecins et Administrateurs.
- **Planification des soins** : Prévenir les chevauchements de créneaux et optimiser la prise de rendez-vous.
- **Suivi clinique** : Enregistrer les comptes-rendus de consultation et générer des ordonnances structurées.
- **Protection des données médicales** : Appliquer le principe du moindre privilège via des Policies et Form Requests.
- **Fournir des métriques aux dashboards** : Agglomérer les données statistiques destinées aux tableaux de bord analytiques.

---

## ✨ Fonctionnalités

### 🔑 Authentication

- Inscription des usagers (rôle Patient par défaut).
- Connexion avec génération de jeton API Sanctum (`Bearer Token`).
- Déconnexion avec révocation et destruction du jeton actif.
- Récupération du profil de l'utilisateur connecté via `/api/user`.

### 👥 Users & Roles

- Gestion unifiée des utilisateurs (Patients, Doctors, Admins).
- Isolation des profils utilisateurs selon leur rôle.

### 🧑‍⚕️ Doctors & Specialties

- Consultation de l'annuaire des praticiens et recherche multi-critères.
- Gestion des profils de spécialités médicales par l'administrateur.
- Définition et mise à jour des plages horaires de disponibilité par médecin.

### 👤 Patients

- Gestion des fiches d'informations patients (groupe sanguin, contact d'urgence, historique).
- Recherche et consultation des profils patients par les médecins autorisés.

### 📅 Appointments

- Création et prise de rendez-vous en ligne sur créneaux disponibles.
- Détection et prévention automatique des conflits d'horaires.
- Gestion du cycle de vie du RDV : `Pending`, `Confirmed`, `Cancelled`, `Completed`.

### 📝 Consultations & Prescriptions

- Enregistrement des notes de consultation et diagnostics par le médecin.
- Émission d'ordonnances avec détails multi-lignes de prescriptions (médicaments, posologie, durée, instructions).
- Accès sécurisé à l'historique d'ordonnances pour le patient.

### 📂 Medical Records

- Consolidation du dossier médical individuel (consultations passées, ordonnances associées).
- Restriction stricte de la consultation du dossier au patient concerné, au médecin traitant et à l'administrateur.

### 📊 Dashboards & Analytics

- Agrégation des statistiques d'activité (RDV du jour, totaux des patients, volume de consultations).

---

## 🏗️ Architecture

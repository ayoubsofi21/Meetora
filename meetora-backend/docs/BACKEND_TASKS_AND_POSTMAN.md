# Meetora Backend Tasks and Postman Runbook

This document describes the backend that is currently implemented and the order in which it can be demonstrated with Postman.

## 1. Backend scope

Meetora is a Laravel 12 REST API using Sanctum bearer tokens and three roles:

- `patient`: profile, appointments, prescriptions, medical record, history, dashboard
- `doctor`: availability, appointments, consultations, prescriptions, patient access, dashboard
- `admin`: specialties, doctors, patients, appointments, dashboard

Public functionality includes health checking, doctor discovery, specialty discovery, and doctor availability discovery.

The main business flow is:

1. An admin creates a specialty and a doctor.
2. The doctor creates an availability window.
3. A patient registers and books a future appointment in that window.
4. The doctor confirms and completes the appointment.
5. The doctor writes a consultation and prescription.
6. The patient reads the prescription, medical record, history, and dashboard.

## 2. Implemented route groups

| Group         | Main endpoints                                                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public        | `GET /api/health`, `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/specialties`, `GET /api/doctors`, `GET /api/doctors/{id}/availabilities` |
| Authenticated | `POST /api/auth/logout`, `GET /api/auth/me`, `GET /api/consultations/{id}`                                                                               |
| Admin         | specialty CRUD, doctor CRUD, patient CRUD, appointment read endpoints, dashboard                                                                         |
| Patient       | profile, appointment booking/read/cancel, prescriptions, medical record/history, dashboard                                                               |
| Doctor        | availability CRUD, patient read endpoints, appointment lifecycle, consultation, prescription, medical record, dashboard                                  |

The executable route list is the source of truth. Run:

```bash
php artisan route:list --path=api
```

## 3. Remaining tasks, ordered by priority

### P0: fix before a real demonstration or deployment

- Add `DoctorController::profile()` or remove `/api/doctors/{doctor}/profile`. The route currently references a method that is not present.
- Decide whether `/api/doctors/{doctor}` and `/api/doctors/{doctor}/availabilities` should hide inactive doctors. The list endpoint filters inactive doctors, but direct lookup does not consistently do so.
- Make appointment booking reject inactive availability rows. The public availability endpoint filters them, but the booking service must enforce the same rule server-side.
- Replace or remove the default `ExampleTest` that calls `/`. The API has `/api/health`, so the current suite reports one failure even though the API health test passes.
- Add a repeatable demo dataset with admin, doctor, patient, specialty, and availability accounts. The current `DatabaseSeeder` creates only `test@example.com`, which is not enough to run the full Postman flow.

### P1: security and API correctness

- Restrict `GET /api/doctor/patients` and `GET /api/doctor/patients/{patient}` to patients who have a valid relationship with that doctor. Medical-record access already applies a stricter relationship check.
- Remove the duplicate authenticated consultation route or keep one canonical route. The doctor-prefixed route and the general authenticated route expose the same read operation.
- Register and use policies consistently. Several policy classes exist but are empty or are not explicitly registered; authorization currently lives partly in middleware and partly in services/controllers.
- Add authorization tests for every admin, doctor, and patient endpoint, including object ownership and cross-role access.
- Decide whether admin-created patients should receive a token or an activation flow; currently the admin creates the account but the API does not return a login token.

### P2: completeness and maintainability

- Remove unused request classes or add the corresponding update endpoints. Examples include appointment, consultation, prescription, and medical-record create/update request classes without matching public routes.
- Standardize response envelopes and validation error shape across all controllers.
- Add pagination and documented filters to doctor, patient, appointment, consultation, and prescription lists.
- Add API documentation for request bodies, response examples, status codes, and authorization requirements.
- Add database constraints/indexes for appointment conflicts and the one-to-one user/profile relationships.
- Add feature tests for inactive availability booking, inactive doctor direct lookup, missing doctor profile, duplicate routes, and the full end-to-end workflow.
- Add deployment documentation covering `.env`, CORS, Sanctum, queue/mail choices, migrations, backups, and production cache commands.

## 4. Local setup

From `meetora-backend`:

```bash
composer install
cp .env.example .env
php artisan key:generate
# Configure DB_* in .env
php artisan migrate --seed
php artisan serve
```

Use `http://127.0.0.1:8000` as the Postman `baseUrl`. The collection already appends `/api`.

For a quick API check:

```bash
curl http://127.0.0.1:8000/api/health
php artisan test
```

## 5. Creating an admin for Postman

Registration intentionally creates patients only. Create a local admin with Tinker, using the same password later in Postman:

```bash
php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Meetora Admin',
    'email' => 'admin@meetora.test',
    'password' => 'Password123!',
    'role' => \App\Enums\UserRole::ADMIN,
]);
```

Then log in through the collection's `Admin - Login` request.

## 6. Postman execution order

Import `docs/postman/Meetora Backend.postman_collection.json`, set `baseUrl`, and run requests in this order:

1. `Health`
2. `Admin - Login`
3. `Admin - Create Specialty`
4. `Admin - Create Doctor`
5. `Doctor - Login`
6. `Doctor - Create Availability`
7. `Patient - Register`
8. `Patient - Get Profile`
9. `Patient - Create Appointment`
10. `Doctor - Confirm Appointment`
11. `Doctor - Create Consultation`
12. `Doctor - Create Prescription`
13. `Patient - Get Prescriptions`
14. `Patient - Get Medical Record`
15. `Patient - Update Medical Record`
16. `Patient - Get Medical History`
17. `Patient - Dashboard`
18. `Doctor - Complete Appointment`
19. `Admin - Dashboard`
20. `Security - Patient Cannot Access Admin`

The test scripts save returned tokens and resource IDs into collection variables. The appointment date is generated by the pre-request script as the next occurrence of the configured `availabilityDay`.

## 7. Expected acceptance checks

- Unauthenticated protected calls return `401`.
- A patient calling an admin or doctor-only endpoint returns `403`.
- Invalid or missing fields return `422`.
- A patient cannot access another patient's appointment, prescription, or medical record.
- A doctor cannot confirm another doctor's appointment.
- A pending appointment cannot create a consultation.
- An appointment cannot be booked in the past, outside availability, or in a conflicting slot.
- The successful lifecycle ends with a completed appointment and accessible consultation/prescription data.

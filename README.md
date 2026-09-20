# Shailla Date Invite — CarFixHub-style Render setup

This version intentionally uses the same simple deployment pattern:
**one Docker Web Service + one Render PostgreSQL database**.

## What you deploy

Render creates:
1. `shailla-date` — Docker Web Service
2. `shailla-date-db` — PostgreSQL

Angular is compiled inside Docker and served by Spring Boot, so you do NOT need a separate frontend Render service and you do NOT need to enter a backend URL in Angular.

## GitHub

Push this repository to GitHub with this structure:

- `backend/`
- `frontend/`
- `Dockerfile`
- `render.yaml`

Edit `render.yaml` and replace:
`YOUR-GITHUB-USERNAME/YOUR-REPOSITORY`
with your real GitHub repository.

## Render

Use **New → Blueprint** and select the GitHub repository.

Render reads `render.yaml` and creates the web service and PostgreSQL database.

Only enter two secrets manually when prompted:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

The PostgreSQL connection string is automatically supplied to the web service by `fromDatabase`.

## URLs

Invitation:
`https://YOUR-RENDER-SERVICE.onrender.com/`

Admin:
`https://YOUR-RENDER-SERVICE.onrender.com/admin`

Admin credentials are the values you entered as `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

## Health check

`/api/health`

Expected:
`{"status":"UP"}`

## Important

Do not put the admin password or database credentials in GitHub.

The free PostgreSQL plan and free web service availability depend on Render's current plan offerings. If Render requires a paid database plan, choose the database plan shown in your Render account.

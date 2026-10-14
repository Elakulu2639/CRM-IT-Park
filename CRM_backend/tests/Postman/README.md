# Postman Collections for CRM IT Park

This directory is structured so that you can **import the entire `Postman` folder into Postman in 1 click**, and everything will appear under the father collection **`CRM`**.

---

## Directory Structure

```text
tests/Postman/
├── CRM.postman_collection.json                <-- Auto-generated father collection (DO NOT EDIT MANUALLY)
├── CRM_Environment.postman_environment.json   <-- Common environment file (baseUrl, token)
├── bundle.php                                 <-- Auto-bundler for controller endpoints
│
├── Auth/                                      <-- AuthController folder
│   └── endpoints.json                         <-- Pure endpoints for Auth (no CRM wrapper needed!)
│
├── Users/                                     <-- UserController + RoleController folder
│   └── endpoints.json                         <-- User & Role Management endpoints (9 endpoints)
│
├── Leads/                                     <-- (Future) LeadController folder
│   └── endpoints.json
│
└── Tickets/                                   <-- (Future) TicketController folder
    └── endpoints.json
```

> [!IMPORTANT]
> **You never edit `CRM.postman_collection.json` manually.** It gets regenerated every time you run:
> ```bash
> docker exec crm_backend php tests/Postman/bundle.php
> ```
> Always add or edit endpoints inside each controller's `endpoints.json` (e.g. `Users/endpoints.json`, `Auth/endpoints.json`). Any manual edits made directly to `CRM.postman_collection.json` will be overwritten whenever the bundler runs.

---

## How to Import in Postman (1-Click Folder Import)

1. Open **Postman**.
2. Click **Import** (top left).
3. Choose **Folder** (or simply drag and drop the `tests/Postman/` folder into Postman).
4. Postman will automatically import:
   - **Collection:** `CRM` (with `Auth` and all controller folders inside it)
   - **Environment:** `CRM Local Environment`
5. In Postman's top-right corner, make sure **"CRM Local Environment"** is selected.

---

## How to Add a New Controller

You do **not** need to write any `"CRM"` wrapper in your controller files!

Whenever you create a new controller (e.g. `TicketController`):

1. Create a folder: `tests/Postman/Tickets/`
2. Add `endpoints.json` with just your ticket endpoints (e.g. `GET /tickets`, `POST /tickets`).
3. Run the bundler:
   ```bash
   docker exec crm_backend php tests/Postman/bundle.php
   ```
   *This automatically adds `Tickets` as a new folder under `CRM` in `CRM.postman_collection.json`!*

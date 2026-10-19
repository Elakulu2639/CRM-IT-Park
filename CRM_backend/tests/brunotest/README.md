> [!IMPORTANT]
> **Notice:** This README is maintained purely as architectural reference to understand collection conventions and environment setup. **There is NO NEED to update this file every time a new API endpoint or `.bru` test is added.** Bruno detects new `.bru` files automatically.

# CRM IT Park - Bruno API Collection

This directory is a complete **Bruno Collection** for the CRM IT Park backend API.

Unlike Postman, Bruno is **filesystem-native**:
- Any new `.bru` file you add or edit in this directory is **automatically detected** by the Bruno app.
- **No manual import/export or bundle scripts required.**
- All requests, environments, and test scripts are stored directly in Git.

---

## How to Open in Bruno

1. Open the **Bruno** desktop application.
2. Click **Open Collection** (or the home screen folder icon).
3. Select this folder:
   ```
   C:\Users\dev.user\Documents\CRM-IT-Park\CRM_backend\tests\brunotest
   ```
4. In the top-right environment dropdown, select **`Local`** (points to `http://localhost:8000/api`).
5. Run **Auth → Login** first:
   - Bruno automatically extracts the Bearer token and stores it in the `token` variable.
   - All other requests in `Users` and `PipelineStages` inherit this token automatically!

---

## Directory Structure

```text
tests/brunotest/
├── bruno.json                                      # Root collection config
├── environments/
│   └── Local.bru                                  # Local env (baseUrl, token, IDs)
├── Auth/
│   ├── Login.bru                                  # POST /auth/login (auto-saves token)
│   ├── Me.bru                                     # GET /auth/me
│   └── Logout.bru                                 # POST /auth/logout (clears token)
├── Users/
│   ├── List Users.bru                             # GET /users
│   ├── Create User.bru                            # POST /users
│   ├── Edit User.bru                              # PUT /users/:id
│   ├── Change User Status.bru                     # PATCH /users/:id/status
│   ├── Assign - Change Role.bru                   # PUT /users/:id/role
│   └── List Roles.bru                             # GET /roles
├── PipelineStages/
│   ├── List Pipeline Stages.bru                   # GET /pipeline-stages
│   ├── Add Pipeline Stage.bru                     # POST /pipeline-stages
│   ├── Edit Pipeline Stage.bru                    # PUT /pipeline-stages/:id
│   ├── Change Pipeline Stage Status.bru           # PATCH /pipeline-stages/:id/status
│   ├── Reorder Pipeline Stages (Bulk).bru         # POST /pipeline-stages/reorder
│   └── Delete Pipeline Stage.bru                  # DELETE /pipeline-stages/:id
└── EscalationPolicies/
    ├── List Escalation Policies.bru               # GET /escalation-policies
    ├── Create Escalation Policy.bru               # POST /escalation-policies
    ├── Get Escalation Policy.bru                  # GET /escalation-policies/:id
    ├── Update Escalation Policy.bru               # PUT /escalation-policies/:id
    ├── Update Reminder Threshold.bru              # PATCH /escalation-policies/:id/reminder-threshold
    └── Change Escalation Policy Status.bru        # PATCH /escalation-policies/:id/status
```

---

## Adding Future Endpoints

Whenever a new controller or endpoint is added to the backend:
1. Simply create a new `.bru` file inside the relevant folder (e.g. `tests/brunotest/Leads/Create Lead.bru`).
2. Save the file.
3. Bruno immediately displays the new endpoint in the sidebar — zero imports required!

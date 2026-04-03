# Banking Dashboard - Admin & User Portals

## Technology Stack

- **Framework:** React 19 + TypeScript
- **Routing:** React Router DOM v7
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **UI Components:** Radix UI, React Icons
- **Build Tool:** Vite

---

## Authentication & Access Control

- Bearer token authentication stored in localStorage
- Redux `authSlice` manages role state (`"admin"` | `"user"`)
- Route protection redirects unauthenticated users to `/index.html`
- Role-based redirection:
  - Admin → `/admin/dashboard/home`
  - User → `/user/dashboard/home`
- Logout clears all localStorage and redirects to `/landing.html`

---

## User Portal

**Route Base:** `/user/dashboard/*`

### Navigation

```
ACCOUNT
  • Home

FUND TRANSFER
  • Local Transfer
  • International Transfer
  • Deposit

USER
  • Profile

AUTHENTICATION
  • Logout
```

### Pages & Features

#### 1. Home (`/user/dashboard/home`)

- **Financial Overview** header with quick actions: "Add Deposit" and "Make Transfer"
- **Balance Component:**
  - Total balance and available balance
  - Animated bank card display (front/back flip)
  - Card holder name, account number, expiration date
  - Real-time balance fetched from API
- **Account Details:**
  - Account name, balance, account type
  - Masked account number (first 5 + last 2 digits)
  - Swift code and banking details
  - "Delete Card" and "Fund Card" buttons
- **Recent Transactions:**
  - Reference ID, Type, Amount (+/-), Description, Status, Date
  - Color-coded status badges: green (completed), yellow (pending), red (failed)

#### 2. Local Transfer (`/user/dashboard/transfer`)

- Transfer funds within the same country
- **Form Fields:**
  - Account Name & Number (beneficiary)
  - Bank Name & Address
  - Country, Currency
  - SWIFT Code, IBAN Number
  - Amount, Description
- Processing time: **24 hours**
- API: `POST /transactions/transfer`

#### 3. International Transfer (`/user/dashboard/international-transfer`)

- Transfer funds across countries
- Same form fields as local transfer with additional validation
- Processing time: **72 hours**
- **Account Suspension Modal:** Triggers on 403 status with "transfers are currently disabled" message, provides support contact (`support@wbonline.com`)

#### 4. Deposit (`/user/dashboard/deposit`)

- Fields: Amount, Deposit Method (Wire Transfer, Bank Deposit, Mobile Money)
- Opens modal with customer care contact info
- Contact: `support@yourbank.com` | `+1 (234) 567-8900`
- Manual process requiring support contact

#### 5. Profile (`/user/dashboard/profile`)

- **Left Panel:**
  - Avatar, name, account status badge (ACTIVE)
  - Account number
  - Progress bars: Profile Completion, Account Security, Verification
  - Actions: Change Password, Change PIN, Update Photo
- **Right Panel:**
  - Email, Phone, First/Last Name
  - Date of Birth, Country, Address, Gender

#### 6. Logout (`/user/dashboard/logout`)

- Confirmation modal → clears localStorage → redirects to landing page

---

## Admin Portal

**Route Base:** `/admin/dashboard/*`

### Navigation

```
ACCOUNT
  • Home

AUTHENTICATION
  • Logout
```

### Pages & Features

#### 1. Home / Dashboard (`/admin/dashboard/home`)

- **Search Bar:** Real-time search by user first/last name (case-insensitive)

- **Statistics Cards (3-column grid):**
  | Card | Description |
  |------|-------------|
  | Active Users | Count with green badge |
  | Deleted Users | Count with red badge |
  | Total Balance | Sum of all user balances |

- **User Management Table:**
  - Columns: First Name, Last Name, Country, Account Type, Phone, Actions
  - **Actions per user:**
    - **View** (eye icon) — Opens transaction history modal
    - **Edit** (edit icon) — Opens user details editor
    - **Delete** (trash icon) — Opens delete confirmation modal

- **View Transactions Modal:**
  - All transactions for selected user
  - ID, Type, Amount, Status, Description, Date
  - Color-coded status badges

- **Edit User Details Modal:**
  - Editable: First Name, Last Name, Country, Account Type, Phone, DOB, Balance, Gender, Suspicious Account flag (Yes/No)
  - **Credit/Debit Sub-modal:**
    - Amount, Type (credit/debit), Description, Status (Completed/Pending)
    - Updates user balance immediately

- **Delete User Modal:**
  - Confirmation with user's full name
  - Warning: "This action cannot be undone"
  - Soft delete (deleted flag maintained)

#### 2. Logout (`/admin/dashboard/logout`)

- Identical to user logout

---

## Feature Comparison

| Feature | User | Admin |
|---------|:----:|:-----:|
| View Dashboard | Yes | Yes |
| View Balance | Yes | No |
| View Own Transactions | Yes | -- |
| View All User Transactions | No | Yes |
| Local Transfer | Yes | No |
| International Transfer | Yes | No |
| Deposit Funds | Yes | No |
| View/Edit Profile | Yes | No |
| Manage Users | No | Yes |
| Edit User Details | No | Yes |
| Delete Users | No | Yes |
| Credit/Debit Accounts | No | Yes |
| View Platform Totals | No | Yes |

---

## API Endpoints

### Admin

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/admin/getAll` | Fetch all users |
| PUT | `/admin/update/{id}` | Update user details |
| DELETE | `/admin/user/delete/{id}` | Delete user |
| GET | `/admin/user/{id}/transactions` | Get user transactions |
| POST | `/admin/user/{id}/transaction` | Create credit/debit transaction |

### User

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/transactions/transfer` | Make transfer (local/international) |

**Base URL:** `https://worldbankio.com/api/`

---

## Responsive Design

- Mobile-first with Tailwind breakpoints
- Sidebar collapses on mobile → overlay on tablet
- Bottom navigation bar with custom SVG curve on mobile
- Responsive form grids (1-col mobile, 2-col desktop)
- Horizontal scroll on tables for mobile
- Modals with max-width constraints

### Pension Management Application

## Overview
A responsive pension management application built with React 18, TypeScript, Redux, Tailwind CSS, and React Router. The application features:
- User Authentication with role-based UI (Admin/Member)
- Member Dashboard displaying profile, contribution statistics, and data visualizations
- Contribution Management handling both mandatory (one per month) and voluntary contributions
- Interactive statement generation with export options (PDF) and benefit projection preview
- Notification system with toast notifications and real-time updates

## Project Structure
```bash

pension-management-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Authentication/
│   │   │   ├── Login.tsx
│   │   │   └── PasswordRecovery.tsx
│   │   ├── Dashboard/
│   │   │   └── MemberDashboard.tsx
│   │   ├── ContributionManagement/
│   │   │   ├── ContributionForm.tsx
│   │   │   └── ContributionHistory.tsx
│   │   ├── Statement/
│   │   │   ├── StatementGenerator.tsx
│   │   │   └── BenefitProjection.tsx
│   │   └── Notification/
│   │       └── NotificationCenter.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useContributions.ts
│   ├── redux/
│   │   ├── store.ts
│   │   ├── authSlice.ts
│   │   └── contributionsSlice.ts
│   ├── routes/
│   │   └── AppRoutes.tsx
│   ├── services/
│   │   └── api.ts
│   ├── utils/
│   │   └── validators.ts
│   ├── App.tsx
│   └── index.tsx
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md


## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/akinreposition/pension-mgt-app.git
   
   cd pension-mgt-app

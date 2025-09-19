# YPE Summit 2025 - Database Documentation

## Overview

This document outlines the database structure and server actions for the YPE Summit 2025 event registration system. The system uses Drizzle ORM with PostgreSQL to handle event registrations, question submissions, partnership inquiries, and analytics.

## Database Schema

### Tables

#### 1. `registrations`
Stores event registration information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| full_name | VARCHAR(255) | Registrant's full name |
| email | VARCHAR(255) | Registrant's email address |
| phone | VARCHAR(20) | Registrant's phone number |
| profession | VARCHAR(255) | Registrant's profession/industry |
| church | VARCHAR(255) | Optional church/ministry affiliation |
| workshop_preference | VARCHAR(100) | Selected workshop track |
| payment_status | VARCHAR(20) | Payment status (pending, paid, failed, refunded) |
| payment_method | VARCHAR(50) | Payment method used |
| payment_reference | VARCHAR(255) | Payment reference/transaction ID |
| registration_date | TIMESTAMP | Date of registration |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Record update timestamp |

#### 2. `questions`
Stores Q&A session questions submitted by attendees.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Question submitter's name |
| question | TEXT | The actual question |
| status | VARCHAR(20) | Question status (pending, reviewed, answered, archived) |
| category | VARCHAR(100) | Question category |
| is_answered | BOOLEAN | Whether question has been answered |
| answered_at | TIMESTAMP | When question was answered |
| answered_by | VARCHAR(255) | Who answered the question |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Record update timestamp |

#### 3. `partnerships`
Stores partnership and sponsorship inquiries.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organization_name | VARCHAR(255) | Partner organization name |
| contact_person | VARCHAR(255) | Contact person name |
| email | VARCHAR(255) | Contact email address |
| phone | VARCHAR(20) | Contact phone number |
| support_type | VARCHAR(100) | Type of support offered |
| message | TEXT | Additional message/details |
| status | VARCHAR(20) | Inquiry status (pending, contacted, confirmed, declined) |
| partnership_tier | VARCHAR(20) | Partnership tier (platinum, gold, silver, bronze) |
| partnership_value | INTEGER | Monetary value in KSH |
| follow_up_date | TIMESTAMP | Scheduled follow-up date |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Record update timestamp |

#### 4. `event_analytics`
Tracks user interactions and event metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| event_type | VARCHAR(50) | Type of event tracked |
| ip_address | VARCHAR(45) | User's IP address |
| user_agent | TEXT | User's browser/device info |
| referrer | VARCHAR(500) | Referring URL |
| timestamp | TIMESTAMP | Event timestamp |

## Server Actions

### Registration Actions (`/actions/registrations.ts`)

- `createRegistration(data: RegistrationData)` - Create new registration
- `updatePaymentStatus(registrationId, paymentStatus, paymentMethod?, paymentReference?)` - Update payment status
- `getRegistrationByEmail(email)` - Get registration by email
- `getAllRegistrations()` - Get all registrations
- `getRegistrationStats()` - Get registration statistics

### Question Actions (`/actions/questions.ts`)

- `createQuestion(data: QuestionData)` - Submit new question
- `getAllQuestions()` - Get all questions
- `getQuestionsByStatus(status)` - Get questions by status
- `updateQuestionStatus(questionId, status, answeredBy?)` - Update question status
- `getQuestionStats()` - Get question statistics

### Partnership Actions (`/actions/partnerships.ts`)

- `createPartnership(data: PartnershipData)` - Submit partnership inquiry
- `getAllPartnerships()` - Get all partnerships
- `getPartnershipsByStatus(status)` - Get partnerships by status
- `updatePartnershipStatus(partnershipId, status, tier?, value?, followUpDate?)` - Update partnership status
- `getPartnershipStats()` - Get partnership statistics
- `getPartnershipsByType(supportType)` - Get partnerships by support type

### Analytics Actions (`/actions/analytics.ts`)

- `getEventAnalytics()` - Get all analytics data
- `getAnalyticsByEventType(eventType)` - Get analytics by event type
- `getAnalyticsStats()` - Get analytics statistics
- `getDailyAnalytics(days?)` - Get daily analytics for specified period

## API Endpoints

### POST `/api/submit-form`

Handles form submissions for registrations, questions, and partnerships.

**Request Body:**
```json
{
  "type": "registration" | "question" | "partnership",
  // Additional fields based on type
}
```

**Response:**
```json
{
  "success": boolean,
  "message": string,
  "data": object
}
```

## Validation

The system uses Zod for input validation with schemas defined in `/lib/validations.ts`:

- `registrationSchema` - Validates registration form data
- `questionSchema` - Validates question submission data
- `partnershipSchema` - Validates partnership inquiry data
- `paymentSchema` - Validates payment update data

## Types

TypeScript types are defined in `/types/index.ts` for:

- Database table types
- Form data types
- API response types
- Statistics types
- Enums for workshop preferences, support types, and partnership tiers

## Migration

To set up the database, run the migration file:

```sql
-- Execute /drizzle/0001_initial_event_tables.sql
```

This will create all necessary tables and indexes.

## Environment Variables

Make sure to set the following environment variable:

```
DATABASE_URL=postgresql://username:password@host:port/database
```

## Usage Examples

### Creating a Registration

```typescript
import { createRegistration } from '@/actions/registrations';

const result = await createRegistration({
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+254700000000",
  profession: "Software Developer",
  church: "Example Church",
  workshopPreference: "innovation"
});
```

### Submitting a Question

```typescript
import { createQuestion } from '@/actions/questions';

const result = await createQuestion({
  name: "Jane Smith",
  question: "How can I apply Kingdom principles in my workplace?",
  category: "general"
});
```

### Partnership Inquiry

```typescript
import { createPartnership } from '@/actions/partnerships';

const result = await createPartnership({
  organizationName: "Tech Company Ltd",
  contactPerson: "John Manager",
  email: "partnerships@techcompany.com",
  phone: "+254700000000",
  supportType: "financial",
  message: "We would like to sponsor the event."
});
```

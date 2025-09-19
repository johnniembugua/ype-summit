-- Drop existing auth tables if they exist
DROP TABLE IF EXISTS "verification" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;
DROP TABLE IF EXISTS "session" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- Create event registrations table
CREATE TABLE IF NOT EXISTS "registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"profession" varchar(255) NOT NULL,
	"church" varchar(255),
	"workshop_preference" varchar(100) NOT NULL,
	"payment_status" varchar(20) DEFAULT 'pending' NOT NULL,
	"payment_method" varchar(50),
	"payment_reference" varchar(255),
	"registration_date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create questions table
CREATE TABLE IF NOT EXISTS "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"question" text NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"category" varchar(100),
	"is_answered" boolean DEFAULT false NOT NULL,
	"answered_at" timestamp,
	"answered_by" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create partnerships table
CREATE TABLE IF NOT EXISTS "partnerships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_name" varchar(255) NOT NULL,
	"contact_person" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"support_type" varchar(100) NOT NULL,
	"message" text,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"partnership_tier" varchar(20),
	"partnership_value" integer,
	"follow_up_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create event analytics table
CREATE TABLE IF NOT EXISTS "event_analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"referrer" varchar(500),
	"timestamp" timestamp DEFAULT now() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "registrations_email_idx" ON "registrations" ("email");
CREATE INDEX IF NOT EXISTS "registrations_payment_status_idx" ON "registrations" ("payment_status");
CREATE INDEX IF NOT EXISTS "registrations_created_at_idx" ON "registrations" ("created_at");

CREATE INDEX IF NOT EXISTS "questions_status_idx" ON "questions" ("status");
CREATE INDEX IF NOT EXISTS "questions_category_idx" ON "questions" ("category");
CREATE INDEX IF NOT EXISTS "questions_created_at_idx" ON "questions" ("created_at");

CREATE INDEX IF NOT EXISTS "partnerships_email_idx" ON "partnerships" ("email");
CREATE INDEX IF NOT EXISTS "partnerships_status_idx" ON "partnerships" ("status");
CREATE INDEX IF NOT EXISTS "partnerships_support_type_idx" ON "partnerships" ("support_type");
CREATE INDEX IF NOT EXISTS "partnerships_created_at_idx" ON "partnerships" ("created_at");

CREATE INDEX IF NOT EXISTS "event_analytics_event_type_idx" ON "event_analytics" ("event_type");
CREATE INDEX IF NOT EXISTS "event_analytics_timestamp_idx" ON "event_analytics" ("timestamp");

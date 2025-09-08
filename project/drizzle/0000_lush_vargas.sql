CREATE TABLE "event_analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"referrer" varchar(500),
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partnerships" (
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
--> statement-breakpoint
CREATE TABLE "questions" (
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
--> statement-breakpoint
CREATE TABLE "registrations" (
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

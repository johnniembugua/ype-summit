import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Event Registrations Table
export const registrations = pgTable("registrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  profession: varchar("profession", { length: 255 }).notNull(),
  church: varchar("church", { length: 255 }),
  workshopPreference: varchar("workshop_preference", { length: 100 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 20 }).default("pending").notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }),
  paymentReference: varchar("payment_reference", { length: 255 }),
  registrationDate: timestamp("registration_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Questions/Ideas Table
export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  question: text("question").notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, reviewed, answered, archived
  category: varchar("category", { length: 100 }), // keynote, panel, workshop, general
  isAnswered: boolean("is_answered").default(false).notNull(),
  answeredAt: timestamp("answered_at"),
  answeredBy: varchar("answered_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Partnership Inquiries Table
export const partnerships = pgTable("partnerships", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationName: varchar("organization_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  supportType: varchar("support_type", { length: 100 }).notNull(), // financial, venue, media, logistics, other
  message: text("message"),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, contacted, confirmed, declined
  partnershipTier: varchar("partnership_tier", { length: 20 }), // platinum, gold, silver, bronze
  partnershipValue: integer("partnership_value"), // monetary value in KSH
  followUpDate: timestamp("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Event Analytics Table (for tracking event metrics)
export const eventAnalytics = pgTable("event_analytics", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventType: varchar("event_type", { length: 50 }).notNull(), // registration, question_submission, partnership_inquiry
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  referrer: varchar("referrer", { length: 500 }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
  
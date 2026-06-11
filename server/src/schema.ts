import { pgTable, serial, text, real, timestamp } from "drizzle-orm/pg-core";

export const places = pgTable("places", {
  id:               serial("id").primaryKey(),
  name:             text("name").notNull(),
  type:             text("type").notNull(),       // hotel | restaurant | bar | agriturismo
  city:             text("city").notNull(),
  address:          text("address").notNull(),
  inspectedAt:      text("inspected_at").notNull(),
  revisoreScore:    real("revisore_score").notNull(),
  googleScore:      real("google_score"),
  tripadvisorScore: real("tripadvisor_score"),
  plaqueStatus:     text("plaque_status").notNull().default("active"),
  plaqueIssuedAt:   text("plaque_issued_at"),
  imageUrl:         text("image_url"),
  createdAt:        timestamp("created_at").defaultNow(),
});

export const communityRatings = pgTable("community_ratings", {
  id:         serial("id").primaryKey(),
  placeId:    serial("place_id").references(() => places.id),
  score:      real("score").notNull(),
  comment:    text("comment"),
  authorName: text("author_name").notNull(),
  createdAt:  timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id:           serial("id").primaryKey(),
  email:        text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name:         text("name").notNull(),
  role:         text("role").notNull().default("user"), // user | partner | developer
  createdAt:    timestamp("created_at").defaultNow(),
});

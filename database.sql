-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

/*
    DRAW LEAGUE DATABASE
    database-name: draw_league
    created-by: Joshua Tree Cohort PDA
    date: 9/10/24
    
*/


--TABLE CREATION:

CREATE TABLE "user" (
 "id" SERIAL PRIMARY KEY,
 "username" VARCHAR (80) UNIQUE NOT NULL,
 "password" VARCHAR (1000) NOT NULL,
 "user_role" VARCHAR (50) NOT NULL DEFAULT 'ref',
 "ref_job" VARCHAR ,
 "ref_fact" VARCHAR ,
 "ref_img" VARCHAR ,
 "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
 "full_name" VARCHAR,
 "art_medium" VARCHAR,
 "phone_number" VARCHAR
 );
 
 CREATE TABLE "event" (
	"id" SERIAL PRIMARY KEY,
	"theme" VARCHAR(500),
	"prompt_one" VARCHAR(500),
	"prompt_two" VARCHAR(500),
	"prompt_three" VARCHAR(500),
	"event_date" DATE NOT NULL,
	"event_code" VARCHAR NOT NULL,
	"location_name" VARCHAR (500),
	"location_address" VARCHAR (500),
	"judge_name" VARCHAR,
	"judge_job" VARCHAR,
	"judge_like" VARCHAR,
	"judge_know" VARCHAR,
	"judge_img" VARCHAR,
	"judge_code" VARCHAR NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"created_by" INT REFERENCES "user"
);

CREATE TABLE "user_event" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"event_id" INT REFERENCES "event" ON DELETE CASCADE,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "team" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "event",
	"team_name" VARCHAR UNIQUE NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()

);

CREATE TABLE "drawing" (
	"id" SERIAL PRIMARY KEY,
	"team_id" INT REFERENCES "team",
	"drawing_url" VARCHAR,
	"favorite_drawing" BOOLEAN DEFAULT false,
	"score" INT,
	"round" INT,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

--SEED DATA  
/********************MAKE SURE TO RUN INSERT STATEMENTS IN THIS ORDER*******************/
INSERT INTO "user" (username, password, user_role, ref_job, ref_fact, ref_img, full_name, art_medium, phone_number)
VALUES ('admiralGreer', 'fish', 'ref', 'fisherman', 'My real name is Ishmael', 'https://plus.unsplash.com/premium_photo-1676511249826-2adf52caabee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Richard Greer', 'film', '5551234567');

INSERT INTO "event" (theme, prompt_one, prompt_two, prompt_three, event_date, event_code, location_name, location_address, judge_name, judge_job, judge_like, judge_know, judge_img, judge_code, created_by)
VALUES ('Olympics', 'Opening Ceremonies', 'Sporting Event', 'Medals', '2024-9-25', '1234', 'Bauhaus', '1315 Tyler St NE, Minneapolis, MN 55413', 'Steve Perry', 'Singer', 'Journies', 'Songwriting', 'https://images.unsplash.com/photo-1536320439102-e28493dade27?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '4321', 1);

INSERT INTO "team" (team_name, event_id)
VALUES ('Pencil Pushers', 1);

INSERT INTO "drawing" (team_id, drawing_url, score, round)
VALUES (1, 'https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',85, 1);


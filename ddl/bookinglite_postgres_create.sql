CREATE TABLE "booking" (
	"id" serial NOT NULL DEFAULT '1',
	"customer" character varying NOT NULL,
	"booking_element_id" character varying NOT NULL,
	"start_date" TIMESTAMP NOT NULL,
	"end_date" TIMESTAMP NOT NULL,
	"price" DECIMAL NOT NULL,
	"taxable" BOOLEAN NOT NULL,
	CONSTRAINT booking_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "booking_element" (
	"id" serial NOT NULL,
	"name" character varying NOT NULL,
	CONSTRAINT booking_element_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "booking" ADD CONSTRAINT "booking_fk0" FOREIGN KEY ("booking_element_id") REFERENCES "booking_element"("id");



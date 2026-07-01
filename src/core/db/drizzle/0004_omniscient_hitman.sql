ALTER TYPE "public"."user_permission" ADD VALUE 'roles:read';--> statement-breakpoint
ALTER TYPE "public"."user_permission" ADD VALUE 'roles:read_self';--> statement-breakpoint
ALTER TYPE "public"."user_permission" ADD VALUE 'roles:create';--> statement-breakpoint
ALTER TYPE "public"."user_permission" ADD VALUE 'roles:create_self';--> statement-breakpoint
ALTER TYPE "public"."user_permission" ADD VALUE 'roles:update';--> statement-breakpoint
ALTER TYPE "public"."user_permission" ADD VALUE 'roles:update_self';--> statement-breakpoint
ALTER TYPE "public"."user_permission" ADD VALUE 'roles:delete';--> statement-breakpoint
ALTER TYPE "public"."user_permission" ADD VALUE 'roles:delete_self';
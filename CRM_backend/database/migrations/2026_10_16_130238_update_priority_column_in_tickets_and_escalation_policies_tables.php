<?php

use App\Enums\TicketPriority;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $allowed = "'" . implode("', '", TicketPriority::values()) . "'";

        // Tickets table: set default and add CHECK constraint for enum values
        DB::statement("ALTER TABLE tickets ALTER COLUMN priority SET DEFAULT '" . TicketPriority::MEDIUM->value . "'");
        DB::statement("ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_priority_check");
        DB::statement("ALTER TABLE tickets ADD CONSTRAINT tickets_priority_check CHECK (priority IN ($allowed))");

        // Escalation policies table: add CHECK constraint for enum values
        DB::statement("ALTER TABLE escalation_policies DROP CONSTRAINT IF EXISTS escalation_policies_priority_check");
        DB::statement("ALTER TABLE escalation_policies ADD CONSTRAINT escalation_policies_priority_check CHECK (priority IN ($allowed))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_priority_check");
        DB::statement("ALTER TABLE escalation_policies DROP CONSTRAINT IF EXISTS escalation_policies_priority_check");
    }
};

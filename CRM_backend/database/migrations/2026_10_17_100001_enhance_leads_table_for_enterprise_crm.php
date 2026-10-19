<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->integer('lead_score')->default(50)->after('status');
            $table->string('priority', 20)->default('medium')->after('lead_score');
            $table->dateTime('next_follow_up_at')->nullable()->after('priority');
            $table->decimal('estimated_space_sqm', 10, 2)->nullable()->after('next_follow_up_at');
            $table->integer('estimated_headcount')->nullable()->after('estimated_space_sqm');
            $table->string('disqualification_reason', 255)->nullable()->after('estimated_headcount');
            $table->foreignId('converted_account_id')->nullable()->constrained('accounts')->nullOnDelete()->after('converted_at');
            $table->foreignId('converted_contact_id')->nullable()->constrained('contacts')->nullOnDelete()->after('converted_account_id');
            $table->foreignId('converted_opportunity_id')->nullable()->constrained('opportunities')->nullOnDelete()->after('converted_contact_id');
        });
    }

    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->dropForeign(['converted_opportunity_id']);
            $table->dropForeign(['converted_contact_id']);
            $table->dropForeign(['converted_account_id']);
            $table->dropColumn([
                'lead_score',
                'priority',
                'next_follow_up_at',
                'estimated_space_sqm',
                'estimated_headcount',
                'disqualification_reason',
                'converted_account_id',
                'converted_contact_id',
                'converted_opportunity_id',
            ]);
        });
    }
};

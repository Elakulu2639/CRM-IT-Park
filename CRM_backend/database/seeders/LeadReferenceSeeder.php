<?php

namespace Database\Seeders;

use App\Models\Lead;
use App\Models\LeadSource;
use App\Models\ReferenceCategory;
use App\Models\User;
use Illuminate\Database\Seeder;

class LeadReferenceSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Lead Sources
        $sources = [
            ['source_name' => 'Website Inbound', 'description' => 'Inbound inquiries via Ethiopian IT Park official portal', 'is_active' => true],
            ['source_name' => 'Referral / Partner', 'description' => 'Referrals from existing tenants, tech hubs, or partners', 'is_active' => true],
            ['source_name' => 'Direct Outreach', 'description' => 'Proactive discovery and outreach by BDO team', 'is_active' => true],
            ['source_name' => 'Tech Exhibition / Event', 'description' => 'Leads gathered during tech summits, Gitex, or conferences', 'is_active' => true],
            ['source_name' => 'Government / Ministry Referral', 'description' => 'Referrals from MInT, EIC, or government agencies', 'is_active' => true],
            ['source_name' => 'Social Media / Press', 'description' => 'LinkedIn, Twitter/X, and digital promotional campaigns', 'is_active' => true],
            ['source_name' => 'Incubation Acceleration Hub', 'description' => 'Startups graduating from local university & tech incubators', 'is_active' => true],
        ];

        foreach ($sources as $source) {
            LeadSource::updateOrCreate(
                ['source_name' => $source['source_name']],
                $source
            );
        }

        // 2. Seed Reference Categories for Sector / Vertical
        $categories = [
            ['category_group' => 'lead_sector', 'category_name' => 'Fintech & Digital Payments', 'description' => 'Payment gateways, digital banking, and financial technology', 'display_order' => 1],
            ['category_group' => 'lead_sector', 'category_name' => 'BPO & Customer Operations', 'description' => 'Business Process Outsourcing and international contact centers', 'display_order' => 2],
            ['category_group' => 'lead_sector', 'category_name' => 'Software Engineering & SaaS', 'description' => 'Enterprise software, platforms, and offshore software development', 'display_order' => 3],
            ['category_group' => 'lead_sector', 'category_name' => 'AI, Big Data & Cloud Hosting', 'description' => 'Machine learning, hyperscale computing, and data center facilities', 'display_order' => 4],
            ['category_group' => 'lead_sector', 'category_name' => 'Telecom, IoT & Hardware', 'description' => 'Network infrastructure, device assembly, and smart tech', 'display_order' => 5],
            ['category_group' => 'lead_sector', 'category_name' => 'Early-Stage Tech Startup', 'description' => 'Incubation-track innovation and high-growth ventures', 'display_order' => 6],
        ];

        foreach ($categories as $cat) {
            ReferenceCategory::updateOrCreate(
                ['category_group' => $cat['category_group'], 'category_name' => $cat['category_name']],
                array_merge($cat, ['is_active' => true])
            );
        }

        // 3. Seed Realistic Initial Leads for Demo & Testing
        $admin = User::first();
        $sourceWeb = LeadSource::where('source_name', 'Website Inbound')->first();
        $sourceGov = LeadSource::where('source_name', 'Government / Ministry Referral')->first();
        $sourceOutreach = LeadSource::where('source_name', 'Direct Outreach')->first();
        $catFintech = ReferenceCategory::where('category_name', 'Fintech & Digital Payments')->first();
        $catBPO = ReferenceCategory::where('category_name', 'BPO & Customer Operations')->first();
        $catCloud = ReferenceCategory::where('category_name', 'AI, Big Data & Cloud Hosting')->first();

        $sampleLeads = [
            [
                'name' => 'Dr. Biruk Tadesse',
                'organization' => 'Abyssinia Cloud Tech PLC',
                'email' => 'biruk@abyssiniacloud.et',
                'phone' => '+251911223344',
                'source_id' => $sourceWeb?->id,
                'category_id' => $catCloud?->id,
                'status' => 'new',
                'priority' => 'urgent',
                'lead_score' => 88,
                'estimated_space_sqm' => 450.00,
                'estimated_headcount' => 60,
                'notes' => 'Looking for dedicated Tier-3 data center rack space and 450 sqm office space in ICT Park Phase 2.',
                'owner_user_id' => $admin?->id,
                'next_follow_up_at' => now()->addDays(1),
            ],
            [
                'name' => 'Sarah Jenkins',
                'organization' => 'Nile Connect Global BPO',
                'email' => 's.jenkins@nileconnect.com',
                'phone' => '+251922334455',
                'source_id' => $sourceGov?->id,
                'category_id' => $catBPO?->id,
                'status' => 'contacted',
                'priority' => 'high',
                'lead_score' => 92,
                'estimated_space_sqm' => 1200.00,
                'estimated_headcount' => 250,
                'notes' => 'International outsourcing provider expanding to Addis Ababa. Requires 250 seats with redundant power & fiber.',
                'owner_user_id' => $admin?->id,
                'next_follow_up_at' => now()->addDays(2),
            ],
            [
                'name' => 'Kidus Yohannes',
                'organization' => 'ShebaPay Solutions',
                'email' => 'kidus@shebapay.io',
                'phone' => '+251933445566',
                'source_id' => $sourceOutreach?->id,
                'category_id' => $catFintech?->id,
                'status' => 'qualified',
                'priority' => 'high',
                'lead_score' => 78,
                'estimated_space_sqm' => 150.00,
                'estimated_headcount' => 20,
                'notes' => 'Licensed National Bank of Ethiopia payment provider requesting incubation space and commercial tax incentive package.',
                'owner_user_id' => $admin?->id,
                'next_follow_up_at' => now()->addDays(3),
            ],
            [
                'name' => 'Meron Alemayehu',
                'organization' => 'Horn AI Innovations',
                'email' => 'meron@hornai.et',
                'phone' => '+251944556677',
                'source_id' => $sourceWeb?->id,
                'category_id' => $catCloud?->id,
                'status' => 'new',
                'priority' => 'medium',
                'lead_score' => 65,
                'estimated_space_sqm' => 80.00,
                'estimated_headcount' => 10,
                'notes' => 'Applied for tech startup incubation track for speech recognition in Ethiopian regional languages.',
                'owner_user_id' => null, // Unassigned lead to test assignment flow
                'next_follow_up_at' => now()->addHours(12),
            ],
        ];

        foreach ($sampleLeads as $leadData) {
            Lead::updateOrCreate(
                ['email' => $leadData['email']],
                $leadData
            );
        }
    }
}

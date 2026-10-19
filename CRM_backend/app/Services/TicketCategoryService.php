<?php

namespace App\Services;

use App\Models\TicketCategory;
use Illuminate\Database\Eloquent\Collection;

class TicketCategoryService
{
    /**
     * Retrieve all categories matching filter criteria.
     *
     * - System Admin: gets all categories with `tickets_count` unless filtering by active.
     * - Regular users: only get active categories for ticket forms/dropdowns.
     *
     * @param array<string, mixed> $filters
     * @return Collection<int, TicketCategory>
     */
    public function getAllCategories(array $filters = [], bool $isAdmin = false): Collection
    {
        $query = TicketCategory::query();

        $activeOnly = ! empty($filters['active_only']) ||
            (isset($filters['status']) && $filters['status'] === 'active') ||
            (isset($filters['is_active']) && filter_var($filters['is_active'], FILTER_VALIDATE_BOOLEAN));

        if (! $isAdmin || $activeOnly) {
            $query->active();
        }

        if ($isAdmin) {
            $query->withCount('tickets');
        }

        return $query->orderBy('category_name')->get();
    }

    /**
     * Create a new ticket category.
     *
     * @param array<string, mixed> $data
     */
    public function createCategory(array $data): TicketCategory
    {
        return TicketCategory::create([
            'category_name' => $data['category_name'],
            'description'   => $data['description'] ?? null,
            'is_active'     => $data['is_active'] ?? true,
        ]);
    }

    /**
     * Update an existing ticket category (including active status).
     *
     * @param array<string, mixed> $data
     */
    public function updateCategory(TicketCategory $category, array $data): TicketCategory
    {
        $category->update(array_filter([
            'category_name' => $data['category_name'] ?? null,
            'description'   => array_key_exists('description', $data) ? $data['description'] : null,
            'is_active'     => array_key_exists('is_active', $data) ? $data['is_active'] : null,
        ], fn ($v) => $v !== null));

        return $category->fresh();
    }

    /**
     * Permanently delete a ticket category.
     *
     * A category can only be deleted if no tickets are linked to it.
     * If tickets exist, the user must deactivate it instead to preserve data integrity.
     *
     * @throws \RuntimeException when the category has linked tickets.
     */
    public function deleteCategory(TicketCategory $category): void
    {
        $linkedCount = $category->tickets()->count();

        if ($linkedCount > 0) {
            $ticketWord = $linkedCount === 1 ? 'ticket' : 'tickets';
            throw new \RuntimeException(
                "Cannot delete category \"{$category->category_name}\" — it has {$linkedCount} linked {$ticketWord}. Deactivate the category instead by setting is_active to false."
            );
        }

        $category->delete();
    }
}

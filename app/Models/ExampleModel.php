<?php
/**
 * Example Model
 *
 * Demonstrates model pattern for database operations.
 * Models handle all database interactions and data persistence.
 *
 * @package LaravelWP\Models
 */

declare(strict_types=1);

namespace LaravelWP\Models;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Example Model Class
 */
class ExampleModel
{
    /**
     * Constructor
     */
    public function __construct()
    {
    }

    /**
     * Get all items
     *
     * @return array
     */
    public function getAll(): array
    {
        // Example using WordPress options for simple storage
        // In production, you might use custom tables
        
        $items = get_option('laravel_wp_items', []);
        
        // Ensure we always return an array
        if (!is_array($items)) {
            update_option('laravel_wp_items', []);
            return [];
        }

        return $items;
    }

    /**
     * Get item by ID
     *
     * @param int|string $id Item ID
     * @return array|null Item data or null if not found
     */
    public function find(int|string $id): ?array
    {
        $items = $this->getAll();
        
        foreach ($items as $item) {
            if (isset($item['id']) && $item['id'] === $id) {
                return $item;
            }
        }
        
        return null;
    }

    /**
     * Create a new item
     *
     * @param array $data Item data
     * @return array|false Created item or false on failure
     */
    public function create(array $data): array|false
    {
        // Validate required fields
        if (empty($data['title'])) {
            return false;
        }

        $items = $this->getAll();
        
        // Generate a unique ID
        $newId = $this->generateId();
        
        // Ensure all data is properly sanitized
        $item = [
            'id' => $newId,
            'title' => sanitize_text_field($data['title'] ?? ''),
            'content' => sanitize_textarea_field($data['content'] ?? ''),
            'status' => sanitize_text_field($data['status'] ?? 'active'),
            'created_at' => sanitize_text_field($data['created_at'] ?? current_time('mysql')),
            'updated_at' => current_time('mysql'),
        ];
        
        $items[] = $item;
        
        $updated = update_option('laravel_wp_items', $items, false);
        
        return $updated ? $item : false;
    }

    /**
     * Update an item
     *
     * @param int|string $id Item ID
     * @param array $data Updated data
     * @return bool True on success, false on failure
     */
    public function update(int|string $id, array $data): bool
    {
        $items = $this->getAll();
        $found = false;
        
        // Sanitize incoming data
        $sanitizedData = [];
        if (isset($data['title'])) {
            $sanitizedData['title'] = sanitize_text_field($data['title']);
        }
        if (isset($data['content'])) {
            $sanitizedData['content'] = sanitize_textarea_field($data['content']);
        }
        if (isset($data['status'])) {
            $sanitizedData['status'] = sanitize_text_field($data['status']);
        }
        
        foreach ($items as $key => $item) {
            if (isset($item['id']) && $item['id'] === $id) {
                $items[$key] = array_merge($item, $sanitizedData, [
                    'updated_at' => current_time('mysql'),
                ]);
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            return false;
        }
        
        return update_option('laravel_wp_items', $items, false);
    }

    /**
     * Delete an item
     *
     * @param int|string $id Item ID
     * @return bool True on success, false on failure
     */
    public function delete(int|string $id): bool
    {
        $items = $this->getAll();
        $newItems = [];
        $found = false;
        
        // Sanitize ID to prevent any injection
        $id = sanitize_text_field($id);
        
        foreach ($items as $item) {
            if (isset($item['id']) && $item['id'] === $id) {
                $found = true;
                continue;
            }
            $newItems[] = $item;
        }
        
        if (!$found) {
            return false;
        }
        
        return update_option('laravel_wp_items', $newItems, false);
    }

    /**
     * Count all items
     *
     * @return int
     */
    public function count(): int
    {
        return count($this->getAll());
    }

    /**
     * Generate a unique ID
     *
     * @return string
     */
    private function generateId(): string
    {
        return uniqid('lwp_', true);
    }
}


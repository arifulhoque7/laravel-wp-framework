<?php
/**
 * Example Service
 *
 * Demonstrates service layer pattern for business logic.
 * Services encapsulate complex operations and can be reused across controllers.
 *
 * @package LaravelWP\Services
 */

declare(strict_types=1);

namespace LaravelWP\Services;

use LaravelWP\Models\Item;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Example Service Class
 *
 * Now uses Eloquent ORM for database operations.
 * Provides Laravel-familiar API for WordPress plugin development.
 */
class ExampleService
{
    /**
     * Constructor
     */
    public function __construct()
    {
        // No need to instantiate Eloquent models
        // They use static methods and query builder
    }

    /**
     * Get sample data
     *
     * @return array
     */
    public function getSampleData(): array
    {
        return [
            'message' => __('Hello from Laravel WP Framework!', 'laravel-wp-framework'),
            'version' => LARAVEL_WP_VERSION,
            'timestamp' => current_time('mysql'),
            'site_info' => [
                'name' => get_bloginfo('name'),
                'url' => get_site_url(),
                'admin_email' => get_option('admin_email'),
            ],
            'stats' => [
                'posts' => wp_count_posts('post')->publish,
                'pages' => wp_count_posts('page')->publish,
                'users' => count_users()['total_users'],
            ],
        ];
    }

    /**
     * Get items from the model using Eloquent ORM
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItems()
    {
        // Using Eloquent ORM - Laravel-style query
        return Item::active()
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Create a new item using Eloquent ORM
     *
     * @param string $title Item title
     * @param string $content Item content
     * @return Item Created item model
     * @throws \Exception If creation fails
     */
    public function createItem(string $title, string $content = ''): Item
    {
        // Validate title
        $title = trim($title);

        if (empty($title)) {
            throw new \Exception(
                esc_html__('Title is required', 'laravel-wp-framework')
            );
        }

        if (strlen($title) > 200) {
            throw new \Exception(
                esc_html__('Title must not exceed 200 characters', 'laravel-wp-framework')
            );
        }

        // Create using Eloquent - automatic sanitization via mutators
        // Timestamps and user_id are set automatically
        $item = Item::create([
            'title' => $title,
            'content' => $content,
            'status' => 'active',
        ]);

        if (!$item) {
            throw new \Exception(
                esc_html__('Failed to create item', 'laravel-wp-framework')
            );
        }

        return $item;
    }
}


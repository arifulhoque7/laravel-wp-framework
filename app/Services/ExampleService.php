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

use LaravelWP\Models\ExampleModel;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Example Service Class
 */
class ExampleService
{
    private ExampleModel $model;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->model = new ExampleModel();
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
     * Get items from the model
     *
     * @return array
     */
    public function getItems(): array
    {
        return $this->model->getAll();
    }

    /**
     * Create a new item
     *
     * @param string $title Item title
     * @param string $content Item content
     * @return array Created item data
     * @throws \Exception If creation fails
     */
    public function createItem(string $title, string $content = ''): array
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

        // Sanitize and prepare data
        $itemData = [
            'title' => sanitize_text_field($title),
            'content' => sanitize_textarea_field($content),
            'created_at' => current_time('mysql'),
            'status' => 'active',
        ];

        // Create the item
        $created = $this->model->create($itemData);

        if (!$created) {
            throw new \Exception(
                esc_html__('Failed to create item', 'laravel-wp-framework')
            );
        }

        return $created;
    }
}


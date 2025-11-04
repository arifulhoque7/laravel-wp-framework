<?php
/**
 * API Controller
 *
 * Handles REST API endpoint registration and routing.
 *
 * @package LaravelWP\Controllers\Api
 */

declare(strict_types=1);

namespace LaravelWP\Controllers\Api;

use LaravelWP\App;
use LaravelWP\Services\ExampleService;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * API Controller Class
 */
class ApiController
{
    private ExampleService $exampleService;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->exampleService = new ExampleService();
    }

    /**
     * Register REST API hooks
     *
     * @return void
     */
    public function register(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    /**
     * Register REST API routes
     *
     * @return void
     */
    public function registerRoutes(): void
    {
        $namespace = App::config('api.namespace', 'laravel-wp/v1');

        // GET /laravel-wp/v1/data
        register_rest_route($namespace, '/data', [
            'methods' => 'GET',
            'callback' => [$this, 'getData'],
            'permission_callback' => '__return_true',
        ]);

        // GET /laravel-wp/v1/items
        register_rest_route($namespace, '/items', [
            'methods' => 'GET',
            'callback' => [$this, 'getItems'],
            'permission_callback' => [$this, 'checkPermission'],
        ]);

        // POST /laravel-wp/v1/items
        register_rest_route($namespace, '/items', [
            'methods' => 'POST',
            'callback' => [$this, 'createItem'],
            'permission_callback' => [$this, 'checkPermission'],
            'args' => [
                'title' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'content' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_textarea_field',
                ],
            ],
        ]);

        // PUT /laravel-wp/v1/items/{id}
        register_rest_route($namespace, '/items/(?P<id>\d+)', [
            'methods' => 'PUT',
            'callback' => [$this, 'updateItem'],
            'permission_callback' => [$this, 'checkPermission'],
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                    'sanitize_callback' => 'absint',
                ],
                'title' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'content' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_textarea_field',
                ],
            ],
        ]);

        // DELETE /laravel-wp/v1/items/{id}
        register_rest_route($namespace, '/items/(?P<id>\d+)', [
            'methods' => 'DELETE',
            'callback' => [$this, 'deleteItem'],
            'permission_callback' => [$this, 'checkPermission'],
            'args' => [
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                    'sanitize_callback' => 'absint',
                ],
            ],
        ]);
    }

    /**
     * Get data endpoint
     *
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response|WP_Error
     */
    public function getData(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        try {
            $data = $this->exampleService->getSampleData();
            
            return new WP_REST_Response([
                'success' => true,
                'data' => $data,
                'timestamp' => current_time('mysql'),
            ], 200);
        } catch (\Exception $e) {
            return new WP_Error(
                'data_fetch_error',
                $e->getMessage(),
                ['status' => 500]
            );
        }
    }

    /**
     * Get items endpoint
     *
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response|WP_Error
     */
    public function getItems(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        try {
            $items = $this->exampleService->getItems();
            
            return new WP_REST_Response([
                'success' => true,
                'items' => $items,
                'total' => count($items),
            ], 200);
        } catch (\Exception $e) {
            return new WP_Error(
                'items_fetch_error',
                $e->getMessage(),
                ['status' => 500]
            );
        }
    }

    /**
     * Create item endpoint
     *
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response|WP_Error
     */
    public function createItem(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        try {
            $title = $request->get_param('title');
            $content = $request->get_param('content') ?? '';

            $item = $this->exampleService->createItem($title, $content);
            
            return new WP_REST_Response([
                'success' => true,
                'item' => $item,
                'message' => __('Item created successfully', 'laravel-wp-framework'),
            ], 201);
        } catch (\Exception $e) {
            return new WP_Error(
                'item_create_error',
                $e->getMessage(),
                ['status' => 500]
            );
        }
    }

    /**
     * Update item endpoint
     *
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response|WP_Error
     */
    public function updateItem(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        try {
            $id = $request->get_param('id');
            $title = $request->get_param('title');
            $content = $request->get_param('content');

            $item = \LaravelWP\Models\Item::find($id);

            if (!$item) {
                return new WP_Error(
                    'item_not_found',
                    __('Item not found', 'laravel-wp-framework'),
                    ['status' => 404]
                );
            }

            // Update only provided fields
            if ($title !== null) {
                $item->title = $title;
            }
            if ($content !== null) {
                $item->content = $content;
            }

            $item->save();

            return new WP_REST_Response([
                'success' => true,
                'item' => $item,
                'message' => __('Item updated successfully', 'laravel-wp-framework'),
            ], 200);
        } catch (\Exception $e) {
            return new WP_Error(
                'item_update_error',
                $e->getMessage(),
                ['status' => 500]
            );
        }
    }

    /**
     * Delete item endpoint
     *
     * @param WP_REST_Request $request Request object
     * @return WP_REST_Response|WP_Error
     */
    public function deleteItem(WP_REST_Request $request): WP_REST_Response|WP_Error
    {
        try {
            $id = $request->get_param('id');

            $item = \LaravelWP\Models\Item::find($id);

            if (!$item) {
                return new WP_Error(
                    'item_not_found',
                    __('Item not found', 'laravel-wp-framework'),
                    ['status' => 404]
                );
            }

            $item->delete();

            return new WP_REST_Response([
                'success' => true,
                'message' => __('Item deleted successfully', 'laravel-wp-framework'),
            ], 200);
        } catch (\Exception $e) {
            return new WP_Error(
                'item_delete_error',
                $e->getMessage(),
                ['status' => 500]
            );
        }
    }

    /**
     * Check permission for protected endpoints
     *
     * @param WP_REST_Request $request Request object
     * @return bool|WP_Error
     */
    public function checkPermission(WP_REST_Request $request): bool|WP_Error
    {
        if (!current_user_can('manage_options')) {
            return new WP_Error(
                'rest_forbidden',
                esc_html__('You do not have permission to access this endpoint.', 'laravel-wp-framework'),
                ['status' => 403]
            );
        }

        return true;
    }
}


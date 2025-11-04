<?php

declare(strict_types=1);

namespace LaravelWP\Database\Migrations;

use LaravelWP\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * CreateItemsTable Migration
 *
 * Creates the items table for storing plugin data.
 * This is an example migration showing Laravel-style schema building.
 *
 * @package LaravelWP\Database\Migrations
 */
class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * Creates a new 'items' table with the following structure:
     * - id: Primary key (auto-increment)
     * - title: String field for item title (max 255 chars)
     * - content: Text field for item content (nullable)
     * - status: String field for item status (default: 'active')
     * - user_id: Unsigned big integer for WordPress user ID (nullable)
     * - created_at: Timestamp for creation time
     * - updated_at: Timestamp for last update time
     *
     * @return void
     */
    public function up(): void
    {
        $this->create('items', function (Blueprint $table) {
            // Primary key
            $table->id();

            // Item fields
            $table->string('title', 255);
            $table->text('content')->nullable();
            $table->string('status', 50)->default('active');

            // WordPress user relationship
            $table->unsignedBigInteger('user_id')->nullable();

            // Timestamps (created_at, updated_at)
            $table->timestamps();

            // Indexes for better query performance
            $table->index('status');
            $table->index('user_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * Drops the 'items' table if it exists.
     *
     * @return void
     */
    public function down(): void
    {
        $this->dropIfExists('items');
    }
}

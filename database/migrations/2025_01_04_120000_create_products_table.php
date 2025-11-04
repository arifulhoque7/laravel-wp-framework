<?php
/**
 * Create Products Table Migration
 *
 * Example migration showing how to create a products table.
 * This is a sample - you can delete it or modify it for your needs.
 *
 * @package LaravelWP
 */

namespace LaravelWP\Database\Migrations;

use LaravelWP\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductsTable extends Migration
{
    /**
     * Run the migration
     *
     * Creates the products table with all necessary columns and indexes.
     *
     * @return void
     */
    public function up(): void
    {
        $this->create('products', function (Blueprint $table) {
            // Primary key
            $table->id();

            // Product information
            $table->string('name', 255);
            $table->string('slug', 255)->unique();
            $table->text('description')->nullable();
            $table->longText('full_description')->nullable();

            // Pricing
            $table->decimal('price', 10, 2)->default(0.00);
            $table->decimal('sale_price', 10, 2)->nullable();

            // Inventory
            $table->integer('stock')->default(0);
            $table->string('sku', 100)->unique()->nullable();

            // Categorization
            $table->string('category', 100)->nullable();
            $table->json('tags')->nullable();

            // Status
            $table->string('status', 50)->default('active');
            $table->boolean('is_featured')->default(false);

            // WordPress user who created it
            $table->unsignedBigInteger('user_id')->nullable();

            // Timestamps
            $table->timestamps();

            // Indexes for performance
            $table->index('status');
            $table->index('slug');
            $table->index('sku');
            $table->index('category');
            $table->index('is_featured');
            $table->index('user_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migration
     *
     * Drops the products table.
     *
     * @return void
     */
    public function down(): void
    {
        $this->dropIfExists('products');
    }
}

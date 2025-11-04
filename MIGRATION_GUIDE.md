# Migration Guide - Laravel WP Framework

Complete guide for creating and running database migrations in your WordPress plugin using Laravel-style migrations.

---

## Table of Contents

1. [Understanding Migrations](#understanding-migrations)
2. [Creating a New Migration](#creating-a-new-migration)
3. [Migration Structure](#migration-structure)
4. [Running Migrations](#running-migrations)
5. [Examples](#examples)
6. [Best Practices](#best-practices)

---

## Understanding Migrations

Migrations are like version control for your database. They allow you to:
- Define database schema in PHP code
- Track database changes over time
- Share schema changes with your team via Git
- Rollback changes if needed

**How it works:**
1. Create migration files in `database/migrations/`
2. Plugin activation automatically runs pending migrations
3. Migrations are tracked in `wp_options` to prevent re-running

---

## Creating a New Migration

### Step 1: Create Migration File

Create a new file in `database/migrations/` with this naming pattern:

```
YYYY_MM_DD_HHMMSS_description.php
```

**Examples:**
- `2025_01_04_120000_create_products_table.php`
- `2025_01_04_120100_add_price_to_products.php`
- `2025_01_04_120200_create_orders_table.php`

**Naming Tips:**
- Use timestamp format to ensure correct order
- Use descriptive names (create, add, update, drop)
- Keep it lowercase with underscores

---

## Migration Structure

Every migration extends `LaravelWP\Database\Migration` and has two methods:

```php
<?php

namespace LaravelWP\Database\Migrations;

use LaravelWP\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateYourTable extends Migration
{
    /**
     * Run the migration
     *
     * This method is called when migrating "up"
     */
    public function up(): void
    {
        // Create or modify tables here
    }

    /**
     * Reverse the migration
     *
     * This method is called when rolling back
     */
    public function down(): void
    {
        // Drop or undo changes here
    }
}
```

---

## Running Migrations

### Automatic (Recommended)

Migrations run automatically when you:

1. **Activate the plugin:**
   ```
   WordPress Admin → Plugins → Activate "Laravel WP Framework"
   ```

2. **Reactivate the plugin:**
   ```
   Deactivate → Activate
   ```

### Manual (For Development)

If you need to run migrations manually during development:

```php
// In your code or WP CLI command
use LaravelWP\Database\Migrator;

$migrator = new Migrator();
$migrator->run(); // Run pending migrations
```

### Check Migration Status

Migrations are tracked in WordPress options:

```php
$ran = get_option('laravel_wp_migrations', []);
print_r($ran); // Shows list of executed migrations
```

---

## Examples

### Example 1: Create a Simple Table

**File:** `database/migrations/2025_01_04_120000_create_products_table.php`

```php
<?php

namespace LaravelWP\Database\Migrations;

use LaravelWP\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductsTable extends Migration
{
    public function up(): void
    {
        $this->create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->integer('stock')->default(0);
            $table->string('sku', 100)->unique();
            $table->string('status', 50)->default('active');
            $table->timestamps();

            // Indexes
            $table->index('status');
            $table->index('sku');
        });
    }

    public function down(): void
    {
        $this->dropIfExists('products');
    }
}
```

**Result:** Creates table `wp_products` with all fields and indexes.

---

### Example 2: Add Column to Existing Table

**File:** `database/migrations/2025_01_04_120100_add_category_to_products.php`

```php
<?php

namespace LaravelWP\Database\Migrations;

use LaravelWP\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddCategoryToProducts extends Migration
{
    public function up(): void
    {
        $this->table('products', function (Blueprint $table) {
            $table->string('category', 100)->nullable()->after('name');
            $table->index('category');
        });
    }

    public function down(): void
    {
        $this->table('products', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
}
```

---

### Example 3: Create Table with Foreign Keys

**File:** `database/migrations/2025_01_04_120200_create_orders_table.php`

```php
<?php

namespace LaravelWP\Database\Migrations;

use LaravelWP\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrdersTable extends Migration
{
    public function up(): void
    {
        $this->create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('product_id');
            $table->integer('quantity')->default(1);
            $table->decimal('total', 10, 2);
            $table->string('status', 50)->default('pending');
            $table->timestamps();

            // Foreign keys
            $table->foreign('product_id')
                  ->references('id')
                  ->on('products')
                  ->onDelete('cascade');

            // Indexes
            $table->index('user_id');
            $table->index('status');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        $this->dropIfExists('orders');
    }
}
```

---

### Example 4: Complex Table with Multiple Column Types

**File:** `database/migrations/2025_01_04_120300_create_customers_table.php`

```php
<?php

namespace LaravelWP\Database\Migrations;

use LaravelWP\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCustomersTable extends Migration
{
    public function up(): void
    {
        $this->create('customers', function (Blueprint $table) {
            // Primary key
            $table->id();

            // Personal info
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('email', 255)->unique();
            $table->string('phone', 20)->nullable();

            // Address
            $table->text('address_line1')->nullable();
            $table->text('address_line2')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('zip_code', 20)->nullable();
            $table->string('country', 100)->default('US');

            // Status and metadata
            $table->string('status', 50)->default('active');
            $table->boolean('is_verified')->default(false);
            $table->dateTime('last_login')->nullable();
            $table->json('preferences')->nullable();

            // WordPress user relationship
            $table->unsignedBigInteger('user_id')->nullable();

            // Timestamps
            $table->timestamps();
            $table->softDeletes(); // Adds deleted_at column

            // Indexes
            $table->index('email');
            $table->index('status');
            $table->index('user_id');
            $table->index(['first_name', 'last_name']); // Composite index
        });
    }

    public function down(): void
    {
        $this->dropIfExists('customers');
    }
}
```

---

## Available Column Types

### String & Text
```php
$table->string('name', 255);           // VARCHAR(255)
$table->text('description');           // TEXT
$table->mediumText('content');         // MEDIUMTEXT
$table->longText('body');              // LONGTEXT
$table->char('code', 10);              // CHAR(10)
```

### Numeric
```php
$table->integer('quantity');           // INT
$table->bigInteger('big_number');      // BIGINT
$table->tinyInteger('small_number');   // TINYINT
$table->smallInteger('medium_number'); // SMALLINT
$table->decimal('price', 10, 2);       // DECIMAL(10,2)
$table->float('rating', 8, 2);         // FLOAT
$table->double('amount', 15, 8);       // DOUBLE
```

### Date & Time
```php
$table->date('birth_date');            // DATE
$table->dateTime('published_at');      // DATETIME
$table->time('start_time');            // TIME
$table->timestamp('created_at');       // TIMESTAMP
$table->timestamps();                  // created_at + updated_at
$table->softDeletes();                 // deleted_at (for soft delete)
```

### Boolean & Binary
```php
$table->boolean('is_active');          // BOOLEAN (TINYINT(1))
$table->binary('data');                // BLOB
```

### JSON & Arrays
```php
$table->json('settings');              // JSON
$table->jsonb('metadata');             // JSONB (PostgreSQL)
```

### Primary & Foreign Keys
```php
$table->id();                          // Alias for bigIncrements('id')
$table->bigIncrements('id');           // UNSIGNED BIGINT auto-increment
$table->unsignedBigInteger('user_id'); // UNSIGNED BIGINT (for foreign keys)
$table->foreignId('user_id');          // Alias for unsignedBigInteger
```

---

## Column Modifiers

Chain these methods after column definition:

```php
// Nullability
$table->string('email')->nullable();        // Allow NULL
$table->string('name')->nullable(false);    // NOT NULL (default)

// Default values
$table->string('status')->default('active');
$table->integer('count')->default(0);
$table->boolean('is_active')->default(true);

// Unsigned (for integers)
$table->integer('age')->unsigned();

// Unique
$table->string('email')->unique();

// Column order
$table->string('middle_name')->after('first_name');
$table->string('prefix')->first();

// Comments
$table->string('code')->comment('Product SKU code');

// Auto-increment
$table->integer('id')->autoIncrement();
```

---

## Indexes

```php
// Single column index
$table->index('email');
$table->index('status');

// Composite index (multiple columns)
$table->index(['first_name', 'last_name']);

// Unique index
$table->unique('email');
$table->unique(['tenant_id', 'slug']);

// Primary key
$table->primary('id');

// Foreign key
$table->foreign('user_id')
      ->references('id')
      ->on('users')
      ->onDelete('cascade')    // Delete related records
      ->onUpdate('cascade');   // Update related records

// Named indexes (optional)
$table->index('email', 'idx_users_email');
```

---

## Modifying Columns (Existing Tables)

```php
// Add columns
$table->string('new_field')->after('existing_field');

// Modify columns (requires doctrine/dbal)
$table->string('name', 100)->change(); // Change length
$table->text('description')->nullable()->change(); // Make nullable

// Rename columns
$table->renameColumn('old_name', 'new_name');

// Drop columns
$table->dropColumn('unwanted_field');
$table->dropColumn(['field1', 'field2']); // Drop multiple
```

---

## Best Practices

### 1. **Always Use Timestamps**
```php
$table->timestamps(); // Adds created_at and updated_at
```

### 2. **Use Descriptive Names**
```php
// Good
2025_01_04_120000_create_products_table.php
2025_01_04_120100_add_category_to_products.php

// Bad
2025_01_04_120000_migration1.php
2025_01_04_120100_update.php
```

### 3. **Always Write down() Method**
```php
public function down(): void
{
    $this->dropIfExists('products'); // Always provide rollback
}
```

### 4. **Use Indexes for Performance**
```php
// Index frequently queried columns
$table->index('status');
$table->index('user_id');
$table->index('created_at');

// Composite indexes for multi-column queries
$table->index(['user_id', 'status']);
```

### 5. **Use Appropriate Data Types**
```php
// Good
$table->string('email', 255);           // Right size
$table->decimal('price', 10, 2);        // Exact decimal
$table->unsignedBigInteger('user_id');  // For foreign keys

// Bad
$table->text('email');                  // Oversized
$table->float('price');                 // Imprecise for money
$table->string('user_id');              // Wrong type for FK
```

### 6. **Use Foreign Keys for Data Integrity**
```php
$table->foreign('user_id')
      ->references('id')
      ->on('users')
      ->onDelete('cascade'); // Auto-delete related records
```

### 7. **Test Both up() and down()**
```php
// Test creating
$migrator->run();

// Test rollback (during development)
// Note: You'd need to implement rollback() method in Migrator
```

---

## Complete Workflow Example

Let's create a complete feature with migrations:

### Step 1: Create Products Table

**File:** `database/migrations/2025_01_04_120000_create_products_table.php`

```php
<?php

namespace LaravelWP\Database\Migrations;

use LaravelWP\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductsTable extends Migration
{
    public function up(): void
    {
        $this->create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('slug', 255)->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->integer('stock')->default(0);
            $table->string('status', 50)->default('active');
            $table->timestamps();

            $table->index('status');
            $table->index('slug');
        });
    }

    public function down(): void
    {
        $this->dropIfExists('products');
    }
}
```

### Step 2: Create Product Model

**File:** `app/Models/Product.php`

```php
<?php

namespace LaravelWP\Models;

use LaravelWP\Database\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'status',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }
}
```

### Step 3: Run Migration

```bash
# Activate plugin in WordPress admin
# Or reactivate to run new migrations
```

### Step 4: Use the Model

```php
use LaravelWP\Models\Product;

// Create
$product = Product::create([
    'name' => 'WordPress Plugin',
    'slug' => 'wordpress-plugin',
    'description' => 'An awesome plugin',
    'price' => 49.99,
    'stock' => 100,
]);

// Query
$products = Product::active()->inStock()->get();

// Update
$product->price = 39.99;
$product->save();

// Delete
$product->delete();
```

---

## Troubleshooting

### Migration Not Running?

Check if it's already executed:
```php
$ran = get_option('laravel_wp_migrations', []);
if (in_array('2025_01_04_120000_create_products_table.php', $ran)) {
    echo 'Already ran!';
}
```

### Force Re-run Migration (Development Only)

```php
// Remove from executed list
$ran = get_option('laravel_wp_migrations', []);
$ran = array_diff($ran, ['2025_01_04_120000_create_products_table.php']);
update_option('laravel_wp_migrations', $ran);

// Reactivate plugin
```

### Check Database Errors

```php
global $wpdb;
$wpdb->show_errors();

// Run migration
$migrator = new Migrator();
$migrator->run();

// Check for errors
$wpdb->print_error();
```

---

## Summary

**To create and run a migration:**

1. Create file: `database/migrations/YYYY_MM_DD_HHMMSS_description.php`
2. Extend `Migration` class
3. Write `up()` method (create/modify tables)
4. Write `down()` method (rollback)
5. Activate/Reactivate plugin to run migrations

**That's it!** Your database schema is now versioned and portable.

---

## Additional Resources

- **Laravel Schema Builder Docs:** https://laravel.com/docs/11.x/migrations
- **Eloquent ORM Guide:** [ELOQUENT_EXAMPLES.md](ELOQUENT_EXAMPLES.md)
- **Laravel Developer Guide:** [LARAVEL_GUIDE.md](LARAVEL_GUIDE.md)
- **Plugin README:** [README.md](README.md)

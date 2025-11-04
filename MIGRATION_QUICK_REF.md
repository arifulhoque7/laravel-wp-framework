# Migration Quick Reference

Quick reference for creating and running Laravel-style migrations in WordPress.

---

## Quick Start (5 Steps)

### 1. Create Migration File

```bash
# Create file in: database/migrations/
# Format: YYYY_MM_DD_HHMMSS_description.php
```

Example: `2025_01_04_120000_create_products_table.php`

### 2. Write Migration Code

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
            $table->string('name');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        $this->dropIfExists('products');
    }
}
```

### 3. Run Migration

```
WordPress Admin → Plugins → Reactivate "Laravel WP Framework"
```

### 4. Create Model (Optional)

```php
<?php

namespace LaravelWP\Models;

use LaravelWP\Database\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $fillable = ['name'];
}
```

### 5. Use Model

```php
use LaravelWP\Models\Product;

$product = Product::create(['name' => 'Test']);
$products = Product::all();
```

---

## Common Column Types

```php
// Strings
$table->string('name', 255);              // VARCHAR(255)
$table->text('description');              // TEXT
$table->longText('content');              // LONGTEXT

// Numbers
$table->integer('quantity');              // INT
$table->bigInteger('views');              // BIGINT
$table->decimal('price', 10, 2);          // DECIMAL(10,2)
$table->float('rating', 8, 2);            // FLOAT

// Dates
$table->date('birth_date');               // DATE
$table->dateTime('published_at');         // DATETIME
$table->timestamp('verified_at');         // TIMESTAMP
$table->timestamps();                     // created_at + updated_at

// Boolean
$table->boolean('is_active');             // TINYINT(1)

// JSON
$table->json('settings');                 // JSON

// Keys
$table->id();                             // BIGINT UNSIGNED AUTO_INCREMENT
$table->unsignedBigInteger('user_id');    // For foreign keys
```

---

## Common Modifiers

```php
$table->string('email')->nullable();           // Allow NULL
$table->string('status')->default('active');   // Default value
$table->string('email')->unique();             // Unique constraint
$table->integer('age')->unsigned();            // Unsigned (positive only)
$table->string('middle')->after('first');      // Column position
```

---

## Indexes

```php
$table->index('email');                        // Single index
$table->index(['first', 'last']);              // Composite index
$table->unique('email');                       // Unique index
$table->primary('id');                         // Primary key

// Foreign key
$table->foreign('user_id')
      ->references('id')
      ->on('users')
      ->onDelete('cascade');
```

---

## Common Patterns

### Simple Table
```php
$this->create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->decimal('price', 10, 2);
    $table->timestamps();

    $table->index('name');
});
```

### Table with Foreign Key
```php
$this->create('orders', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('product_id');
    $table->timestamps();

    $table->foreign('product_id')
          ->references('id')
          ->on('products')
          ->onDelete('cascade');
});
```

### Add Column to Existing Table
```php
$this->table('products', function (Blueprint $table) {
    $table->string('category')->after('name');
});
```

### Drop Column
```php
$this->table('products', function (Blueprint $table) {
    $table->dropColumn('category');
});
```

---

## Migration Methods

```php
// Create table
$this->create('table_name', function (Blueprint $table) {
    // columns...
});

// Modify existing table
$this->table('table_name', function (Blueprint $table) {
    // changes...
});

// Drop table
$this->dropIfExists('table_name');

// Rename table
$this->rename('old_name', 'new_name');
```

---

## Eloquent Model Quick Ref

```php
// Create
$product = Product::create(['name' => 'Test', 'price' => 99.99]);

// Read
$products = Product::all();
$product = Product::find(1);
$products = Product::where('price', '>', 50)->get();

// Update
$product->price = 79.99;
$product->save();

// Delete
$product->delete();

// Query with scopes
$products = Product::active()->where('price', '<', 100)->get();

// Pagination
$products = Product::paginate(15);

// Count
$count = Product::count();
$activeCount = Product::where('status', 'active')->count();
```

---

## Troubleshooting

### Migration Not Running?
```php
// Check if already executed
$ran = get_option('laravel_wp_migrations', []);
print_r($ran);
```

### Force Re-run (Dev Only)
```php
// Remove from executed list
$ran = get_option('laravel_wp_migrations', []);
$ran = array_diff($ran, ['2025_01_04_120000_create_products_table.php']);
update_option('laravel_wp_migrations', $ran);

// Drop table manually
global $wpdb;
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}products");

// Reactivate plugin
```

### Check for Errors
```php
global $wpdb;
$wpdb->show_errors();
$wpdb->print_error();
```

---

## File Structure

```
laravel-wp-framework/
├── database/
│   └── migrations/
│       ├── 2025_01_01_000001_create_items_table.php
│       └── 2025_01_04_120000_create_products_table.php  ← Your migrations
├── app/
│   └── Models/
│       ├── Item.php
│       └── Product.php  ← Your models
```

---

## Need More Help?

- **Full Guide:** [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- **Eloquent Examples:** [ELOQUENT_EXAMPLES.md](ELOQUENT_EXAMPLES.md)
- **Laravel Docs:** https://laravel.com/docs/11.x/migrations

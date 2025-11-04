# Laravel Developer's Guide to WordPress Plugin Development

Welcome, Laravel developers! This guide will help you leverage your Laravel knowledge to build WordPress plugins using familiar patterns and tools.

## Table of Contents

1. [Why This Framework?](#why-this-framework)
2. [Key Differences from Laravel](#key-differences-from-laravel)
3. [Laravel Concepts Mapping](#laravel-concepts-mapping)
4. [Getting Started](#getting-started)
5. [Database & Eloquent](#database--eloquent)
6. [Routing & Controllers](#routing--controllers)
7. [Service Container & Dependency Injection](#service-container--dependency-injection)
8. [Views & Frontend](#views--frontend)
9. [Best Practices](#best-practices)

---

## Why This Framework?

As a Laravel developer, you're used to:
- **Eloquent ORM** for database operations
- **MVC architecture** for clean code organization
- **Service providers** for bootstrapping
- **Modern PHP** with type hints and strict types
- **Composer** for dependency management

This framework brings **all of these** to WordPress plugin development! 🎉

---

## Key Differences from Laravel

| Feature | Laravel | This Framework |
|---------|---------|----------------|
| **Routing** | `routes/web.php` + Router | WordPress hooks + REST API |
| **Views** | Blade templates | React + PHP templates |
| **Service Container** | Full IoC container | Basic service provider pattern |
| **Migrations** | Artisan commands | Plugin activation hooks |
| **Config** | `config/` files | WordPress + custom config |
| **Authentication** | Laravel Auth | WordPress user system |
| **ORM** | Eloquent ✅ | Eloquent ✅ (Same!) |

---

## Laravel Concepts Mapping

### 1. Models → Eloquent Models

**Laravel:**
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content'];
}
```

**WordPress Plugin (This Framework):**
```php
namespace LaravelWP\Models;

use LaravelWP\Database\Model; // Extends Eloquent Model

class Item extends Model
{
    protected $table = 'items'; // wp_ prefix added automatically
    protected $fillable = ['title', 'content'];
}
```

**✨ It's the same Eloquent you know and love!**

---

### 2. Controllers → Controllers (Same!)

**Laravel:**
```php
namespace App\Http\Controllers;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();
        return view('items.index', compact('items'));
    }
}
```

**WordPress Plugin:**
```php
namespace LaravelWP\Controllers\Api;

class ApiController
{
    public function getItems(\WP_REST_Request $request)
    {
        $items = Item::active()->get();
        return rest_ensure_response($items);
    }
}
```

---

### 3. Routes → WordPress Hooks + REST API

**Laravel:**
```php
// routes/web.php
Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);
```

**WordPress Plugin:**
```php
// In your ApiController
public function register(): void
{
    add_action('rest_api_init', function () {
        register_rest_route('laravel-wp/v1', '/items', [
            'methods' => 'GET',
            'callback' => [$this, 'getItems'],
        ]);

        register_rest_route('laravel-wp/v1', '/items', [
            'methods' => 'POST',
            'callback' => [$this, 'createItem'],
        ]);
    });
}
```

---

### 4. Migrations → Migration Classes

**Laravel:**
```php
// database/migrations/2025_01_01_000000_create_items_table.php
public function up()
{
    Schema::create('items', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->timestamps();
    });
}
```

**WordPress Plugin:**
```php
// database/migrations/2025_01_01_000001_create_items_table.php
namespace LaravelWP\Database\Migrations;

use LaravelWP\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateItemsTable extends Migration
{
    public function up(): void
    {
        $this->create('items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        $this->dropIfExists('items');
    }
}
```

**Run migrations on plugin activation automatically!**

---

### 5. Service Providers → Service Providers

**Laravel:**
```php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Bind services
    }

    public function boot()
    {
        // Bootstrap
    }
}
```

**WordPress Plugin:**
```php
namespace LaravelWP\Providers;

class AppServiceProvider
{
    public function register(): void
    {
        // Register helpers
        require_once LARAVEL_WP_PATH . 'app/Helpers.php';

        // Add WordPress hooks
        add_action('init', [$this, 'init']);
    }
}
```

---

### 6. Config → Config Files

**Laravel:**
```php
// config/app.php
return [
    'name' => 'My App',
    'version' => '1.0.0',
];

// Usage
$name = config('app.name');
```

**WordPress Plugin:**
```php
// config/app.php
return [
    'name' => 'Laravel WP Framework',
    'version' => LARAVEL_WP_VERSION,
];

// Usage
$name = App::config('name');
$name = laravel_wp_config('name'); // Helper function
```

---

### 7. Eloquent Queries → Exactly the Same!

**Laravel & WordPress Plugin (Identical):**

```php
// Simple queries
$items = Item::all();
$item = Item::find(1);

// Where clauses
$items = Item::where('status', 'active')->get();

// Eager loading
$items = Item::with('comments')->get();

// Scopes
$items = Item::active()->recent()->get();

// Aggregates
$count = Item::where('status', 'active')->count();

// Chunking
Item::chunk(100, function ($items) {
    // Process
});

// Collections
$items = Item::all();
$titles = $items->pluck('title');
$filtered = $items->filter(fn($item) => $item->isActive());
```

**No learning curve here! 🎯**

---

## Getting Started

### Installation

1. **Install Composer dependencies:**
```bash
cd wp-content/plugins/laravel-wp-framework
composer install
```

2. **Build React apps (optional):**
```bash
npm install
npm run build
```

3. **Activate plugin in WordPress:**
- Go to Plugins → Installed Plugins
- Activate "Laravel WP Framework"
- Migrations run automatically on activation!

---

### Project Structure (Familiar!)

```
laravel-wp-framework/
├── app/
│   ├── Controllers/        # MVC Controllers
│   │   ├── Admin/         # Admin area
│   │   ├── Api/           # REST API endpoints
│   │   └── Web/           # Frontend
│   ├── Database/          # Eloquent setup
│   │   ├── Model.php      # Base model
│   │   ├── Migration.php  # Base migration
│   │   └── Migrator.php   # Migration runner
│   ├── Models/            # Eloquent models
│   │   └── Item.php
│   ├── Services/          # Business logic
│   │   └── ExampleService.php
│   └── Providers/         # Service providers
│       └── AppServiceProvider.php
├── bootstrap/
│   └── app.php            # Application bootstrap
├── config/
│   └── app.php            # Configuration
├── database/
│   └── migrations/        # Database migrations
├── resources/             # Source assets
│   ├── admin/            # Admin React app
│   └── frontend/         # Frontend React app
├── build/                # Compiled assets
├── vendor/               # Composer dependencies
└── composer.json         # Composer config
```

**Feels like home, right?** 🏠

---

## Database & Eloquent

### Creating a New Model

```php
<?php

namespace LaravelWP\Models;

use LaravelWP\Database\Model;

class Product extends Model
{
    // Table name (wp_ prefix auto-added)
    protected $table = 'products';

    // Mass assignable fields
    protected $fillable = [
        'name',
        'price',
        'description',
        'stock',
    ];

    // Cast attributes
    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    // Timestamps
    public $timestamps = true;

    // Scopes
    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    public function scopeExpensive($query, $price = 100)
    {
        return $query->where('price', '>', $price);
    }

    // Accessors
    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 2);
    }

    // Mutators (auto-sanitization)
    public function setNameAttribute(string $value): void
    {
        $this->attributes['name'] = sanitize_text_field($value);
    }
}
```

### Creating a Migration

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
            $table->decimal('price', 10, 2);
            $table->text('description')->nullable();
            $table->integer('stock')->default(0);
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();

            // Indexes
            $table->index('user_id');
            $table->index('stock');
        });
    }

    public function down(): void
    {
        $this->dropIfExists('products');
    }
}
```

**Save as:** `database/migrations/2025_01_01_000002_create_products_table.php`

### Using the Model

```php
use LaravelWP\Models\Product;

// Create
$product = Product::create([
    'name' => 'Laravel Book',
    'price' => 49.99,
    'description' => 'Best book ever',
    'stock' => 100,
]);

// Read
$products = Product::inStock()->get();
$expensive = Product::expensive(200)->get();

// Update
$product->stock -= 1;
$product->save();

// Delete
$product->delete();

// Complex query
$results = Product::where('stock', '>', 0)
    ->where('price', '<', 100)
    ->orderBy('name')
    ->limit(10)
    ->get();
```

---

## Routing & Controllers

### REST API Controller

```php
<?php

namespace LaravelWP\Controllers\Api;

use LaravelWP\Models\Product;
use LaravelWP\Services\ProductService;

class ProductApiController
{
    private ProductService $service;

    public function __construct()
    {
        $this->service = new ProductService();
    }

    public function register(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes(): void
    {
        // GET /wp-json/laravel-wp/v1/products
        register_rest_route('laravel-wp/v1', '/products', [
            'methods' => 'GET',
            'callback' => [$this, 'index'],
            'permission_callback' => '__return_true',
        ]);

        // POST /wp-json/laravel-wp/v1/products
        register_rest_route('laravel-wp/v1', '/products', [
            'methods' => 'POST',
            'callback' => [$this, 'store'],
            'permission_callback' => [$this, 'checkAuth'],
        ]);

        // GET /wp-json/laravel-wp/v1/products/{id}
        register_rest_route('laravel-wp/v1', '/products/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [$this, 'show'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function index(\WP_REST_Request $request)
    {
        $products = Product::inStock()
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return rest_ensure_response($products);
    }

    public function store(\WP_REST_Request $request)
    {
        try {
            $product = $this->service->createProduct(
                $request->get_param('name'),
                $request->get_param('price'),
                $request->get_param('description')
            );

            return rest_ensure_response($product);
        } catch (\Exception $e) {
            return new \WP_Error(
                'creation_failed',
                $e->getMessage(),
                ['status' => 400]
            );
        }
    }

    public function show(\WP_REST_Request $request)
    {
        $product = Product::find($request['id']);

        if (!$product) {
            return new \WP_Error(
                'not_found',
                'Product not found',
                ['status' => 404]
            );
        }

        return rest_ensure_response($product);
    }

    private function checkAuth(): bool
    {
        return current_user_can('manage_options');
    }
}
```

### Register Controller in Bootstrap

```php
// bootstrap/app.php
private static function initControllers(): void
{
    $productController = new \LaravelWP\Controllers\Api\ProductApiController();
    $productController->register();
}
```

---

## Service Container & Dependency Injection

While this framework doesn't have Laravel's full IoC container, you can use simple dependency injection:

```php
namespace LaravelWP\Services;

use LaravelWP\Models\Product;

class ProductService
{
    public function createProduct(string $name, float $price, ?string $description = null): Product
    {
        // Validation
        if (empty($name)) {
            throw new \Exception('Name is required');
        }

        if ($price <= 0) {
            throw new \Exception('Price must be positive');
        }

        // Create product
        return Product::create([
            'name' => $name,
            'price' => $price,
            'description' => $description,
            'user_id' => get_current_user_id(),
        ]);
    }

    public function getInStockProducts()
    {
        return Product::inStock()
            ->orderBy('name')
            ->get();
    }
}
```

**Usage in controllers:**

```php
class ProductApiController
{
    private ProductService $service;

    public function __construct()
    {
        $this->service = new ProductService();
    }

    public function store(\WP_REST_Request $request)
    {
        $product = $this->service->createProduct(...);
        return rest_ensure_response($product);
    }
}
```

---

## Views & Frontend

### React Applications

This framework includes **two separate React apps**:

1. **Admin App** (`resources/admin/js/`)
2. **Frontend App** (`resources/frontend/js/`)

Both use **@wordpress/scripts** for building and **Tailwind CSS** for styling.

### Fetching Data in React

```jsx
import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch({ path: '/laravel-wp/v1/products' })
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map(product => (
                <div key={product.id} className="border p-4">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                </div>
            ))}
        </div>
    );
}
```

### Building Assets

```bash
# Development (watch mode)
npm run start

# Production build
npm run build
```

---

## Best Practices

### 1. Always Use Eloquent for Database Operations

**❌ Don't do this:**
```php
global $wpdb;
$results = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}items");
```

**✅ Do this:**
```php
$results = Item::all();
```

### 2. Use Services for Business Logic

**❌ Don't put logic in controllers:**
```php
public function store(\WP_REST_Request $request)
{
    // 50 lines of validation and logic here
}
```

**✅ Use services:**
```php
public function store(\WP_REST_Request $request)
{
    return $this->service->createItem($request->all());
}
```

### 3. Use Model Mutators for Sanitization

**✅ Automatic sanitization:**
```php
class Item extends Model
{
    public function setTitleAttribute(string $value): void
    {
        $this->attributes['title'] = sanitize_text_field($value);
    }
}

// Now all titles are automatically sanitized
$item = Item::create(['title' => '<script>alert("xss")</script>']);
```

### 4. Use Scopes for Reusable Queries

**✅ Define once, use everywhere:**
```php
class Item extends Model
{
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}

// Use in multiple places
$items = Item::active()->get();
$count = Item::active()->count();
$recent = Item::active()->recent()->get();
```

### 5. Use Migrations for Database Schema

**✅ Version control your database:**
- Migrations run automatically on plugin activation
- Easy to add new fields or tables
- Rollback capability
- Team-friendly

### 6. Type Hint Everything

```php
public function createItem(string $title, ?string $content = null): Item
{
    return Item::create([
        'title' => $title,
        'content' => $content,
    ]);
}
```

---

## Common Laravel Patterns in WordPress

### Request Validation (Laravel-style)

```php
public function store(\WP_REST_Request $request)
{
    // Define validation rules
    $rules = [
        'title' => 'required|max:255',
        'price' => 'required|numeric|min:0',
    ];

    // Validate (custom helper)
    $errors = $this->validate($request, $rules);

    if (!empty($errors)) {
        return new \WP_Error('validation_failed', 'Validation failed', [
            'status' => 422,
            'errors' => $errors,
        ]);
    }

    // Create item
    $item = Item::create($request->all());

    return rest_ensure_response($item);
}
```

### Resource Transformers

```php
class ItemResource
{
    public static function transform(Item $item): array
    {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'content' => $item->content,
            'status' => $item->status_label,
            'author' => $item->author_name,
            'created_at' => $item->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $item->updated_at->format('Y-m-d H:i:s'),
        ];
    }

    public static function collection($items): array
    {
        return $items->map(fn($item) => self::transform($item))->toArray();
    }
}

// Usage
$items = Item::all();
return rest_ensure_response(ItemResource::collection($items));
```

---

## Comparison: wpdb vs Eloquent

### wpdb (Old way)

```php
global $wpdb;

// Insert
$wpdb->insert(
    $wpdb->prefix . 'items',
    ['title' => 'Test', 'content' => 'Content'],
    ['%s', '%s']
);

// Select
$items = $wpdb->get_results(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}items WHERE status = %s",
        'active'
    )
);

// Update
$wpdb->update(
    $wpdb->prefix . 'items',
    ['title' => 'Updated'],
    ['id' => 1],
    ['%s'],
    ['%d']
);

// Delete
$wpdb->delete(
    $wpdb->prefix . 'items',
    ['id' => 1],
    ['%d']
);
```

### Eloquent (New way - Much cleaner!)

```php
use LaravelWP\Models\Item;

// Insert
$item = Item::create([
    'title' => 'Test',
    'content' => 'Content',
]);

// Select
$items = Item::where('status', 'active')->get();

// Update
$item = Item::find(1);
$item->title = 'Updated';
$item->save();

// Delete
Item::destroy(1);

// Complex query
$items = Item::where('status', 'active')
    ->where('user_id', get_current_user_id())
    ->orderBy('created_at', 'desc')
    ->limit(10)
    ->get();
```

**Which one would you prefer?** 😊

---

## Next Steps

1. ✅ **Read** [ELOQUENT_EXAMPLES.md](ELOQUENT_EXAMPLES.md) for comprehensive Eloquent examples
2. 📖 **Study** the `Item` model to understand WordPress integration
3. 🛠️ **Create** your first model and migration
4. 🚀 **Build** your API endpoints using Eloquent
5. ⚛️ **Connect** your React frontend to the API

---

## Need Help?

- Check [Laravel Eloquent Docs](https://laravel.com/docs/11.x/eloquent)
- Review example files in `app/Models/Item.php`
- Look at migration examples in `database/migrations/`
- Examine API controller in `app/Controllers/Api/ApiController.php`

---

**Welcome to Laravel-style WordPress development!** 🎊

You now have the power of Eloquent ORM, MVC architecture, and modern PHP in your WordPress plugins. No more `$wpdb` spaghetti code!

Happy coding! 🚀

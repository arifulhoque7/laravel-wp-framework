# Eloquent ORM Examples for WordPress

This document provides comprehensive examples of using Laravel's Eloquent ORM within WordPress plugins. All examples use the `Item` model as reference.

## Table of Contents

1. [Basic CRUD Operations](#basic-crud-operations)
2. [Query Builder Methods](#query-builder-methods)
3. [Advanced Queries](#advanced-queries)
4. [Relationships](#relationships)
5. [Model Events](#model-events)
6. [Scopes](#scopes)
7. [Collections](#collections)
8. [Raw Queries](#raw-queries)

---

## Basic CRUD Operations

### Create (Insert)

```php
use LaravelWP\Models\Item;

// Method 1: Using create() with mass assignment
$item = Item::create([
    'title' => 'My First Item',
    'content' => 'This is the content',
    'status' => 'active',
]);

// Method 2: Using new + save()
$item = new Item();
$item->title = 'My Second Item';
$item->content = 'More content here';
$item->save();

// Method 3: Using firstOrCreate() - Find or create
$item = Item::firstOrCreate(
    ['title' => 'Unique Title'],
    ['content' => 'Default content', 'status' => 'active']
);
```

### Read (Select)

```php
// Find by primary key
$item = Item::find(1);

// Find or fail (throws exception if not found)
$item = Item::findOrFail(1);

// Find by multiple IDs
$items = Item::find([1, 2, 3]);

// Get all items
$items = Item::all();

// Get first item
$item = Item::first();

// Get first or fail
$item = Item::firstOrFail();

// Find by specific column
$item = Item::where('title', 'My Item')->first();
```

### Update

```php
// Method 1: Find and update
$item = Item::find(1);
$item->title = 'Updated Title';
$item->save();

// Method 2: Mass update with where()
Item::where('status', 'draft')
    ->update(['status' => 'active']);

// Method 3: Update or create
$item = Item::updateOrCreate(
    ['title' => 'My Item'], // Search criteria
    ['content' => 'Updated content'] // Values to update/create
);

// Method 4: Increment/Decrement (for numeric fields)
// $item->increment('view_count');
// $item->decrement('stock');
```

### Delete

```php
// Method 1: Find and delete
$item = Item::find(1);
$item->delete();

// Method 2: Delete by ID
Item::destroy(1);

// Method 3: Delete multiple by IDs
Item::destroy([1, 2, 3]);

// Method 4: Delete with conditions
Item::where('status', 'archived')->delete();
```

---

## Query Builder Methods

### Where Clauses

```php
// Simple where
$items = Item::where('status', 'active')->get();

// Where with operator
$items = Item::where('id', '>', 10)->get();

// Multiple where conditions (AND)
$items = Item::where('status', 'active')
            ->where('user_id', get_current_user_id())
            ->get();

// OR conditions
$items = Item::where('status', 'active')
            ->orWhere('status', 'featured')
            ->get();

// Where In
$items = Item::whereIn('status', ['active', 'featured'])->get();

// Where Not In
$items = Item::whereNotIn('status', ['archived', 'deleted'])->get();

// Where Null / Not Null
$items = Item::whereNull('deleted_at')->get();
$items = Item::whereNotNull('user_id')->get();

// Where Between
$items = Item::whereBetween('id', [1, 100])->get();

// Where Date
$items = Item::whereDate('created_at', '2025-01-01')->get();

// Where Like
$items = Item::where('title', 'like', '%WordPress%')->get();
```

### Ordering and Limiting

```php
// Order By
$items = Item::orderBy('created_at', 'desc')->get();

// Multiple Order By
$items = Item::orderBy('status', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

// Latest / Oldest (uses created_at)
$items = Item::latest()->get();
$items = Item::oldest()->get();

// Limit / Take
$items = Item::limit(10)->get();
$items = Item::take(10)->get();

// Offset / Skip
$items = Item::skip(10)->take(10)->get();

// Pagination
$items = Item::paginate(15); // 15 per page
$items = Item::simplePaginate(15); // Simple pagination
```

### Selecting Specific Columns

```php
// Select specific columns
$items = Item::select('id', 'title', 'status')->get();

// Add columns to selection
$items = Item::select('id', 'title')
            ->addSelect('content')
            ->get();

// Select distinct
$statuses = Item::distinct()->pluck('status');
```

---

## Advanced Queries

### Aggregates

```php
// Count
$count = Item::count();
$activeCount = Item::where('status', 'active')->count();

// Max / Min
$maxId = Item::max('id');
$minId = Item::min('id');

// Sum / Average (for numeric columns)
// $total = Item::sum('price');
// $average = Item::avg('rating');

// Check existence
$exists = Item::where('title', 'My Item')->exists();
```

### Group By and Having

```php
// Group By
$items = Item::select('status', \DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get();

// Having
$items = Item::select('user_id', \DB::raw('count(*) as total'))
            ->groupBy('user_id')
            ->having('total', '>', 5)
            ->get();
```

### Conditional Clauses

```php
// when() - conditional query building
$status = 'active';

$items = Item::query()
    ->when($status, function ($query, $status) {
        return $query->where('status', $status);
    })
    ->get();

// unless() - inverse of when()
$items = Item::query()
    ->unless(empty($status), function ($query) use ($status) {
        return $query->where('status', $status);
    })
    ->get();
```

### Chunking Results

```php
// Process large datasets in chunks
Item::chunk(100, function ($items) {
    foreach ($items as $item) {
        // Process each item
        error_log("Processing: " . $item->title);
    }
});

// Lazy loading (for memory efficiency)
Item::lazy()->each(function ($item) {
    // Process each item
});
```

---

## Relationships

### One-to-Many Example (User has many Items)

```php
// In your Item model (app/Models/Item.php)
public function user()
{
    return $this->belongsTo(\WP_User::class, 'user_id');
}

// Usage
$item = Item::find(1);
$user = get_user_by('id', $item->user_id); // WordPress user object

// Eager Loading (prevents N+1 queries)
$items = Item::with('user_id')->get();
```

### Creating Custom Relationship Example

```php
namespace LaravelWP\Models;

use LaravelWP\Database\Model;

class Post extends Model
{
    protected $table = 'posts';

    // One-to-many: Post has many comments
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }
}

class Comment extends Model
{
    protected $table = 'comments';

    // Inverse: Comment belongs to Post
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}

// Usage
$post = Post::find(1);
$comments = $post->comments; // Collection of comments
$firstComment = $post->comments()->first();
```

---

## Model Events

### Available Events

```php
// In your model's boot() method:
protected static function boot()
{
    parent::boot();

    // Before creating
    static::creating(function ($item) {
        $item->user_id = get_current_user_id();
    });

    // After creating
    static::created(function ($item) {
        error_log("Item created: " . $item->id);
    });

    // Before updating
    static::updating(function ($item) {
        $item->updated_at = current_time('mysql');
    });

    // After updating
    static::updated(function ($item) {
        error_log("Item updated: " . $item->id);
    });

    // Before saving (create or update)
    static::saving(function ($item) {
        $item->title = sanitize_text_field($item->title);
    });

    // After saving
    static::saved(function ($item) {
        // Clear cache, send notification, etc.
    });

    // Before deleting
    static::deleting(function ($item) {
        // Delete related records, etc.
    });

    // After deleting
    static::deleted(function ($item) {
        error_log("Item deleted: " . $item->id);
    });
}
```

---

## Scopes

### Global Scopes

```php
// In your model
protected static function boot()
{
    parent::boot();

    // Always filter by current user
    static::addGlobalScope('currentUser', function ($query) {
        if (is_user_logged_in()) {
            $query->where('user_id', get_current_user_id());
        }
    });
}

// Remove global scope
$items = Item::withoutGlobalScope('currentUser')->get();
```

### Local Scopes (Query Scopes)

```php
// In your model
public function scopeActive($query)
{
    return $query->where('status', 'active');
}

public function scopeRecent($query, $days = 7)
{
    return $query->where('created_at', '>=', now()->subDays($days));
}

public function scopeByUser($query, $userId)
{
    return $query->where('user_id', $userId);
}

// Usage
$items = Item::active()->get();
$items = Item::active()->recent(7)->get();
$items = Item::byUser(1)->orderBy('created_at', 'desc')->get();

// Chain multiple scopes
$items = Item::active()
            ->recent(30)
            ->orderBy('title')
            ->limit(10)
            ->get();
```

---

## Collections

### Working with Collections

```php
$items = Item::all();

// Count
$count = $items->count();

// Filter
$activeItems = $items->filter(function ($item) {
    return $item->status === 'active';
});

// Map
$titles = $items->map(function ($item) {
    return $item->title;
});

// Pluck
$ids = $items->pluck('id');
$titlesByIds = $items->pluck('title', 'id');

// First / Last
$first = $items->first();
$last = $items->last();

// Find in collection
$item = $items->find(1);

// Group By
$grouped = $items->groupBy('status');

// Sort
$sorted = $items->sortBy('title');
$sorted = $items->sortByDesc('created_at');

// Chunk
$items->chunk(10)->each(function ($chunk) {
    // Process each chunk
});

// To Array / JSON
$array = $items->toArray();
$json = $items->toJson();
```

---

## Raw Queries

### Using DB Facade

```php
use Illuminate\Support\Facades\DB;
use LaravelWP\Database\DatabaseServiceProvider;

// Get connection
$db = DatabaseServiceProvider::connection();

// Select query
$items = $db->table('items')->where('status', 'active')->get();

// Raw query
$items = $db->select('SELECT * FROM wp_items WHERE status = ?', ['active']);

// Insert
$db->table('items')->insert([
    'title' => 'New Item',
    'content' => 'Content',
    'status' => 'active',
    'created_at' => current_time('mysql'),
    'updated_at' => current_time('mysql'),
]);

// Update
$db->table('items')->where('id', 1)->update([
    'status' => 'inactive',
]);

// Delete
$db->table('items')->where('status', 'archived')->delete();

// Transactions
$db->transaction(function () use ($db) {
    $db->table('items')->insert([...]);
    $db->table('items')->update([...]);
});
```

---

## WordPress Integration Examples

### Current User Integration

```php
// Get current user's items
$items = Item::byCurrentUser()->get();

// Create item for current user (automatic via boot method)
$item = Item::create([
    'title' => 'My Item',
    'content' => 'Content',
]);

// Get item author name
$item = Item::find(1);
$authorName = $item->author_name; // Uses accessor
```

### Using with WordPress Hooks

```php
// In your controller or service
add_action('wp_ajax_get_items', function () {
    $items = Item::active()
                ->recent(30)
                ->limit(10)
                ->get();

    wp_send_json_success($items);
});

// REST API integration
add_action('rest_api_init', function () {
    register_rest_route('laravel-wp/v1', '/items', [
        'methods' => 'GET',
        'callback' => function () {
            $items = Item::active()->get();
            return rest_ensure_response($items);
        },
    ]);
});
```

---

## Best Practices

1. **Always sanitize user input** - Use mutators in your model
2. **Use mass assignment protection** - Define `$fillable` or `$guarded`
3. **Leverage scopes** - Keep queries DRY and reusable
4. **Use eager loading** - Prevent N+1 query problems
5. **Use transactions** - For multiple related operations
6. **Index your columns** - Add indexes in migrations for frequently queried columns
7. **Use chunking** - For large datasets to prevent memory issues

---

## Migration Commands

```php
// Run migrations (in plugin activation)
$migrator = new \LaravelWP\Database\Migrator();
$migrator->run();

// Rollback migrations
$migrator->rollback();

// Check pending migrations
$pending = $migrator->getPendingMigrations();
```

---

## Additional Resources

- [Laravel Eloquent Documentation](https://laravel.com/docs/11.x/eloquent)
- [Laravel Query Builder Documentation](https://laravel.com/docs/11.x/queries)
- [Laravel Collections Documentation](https://laravel.com/docs/11.x/collections)

---

**Happy coding with Eloquent ORM in WordPress!** 🚀

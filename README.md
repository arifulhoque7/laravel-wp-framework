# Laravel WP Framework

A professional, Laravel-inspired WordPress plugin architecture with **Eloquent ORM**, separated admin and frontend React applications, modern PHP 8.3+ practices, and clean MVC structure.

**🎉 Now with full Laravel Eloquent ORM support!** No more `$wpdb` - use familiar Laravel database patterns in WordPress.

![WordPress Plugin Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![PHP Version](https://img.shields.io/badge/PHP-8.3%2B-777BB4.svg)
![WordPress Version](https://img.shields.io/badge/WordPress-6.0%2B-21759B.svg)
![License](https://img.shields.io/badge/license-GPL--2.0-green.svg)

## 🚀 Quick Start

### Step 1: Install the Plugin

```bash
cd wp-content/plugins
git clone https://github.com/arifulhoque7/laravel-wp-framework.git
cd laravel-wp-framework

# Install Composer dependencies (Eloquent ORM)
composer install

# Install Node dependencies and build React apps
npm install
npm run build
```

### Step 2: Activate in WordPress

Go to **WordPress Admin → Plugins** and activate "Laravel WP Framework"

**Migrations run automatically on activation!** Your database tables are created using Laravel-style migrations.

### Step 3: Start Using Eloquent

```php
use LaravelWP\Models\Item;

// Create an item (Laravel-style)
$item = Item::create([
    'title' => 'My First Item',
    'content' => 'This is amazing!',
    'status' => 'active',
]);

// Query items (exactly like Laravel)
$items = Item::where('status', 'active')
    ->orderBy('created_at', 'desc')
    ->get();
```

### Step 4: Access the Dashboard

Visit **Dashboard → Laravel WP** to see your React-powered admin interface

### Step 5: Use the Frontend Shortcode

Add `[laravel_wp_app]` to any page to display the frontend React application

**That's it!** 🎉 Your Laravel-style WordPress plugin with Eloquent ORM is ready to use.

---

## Features

### 💎 Laravel Eloquent ORM
- **Full Eloquent ORM support** - Use `Item::where('status', 'active')->get()` instead of `$wpdb`
- **Laravel-style migrations** - Database schema version control with `up()` and `down()` methods
- **Eloquent relationships** - Define and use model relationships just like Laravel
- **Query scopes** - Reusable query logic with local and global scopes
- **Model events** - Hooks for creating, updating, deleting, etc.
- **Automatic timestamps** - `created_at` and `updated_at` handled automatically
- **Eloquent collections** - Powerful collection methods like `map()`, `filter()`, `pluck()`

### 🏗️ Laravel-Inspired Architecture
- **MVC Structure**: Clean separation with Controllers, Services, Models, and Providers
- **Service Layer**: Business logic separated from controllers
- **Dependency Injection**: Simple but effective DI pattern
- **Configuration System**: Laravel-style config files with dot notation

### ⚛️ Modern Frontend
- **React-Powered**: Separate admin dashboard and frontend applications
- **shadcn/ui-Inspired Design**: Clean black & white aesthetic using Tailwind CSS
- **Lucide Icons**: Modern, beautiful icons from lucide-react
- **WordPress Scripts**: Built using @wordpress/scripts for perfect compatibility
- **Responsive**: Mobile-first design approach

### 🔌 REST API & Integration
- **Well-Structured REST API**: Endpoints following WordPress REST API standards
- **Type-Safe Controllers**: PHP 8.3+ type hints throughout
- **Automatic Sanitization**: Model mutators for data sanitization
- **WordPress Integration**: Seamless integration with WordPress user system

### 🚀 Developer Experience
- **PSR-4 Autoloading**: Modern PHP autoloading standards
- **Composer Support**: Laravel packages work out of the box
- **Migration System**: Automatic database setup on plugin activation
- **Comprehensive Documentation**: Laravel developer guide included
- **PHP 8.3+**: Modern PHP features including union types and attributes

## Requirements

- WordPress 6.0 or higher
- PHP 8.3 or higher
- Node.js 22.0 or higher (for development)
- npm 10.0 or higher (for development)

## Installation

### For Users

1. Download the plugin ZIP file
2. Go to WordPress Admin → Plugins → Add New
3. Click "Upload Plugin" and select the ZIP file
4. Click "Install Now" and then "Activate"

### For Developers

1. Clone this repository into your `wp-content/plugins` directory:
   ```bash
   cd wp-content/plugins
   git clone https://github.com/arifulhoque7/laravel-wp-framework.git
   cd laravel-wp-framework
   ```

2. Install Composer dependencies (Eloquent ORM):
   ```bash
   composer install
   ```

3. Install Node dependencies:
   ```bash
   npm install
   ```

4. Build assets:
   ```bash
   npm run build
   ```

5. Activate the plugin in WordPress Admin

**Migrations will run automatically on activation!**

## 📖 How to Use

### Using Eloquent ORM (For Laravel Developers)

This framework includes **full Laravel Eloquent ORM support**! No more `$wpdb` queries.

#### Basic Examples

```php
use LaravelWP\Models\Item;

// Create
$item = Item::create([
    'title' => 'My Item',
    'content' => 'Content here',
    'status' => 'active',
]);

// Read
$items = Item::all();
$item = Item::find(1);
$activeItems = Item::where('status', 'active')->get();

// Update
$item = Item::find(1);
$item->title = 'Updated Title';
$item->save();

// Delete
$item->delete();

// Query Builder
$items = Item::where('status', 'active')
    ->where('user_id', get_current_user_id())
    ->orderBy('created_at', 'desc')
    ->limit(10)
    ->get();

// Scopes
$items = Item::active()->recent(7)->get();

// Aggregates
$count = Item::where('status', 'active')->count();
$maxId = Item::max('id');
```

#### Creating Your Own Models

1. **Create a migration** in `database/migrations/`:

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
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        $this->dropIfExists('products');
    }
}
```

2. **Create a model** in `app/Models/`:

```php
<?php
namespace LaravelWP\Models;

use LaravelWP\Database\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $fillable = ['name', 'price'];
}
```

3. **Use it** anywhere:

```php
$product = Product::create(['name' => 'Book', 'price' => 29.99]);
$products = Product::where('price', '<', 50)->get();
```

📚 **See comprehensive examples**: [ELOQUENT_EXAMPLES.md](ELOQUENT_EXAMPLES.md)
📖 **Laravel Developer Guide**: [LARAVEL_GUIDE.md](LARAVEL_GUIDE.md)

### Admin Dashboard

After activation, navigate to **Dashboard → Laravel WP** in your WordPress admin to access the React-powered admin dashboard.

The admin dashboard provides:
- System information and statistics
- Item management with create/read operations
- Real-time API integration
- Beautiful, intuitive interface

### Frontend Shortcode

Use the `[laravel_wp_app]` shortcode to display the frontend React application on any page or post.

**Basic usage:**
```
[laravel_wp_app]
```

**With attributes:**
```
[laravel_wp_app title="My App" show_header="true"]
```

**Attributes:**
- `title`: Custom title for the app
- `show_header`: Show/hide header (default: "true")

### REST API Endpoints

The plugin provides several REST API endpoints:

#### Get Data
```
GET /wp-json/laravel-wp/v1/data
```
Returns system information and statistics (public endpoint).

#### Get Items
```
GET /wp-json/laravel-wp/v1/items
```
Returns all items (requires authentication).

#### Create Item
```
POST /wp-json/laravel-wp/v1/items
```
Creates a new item (requires authentication).

**Body:**
```json
{
  "title": "Item Title",
  "content": "Item content"
}
```

### Practical Examples

#### Example 1: Display Frontend App on Homepage

Edit your homepage or create a new page, then add:

```
[laravel_wp_app]
```

Save and view the page to see the React app in action!

#### Example 2: Create Items via API

Using JavaScript:

```javascript
// Get WordPress REST API nonce
const nonce = document.querySelector('#wp-rest-nonce')?.value;

// Create a new item
fetch('/wp-json/laravel-wp/v1/items', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': nonce
  },
  body: JSON.stringify({
    title: 'My New Item',
    content: 'This is the content of my new item'
  })
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

#### Example 3: Customize the Admin Dashboard

1. Navigate to `resources/admin/js/index.js`
2. Modify the `AdminApp` component
3. Run `npm run build:admin` to rebuild
4. Refresh your WordPress admin dashboard

#### Example 4: Add Custom Service

Create a new service in `app/Services/`:

```php
<?php
namespace LaravelWP\Services;

class MyCustomService {
    public function processData(array $data): array {
        // Your business logic here
        return $data;
    }
}
```

Then use it in your controller:

```php
$myService = new MyCustomService();
$result = $myService->processData($data);
```

## Development

### Directory Structure

```
laravel-wp-framework/
├── app/                    # PHP application code
│   ├── Controllers/        # Controllers (Admin, Web, Api)
│   ├── Models/            # Data models
│   ├── Providers/         # Service providers
│   ├── Services/          # Business logic
│   └── Helpers.php        # Helper functions
├── bootstrap/             # Application bootstrap
├── config/                # Configuration files
├── resources/             # Source assets
│   ├── admin/js/         # Admin React app
│   ├── frontend/js/      # Frontend React app
│   └── views/            # PHP view templates
├── build/                 # Compiled assets
│   ├── admin/
│   └── frontend/
└── includes/              # Plugin includes
```

### Development Commands

**Build all assets:**
```bash
npm run build
```

**Build admin assets only:**
```bash
npm run build:admin
```

**Build frontend assets only:**
```bash
npm run build:frontend
```

**Watch mode (admin):**
```bash
npm run start:admin
```

**Watch mode (frontend):**
```bash
npm run start:frontend
```

**Watch both (requires concurrently):**
```bash
npm run dev
```

**Linting:**
```bash
npm run lint:js
npm run lint:css
```

**Format code:**
```bash
npm run format
```

### Creating Custom Controllers

Controllers are located in `app/Controllers/` and organized by context:

**Admin Controller Example:**
```php
namespace LaravelWP\Controllers\Admin;

class CustomAdminController {
    public function register(): void {
        add_action('admin_menu', [$this, 'addMenu']);
    }
    
    public function addMenu(): void {
        // Your menu logic
    }
}
```

Register in `bootstrap/app.php`:
```php
$customController = new CustomAdminController();
$customController->register();
```

### Creating Services

Services encapsulate business logic in `app/Services/`:

```php
namespace LaravelWP\Services;

class MyService {
    public function processData(array $data): array {
        // Your business logic
        return $processedData;
    }
}
```

### Working with Models

Models handle database operations in `app/Models/`:

```php
namespace LaravelWP\Models;

class MyModel {
    public function getAll(): array {
        // Database operations
    }
}
```

### Helper Functions

The plugin provides several helper functions:

- `laravel_wp_config($key, $default)` - Get configuration value
- `laravel_wp_view($view, $data)` - Load a view file
- `laravel_wp_asset($path)` - Get asset URL
- `laravel_wp_api_url($endpoint)` - Get REST API URL
- `laravel_wp_log($message, $level)` - Log messages
- `laravel_wp_dd(...$vars)` - Dump and die (debug)

## Configuration

Main configuration is in `config/app.php`. You can modify:

- Plugin information
- API namespace and version
- Admin menu settings
- Frontend shortcode name
- Asset paths

## Testing

The plugin includes a test structure ready for PHPUnit:

```bash
composer install --dev
./vendor/bin/phpunit
```

## Building for Production

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

2. Build optimized assets:
   ```bash
   npm run build
   ```

3. Create distribution package:
   ```bash
   # Manually create ZIP excluding dev files listed in .distignore
   # Or use wp-cli dist-archive command if available
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This plugin is licensed under the GPL v2 or later.

## Credits

Built with:
- [@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts)
- [@wordpress/element](https://www.npmjs.com/package/@wordpress/element)
- [@wordpress/api-fetch](https://www.npmjs.com/package/@wordpress/api-fetch)

Inspired by the Laravel PHP framework's elegant architecture.

## Support

For issues, questions, or contributions, please visit:
- [GitHub Issues](https://github.com/yourusername/laravel-wp-framework/issues)
- [Documentation](https://github.com/yourusername/laravel-wp-framework/wiki)

## Changelog

### 1.0.0 - 2025-11-04
- Initial release
- Laravel-inspired MVC architecture
- Separate admin and frontend React apps
- REST API endpoints
- PSR-4 autoloading
- Modern PHP 8.3+ support
- WordPress 6.0+ compatibility


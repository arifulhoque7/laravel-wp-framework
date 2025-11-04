# Laravel WP Framework

A professional, Laravel-inspired WordPress plugin architecture with separated admin and frontend React applications, modern PHP 8.3+ practices, and clean MVC structure.

## Features

- 🏗️ **Laravel-Inspired Architecture**: Clean separation of concerns with Controllers, Services, Models, and Providers
- ⚛️ **React-Powered**: Separate admin dashboard and frontend applications built with React
- 🎨 **shadcn/ui-Inspired Design**: Clean black & white aesthetic using Tailwind CSS (no React conflicts!)
- 🎯 **Lucide Icons**: Modern, beautiful icons from lucide-react
- 🔌 **REST API**: Well-structured REST API endpoints for data operations
- 📦 **PSR-4 Autoloading**: No runtime Composer dependencies required
- 🚀 **WordPress.org Ready**: Built using @wordpress/scripts for perfect compatibility
- 🔧 **PHP 8.3+**: Modern PHP features including typed properties and union types
- 📱 **Responsive**: Mobile-first design approach

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
   git clone https://github.com/yourusername/laravel-wp-framework.git
   cd laravel-wp-framework
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Build assets:
   ```bash
   npm run build
   ```

4. Activate the plugin in WordPress Admin

## Usage

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


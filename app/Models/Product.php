<?php
/**
 * Product Model
 *
 * Eloquent model for the products table.
 * Example model showing how to use Eloquent ORM in WordPress.
 *
 * @package LaravelWP\Models
 */

declare(strict_types=1);

namespace LaravelWP\Models;

use LaravelWP\Database\Model;

class Product extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'full_description',
        'price',
        'sale_price',
        'stock',
        'sku',
        'category',
        'tags',
        'status',
        'is_featured',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'stock' => 'integer',
        'is_featured' => 'boolean',
        'tags' => 'array',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<string>
     */
    protected $hidden = [];

    /**
     * Scope a query to only include active products.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include products in stock.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    /**
     * Scope a query to only include featured products.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to only include products on sale.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnSale($query)
    {
        return $query->whereNotNull('sale_price')
                     ->where('sale_price', '<', \DB::raw('price'));
    }

    /**
     * Scope a query to filter by category.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $category
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to filter products by minimum stock.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $minStock
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMinStock($query, int $minStock)
    {
        return $query->where('stock', '>=', $minStock);
    }

    /**
     * Get the display price (sale price if available, otherwise regular price).
     *
     * @return float
     */
    public function getDisplayPriceAttribute(): float
    {
        return $this->sale_price ?? $this->price;
    }

    /**
     * Get the discount percentage if on sale.
     *
     * @return float|null
     */
    public function getDiscountPercentAttribute(): ?float
    {
        if (!$this->sale_price || $this->price <= 0) {
            return null;
        }

        return round((($this->price - $this->sale_price) / $this->price) * 100, 2);
    }

    /**
     * Check if product is in stock.
     *
     * @return bool
     */
    public function getInStockAttribute(): bool
    {
        return $this->stock > 0;
    }

    /**
     * Check if product is on sale.
     *
     * @return bool
     */
    public function getOnSaleAttribute(): bool
    {
        return $this->sale_price !== null && $this->sale_price < $this->price;
    }

    /**
     * Get the product's author (WordPress user).
     *
     * @return string
     */
    public function getAuthorNameAttribute(): string
    {
        if (!$this->user_id) {
            return 'Unknown';
        }

        $user = get_userdata($this->user_id);
        return $user ? $user->display_name : 'Unknown';
    }

    /**
     * Get the status label for display.
     *
     * @return string
     */
    public function getStatusLabelAttribute(): string
    {
        $labels = [
            'active' => 'Active',
            'inactive' => 'Inactive',
            'draft' => 'Draft',
            'archived' => 'Archived',
        ];

        return $labels[$this->status] ?? 'Unknown';
    }

    /**
     * Set the name attribute with sanitization.
     *
     * @param string $value
     * @return void
     */
    public function setNameAttribute(string $value): void
    {
        $this->attributes['name'] = sanitize_text_field($value);
    }

    /**
     * Set the slug attribute with sanitization.
     *
     * @param string $value
     * @return void
     */
    public function setSlugAttribute(string $value): void
    {
        $this->attributes['slug'] = sanitize_title($value);
    }

    /**
     * Set the description attribute with sanitization.
     *
     * @param string|null $value
     * @return void
     */
    public function setDescriptionAttribute(?string $value): void
    {
        $this->attributes['description'] = $value ? wp_kses_post($value) : null;
    }

    /**
     * Set the full description attribute with sanitization.
     *
     * @param string|null $value
     * @return void
     */
    public function setFullDescriptionAttribute(?string $value): void
    {
        $this->attributes['full_description'] = $value ? wp_kses_post($value) : null;
    }

    /**
     * Boot the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-set user_id to current user when creating
        static::creating(function ($product) {
            if (!$product->user_id && is_user_logged_in()) {
                $product->user_id = get_current_user_id();
            }

            // Auto-generate slug from name if not provided
            if (!$product->slug && $product->name) {
                $product->slug = sanitize_title($product->name);
            }
        });
    }
}

/**
 * Admin React Application
 *
 * Main entry point for the admin dashboard React app with shadcn-style design.
 *
 * @package LaravelWP
 */

import { createElement } from '@wordpress/element';
import { createRoot, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
    Zap, RefreshCw, LayoutDashboard, FileText, Settings,
    TrendingUp, Users, BookOpen, Package,
    CheckCircle2, Loader2, AlertCircle, Pencil, Trash2, X, AlertTriangle
} from 'lucide-react';
import './style.scss';

const { div, h1, h2, h3, h4, p, span, button, a, form, label, input, textarea, code } = {
    div: (props, ...children) => createElement('div', props, ...children),
    h1: (props, ...children) => createElement('h1', props, ...children),
    h2: (props, ...children) => createElement('h2', props, ...children),
    h3: (props, ...children) => createElement('h3', props, ...children),
    h4: (props, ...children) => createElement('h4', props, ...children),
    p: (props, ...children) => createElement('p', props, ...children),
    span: (props, ...children) => createElement('span', props, ...children),
    button: (props, ...children) => createElement('button', props, ...children),
    a: (props, ...children) => createElement('a', props, ...children),
    form: (props, ...children) => createElement('form', props, ...children),
    label: (props, ...children) => createElement('label', props, ...children),
    input: (props) => createElement('input', props),
    textarea: (props) => createElement('textarea', props),
    code: (props, ...children) => createElement('code', props, ...children),
};

/**
 * DeleteModal Component
 */
function DeleteModal({ isOpen, onClose, onConfirm, itemTitle, isDeleting }) {
    if (!isOpen) return null;

    return div(
        { className: 'fixed inset-0 z-50 flex items-center justify-center' },
        // Backdrop
        div({
            className: 'fixed inset-0 bg-black/50 backdrop-blur-sm',
            onClick: isDeleting ? null : onClose
        }),
        // Modal
        div(
            { className: 'relative bg-background rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 z-10' },
            // Close button
            button(
                {
                    onClick: onClose,
                    disabled: isDeleting,
                    className: 'absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors disabled:opacity-50',
                    'aria-label': 'Close'
                },
                createElement(X, { className: 'w-5 h-5' })
            ),
            // Icon
            div(
                { className: 'flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10' },
                createElement(AlertTriangle, { className: 'w-6 h-6 text-destructive' })
            ),
            // Title
            h3(
                { className: 'text-xl font-bold text-foreground text-center mb-2' },
                'Delete Item?'
            ),
            // Message
            p(
                { className: 'text-muted-foreground text-center mb-6' },
                'Are you sure you want to delete ',
                span({ className: 'font-semibold text-foreground' }, `"${itemTitle}"`),
                '? This action cannot be undone.'
            ),
            // Actions
            div(
                { className: 'flex gap-3' },
                button(
                    {
                        onClick: onClose,
                        disabled: isDeleting,
                        className: 'flex-1 px-4 py-2.5 border border-input rounded-lg font-semibold hover:bg-muted transition-colors disabled:opacity-50'
                    },
                    'Cancel'
                ),
                button(
                    {
                        onClick: onConfirm,
                        disabled: isDeleting,
                        className: 'flex-1 px-4 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2'
                    },
                    isDeleting && createElement(Loader2, { className: 'w-4 h-4 animate-spin' }),
                    isDeleting ? 'Deleting...' : 'Delete'
                )
            )
        )
    );
}

/**
 * Admin Dashboard Component
 */
function AdminApp() {
    const [data, setData] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemContent, setNewItemContent] = useState('');
    const [creating, setCreating] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Fetch initial data
    useEffect(() => {
        fetchData();
        fetchItems();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiFetch({ path: '/laravel-wp/v1/data' });
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await apiFetch({ path: '/laravel-wp/v1/items' });
            setItems(response.items || []);
        } catch (err) {
            console.error('Failed to fetch items:', err);
        }
    };

    const showSuccessNotification = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleCreateItem = async (e) => {
        e.preventDefault();

        if (!newItemTitle.trim()) {
            alert('Please enter a title');
            return;
        }

        try {
            setCreating(true);
            await apiFetch({
                path: '/laravel-wp/v1/items',
                method: 'POST',
                data: {
                    title: newItemTitle,
                    content: newItemContent,
                },
            });

            setNewItemTitle('');
            setNewItemContent('');
            fetchItems();
            showSuccessNotification('Item created successfully!');
        } catch (err) {
            alert('Failed to create item: ' + err.message);
        } finally {
            setCreating(false);
        }
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setEditTitle(item.title);
        setEditContent(item.content || '');
    };

    const handleUpdateItem = async (e) => {
        e.preventDefault();

        if (!editTitle.trim()) {
            alert('Please enter a title');
            return;
        }

        try {
            setUpdating(true);
            await apiFetch({
                path: `/laravel-wp/v1/items/${editingItem.id}`,
                method: 'PUT',
                data: {
                    title: editTitle,
                    content: editContent,
                },
            });

            setEditingItem(null);
            setEditTitle('');
            setEditContent('');
            fetchItems();
            showSuccessNotification('Item updated successfully!');
        } catch (err) {
            alert('Failed to update item: ' + err.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        try {
            setDeleting(itemToDelete.id);
            await apiFetch({
                path: `/laravel-wp/v1/items/${itemToDelete.id}`,
                method: 'DELETE',
            });

            setShowDeleteModal(false);
            setItemToDelete(null);
            fetchItems();
            showSuccessNotification('Item deleted successfully!');
        } catch (err) {
            alert('Failed to delete item: ' + err.message);
        } finally {
            setDeleting(null);
        }
    };

    const handleDeleteCancel = () => {
        if (!deleting) {
            setShowDeleteModal(false);
            setItemToDelete(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
        setEditTitle('');
        setEditContent('');
    };

    if (loading) {
        return div(
            { className: 'lwpf-root flex flex-col items-center justify-center min-h-[80vh] bg-background' },
            createElement(Loader2, { className: 'w-12 h-12 text-foreground animate-spin' }),
            p({ className: 'text-muted-foreground text-lg mt-4 font-medium' }, 'Loading dashboard...')
        );
    }

    if (error) {
        return div(
            { className: 'lwpf-root max-w-2xl mx-auto mt-20' },
            div(
                { className: 'rounded-xl border bg-card text-card-foreground shadow p-8 text-center' },
                createElement(AlertCircle, { className: 'w-16 h-16 text-destructive mx-auto mb-4' }),
                h3({ className: 'text-2xl font-bold text-destructive mb-2' }, 'Error Loading Dashboard'),
                p({ className: 'text-muted-foreground mb-6' }, error),
                button(
                    {
                        onClick: fetchData,
                        className: 'inline-flex items-center justify-center gap-2 h-11 px-8 bg-primary text-primary-foreground rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors'
                    },
                    createElement(RefreshCw, { className: 'w-4 h-4' }),
                    'Retry'
                )
            )
        );
    }

    return div(
        { className: 'lwpf-root bg-background min-h-screen' },
        // Delete Confirmation Modal
        createElement(DeleteModal, {
            isOpen: showDeleteModal,
            onClose: handleDeleteCancel,
            onConfirm: handleDeleteConfirm,
            itemTitle: itemToDelete?.title || '',
            isDeleting: deleting !== null
        }),

        // Success Notification (Bottom Right)
        showNotification && div(
            { className: 'fixed bottom-8 right-8 bg-foreground text-background px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slide-up' },
            createElement(CheckCircle2, { className: 'w-6 h-6' }),
            span({ className: 'font-medium' }, notificationMessage)
        ),

        // Top Header Bar
        div(
            { className: 'bg-foreground text-background border-b' },
            div(
                { className: 'max-w-7xl mx-auto px-6 py-6' },
                div(
                    { className: 'flex items-center justify-between flex-wrap gap-4' },
                    div(
                        { className: 'flex-1' },
                        div(
                            { className: 'flex items-center gap-3 mb-2' },
                            createElement(Zap, { className: 'w-8 h-8' }),
                            h1({ className: 'text-3xl font-bold text-white' }, 'Laravel WP Framework')
                        ),
                        p({ className: 'text-muted-foreground/80 text-base' }, 'Professional WordPress Development Platform')
                    ),
                    div(
                        { className: 'flex items-center gap-4' },
                        button(
                            {
                                onClick: fetchData,
                                className: 'inline-flex items-center text-black gap-2 px-4 py-2 border border-input bg-background shadow-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors'
                            },
                            createElement(RefreshCw, { className: 'w-4 h-4' }),
                            'Refresh'
                        ),
                        span(
                            { className: 'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground' },
                            `v${data?.version || '1.0.0'}`
                        )
                    )
                )
            )
        ),

        // Navigation Tabs
        div(
            { className: 'bg-background border-b' },
            div(
                { className: 'max-w-7xl mx-auto' },
                div(
                    { className: 'flex' },
                    button(
                        {
                            className: `inline-flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all ${
                                activeTab === 'overview' 
                                    ? 'text-foreground border-foreground' 
                                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted'
                            }`,
                            onClick: () => setActiveTab('overview')
                        },
                        createElement(LayoutDashboard, { className: 'w-5 h-5' }),
                        'Overview'
                    ),
                    button(
                        {
                            className: `inline-flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all ${
                                activeTab === 'items' 
                                    ? 'text-foreground border-foreground' 
                                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted'
                            }`,
                            onClick: () => setActiveTab('items')
                        },
                        createElement(FileText, { className: 'w-5 h-5' }),
                        'Items'
                    ),
                    button(
                        {
                            className: `inline-flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all ${
                                activeTab === 'settings' 
                                    ? 'text-foreground border-foreground' 
                                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted'
                            }`,
                            onClick: () => setActiveTab('settings')
                        },
                        createElement(Settings, { className: 'w-5 h-5' }),
                        'Settings'
                    )
                )
            )
        ),

        // Main Content
        div(
            { className: 'max-w-7xl mx-auto px-6 py-8' },
            activeTab === 'overview' && data && div(
                null,
                // Stats Grid
                div(
                    { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8' },
                    // Stats cards...
                    [
                        { icon: FileText, label: 'Total Posts', value: data.stats?.posts || 0, change: '12%' },
                        { icon: BookOpen, label: 'Total Pages', value: data.stats?.pages || 0, change: '8%' },
                        { icon: Users, label: 'Total Users', value: data.stats?.users || 0, change: '5%' },
                        { icon: Package, label: 'Total Items', value: items.length, change: null }
                    ].map((stat, i) =>
                        div(
                            { key: i, className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow' },
                            div(
                                { className: 'p-6' },
                                div(
                                    { className: 'flex items-center justify-between mb-3' },
                                    p({ className: 'text-xs font-semibold uppercase text-muted-foreground' }, stat.label),
                                    createElement(stat.icon, { className: 'w-8 h-8 text-muted-foreground' })
                                ),
                                div({ className: 'text-3xl font-bold text-foreground mb-1' }, stat.value),
                                div(
                                    { className: 'flex items-center gap-1 text-sm' },
                                    stat.change ? createElement(TrendingUp, { className: 'w-3 h-3 text-muted-foreground' }) : null,
                                    stat.change ? span({ className: 'text-muted-foreground font-semibold' }, stat.change) : null,
                                    stat.change ? span({ className: 'text-muted-foreground' }, 'from last month') : span({ className: 'text-muted-foreground' }, 'No change')
                                )
                            )
                        )
                    )
                ),

                // Site Info Card
                div(
                    { className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow mb-8' },
                    div(
                        { className: 'p-6 border-b' },
                        h3({ className: 'text-xl font-semibold text-foreground' }, 'Site Information')
                    ),
                    div(
                        { className: 'p-6 space-y-4' },
                        div(
                            { className: 'flex items-center justify-between py-3 border-b' },
                            span({ className: 'text-sm font-semibold text-muted-foreground uppercase tracking-wide' }, 'Site Name'),
                            span({ className: 'text-base text-foreground font-medium' }, data.site_info?.name)
                        ),
                        div(
                            { className: 'flex items-center justify-between py-3 border-b' },
                            span({ className: 'text-sm font-semibold text-muted-foreground uppercase tracking-wide' }, 'Site URL'),
                            a(
                                { href: data.site_info?.url, className: 'text-foreground hover:underline font-medium', target: '_blank', rel: 'noopener' },
                                data.site_info?.url
                            )
                        )
                    )
                )
            ),

            activeTab === 'items' && div(
                null,
                // Edit Item Card (shown when editing)
                editingItem && div(
                    { className: 'rounded-xl border-2 border-foreground bg-card text-card-foreground shadow-xl mb-8' },
                    div(
                        { className: 'p-6 border-b' },
                        h3({ className: 'text-xl font-semibold text-foreground' }, 'Edit Item')
                    ),
                    div(
                        { className: 'p-6' },
                        form(
                            { onSubmit: handleUpdateItem, className: 'space-y-6' },
                            div(
                                null,
                                label({ className: 'block text-sm font-semibold text-foreground mb-2' }, 'Title'),
                                input({
                                    type: 'text',
                                    value: editTitle,
                                    onChange: (e) => setEditTitle(e.target.value),
                                    placeholder: 'Enter item title...',
                                    className: 'w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all'
                                })
                            ),
                            div(
                                null,
                                label({ className: 'block text-sm font-semibold text-foreground mb-2' }, 'Content'),
                                textarea({
                                    value: editContent,
                                    onChange: (e) => setEditContent(e.target.value),
                                    placeholder: 'Enter item content...',
                                    rows: 4,
                                    className: 'w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none'
                                })
                            ),
                            div(
                                { className: 'flex gap-3' },
                                button(
                                    {
                                        type: 'submit',
                                        disabled: updating,
                                        className: 'inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold shadow-md hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                                    },
                                    updating && createElement(Loader2, { className: 'w-4 h-4 animate-spin' }),
                                    updating ? 'Updating...' : 'Update Item'
                                ),
                                button(
                                    {
                                        type: 'button',
                                        onClick: handleCancelEdit,
                                        className: 'inline-flex items-center justify-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all'
                                    },
                                    'Cancel'
                                )
                            )
                        )
                    )
                ),

                // Create New Item Card
                !editingItem && div(
                    { className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow mb-8' },
                    div(
                        { className: 'p-6 border-b' },
                        h3({ className: 'text-xl font-semibold text-foreground' }, 'Create New Item')
                    ),
                    div(
                        { className: 'p-6' },
                        form(
                            { onSubmit: handleCreateItem, className: 'space-y-6' },
                            div(
                                null,
                                label({ className: 'block text-sm font-semibold text-foreground mb-2' }, 'Title'),
                                input({
                                    type: 'text',
                                    value: newItemTitle,
                                    onChange: (e) => setNewItemTitle(e.target.value),
                                    placeholder: 'Enter item title...',
                                    className: 'w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all'
                                })
                            ),
                            div(
                                null,
                                label({ className: 'block text-sm font-semibold text-foreground mb-2' }, 'Content'),
                                textarea({
                                    value: newItemContent,
                                    onChange: (e) => setNewItemContent(e.target.value),
                                    placeholder: 'Enter item content...',
                                    rows: 4,
                                    className: 'w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none'
                                })
                            ),
                            button(
                                {
                                    type: 'submit',
                                    disabled: creating,
                                    className: 'inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold shadow-md hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                                },
                                creating && createElement(Loader2, { className: 'w-4 h-4 animate-spin' }),
                                creating ? 'Creating...' : 'Create Item'
                            )
                        )
                    )
                ),

                // Items List Card
                div(
                    { className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow' },
                    div(
                        { className: 'p-6 border-b flex items-center justify-between' },
                        h3({ className: 'text-xl font-semibold text-foreground' }, 'All Items'),
                        span({ className: 'text-sm font-medium text-muted-foreground' }, `${items.length} items`)
                    ),
                    div(
                        { className: 'p-6' },
                        items.length === 0 ? div(
                            { className: 'text-center py-12' },
                            createElement(Package, { className: 'w-16 h-16 text-muted-foreground mx-auto mb-4' }),
                            p({ className: 'text-lg font-medium text-foreground mb-2' }, 'No items yet'),
                            p({ className: 'text-muted-foreground' }, 'Create your first item using the form above')
                        ) : div(
                            { className: 'space-y-3' },
                            items.map((item, i) =>
                                div(
                                    { key: item.id || i, className: 'flex items-start gap-4 p-5 rounded-lg border border-border hover:border-foreground hover:bg-accent transition-all' },
                                    div(
                                        { className: 'flex-shrink-0 w-12 h-12 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-lg shadow' },
                                        i + 1
                                    ),
                                    div(
                                        { className: 'flex-1 min-w-0' },
                                        h4({ className: 'font-semibold text-lg text-foreground mb-1' }, item.title),
                                        item.content && p({ className: 'text-sm text-muted-foreground line-clamp-2' }, item.content)
                                    ),
                                    div(
                                        { className: 'flex items-center gap-2' },
                                        button(
                                            {
                                                onClick: () => handleEditItem(item),
                                                disabled: deleting === item.id,
                                                className: 'p-2 rounded-lg bg-muted hover:bg-foreground hover:text-background transition-all disabled:opacity-50',
                                                title: 'Edit item'
                                            },
                                            createElement(Pencil, { className: 'w-5 h-5' })
                                        ),
                                        button(
                                            {
                                                onClick: () => handleDeleteClick(item),
                                                disabled: deleting === item.id,
                                                className: 'p-2 rounded-lg bg-muted hover:bg-destructive hover:text-destructive-foreground transition-all disabled:opacity-50',
                                                title: 'Delete item'
                                            },
                                            createElement(Trash2, { className: 'w-5 h-5' })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            activeTab === 'settings' && div(
                { className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow' },
                div(
                    { className: 'p-6 border-b' },
                    h3({ className: 'text-xl font-semibold text-foreground' }, 'Plugin Settings')
                ),
                div(
                    { className: 'p-6 space-y-6' },
                    div(
                        { className: 'flex items-center justify-between py-6 border-b' },
                        div(
                            { className: 'flex-1 pr-6' },
                            h4({ className: 'text-base font-bold text-foreground mb-1' }, 'API Endpoint'),
                            p({ className: 'text-sm text-muted-foreground' }, 'REST API namespace for all endpoints')
                        ),
                        code({ className: 'bg-muted px-4 py-2 rounded-lg text-sm font-mono text-foreground' }, '/wp-json/laravel-wp/v1/')
                    ),
                    div(
                        { className: 'flex items-center justify-between py-6' },
                        div(
                            { className: 'flex-1 pr-6' },
                            h4({ className: 'text-base font-bold text-foreground mb-1' }, 'Framework Version'),
                            p({ className: 'text-sm text-muted-foreground' }, 'Current version of Laravel WP Framework')
                        ),
                        span(
                            { className: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase bg-foreground text-background' },
                            `v${data?.version || '1.0.0'}`
                        )
                    )
                )
            )
        )
    );
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const mountPoint = document.getElementById('laravel-wp-admin-app');
    
    if (mountPoint) {
        const root = createRoot(mountPoint);
        root.render(createElement(AdminApp));
    }
});

/**
 * Frontend React Application
 *
 * Main entry point for the frontend React app with shadcn-style design.
 *
 * @package LaravelWP
 */

import { createElement } from '@wordpress/element';
import { createRoot, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { 
    Rocket, RefreshCw, CheckCircle2, Loader2, AlertCircle,
    Zap, Globe, Package, ArrowRight
} from 'lucide-react';
import './style.scss';

const { div, h1, h2, h3, h4, p, span, button, a, code } = {
    div: (props, ...children) => createElement('div', props, ...children),
    h1: (props, ...children) => createElement('h1', props, ...children),
    h2: (props, ...children) => createElement('h2', props, ...children),
    h3: (props, ...children) => createElement('h3', props, ...children),
    h4: (props, ...children) => createElement('h4', props, ...children),
    p: (props, ...children) => createElement('p', props, ...children),
    span: (props, ...children) => createElement('span', props, ...children),
    button: (props, ...children) => createElement('button', props, ...children),
    a: (props, ...children) => createElement('a', props, ...children),
    code: (props, ...children) => createElement('code', props, ...children),
};

/**
 * Frontend Component
 */
function FrontendApp() {
    const [data, setData] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return div(
            { className: 'lwpf-root flex flex-col items-center justify-center min-h-[400px] bg-background' },
            createElement(Loader2, { className: 'w-12 h-12 text-foreground animate-spin' }),
            p({ className: 'text-muted-foreground text-lg mt-4 font-medium' }, 'Loading content...')
        );
    }

    if (error) {
        return div(
            { className: 'lwpf-root max-w-2xl mx-auto py-12' },
            div(
                { className: 'rounded-xl border bg-card text-card-foreground shadow p-8 text-center' },
                createElement(AlertCircle, { className: 'w-16 h-16 text-destructive mx-auto mb-4' }),
                h3({ className: 'text-2xl font-bold text-destructive mb-2' }, 'Error Loading Content'),
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
        { className: 'lwpf-root bg-background py-12' },
        div(
            { className: 'max-w-6xl mx-auto px-4' },
            
            // Hero Section
            div(
                { className: 'text-center mb-16' },
                div(
                    { className: 'inline-flex items-center justify-center w-20 h-20 rounded-full bg-foreground text-background mb-6 shadow-lg' },
                    createElement(Rocket, { className: 'w-10 h-10' })
                ),
                h1({ className: 'text-5xl font-bold text-foreground mb-4' }, 'Laravel WP Framework'),
                p({ className: 'text-xl text-muted-foreground max-w-2xl mx-auto' }, 
                    'A professional WordPress plugin architecture inspired by Laravel\'s elegance and simplicity'
                ),
                div(
                    { className: 'flex items-center justify-center gap-4 mt-8' },
                    button(
                        {
                            onClick: fetchData,
                            className: 'inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold shadow-lg hover:bg-foreground/90 transition-all'
                        },
                        'Get Started',
                        createElement(ArrowRight, { className: 'w-5 h-5' })
                    ),
                    button(
                        {
                            className: 'inline-flex items-center gap-2 px-6 py-3 border border-input bg-background rounded-lg font-semibold shadow hover:bg-accent hover:text-accent-foreground transition-all'
                        },
                        'Learn More'
                    )
                )
            ),

            // Features Grid
            div(
                { className: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-16' },
                [
                    { icon: Zap, title: 'Lightning Fast', description: 'Built with performance in mind using modern React and optimized WordPress APIs' },
                    { icon: Package, title: 'Laravel-Style', description: 'MVC architecture with Controllers, Models, Services, and Providers' },
                    { icon: Globe, title: 'REST API Ready', description: 'Powerful REST API endpoints for seamless integration' }
                ].map((feature, i) =>
                    div(
                        { key: i, className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-all p-8' },
                        div(
                            { className: 'inline-flex items-center justify-center w-14 h-14 rounded-lg bg-foreground text-background mb-4' },
                            createElement(feature.icon, { className: 'w-7 h-7' })
                        ),
                        h3({ className: 'text-xl font-bold text-foreground mb-2' }, feature.title),
                        p({ className: 'text-muted-foreground' }, feature.description)
                    )
                )
            ),

            // Site Info Card
            data && div(
                { className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow mb-12' },
                div(
                    { className: 'p-6 border-b' },
                    h2({ className: 'text-2xl font-bold' }, 'Site Information')
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
                    ),
                    div(
                        { className: 'flex items-center justify-between py-3' },
                        span({ className: 'text-sm font-semibold text-muted-foreground uppercase tracking-wide' }, 'Framework Version'),
                        span(
                            { className: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase bg-primary text-primary-foreground' },
                            `v${data.version}`
                        )
                    )
                )
            ),

            // Stats Grid
            data && div(
                { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12' },
                [
                    { label: 'Posts', value: data.stats?.posts || 0 },
                    { label: 'Pages', value: data.stats?.pages || 0 },
                    { label: 'Users', value: data.stats?.users || 0 },
                    { label: 'Items', value: items.length }
                ].map((stat, i) =>
                    div(
                        { key: i, className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow text-center p-6' },
                        p({ className: 'text-sm font-semibold uppercase text-muted-foreground mb-2' }, stat.label),
                        div({ className: 'text-4xl font-bold text-foreground' }, stat.value)
                    )
                )
            ),

            // Items List
            items.length > 0 && div(
                { className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow' },
                div(
                    { className: 'p-6 border-b' },
                    h2({ className: 'text-2xl font-bold' }, 'Recent Items')
                ),
                div(
                    { className: 'p-6' },
                    div(
                        { className: 'space-y-3' },
                        items.slice(0, 5).map((item, i) =>
                            div(
                                { key: i, className: 'flex items-start gap-3 p-4 rounded-lg border hover:bg-accent transition-colors' },
                                div(
                                    { className: 'flex-shrink-0 w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center font-bold' },
                                    (i + 1)
                                ),
                                div(
                                    { className: 'flex-1 min-w-0' },
                                    h4({ className: 'font-semibold text-foreground mb-1' }, item.title),
                                    item.content && p({ className: 'text-sm text-muted-foreground truncate' }, item.content)
                                ),
                                createElement(CheckCircle2, { className: 'flex-shrink-0 w-5 h-5 text-muted-foreground' })
                            )
                        )
                    )
                )
            ),

            // Footer
            div(
                { className: 'mt-16 text-center' },
                p({ className: 'text-muted-foreground text-sm' },
                    'Powered by ',
                    span({ className: 'font-semibold text-foreground' }, 'Laravel WP Framework'),
                    ' • Built with React & Tailwind CSS'
                )
            )
        )
    );
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const mountPoint = document.getElementById('laravel-wp-frontend-app');
    
    if (mountPoint) {
        const root = createRoot(mountPoint);
        root.render(createElement(FrontendApp));
    }
});

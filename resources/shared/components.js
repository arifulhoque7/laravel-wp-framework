/**
 * Shared Components
 *
 * Reusable React components that can be used in both admin and frontend apps.
 *
 * @package LaravelWP
 */

import { createElement } from '@wordpress/element';
import {
    CheckCircle2, Loader2, AlertTriangle, X
} from 'lucide-react';

// Helper functions for creating elements
const { div, h3, p, span, button } = {
    div: (props, ...children) => createElement('div', props, ...children),
    h3: (props, ...children) => createElement('h3', props, ...children),
    p: (props, ...children) => createElement('p', props, ...children),
    span: (props, ...children) => createElement('span', props, ...children),
    button: (props, ...children) => createElement('button', props, ...children),
};

/**
 * Alert Component (shadcn-style)
 *
 * Inline alert component for displaying messages within page content
 *
 * @param {Object} props
 * @param {string} props.variant - Variant: 'default' | 'success' | 'error' | 'warning' | 'info'
 * @param {string} props.title - Alert title (optional)
 * @param {string} props.message - Alert message
 * @param {React.ReactNode} props.children - Custom content (overrides message)
 * @param {string} props.className - Additional classes
 */
export function Alert({ variant = 'default', title = null, message = '', children = null, className = '' }) {
    const variantConfig = {
        'default': {
            className: 'border-gray-200 bg-white text-gray-900',
            icon: CheckCircle2,
            iconClassName: 'text-gray-600',
            titleClassName: 'text-gray-900',
        },
        'success': {
            className: 'border-green-200 bg-green-50 text-green-900',
            icon: CheckCircle2,
            iconClassName: 'text-green-600',
            titleClassName: 'text-green-900',
        },
        'error': {
            className: 'border-red-200 bg-red-50 text-red-900',
            icon: AlertTriangle,
            iconClassName: 'text-red-600',
            titleClassName: 'text-red-900',
        },
        'warning': {
            className: 'border-yellow-200 bg-yellow-50 text-yellow-900',
            icon: AlertTriangle,
            iconClassName: 'text-yellow-600',
            titleClassName: 'text-yellow-900',
        },
        'info': {
            className: 'border-blue-200 bg-blue-50 text-blue-900',
            icon: CheckCircle2,
            iconClassName: 'text-blue-600',
            titleClassName: 'text-blue-900',
        },
    };

    const config = variantConfig[variant] || variantConfig.default;

    return div(
        {
            className: `relative w-full rounded-lg border p-4 ${config.className} ${className}`,
            role: 'alert'
        },
        div(
            { className: 'flex gap-3' },
            createElement(config.icon, { className: `w-5 h-5 flex-shrink-0 ${config.iconClassName}` }),
            div(
                { className: 'flex-1' },
                title && h3(
                    { className: `font-semibold text-sm mb-1 ${config.titleClassName}` },
                    title
                ),
                div(
                    { className: 'text-sm' },
                    children || message
                )
            )
        )
    );
}

/**
 * Notification Component (Toast)
 *
 * Floating toast notification that appears at screen corners
 *
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the notification
 * @param {string} props.message - Notification message
 * @param {string} props.type - Type: 'success' | 'error' | 'warning' | 'info'
 * @param {string} props.position - Position: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left'
 */
export function Notification({ show, message, type = 'success', position = 'bottom-right' }) {
    if (!show) return null;

    const positionClasses = {
        'bottom-right': 'bottom-8 right-8',
        'top-right': 'top-8 right-8',
        'bottom-left': 'bottom-8 left-8',
        'top-left': 'top-8 left-8',
    };

    const typeConfig = {
        'success': {
            className: 'border-green-200 bg-green-50 text-green-900',
            icon: CheckCircle2,
            iconClassName: 'text-green-600',
        },
        'error': {
            className: 'border-red-200 bg-red-50 text-red-900',
            icon: AlertTriangle,
            iconClassName: 'text-red-600',
        },
        'warning': {
            className: 'border-yellow-200 bg-yellow-50 text-yellow-900',
            icon: AlertTriangle,
            iconClassName: 'text-yellow-600',
        },
        'info': {
            className: 'border-blue-200 bg-blue-50 text-blue-900',
            icon: CheckCircle2,
            iconClassName: 'text-blue-600',
        },
    };

    const config = typeConfig[type] || typeConfig.success;

    return div(
        {
            className: `fixed ${positionClasses[position]} z-50 w-full max-w-sm animate-slide-up`
        },
        div(
            {
                className: `flex items-center gap-3 rounded-lg border ${config.className} px-4 py-3 shadow-lg`
            },
            createElement(config.icon, { className: `w-5 h-5 flex-shrink-0 ${config.iconClassName}` }),
            span({ className: 'font-medium text-sm flex-1' }, message)
        )
    );
}

/**
 * Delete Confirmation Modal Component
 *
 * A reusable modal for confirming delete actions with shadcn-style design
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when closing
 * @param {Function} props.onConfirm - Function to call when confirming
 * @param {string} props.itemTitle - Title of the item being deleted
 * @param {boolean} props.isDeleting - Whether deletion is in progress
 * @param {string} props.title - Modal title (default: 'Delete Item?')
 * @param {string} props.message - Custom message (optional)
 */
export function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    itemTitle,
    isDeleting,
    title = 'Delete Item?',
    message = null
}) {
    if (!isOpen) return null;

    const defaultMessage = message || div(
        null,
        'Are you sure you want to delete ',
        span({ className: 'font-semibold text-gray-900' }, `"${itemTitle}"`),
        '? This action cannot be undone.'
    );

    return div(
        { className: 'fixed inset-0 z-50 flex items-center justify-center p-4' },
        // Backdrop
        div({
            className: 'fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity',
            onClick: isDeleting ? null : onClose
        }),
        // Modal
        div(
            { className: 'relative bg-white rounded-lg shadow-xl max-w-lg w-full z-10 border border-gray-200' },
            // Close button
            button(
                {
                    onClick: onClose,
                    disabled: isDeleting,
                    className: 'absolute top-4 right-4 p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                    'aria-label': 'Close'
                },
                createElement(X, { className: 'w-4 h-4' })
            ),
            // Content
            div(
                { className: 'p-6' },
                // Icon
                div(
                    { className: 'flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100' },
                    createElement(AlertTriangle, { className: 'w-6 h-6 text-red-600' })
                ),
                // Title
                h3(
                    { className: 'text-lg font-semibold text-gray-900 text-center mb-2' },
                    title
                ),
                // Message
                p(
                    { className: 'text-sm text-gray-600 text-center mb-6' },
                    defaultMessage
                )
            ),
            // Actions
            div(
                { className: 'flex gap-3 px-6 pb-6' },
                button(
                    {
                        onClick: onClose,
                        disabled: isDeleting,
                        className: 'flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    },
                    'Cancel'
                ),
                button(
                    {
                        onClick: onConfirm,
                        disabled: isDeleting,
                        className: 'flex-1 px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2'
                    },
                    isDeleting && createElement(Loader2, { className: 'w-4 h-4 animate-spin' }),
                    isDeleting ? 'Deleting...' : 'Delete'
                )
            )
        )
    );
}

/**
 * Confirmation Modal Component
 *
 * A generic confirmation modal for any action with shadcn-style design
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when closing
 * @param {Function} props.onConfirm - Function to call when confirming
 * @param {string} props.title - Modal title
 * @param {string} props.message - Modal message
 * @param {string} props.confirmText - Confirm button text (default: 'Confirm')
 * @param {string} props.cancelText - Cancel button text (default: 'Cancel')
 * @param {boolean} props.isLoading - Whether action is in progress
 * @param {string} props.variant - Variant: 'danger' | 'success' | 'warning' | 'info'
 */
export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
    variant = 'success'
}) {
    if (!isOpen) return null;

    const variantConfig = {
        'danger': {
            iconBg: 'bg-red-100',
            icon: AlertTriangle,
            iconColor: 'text-red-600',
            buttonClass: 'bg-red-600 text-white hover:bg-red-700',
        },
        'success': {
            iconBg: 'bg-green-100',
            icon: CheckCircle2,
            iconColor: 'text-green-600',
            buttonClass: 'bg-green-600 text-white hover:bg-green-700',
        },
        'warning': {
            iconBg: 'bg-yellow-100',
            icon: AlertTriangle,
            iconColor: 'text-yellow-600',
            buttonClass: 'bg-yellow-600 text-white hover:bg-yellow-700',
        },
        'info': {
            iconBg: 'bg-blue-100',
            icon: CheckCircle2,
            iconColor: 'text-blue-600',
            buttonClass: 'bg-blue-600 text-white hover:bg-blue-700',
        },
    };

    const config = variantConfig[variant] || variantConfig.success;

    return div(
        { className: 'fixed inset-0 z-50 flex items-center justify-center p-4' },
        // Backdrop
        div({
            className: 'fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity',
            onClick: isLoading ? null : onClose
        }),
        // Modal
        div(
            { className: 'relative bg-white rounded-lg shadow-xl max-w-lg w-full z-10 border border-gray-200' },
            // Close button
            button(
                {
                    onClick: onClose,
                    disabled: isLoading,
                    className: 'absolute top-4 right-4 p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                    'aria-label': 'Close'
                },
                createElement(X, { className: 'w-4 h-4' })
            ),
            // Content
            div(
                { className: 'p-6' },
                // Icon
                div(
                    { className: `flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full ${config.iconBg}` },
                    createElement(config.icon, { className: `w-6 h-6 ${config.iconColor}` })
                ),
                // Title
                h3(
                    { className: 'text-lg font-semibold text-gray-900 text-center mb-2' },
                    title
                ),
                // Message
                p(
                    { className: 'text-sm text-gray-600 text-center mb-6' },
                    message
                )
            ),
            // Actions
            div(
                { className: 'flex gap-3 px-6 pb-6' },
                button(
                    {
                        onClick: onClose,
                        disabled: isLoading,
                        className: 'flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    },
                    cancelText
                ),
                button(
                    {
                        onClick: onConfirm,
                        disabled: isLoading,
                        className: `flex-1 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 ${config.buttonClass}`
                    },
                    isLoading && createElement(Loader2, { className: 'w-4 h-4 animate-spin' }),
                    confirmText
                )
            )
        )
    );
}

/**
 * Loading Spinner Component
 *
 * @param {Object} props
 * @param {string} props.message - Loading message
 * @param {string} props.size - Size: 'sm' | 'md' | 'lg'
 */
export function LoadingSpinner({ message = 'Loading...', size = 'md' }) {
    const sizeClasses = {
        'sm': 'w-6 h-6',
        'md': 'w-12 h-12',
        'lg': 'w-16 h-16',
    };

    return div(
        { className: 'flex flex-col items-center justify-center min-h-[80vh] bg-background' },
        createElement(Loader2, { className: `${sizeClasses[size]} text-foreground animate-spin` }),
        p({ className: 'text-muted-foreground text-lg mt-4 font-medium' }, message)
    );
}

/**
 * Error Display Component
 *
 * @param {Object} props
 * @param {string} props.message - Error message
 * @param {Function} props.onRetry - Function to call when retry button is clicked
 * @param {string} props.retryText - Retry button text (default: 'Retry')
 */
export function ErrorDisplay({ message, onRetry, retryText = 'Retry' }) {
    return div(
        { className: 'max-w-2xl mx-auto mt-20 px-4' },
        div(
            { className: 'rounded-lg border border-red-200 bg-white shadow-sm p-8 text-center' },
            div(
                { className: 'flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100' },
                createElement(AlertTriangle, { className: 'w-8 h-8 text-red-600' })
            ),
            h3({ className: 'text-xl font-semibold text-gray-900 mb-2' }, 'Error'),
            p({ className: 'text-sm text-gray-600 mb-6' }, message),
            onRetry && button(
                {
                    onClick: onRetry,
                    className: 'inline-flex items-center justify-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-md font-medium shadow-sm hover:bg-gray-800 transition-colors'
                },
                retryText
            )
        )
    );
}

/**
 * Card Component
 *
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional classes
 * @param {React.ReactNode} props.actions - Actions to display in header
 */
export function Card({ title, children, className = '', actions = null }) {
    return div(
        { className: `rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow ${className}` },
        title && div(
            { className: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between' },
            h3({ className: 'text-lg font-semibold text-gray-900' }, title),
            actions
        ),
        div({ className: 'p-6' }, children)
    );
}

/**
 * Button Component
 *
 * @param {Object} props
 * @param {string} props.variant - Variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
 * @param {string} props.size - Size: 'sm' | 'md' | 'lg'
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional classes
 */
export function Button({
    variant = 'default',
    size = 'md',
    loading = false,
    disabled = false,
    onClick,
    children,
    className = '',
    ...props
}) {
    const variantClasses = {
        'default': 'bg-gray-900 text-white hover:bg-gray-800',
        'secondary': 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        'destructive': 'bg-red-600 text-white hover:bg-red-700',
        'outline': 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
        'ghost': 'text-gray-700 hover:bg-gray-100',
    };

    const sizeClasses = {
        'sm': 'px-3 py-1.5 text-sm',
        'md': 'px-4 py-2',
        'lg': 'px-6 py-3 text-base',
    };

    return button(
        {
            onClick,
            disabled: disabled || loading,
            className: `inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`,
            ...props
        },
        loading && createElement(Loader2, { className: 'w-4 h-4 animate-spin' }),
        children
    );
}

/**
 * Empty State Component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} props.title - Title text
 * @param {string} props.message - Message text
 * @param {React.ReactNode} props.action - Action button or element
 */
export function EmptyState({ icon, title, message, action = null }) {
    return div(
        { className: 'text-center py-12 px-4' },
        icon && div({ className: 'mb-4' }, icon),
        p({ className: 'text-base font-semibold text-gray-900 mb-2' }, title),
        p({ className: 'text-sm text-gray-600 mb-6 max-w-md mx-auto' }, message),
        action && div({ className: 'mt-6' }, action)
    );
}

// Helper functions for table elements
const { table, thead, tbody, tr, th, td } = {
    table: (props, ...children) => createElement('table', props, ...children),
    thead: (props, ...children) => createElement('thead', props, ...children),
    tbody: (props, ...children) => createElement('tbody', props, ...children),
    tr: (props, ...children) => createElement('tr', props, ...children),
    th: (props, ...children) => createElement('th', props, ...children),
    td: (props, ...children) => createElement('td', props, ...children),
};

/**
 * Table Component (shadcn-style)
 *
 * @param {Object} props
 * @param {Array} props.columns - Array of column definitions: [{ header: 'Name', accessor: 'name', className: '' }]
 * @param {Array} props.data - Array of data objects
 * @param {Function} props.renderCell - Optional custom cell renderer: (row, column) => ReactNode
 * @param {string} props.className - Additional classes for table wrapper
 * @param {React.ReactNode} props.emptyState - Custom empty state component
 */
export function Table({
    columns = [],
    data = [],
    renderCell = null,
    className = '',
    emptyState = null
}) {
    if (data.length === 0) {
        return emptyState || EmptyState({
            title: 'No data',
            message: 'There are no items to display.',
        });
    }

    return div(
        { className: `relative w-full overflow-auto ${className}` },
        table(
            { className: 'w-full caption-bottom text-sm' },
            thead(
                { className: 'border-b border-gray-200' },
                tr(
                    { className: 'border-b border-gray-200 transition-colors hover:bg-gray-50/50' },
                    ...columns.map((column) =>
                        th(
                            {
                                key: column.accessor || column.header,
                                className: `h-12 px-4 text-left align-middle font-medium text-gray-700 ${column.headerClassName || ''}`
                            },
                            column.header
                        )
                    )
                )
            ),
            tbody(
                { className: 'divide-y divide-gray-200' },
                ...data.map((row, rowIndex) =>
                    tr(
                        {
                            key: row.id || rowIndex,
                            className: 'border-b border-gray-200 transition-colors hover:bg-gray-50/50'
                        },
                        ...columns.map((column) =>
                            td(
                                {
                                    key: `${row.id || rowIndex}-${column.accessor}`,
                                    className: `p-4 align-middle ${column.className || ''}`
                                },
                                renderCell
                                    ? renderCell(row, column)
                                    : (row[column.accessor] || '-')
                            )
                        )
                    )
                )
            )
        )
    );
}

/**
 * TableActions Component
 *
 * Helper component for rendering action buttons in table cells
 *
 * @param {Object} props
 * @param {Array} props.actions - Array of action objects: [{ label: 'Edit', onClick: () => {}, icon: Component, variant: 'ghost' }]
 * @param {string} props.className - Additional classes
 */
export function TableActions({ actions = [], className = '' }) {
    return div(
        { className: `flex items-center gap-2 ${className}` },
        ...actions.map((action, index) =>
            button(
                {
                    key: index,
                    onClick: action.onClick,
                    disabled: action.disabled,
                    className: `inline-flex items-center justify-center gap-1.5 px-2 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${action.className || ''}`,
                    title: action.label
                },
                action.icon && createElement(action.icon, { className: 'w-4 h-4' }),
                action.showLabel && span({}, action.label)
            )
        )
    );
}

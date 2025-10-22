// ============================================
// REAL-WORLD BLOB USE CASES WITH OBJECTS
// ============================================

/* 
This file contains practical, production-ready examples
of converting objects to Blobs for real-world scenarios.
*/

// ============================================
// EXAMPLE 1: E-COMMERCE ORDER EXPORT SYSTEM
// ============================================

class OrderExportService {
    constructor() {
        this.orders = [
            { 
                id: 'ORD-001', 
                customer: 'John Doe', 
                total: 150.50, 
                date: '2024-01-15',
                items: [
                    { product: 'Laptop', quantity: 1, price: 150.50 }
                ]
            },
            { 
                id: 'ORD-002', 
                customer: 'Jane Smith', 
                total: 89.99, 
                date: '2024-01-16',
                items: [
                    { product: 'Mouse', quantity: 2, price: 44.995 }
                ]
            }
        ];
    }

    // Export orders as JSON
    exportAsJSON() {
        const blob = new Blob([JSON.stringify(this.orders, null, 2)], { 
            type: "application/json" 
        });
        this.downloadBlob(blob, `orders-${Date.now()}.json`);
        console.log('✅ JSON export completed');
    }

    // Export orders as CSV for Excel
    exportAsCSV() {
        const flatOrders = this.orders.map(order => ({
            'Order ID': order.id,
            'Customer': order.customer,
            'Date': order.date,
            'Total': order.total,
            'Items Count': order.items.length
        }));

        const headers = Object.keys(flatOrders[0]).join(',');
        const rows = flatOrders.map(order => 
            Object.values(order).map(val => 
                typeof val === 'string' ? `"${val}"` : val
            ).join(',')
        ).join('\n');

        const csv = `${headers}\n${rows}`;
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        this.downloadBlob(blob, `orders-${Date.now()}.csv`);
        console.log('✅ CSV export completed');
    }

    // Export detailed report as HTML
    exportAsReport() {
        const totalRevenue = this.orders.reduce((sum, order) => sum + order.total, 0);
        const avgOrderValue = totalRevenue / this.orders.length;

        const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Order Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #333; }
        .summary { background: #f0f0f0; padding: 15px; margin: 20px 0; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
    </style>
</head>
<body>
    <h1>Order Report</h1>
    <div class="summary">
        <h2>Summary</h2>
        <p>Total Orders: ${this.orders.length}</p>
        <p>Total Revenue: $${totalRevenue.toFixed(2)}</p>
        <p>Average Order Value: $${avgOrderValue.toFixed(2)}</p>
    </div>
    <h2>Order Details</h2>
    <table>
        <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
        </tr>
        ${this.orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>$${order.total}</td>
            </tr>
        `).join('')}
    </table>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        this.downloadBlob(blob, `order-report-${Date.now()}.html`);
        console.log('✅ HTML report generated');
    }

    downloadBlob(blob, filename) {
        // This would work in browser environment
        if (typeof document !== 'undefined') {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        } else {
            console.log(`📦 Blob created: ${filename} (${blob.size} bytes)`);
        }
    }
}

// Usage:
// const orderService = new OrderExportService();
// orderService.exportAsJSON();
// orderService.exportAsCSV();
// orderService.exportAsReport();


// ============================================
// EXAMPLE 2: USER ANALYTICS DASHBOARD DATA
// ============================================

class AnalyticsExporter {
    constructor(analyticsData) {
        this.data = analyticsData || {
            pageViews: 15420,
            uniqueVisitors: 8934,
            bounceRate: 42.5,
            avgSessionDuration: 245, // seconds
            topPages: [
                { page: '/home', views: 5234 },
                { page: '/products', views: 3421 },
                { page: '/about', views: 2156 }
            ],
            deviceBreakdown: {
                desktop: 60,
                mobile: 35,
                tablet: 5
            },
            period: {
                start: '2024-01-01',
                end: '2024-01-31'
            }
        };
    }

    // Generate comprehensive analytics report
    generateReport() {
        const report = {
            generatedAt: new Date().toISOString(),
            reportType: 'Monthly Analytics',
            period: this.data.period,
            metrics: {
                traffic: {
                    pageViews: this.data.pageViews,
                    uniqueVisitors: this.data.uniqueVisitors,
                    avgDailyViews: Math.round(this.data.pageViews / 31)
                },
                engagement: {
                    bounceRate: `${this.data.bounceRate}%`,
                    avgSessionDuration: `${Math.floor(this.data.avgSessionDuration / 60)}m ${this.data.avgSessionDuration % 60}s`
                },
                devices: this.data.deviceBreakdown,
                topPerformingPages: this.data.topPages
            },
            insights: this.generateInsights()
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { 
            type: "application/json" 
        });

        return blob;
    }

    generateInsights() {
        const insights = [];
        
        if (this.data.bounceRate > 50) {
            insights.push("⚠️ High bounce rate detected. Consider improving landing page content.");
        }
        
        if (this.data.deviceBreakdown.mobile > 40) {
            insights.push("📱 High mobile traffic. Ensure mobile optimization.");
        }

        return insights;
    }

    // Export to various formats
    exportJSON(filename = 'analytics.json') {
        const blob = this.generateReport();
        console.log(`📊 Analytics exported: ${blob.size} bytes`);
        return blob;
    }

    // Create shareable link (in browser)
    createShareableLink() {
        const blob = this.generateReport();
        if (typeof URL !== 'undefined') {
            return URL.createObjectURL(blob);
        }
        return null;
    }
}

// Usage:
// const analytics = new AnalyticsExporter();
// const reportBlob = analytics.exportJSON();


// ============================================
// EXAMPLE 3: BACKUP & RESTORE SYSTEM
// ============================================

class DataBackupService {
    constructor() {
        this.backupVersion = '1.0.0';
    }

    // Create full application backup
    createBackup(appData) {
        const backup = {
            version: this.backupVersion,
            timestamp: new Date().toISOString(),
            data: {
                users: appData.users || [],
                settings: appData.settings || {},
                cache: appData.cache || {},
                preferences: appData.preferences || {}
            },
            metadata: {
                totalUsers: appData.users?.length || 0,
                backupSize: 0 // Will be set after blob creation
            }
        };

        const blob = new Blob([JSON.stringify(backup, null, 2)], { 
            type: "application/json" 
        });

        backup.metadata.backupSize = blob.size;

        console.log(`✅ Backup created:
        - Version: ${backup.version}
        - Timestamp: ${backup.timestamp}
        - Size: ${blob.size} bytes
        - Users: ${backup.metadata.totalUsers}`);

        return blob;
    }

    // Restore from backup blob
    async restoreBackup(blob) {
        try {
            const text = await blob.text();
            const backup = JSON.parse(text);

            // Validate backup
            if (!this.validateBackup(backup)) {
                throw new Error('Invalid backup format');
            }

            console.log(`✅ Backup restored from ${backup.timestamp}`);
            return backup.data;
        } catch (error) {
            console.error('❌ Restore failed:', error);
            throw error;
        }
    }

    validateBackup(backup) {
        return backup.version && 
               backup.timestamp && 
               backup.data &&
               typeof backup.data === 'object';
    }

    // Create incremental backup (only changes)
    createIncrementalBackup(currentData, lastBackupData) {
        const changes = this.detectChanges(currentData, lastBackupData);
        
        const incrementalBackup = {
            type: 'incremental',
            version: this.backupVersion,
            timestamp: new Date().toISOString(),
            changes: changes
        };

        const blob = new Blob([JSON.stringify(incrementalBackup, null, 2)], { 
            type: "application/json" 
        });

        console.log(`📦 Incremental backup: ${blob.size} bytes`);
        return blob;
    }

    detectChanges(current, previous) {
        // Simple change detection (in production, use proper diffing)
        return {
            added: [],
            modified: [],
            deleted: []
        };
    }
}

// Usage:
const backupService = new DataBackupService();
const appData = {
    users: [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' }
    ],
    settings: { theme: 'dark', language: 'en' },
    cache: { lastSync: Date.now() }
};
const backupBlob = backupService.createBackup(appData);


// ============================================
// EXAMPLE 4: FORM DATA EXPORT & IMPORT
// ============================================

class FormDataManager {
    // Export form data for later use
    exportFormData(formData) {
        const exportData = {
            exportedAt: new Date().toISOString(),
            formVersion: '1.0',
            data: formData
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
            type: "application/json" 
        });

        console.log('✅ Form data exported');
        return blob;
    }

    // Import and validate form data
    async importFormData(blob) {
        const text = await blob.text();
        const imported = JSON.parse(text);

        if (!imported.formVersion || !imported.data) {
            throw new Error('Invalid form data format');
        }

        console.log(`✅ Form data imported from ${imported.exportedAt}`);
        return imported.data;
    }

    // Create form template
    createTemplate(fields) {
        const template = {
            name: 'Form Template',
            version: '1.0',
            createdAt: new Date().toISOString(),
            fields: fields,
            data: {}
        };

        // Initialize empty data structure
        fields.forEach(field => {
            template.data[field.name] = field.defaultValue || '';
        });

        const blob = new Blob([JSON.stringify(template, null, 2)], { 
            type: "application/json" 
        });

        return blob;
    }
}

// Usage:
const formManager = new FormDataManager();
const userForm = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'New York',
        zip: '10001'
    }
};
const formBlob = formManager.exportFormData(userForm);


// ============================================
// EXAMPLE 5: API RESPONSE CACHE WITH BLOBS
// ============================================

class APIResponseCache {
    constructor(maxAge = 3600000) { // 1 hour default
        this.cache = new Map();
        this.maxAge = maxAge;
    }

    // Cache API response
    async cacheResponse(endpoint, responseData) {
        const cacheEntry = {
            endpoint: endpoint,
            data: responseData,
            cachedAt: Date.now(),
            expiresAt: Date.now() + this.maxAge
        };

        const blob = new Blob([JSON.stringify(cacheEntry)], { 
            type: "application/json" 
        });

        const url = URL.createObjectURL(blob);
        
        this.cache.set(endpoint, {
            url: url,
            size: blob.size,
            cachedAt: cacheEntry.cachedAt,
            expiresAt: cacheEntry.expiresAt
        });

        console.log(`✅ Cached ${endpoint} (${blob.size} bytes)`);
    }

    // Get cached response
    async getCached(endpoint) {
        const entry = this.cache.get(endpoint);
        
        if (!entry) {
            console.log(`❌ Cache miss: ${endpoint}`);
            return null;
        }

        // Check expiration
        if (Date.now() > entry.expiresAt) {
            console.log(`⏰ Cache expired: ${endpoint}`);
            this.invalidate(endpoint);
            return null;
        }

        // Fetch from blob URL
        const response = await fetch(entry.url);
        const cacheEntry = await response.json();

        console.log(`✅ Cache hit: ${endpoint}`);
        return cacheEntry.data;
    }

    // Invalidate cache
    invalidate(endpoint) {
        const entry = this.cache.get(endpoint);
        if (entry) {
            URL.revokeObjectURL(entry.url);
            this.cache.delete(endpoint);
            console.log(`🗑️ Cache invalidated: ${endpoint}`);
        }
    }

    // Clear all cache
    clearAll() {
        for (const entry of this.cache.values()) {
            URL.revokeObjectURL(entry.url);
        }
        this.cache.clear();
        console.log('🗑️ All cache cleared');
    }

    // Get cache stats
    getStats() {
        const entries = Array.from(this.cache.values());
        const totalSize = entries.reduce((sum, entry) => sum + entry.size, 0);
        
        return {
            totalEntries: this.cache.size,
            totalSize: totalSize,
            entries: Array.from(this.cache.keys())
        };
    }
}

// Usage:
const apiCache = new APIResponseCache(5 * 60 * 1000); // 5 minutes

// Cache some responses
// await apiCache.cacheResponse('/api/users', { users: [...] });
// await apiCache.cacheResponse('/api/products', { products: [...] });

// Retrieve cached data
// const users = await apiCache.getCached('/api/users');

// Get cache statistics
const stats = apiCache.getStats();
console.log('Cache stats:', stats);


// ============================================
// EXAMPLE 6: MULTI-FORMAT EXPORTER CLASS
// ============================================

class MultiFormatExporter {
    constructor(data) {
        this.data = data;
    }

    // Export as JSON
    toJSON(beautify = true) {
        const jsonString = beautify 
            ? JSON.stringify(this.data, null, 2)
            : JSON.stringify(this.data);
            
        return new Blob([jsonString], { type: "application/json" });
    }

    // Export as CSV (for array of objects)
    toCSV() {
        if (!Array.isArray(this.data) || this.data.length === 0) {
            throw new Error('CSV export requires array of objects');
        }

        const headers = Object.keys(this.data[0]);
        const csvHeaders = headers.join(',');
        
        const csvRows = this.data.map(row => 
            headers.map(header => {
                const value = row[header];
                // Escape quotes and wrap in quotes if contains comma
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
        ).join('\n');

        const csv = `${csvHeaders}\n${csvRows}`;
        return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    }

    // Export as XML
    toXML() {
        const xml = this.objectToXML(this.data, 'root');
        return new Blob([xml], { type: 'application/xml' });
    }

    objectToXML(obj, rootName) {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>`;
        
        const buildXML = (data, level = 1) => {
            const indent = '  '.repeat(level);
            
            if (Array.isArray(data)) {
                data.forEach(item => {
                    xml += `\n${indent}<item>`;
                    buildXML(item, level + 1);
                    xml += `\n${indent}</item>`;
                });
            } else if (typeof data === 'object' && data !== null) {
                Object.entries(data).forEach(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        xml += `\n${indent}<${key}>`;
                        buildXML(value, level + 1);
                        xml += `\n${indent}</${key}>`;
                    } else {
                        xml += `\n${indent}<${key}>${value}</${key}>`;
                    }
                });
            } else {
                xml += data;
            }
        };
        
        buildXML(obj);
        xml += `\n</${rootName}>`;
        return xml;
    }

    // Export as plain text
    toText() {
        const text = JSON.stringify(this.data, null, 2);
        return new Blob([text], { type: 'text/plain' });
    }

    // Export as YAML-like format
    toYAML() {
        const yaml = this.objectToYAML(this.data);
        return new Blob([yaml], { type: 'text/yaml' });
    }

    objectToYAML(obj, indent = 0) {
        let yaml = '';
        const spaces = '  '.repeat(indent);
        
        if (Array.isArray(obj)) {
            obj.forEach(item => {
                yaml += `${spaces}- `;
                if (typeof item === 'object') {
                    yaml += '\n' + this.objectToYAML(item, indent + 1);
                } else {
                    yaml += `${item}\n`;
                }
            });
        } else if (typeof obj === 'object' && obj !== null) {
            Object.entries(obj).forEach(([key, value]) => {
                yaml += `${spaces}${key}: `;
                if (typeof value === 'object' && value !== null) {
                    yaml += '\n' + this.objectToYAML(value, indent + 1);
                } else {
                    yaml += `${value}\n`;
                }
            });
        }
        
        return yaml;
    }
}

// Usage:
const exportData = [
    { id: 1, name: 'Product A', price: 29.99, category: 'Electronics' },
    { id: 2, name: 'Product B', price: 49.99, category: 'Clothing' }
];

const exporter = new MultiFormatExporter(exportData);
const jsonBlob = exporter.toJSON();
const csvBlob = exporter.toCSV();
const xmlBlob = exporter.toXML();

console.log('Multi-format export completed:');
console.log(`- JSON: ${jsonBlob.size} bytes`);
console.log(`- CSV: ${csvBlob.size} bytes`);
console.log(`- XML: ${xmlBlob.size} bytes`);


// ============================================
// EXAMPLE 7: LOG FILE GENERATOR
// ============================================

class LogFileGenerator {
    constructor() {
        this.logs = [];
    }

    addLog(level, message, metadata = {}) {
        this.logs.push({
            timestamp: new Date().toISOString(),
            level: level,
            message: message,
            metadata: metadata
        });
    }

    // Generate log file
    generateLogFile() {
        const logText = this.logs.map(log => 
            `[${log.timestamp}] [${log.level}] ${log.message} ${JSON.stringify(log.metadata)}`
        ).join('\n');

        const blob = new Blob([logText], { type: 'text/plain' });
        console.log(`📝 Log file generated: ${blob.size} bytes`);
        return blob;
    }

    // Generate structured JSON logs
    generateJSONLogs() {
        const blob = new Blob([JSON.stringify(this.logs, null, 2)], { 
            type: "application/json" 
        });
        return blob;
    }

    // Generate NDJSON (Newline Delimited JSON) for streaming
    generateNDJSON() {
        const ndjson = this.logs.map(log => JSON.stringify(log)).join('\n');
        const blob = new Blob([ndjson], { type: 'application/x-ndjson' });
        return blob;
    }

    clear() {
        this.logs = [];
    }
}

// Usage:
const logger = new LogFileGenerator();
logger.addLog('INFO', 'Application started', { version: '1.0.0' });
logger.addLog('DEBUG', 'Database connected', { host: 'localhost' });
logger.addLog('ERROR', 'Failed to load resource', { resource: 'config.json' });

const logBlob = logger.generateLogFile();
const jsonLogBlob = logger.generateJSONLogs();


// ============================================
// SUMMARY & BEST PRACTICES
// ============================================

console.log(`
╔════════════════════════════════════════════════════════════╗
║          OBJECT TO BLOB - REAL WORLD EXAMPLES              ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  ✅ E-Commerce order exports (JSON, CSV, HTML)            ║
║  ✅ Analytics data reporting                              ║
║  ✅ Backup & restore systems                              ║
║  ✅ Form data import/export                               ║
║  ✅ API response caching                                  ║
║  ✅ Multi-format data export                              ║
║  ✅ Log file generation                                   ║
║                                                            ║
║  KEY TAKEAWAYS:                                           ║
║  • Always use JSON.stringify() for objects                ║
║  • Set appropriate MIME types                             ║
║  • Clean up URLs with URL.revokeObjectURL()               ║
║  • Handle errors gracefully                               ║
║  • Consider file size for large objects                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);


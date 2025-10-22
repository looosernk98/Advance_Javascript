# Blob Demos - Troubleshooting Guide

## 🚀 Quick Start

### Option 1: Use Fixed Demo (⭐ RECOMMENDED)
```bash
open demo_fixed.html
```
**This is the working version!** Uses modern event listeners instead of inline onclick.

### Option 2: Use Test Demo
```bash
open test_demo.html
```
Simplified version for quick testing.

### Option 3: Use Original Demo (May have caching issues)
```bash
open demo.html
```
Original comprehensive demo with 8 examples (try hard refresh if not working).

---

## ❌ Troubleshooting: "function is not defined"

### Problem
You're seeing errors like:
```
demo2_downloadJSON is not defined
demo1_downloadJSON is not defined
```

### Root Cause
The issue is with **inline onclick handlers** combined with **browser caching**. When you use `onclick="demo2_downloadJSON()"` in HTML, the browser looks for that function in the global scope when the page loads. If the JavaScript hasn't fully loaded yet or is cached incorrectly, the function won't be found.

### ✅ **BEST SOLUTION: Use `demo_fixed.html`**
The `demo_fixed.html` file uses **modern event listeners** instead of inline onclick:

**Old (problematic) approach:**
```html
<button onclick="demo2_downloadJSON()">Download</button>
```

**New (working) approach:**
```javascript
document.getElementById('btn2a').addEventListener('click', function() {
    // Function code here
});
```

This approach is more reliable because:
- ✅ No global scope pollution
- ✅ No dependency on function loading order
- ✅ No caching issues with onclick attributes
- ✅ Better separation of HTML and JavaScript

### Alternative Solutions (if you must use demo.html)

### 1. **Hard Refresh the Page** ⭐ Most Common Fix
Your browser is caching an old version of the file.

**Mac:**
- Chrome/Edge: `Cmd + Shift + R`
- Safari: `Cmd + Option + R`

**Windows/Linux:**
- Chrome/Edge/Firefox: `Ctrl + Shift + R` or `Ctrl + F5`

### 2. **Clear Browser Cache**
1. Open DevTools (`F12` or `Cmd/Ctrl + Shift + I`)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### 3. **Disable Cache in DevTools**
1. Open DevTools (`F12`)
2. Go to Network tab
3. Check "Disable cache"
4. Keep DevTools open and refresh

### 4. **Check Console for Errors**
1. Open DevTools (`F12`)
2. Go to Console tab
3. Look for any error messages
4. The demo should show: `✅ Version 2.0 - All demos loaded successfully!`

### 5. **Try Incognito/Private Mode**
Open the file in an incognito/private browser window to bypass cache.

---

## ✅ Verify Installation

### Check if demos are working:

1. **Open `test_demo.html`** - This has built-in verification
   - Should show: ✅ All functions loaded successfully!
   
2. **Check Browser Console** (F12)
   - Should see: `🎯 Blob Demo v2.0 Ready!`
   - Should see: `✅ All 16 functions loaded successfully`

3. **Version Banner**
   - At the top of `demo.html` you should see a green banner
   - It should say: "✅ Version 2.0 - All demos loaded successfully!"

---

## 📁 File Overview

| File | Purpose | Status | Recommended |
|------|---------|--------|-------------|
| `demo_fixed.html` | **WORKING demo** - Uses event listeners | ✅ Complete | ⭐ **USE THIS** |
| `test_demo.html` | Simplified test version with 4 demos | ✅ Complete | ✅ Good |
| `demo.html` | Original demo (may have onclick issues) | ⚠️ Caching issues | ❌ Try fixed version |
| `index.js` | Comprehensive blob examples with 10 use cases | ✅ Complete | ✅ Good |
| `reference.md` | Complete documentation and API reference | ✅ Complete | ✅ Good |
| `real_world_examples.js` | Production-ready examples | ✅ Complete | ✅ Good |
| `README.md` | This troubleshooting guide | ✅ Complete | ✅ Good |

---

## 🧪 Testing Individual Demos

### Demo 1: Basic Conversion
```javascript
// Open browser console and run:
const obj = { name: "test", age: 25 };
const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
console.log("Blob created:", blob.size, "bytes");
```

### Demo 2: Download
```javascript
// Should trigger a file download
const blob = new Blob([JSON.stringify({ test: true })], { type: "application/json" });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'test.json';
a.click();
URL.revokeObjectURL(url);
```

### Demo 3: Blob URL
```javascript
// Should create a blob: URL
const blob = new Blob(["Hello World"], { type: "text/plain" });
const url = URL.createObjectURL(blob);
console.log("Blob URL:", url);
// Don't forget to revoke: URL.revokeObjectURL(url);
```

---

## 🔍 Common Issues

### Issue: Nothing happens when clicking buttons
**Cause:** JavaScript not loaded or functions not defined
**Fix:** Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### Issue: "Blob is not defined"
**Cause:** Very old browser
**Fix:** Update your browser (Blob is supported in all modern browsers)

### Issue: Download doesn't work
**Cause:** Browser blocking automatic downloads
**Fix:** Check browser settings for download permissions

### Issue: Clipboard demo doesn't work
**Cause:** Clipboard API requires HTTPS or localhost
**Fix:** 
- Use localhost or HTTPS
- Or check browser permissions for clipboard access

---

## 📊 Expected Behavior

### Demo 1: Basic Conversion ✅
- Click "Convert to Blob" → Should show blob size and type
- Click "Read Blob Content" → Should show JSON content

### Demo 2: Download Files ✅
- Click any download button → Should download a file
- Check your Downloads folder

### Demo 3: Upload Simulation ✅
- Click "Simulate Upload" → Should show FormData details

### Demo 4: Blob URL ✅
- Click "Create Blob URL" → Should show blob: URL
- Click "Show Preview" → Should display iframe with data

### Demo 5: Clipboard ✅
- Click "Copy to Clipboard" → Should copy JSON to clipboard
- Try pasting (Ctrl/Cmd+V) in a text editor

### Demo 6: Combine Objects ✅
- Click "Combine & Download" → Should download combined.ndjson

### Demo 7: Blob Storage ✅
- Click "Store Object" → Should store in memory
- Click "Retrieve Object" → Should show stored data

### Demo 8: Performance ✅
- Click "Run Performance Test" → Should show timing results

---

## 🆘 Still Having Issues?

### Check these:

1. **Browser Version**
   - Chrome/Edge: v76+
   - Firefox: v69+
   - Safari: v14+

2. **File Location**
   - Make sure the HTML file is not corrupted
   - Try re-downloading or re-creating the file

3. **Console Errors**
   - Open DevTools (F12)
   - Check Console for any red errors
   - Share those errors for help

4. **Try Different Browser**
   - Test in Chrome, Firefox, or Edge
   - If it works in one but not another, it's a browser-specific issue

---

## 💡 Tips

1. **Always open DevTools** when testing
2. **Hard refresh** after any changes
3. **Check console** for helpful messages
4. **Use test_demo.html** for quick testing
5. **Read reference.md** for detailed documentation

---

## 📝 Quick Reference

### Creating a Blob from Object
```javascript
const obj = { name: "test" };
const blob = new Blob([JSON.stringify(obj)], { 
    type: "application/json" 
});
```

### Downloading a Blob
```javascript
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'filename.json';
a.click();
URL.revokeObjectURL(url); // Important!
```

### Reading a Blob
```javascript
// Modern way
const text = await blob.text();
const obj = JSON.parse(text);
```

---

## ✅ Success Indicators

When everything is working, you should see:

1. ✅ Green banner at top: "Version 2.0 - All demos loaded successfully!"
2. ✅ Console log: "🎯 Blob Demo v2.0 Ready!"
3. ✅ All buttons clickable and responsive
4. ✅ Output areas update when clicking buttons
5. ✅ Files download to your Downloads folder

---

## 📚 Additional Resources

- `reference.md` - Complete API documentation
- `real_world_examples.js` - Production code examples
- `index.js` - All 10 use cases with explanations
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/API/Blob

---

**Last Updated:** October 2024
**Version:** 2.0


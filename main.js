import { scripts } from './data.js';
import CryptoJS from 'crypto-js';

// DOM Elements
const scriptsGrid = document.getElementById('scripts-grid');
const searchInput = document.getElementById('search-input');
const scriptCount = document.getElementById('script-count');
let categoryButtons = document.querySelectorAll('.cat-btn');
const currentCategoryTitle = document.getElementById('current-category');
const modal = document.getElementById('script-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.querySelector('.close-modal');
const breadcrumbsContainer = document.getElementById('breadcrumbs');
const searchLocalCheck = document.getElementById('search-local');
const searchOptionsContainer = document.querySelector('.search-options');
const lightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('img-zoomed');
const closeLightbox = document.querySelector('.close-lightbox');

let currentFilter = 'all';
let searchQuery = '';
let currentScriptId = null;
let isUnlocked = false;
let unlockedContentCache = ''; // Stores decrypted HTML temporarily

// Check Unlock
window.checkUnlock = function () {
    const input = document.getElementById('unlock-input');
    const errorMsg = document.getElementById('unlock-error');
    if (!input || !currentScriptId) return;

    const script = scripts.find(s => s.id === currentScriptId);
    if (!script) return;

    try {
        const password = input.value;
        const bytes = CryptoJS.AES.decrypt(script.content, password);
        const decryptedHTML = bytes.toString(CryptoJS.enc.Utf8);

        // Simple check to ensure output looks like HTML/Text and decryption succeeded
        if (decryptedHTML && decryptedHTML.length > 0) {
            isUnlocked = true;
            unlockedContentCache = decryptedHTML;
            renderScripts();
            return;
        }
    } catch (e) {
        // Will fall through to error handling
    }

    input.style.borderColor = '#ef4444';
    if (errorMsg) errorMsg.style.display = 'block';
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
};

// Clear lock when changing scripts
function clearUnlockState() {
    isUnlocked = false;
    unlockedContentCache = '';
}

// Helper to fix image paths for production
const fixImagePaths = (content) => {
    // Keep absolute paths /scripts/ - they work with Vercel rewrites
    return content;
};

// Helper to create URL slugs (handled accents: Dinámico -> dinamico)
const slugify = (text) => text.toString().toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');         // Replace multiple - with single -

// Global filter function with URL update
window.filterByCategory = function (category) {
    currentFilter = category;
    currentScriptId = null; // Clear open script when changing category
    clearUnlockState(); // Reset lock State

    // Clear Search Query
    searchQuery = '';
    if (searchInput) searchInput.value = '';

    // Collapse all category groups before re-evaluating
    document.querySelectorAll('.category-group').forEach(group => group.classList.remove('expanded'));

    // Update UI active state
    document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');

            // Clean title string and remove numeric prefix
            const textContent = btn.innerText.replace(/[▲▼]/g, '').trim();
            const cleanTitle = textContent.replace(/^\d+\.\s*/, '');
            currentCategoryTitle.textContent = cleanTitle;

            // Expand all parent category groups iteratively
            let group = btn.closest('.category-group');
            while (group) {
                group.classList.add('expanded');
                group = group.parentElement ? group.parentElement.closest('.category-group') : null;
            }
        } else {
            btn.classList.remove('active');
        }
    });

    const slug = category === 'all' ? '' : slugify(category);
    let path = '/';
    if (category === 'Conectividad') path = '/conectividad';
    else if (category !== 'all') path = `/conectividad/${slug}`;

    window.history.pushState({ filter: category, scriptId: null }, '', path);
    renderScripts();
};

// Initialize
function init() {
    populateSidebarScripts();
    renderScripts();
    setupEventListeners();
    handleInitialRouting();
}

function populateSidebarScripts() {
    const parentBtns = Array.from(document.querySelectorAll('.cat-btn:not([data-category="all"])'));

    parentBtns.forEach(btn => {
        const catName = btn.dataset.category;
        const matchingScripts = scripts.filter(s => s.category === catName && !s.parentScriptId && !s.isHidden);

        if (matchingScripts.length > 0) {
            // Find prefix like '1.1.'
            const prefixMatch = btn.innerHTML.match(/<span[^>]*>\s*([\d\.]+)\s*<\/span>/);
            const prefix = prefixMatch ? prefixMatch[1] : '';

            // Generate scripts HTML
            const scriptHtml = matchingScripts.map((s, idx) => `
                <button class="cat-btn script-level-btn sub" 
                    data-script-id="${s.id}" 
                    title="${s.title}"
                    onclick="event.stopPropagation(); window.openScript(${s.id}); closeSidebarMobile();">
                    <span style="opacity:0.5; margin-right:4px;">${prefix}${idx + 1}.</span> 
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 15ch;">${s.title}</span>
                </button>
            `).join('');

            // Make parent button expandable if not already
            if (!btn.classList.contains('has-sub')) {
                btn.classList.add('has-sub');
                if (!btn.querySelector('.chevron')) {
                    btn.innerHTML += ' <i class="fas fa-chevron-right chevron"></i>';
                }
            }

            // Check if button is already inside a group (e.g. inside conectividad-sub)
            const parentElement = btn.parentElement;

            if (parentElement.classList.contains('category-group') && parentElement.firstElementChild === btn) {
                // If it's already a main group head, we probably just add these inside its existing sub-nav?
                // But for Apex structure, we only want deeper scripts under a standard category without subgroups, or under a Dinámico wrapper.
                let subNav = parentElement.querySelector('.sub-nav');
                if (!subNav) {
                    subNav = document.createElement('div');
                    subNav.className = 'sub-nav';
                    parentElement.appendChild(subNav);
                }
                subNav.insertAdjacentHTML('beforeend', scriptHtml);
            } else {
                // Wrap it 
                const groupDiv = document.createElement('div');
                groupDiv.className = 'category-group';

                parentElement.insertBefore(groupDiv, btn);
                groupDiv.appendChild(btn);

                const subNavDiv = document.createElement('div');
                subNavDiv.className = 'sub-nav';
                subNavDiv.innerHTML = scriptHtml;
                groupDiv.appendChild(subNavDiv);
            }
        }
    });

    // Reattach listeners and assign array
    categoryButtons = document.querySelectorAll('.cat-btn:not(.script-level-btn)');
}

// Logo click to go home
const logoHome = document.getElementById('logo-home');
if (logoHome) {
    logoHome.addEventListener('click', () => {
        window.history.pushState({ filter: 'all', scriptId: null }, '', '/');
        filterByCategory('all');
        closeSidebarMobile();
    });
    logoHome.style.cursor = 'pointer';
}

// Mobile Sidebar Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.querySelector('.sidebar');

function closeSidebarMobile() {
    if (hamburgerBtn && sidebar && window.innerWidth <= 900) {
        hamburgerBtn.classList.remove('active');
        sidebar.classList.remove('open');
    }
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking on a category
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeSidebarMobile();
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== hamburgerBtn) {
            closeSidebarMobile();
        }
    });
}

// Handle browser back/forward
window.addEventListener('popstate', (event) => {
    // Specifically handle history back navigation
    if (window.location.pathname === '/history') {
        renderHistoryPage();
        return;
    }

    if (event.state) {
        currentFilter = event.state.filter || 'all';
        currentScriptId = event.state.scriptId || null;
        renderScripts();

        // Track visit via back/forward navigation too
        if (event.state.scriptId) {
            const script = scripts.find(s => s.id === event.state.scriptId);
            if (script) saveToHistory(script);
        }
    } else {
        location.reload();
    }
});

// ── History ───────────────────────────────────────────────────────────────────
const HISTORY_KEY = 'apex_nav_history';
const HISTORY_MAX = 100;

function saveToHistory(script) {
    const catSlug = slugify(script.category);
    const scriptSlug = slugify(script.title);
    const url = `/conectividad/${catSlug}/${scriptSlug}`;

    const conectividadSubs = ['Dinámico', 'Simétrico', 'xDSL', 'FTTH', 'GPON Corporativo', 'Internet Plus', 'Enlace Fibra', 'Satelital', 'VPN', 'SD-Wan', 'SD-Branch', 'VVIP', 'Fibertel Zone', 'Servicios Adicionales', 'LTE'];
    const breadcrumb = conectividadSubs.includes(script.category)
        ? `Conectividad > ${script.category} > ${script.title}`
        : `${script.category} > ${script.title}`;

    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');

    const existingIndex = history.findIndex(h => h.url === url);
    if (existingIndex !== -1) {
        const existing = history[existingIndex];
        existing.breadcrumb = breadcrumb; // Fix stale entries

        // Only increment if it was NOT already at the top
        if (existingIndex > 0) {
            existing.count = (existing.count || 1) + 1;
            existing.lastVisit = new Date().toISOString();
            if (!existing.visits) existing.visits = [existing.lastVisit]; // Backward compatibility
            existing.visits.unshift(existing.lastVisit);
        }

        // Move to top (most recently visited)
        history = [existing, ...history.filter((_, i) => i !== existingIndex)];
    } else {
        history.unshift({
            title: script.title,
            category: script.category,
            breadcrumb,
            url,
            count: 1,
            firstVisit: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            visits: [new Date().toISOString()]
        });
    }

    // Keep only last 100
    if (history.length > HISTORY_MAX) history = history.slice(0, HISTORY_MAX);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function renderHistoryPage() {
    const conectividadSubs = ['Dinámico', 'Simétrico', 'xDSL', 'FTTH', 'GPON Corporativo', 'Internet Plus', 'Enlace Fibra', 'Satelital', 'VPN', 'SD-Wan', 'SD-Branch', 'VVIP', 'Fibertel Zone', 'Servicios Adicionales', 'LTE'];
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');

    // Filter out hidden scripts from history
    history = history.filter(h => {
        const sc = scripts.find(s => s.title === h.title);
        return sc && !sc.isHidden;
    });

    // Update header
    currentCategoryTitle.textContent = 'Historial de Navegación';
    breadcrumbsContainer.innerHTML = `
        <a class="breadcrumb-item" onclick="filterByCategory('all')">
            <span>🏠</span> Inicio
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item active">Historial de Navegación</span>
    `;
    breadcrumbsContainer.classList.remove('is-home');
    document.querySelector('.content-header').classList.add('is-history');
    scriptsGrid.className = 'scripts-grid'; // Resets to block without grid-mode

    const stats = document.querySelector('.stats');
    if (stats) {
        const totalLogs = history.reduce((sum, h) => sum + (h.count || 1), 0);
        stats.innerHTML = `
            <span>${totalLogs} logs</span>
            ${history.length > 0 ? `<button onclick="clearHistory()" class="btn-ghost-danger">🗑 Borrar logs</button>` : ''}
        `;
    }

    if (history.length === 0) {
        scriptsGrid.innerHTML = `
            <div style="text-align:center; padding: 4rem; color: var(--text-secondary);">
                <div style="font-size:3rem; margin-bottom:1rem;">📭</div>
                <p>Todavía no visitaste ningún script.</p>
            </div>
        `;
        return;
    }

    const fmt = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })
            + ' ' + d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    };

    const rows = history.map((h, i) => {
        const count = h.count || 1;
        let pVisits = h.visits ? [...h.visits] : [h.lastVisit || h.timestamp || new Date().toISOString()];

        // Fill older missing visits for accurate count reflection
        while (pVisits.length < count) {
            pVisits.push(h.firstVisit || pVisits[pVisits.length - 1]);
        }
        pVisits = pVisits.slice(0, count);

        const hasDetails = count > 1 && pVisits.length > 1;

        let visitsHtml = '';
        if (hasDetails) {
            const visitRows = pVisits.map((v, idx) => `
                <div class="history-detail-row">
                    <span class="history-detail-index">${idx + 1}.</span> 
                    <span>${fmt(v)}</span>
                </div>
            `).join('');
            visitsHtml = `
            <div class="history-details" id="details-${i}">
                <div class="history-details-inner">
                    <div class="history-details-header">Desglose de sub-logs (últimos accesos):</div>
                    ${visitRows}
                </div>
            </div>`;
        }

        const countLabel = hasDetails
            ? `<span class="history-count history-count-expandable" onclick="event.preventDefault(); event.stopPropagation(); document.getElementById('details-${i}').classList.toggle('open');" style="cursor: pointer;" title="Ver desglose">${h.count}× <i class="fas fa-chevron-down" style="font-size:0.75rem; margin-left: 2px;"></i></span>`
            : `<span class="history-count" title="${h.count || 1} visita(s)">${h.count || 1}×</span>`;

        return `
        <div class="history-item-container">
            <a href="${h.url}" class="history-row" title="Ir a ${h.title}" onclick="event.preventDefault(); window.openHistoryScript(unescape('${escape(h.title)}'));">
                <span class="history-index">${i + 1}</span>
                <span class="history-info">
                    <span class="history-title">${h.title}</span>
                    <span class="history-path">${h.breadcrumb ? h.breadcrumb.replace(/^Inicio\\s*>\\s*/, '') : (conectividadSubs.includes(h.category) ? 'Conectividad > ' + h.category + ' > ' + h.title : h.category + ' > ' + h.title)}</span>
                    <span class="history-meta">${fmt(h.lastVisit || h.timestamp || '')}</span>
                </span>
                ${countLabel}
                <span class="history-arrow">→</span>
            </a>
            ${visitsHtml}
        </div>`;
    }).join('');

    scriptsGrid.innerHTML = `<div class="history-list">${rows}</div>`;
}

window.clearHistory = function () {
    if (confirm('¿Borrar todos los logs?')) {
        localStorage.removeItem(HISTORY_KEY);
        renderHistoryPage();
    }
};

window.openHistoryScript = function (title) {
    const s = scripts.find(x => x.title === title);
    if (s) {
        openScript(s.id);
    }
};
// ──────────────────────────────────────────────────────────────────────────────

function handleInitialRouting() {
    // Check for ?q= search query param first
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q');
    if (qParam) {
        searchQuery = qParam;
        if (searchInput) searchInput.value = qParam;
        renderScripts();
        return;
    }

    const path = window.location.pathname.split('/').filter(Boolean);

    // Handle /history route
    if (path[0] === 'history') {
        window.history.replaceState({}, '', '/history');
        renderHistoryPage();
        return;
    }

    if (path[0] === 'conectividad') {
        const categoryMap = {
            'conectividad': 'Conectividad',
            'dinamico': 'Dinámico',
            'simetrico': 'Simétrico',
            'ftth': 'FTTH'
        };

        const targetCat = path[1] ? (categoryMap[path[1]] || path[1].charAt(0).toUpperCase() + path[1].slice(1).replace(/-/g, ' ')) : 'Conectividad';

        const catBtn = Array.from(categoryButtons).find(btn => btn.dataset.category === targetCat);

        if (catBtn) {
            currentFilter = targetCat;
            categoryButtons.forEach(b => b.classList.remove('active'));
            catBtn.classList.add('active');
            currentCategoryTitle.textContent = catBtn.innerText.replace(/[▲▼]/g, '').trim();

            if (catBtn.classList.contains('sub') || catBtn.classList.contains('has-sub')) {
                const group = catBtn.closest('.category-group');
                if (group) group.classList.add('expanded');
            }
        }

        renderScripts();

        if (path[2]) {
            const script = scripts.find(s => slugify(s.title) === path[2]);
            if (script) openScript(script.id);
        }
    } else if (path[0]) {
        // Handle other top-level categories
        const catName = path[0].charAt(0).toUpperCase() + path[0].slice(1).replace(/-/g, ' ');
        const catBtn = Array.from(categoryButtons).find(btn => btn.dataset.category === catName);
        if (catBtn) filterByCategory(catName);
    }
}

// Render Breadcrumbs
function renderBreadcrumbs() {
    let html = `
        <a class="breadcrumb-item" onclick="filterByCategory('all')">
            <span>🏠</span> Inicio
        </a>
    `;

    if (currentFilter !== 'all') {
        breadcrumbsContainer.classList.remove('is-home');
        html += `<span class="breadcrumb-separator">/</span>`;

        // Always show Conectividad if we are in a sub-category of it or Conectividad itself
        html += `
            <a class="breadcrumb-item ${currentFilter === 'Conectividad' && !currentScriptId ? 'active' : ''}" 
               onclick="filterByCategory('Conectividad')">
                Conectividad
            </a>
        `;

        if (currentFilter !== 'Conectividad') {
            html += `<span class="breadcrumb-separator">/</span>`;
            html += `
                <a class="breadcrumb-item ${!currentScriptId ? 'active' : ''}" 
                   onclick="filterByCategory('${currentFilter}')">
                    ${currentFilter}
                </a>
            `;
        }

        if (currentScriptId) {
            let script = scripts.find(s => s.id === currentScriptId);
            if (script) {
                const breadcrumbScripts = [];
                let current = script;
                while (current) {
                    breadcrumbScripts.unshift(current);
                    if (current.parentScriptId) {
                        current = scripts.find(s => s.id === current.parentScriptId);
                    } else {
                        current = null;
                    }
                }
                breadcrumbScripts.forEach((s, index) => {
                    html += `<span class="breadcrumb-separator">/</span>`;

                    let childrenMenu = '';
                    if (s.childScripts && s.childScripts.length > 0) {
                        const childItems = s.childScripts.map(childId => {
                            const childScript = scripts.find(cs => cs.id === childId);
                            if (childScript && !childScript.locked) {
                                const check = (!childScript.childScripts || childScript.childScripts.length === 0) ? ' <span style="font-size:0.9em; margin-left:2px;">✅</span>' : '';
                                const isCurrent = childId === currentScriptId;
                                const titleStyle = isCurrent ? 'font-weight: 700;' : '';
                                return `<li onclick="event.stopPropagation(); openScript(${childId})" style="${titleStyle}">${childScript.title}${check}</li>`;
                            } else if (childScript && childScript.locked) {
                                return `<li class="locked">${childScript.title} 🔒</li>`;
                            }
                            return '';
                        }).join('');

                        if (childItems) {
                            childrenMenu = `
                                <div class="breadcrumb-hover-menu">
                                    <ul>
                                        ${childItems}
                                    </ul>
                                </div>
                            `;
                        }
                    }

                    const checkMark = (!s.childScripts || s.childScripts.length === 0) ? ' <span style="font-size:0.9em; margin-left:2px;">✅</span>' : '';

                    if (index === breadcrumbScripts.length - 1) {
                        html += `
                            <span class="breadcrumb-item active ${childrenMenu ? 'has-children' : ''}">
                                ${s.title.split(' – ').pop().split(' - ').pop()}${checkMark}
                                ${childrenMenu}
                            </span>
                        `;
                    } else {
                        html += `
                            <a class="breadcrumb-item ${childrenMenu ? 'has-children' : ''}" onclick="openScript(${s.id})">
                                ${s.title}${checkMark}
                                ${childrenMenu}
                            </a>
                        `;
                    }
                });
            }
        }
    } else {
        breadcrumbsContainer.classList.add('is-home');
    }

    breadcrumbsContainer.innerHTML = html;
}

// Render Scripts
function renderScripts() {
    renderBreadcrumbs();
    updateSidebarLock();

    const isLocalSearch = searchLocalCheck && searchLocalCheck.checked;

    // 1. Script Detail View (No modal)
    if (currentScriptId && (!searchQuery || isLocalSearch)) {
        const script = scripts.find(s => s.id === currentScriptId);
        if (script) {
            document.querySelector('.content-header').style.display = 'flex';
            document.querySelector('.content-header').classList.remove('is-history');
            currentCategoryTitle.textContent = script.title;

            // Show sync date instead of count
            const stats = document.querySelector('.stats');
            const linkHtml = script.originalScriptId ?
                `<a href="https://knowb2b.telecom.com.ar/getf.php?f=scripting_tecnico/html/${script.originalScriptId}.html" target="_blank" class="original-script-link">Script #${script.originalScriptId} ↗</a>` : '';
            const syncHtml = script.lastSync ? `<span>Sincronizado: ${script.lastSync}</span>` : '';

            stats.innerHTML = linkHtml + syncHtml;

            scriptsGrid.classList.remove('grid-mode');
            scriptsGrid.classList.remove('grid-mode');

            const contentHtml = fixImagePaths(script.content);
            const complementaryHtml = script.complementaryContent && script.complementaryContent.length > 0 ? `
                <div class="complementary-section">
                    <h3>Contenido Complementario</h3>
                    <div class="complementary-links">
                        ${script.complementaryContent.map(link => `
                            <a href="${link.url}" target="_blank" class="complementary-link">
                                <span class="link-icon">🔗</span>
                                <span class="link-title">${link.title}</span>
                                <span class="link-arrow">→</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            ` : '';

            let finalHtml = '';

            const isEncrypted = script.content && script.content.startsWith('U2FsdGVkX1');
            const displayHtml = isUnlocked ? unlockedContentCache : (!isEncrypted ? contentHtml : '');

            if (!script.locked || isUnlocked) {
                finalHtml = `
                    <div class="script-full-view" id="script-content-view">
                        ${displayHtml}
                        ${complementaryHtml}
                    </div>
                 `;
            } else {
                finalHtml = `
                    <div class="relative-container">
                        <div class="script-full-view blur-content" id="script-content-view">
                            <div style="width: 100%; height: 250px; background: rgba(255, 255, 255, 0.05); border: 1px dashed rgba(255, 255, 255, 0.2); border-radius: 12px;"></div>
                        </div>
                        <div class="unlock-overlay">
                            <div class="unlock-container">
                                <div style="text-align: center; margin-bottom: 0.5rem;">
                                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
                                    <h3 style="margin: 0;">Contenido Protegido</h3>
                                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">Ingresa la contraseña para visualizar este contenido.</p>
                                </div>
                                <input type="password" id="unlock-input" class="unlock-input" placeholder="Contraseña..." onkeyup="if(event.key === 'Enter') checkUnlock()">
                                <button class="unlock-btn" onclick="checkUnlock()">
                                    Desbloquear 🔓
                                </button>
                                <p id="unlock-error" style="color: #ef4444; font-size: 0.8rem; text-align: center; display: none; margin: 0;">Contraseña incorrecta</p>
                            </div>
                        </div>
                    </div>
                    ${complementaryHtml ? `<div class="script-full-view">${complementaryHtml}</div>` : ''}
                 `;
            }

            scriptsGrid.innerHTML = finalHtml;

            // Highlight matches if searching
            if (searchQuery) {
                const contentView = document.getElementById('script-content-view');
                highlightMatches(contentView, searchQuery);
            }

            // Show local search option and check it by default
            if (searchOptionsContainer) searchOptionsContainer.style.display = 'flex';
            if (searchLocalCheck && currentScriptId && !searchQuery) searchLocalCheck.checked = true; // Auto-check when entering script

            // Add image lightbox listeners
            scriptsGrid.querySelectorAll('.zoom-img').forEach(img => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scroll
                });
            });
            return;
        }
    }

    // Hide local search option if not in a script
    if (searchOptionsContainer) {
        // If we have a query, keep the option visible but unchecked if we are in results list
        // Actually, if we are in results list (grid), we are NOT in a single script view, so "local search" doesn't make sense unless we consider "local" as "current category"?
        // The original requirement was "En este script". If I am not in a script view, I shouldn't see this option.

        // However, if we just exited the script view because we unchecked the box, does the box disappear?
        // If it disappears, we can't check it again to "go back" to the script view easily.

        // If currentScriptId is set (we imply we are "in" a script context), but we are showing global results...
        // We should probably keep the checkbox visible so the user can re-enable it.

        if (!currentScriptId) {
            searchOptionsContainer.style.display = 'none';
            if (searchLocalCheck) searchLocalCheck.checked = false;
        } else {
            // We are in a script context (id is set), but showing results grid.
            // Checkbox should be visible, but unchecked.
            searchOptionsContainer.style.display = 'flex';
            // State is already unchecked by user
        }
    }

    // 2. Default view settings
    document.querySelector('.content-header').style.display = 'flex';
    document.querySelector('.content-header').classList.remove('is-history');
    scriptsGrid.classList.add('grid-mode');

    if (searchQuery) {
        scriptsGrid.classList.add('search-mode');
    } else {
        scriptsGrid.classList.remove('search-mode');
    }

    // Calculate Script Count (Hierarchical)
    let totalScriptsInView = 0;
    const conectividadSubs = ['Dinámico', 'Simétrico', 'xDSL', 'FTTH', 'GPON Corporativo', 'Internet Plus', 'Enlace Fibra', 'Satelital', 'VPN', 'SD-Wan', 'SD-Branch', 'VVIP', 'Fibertel Zone', 'Servicios Adicionales', 'LTE'];

    const activeScripts = scripts.filter(s => !s.locked && !s.isHidden);

    // 5. Scripts Grid Filter - MOVED UP
    // isLocalSearch is already defined at the top of the function

    const filteredScripts = scripts.filter(script => {
        // If searching locally, we only care about the current open script
        if (isLocalSearch && currentScriptId && script.id !== currentScriptId) return false;

        if (script.isHidden) return false; // Prevent technical sub-flows from showing up everywhere, including search

        const matchesCategory = currentFilter === 'all' || script.category === currentFilter || isLocalSearch;

        // Extended search including content
        const searchTerm = searchQuery.toLowerCase();
        const matchesSearch = script.title.toLowerCase().includes(searchTerm) ||
            script.summary.toLowerCase().includes(searchTerm) ||
            (script.content && stripHtml(script.content).toLowerCase().includes(searchTerm)) ||
            (script.originalScriptId && script.originalScriptId.toString().includes(searchTerm)) ||
            script.tags.some(tag => tag.toLowerCase().includes(searchTerm));

        return matchesCategory && matchesSearch;
    });

    let resultLabel = '';
    if (searchQuery) {
        totalScriptsInView = filteredScripts.filter(s => !s.locked).length;
        resultLabel = totalScriptsInView === 1 ? 'coincidencia encontrada' : 'coincidencias encontradas';
    } else if (currentFilter === 'all') {
        const mainCategories = [
            'Conectividad', 'Video y Media', 'Voz Fija', 'UCAAS & Colaboración',
            'Cloud', 'Data Center', 'Seguridad', 'Innovación', 'Móvil',
            'Servicios Especiales', 'Contingencia ICD', 'SPAM-WHITELIST'
        ];
        totalScriptsInView = mainCategories.filter(cat => scripts.some(s => s.category === cat || (cat === 'Conectividad' && conectividadSubs.includes(s.category)))).length;
        resultLabel = totalScriptsInView === 1 ? 'categoría encontrada' : 'categorías encontradas';
    } else if (currentFilter === 'Conectividad') {
        totalScriptsInView = conectividadSubs.filter(sub => scripts.some(s => s.category === sub)).length;
        resultLabel = totalScriptsInView === 1 ? 'subcategoría encontrada' : 'subcategorías encontradas';
    } else {
        totalScriptsInView = activeScripts.filter(s => s.category === currentFilter).length;
        resultLabel = totalScriptsInView === 1 ? 'ítem encontrado' : 'ítems encontrados';
    }

    const stats = document.querySelector('.stats');
    if (searchQuery) {
        currentCategoryTitle.textContent = 'Búsqueda General';
    } else {
        // Reset count text if not searching
        if (currentFilter === 'all') {
            currentCategoryTitle.textContent = 'Todos los Scripts';
        } else {
            const activeBtn = Array.from(categoryButtons).find(btn => btn.dataset.category === currentFilter);
            if (activeBtn) {
                currentCategoryTitle.textContent = activeBtn.innerText.replace(/[▲▼]/g, '').trim();
            } else {
                if (currentFilter === 'Conectividad') currentCategoryTitle.textContent = 'Conectividad';
                else if (currentFilter === 'all') currentCategoryTitle.textContent = 'Todos los Scripts';
                else currentCategoryTitle.textContent = currentFilter;
            }
        }
    }
    stats.innerHTML = `<a href="https://knowb2b.telecom.com.ar/getf.php?f=scripting_tecnico/html/menu_soporte.html" target="_blank" class="original-script-link">Scripting Técnico ↗</a><span><span id="script-count">${totalScriptsInView}</span> ${resultLabel}</span>`;

    // 3. Main Category Hub (Home View)
    if (currentFilter === 'all' && !searchQuery) {
        const mainCategories = [
            'Conectividad', 'Video y Media', 'Voz Fija', 'UCAAS & Colaboración',
            'Cloud', 'Data Center', 'Seguridad', 'Innovación', 'Móvil',
            'Servicios Especiales', 'Contingencia ICD', 'SPAM-WHITELIST'
        ];

        scriptsGrid.innerHTML = mainCategories.map(cat => {
            const catScripts = scripts.filter(s => !s.locked && !s.isHidden && (s.category === cat || (cat === 'Conectividad' && conectividadSubs.includes(s.category))));
            const hasScripts = catScripts.length > 0;

            return `
                <div class="category-card ${!hasScripts ? 'is-locked' : ''}" 
                     ${hasScripts ? `onclick="filterByCategory('${cat}')"` : ''}>
                    <div class="cat-card-icon">${hasScripts ? '⚡' : '🔒'}</div>
                    <h3>${cat}</h3>
                    ${hasScripts ? `<div class="cat-pill">Contiene ${catScripts.length} ${catScripts.length === 1 ? 'script navegable' : 'scripts navegables'}</div>` : ''}
                    <span class="cat-card-link">${hasScripts ? 'Seleccionar →' : 'Próximamente'}</span>
                </div>
            `;
        }).join('');
        return;
    }

    // 4. Conectividad Category Hub
    if (currentFilter === 'Conectividad' && !searchQuery) {
        scriptsGrid.innerHTML = conectividadSubs.map(sub => {
            const subScripts = scripts.filter(s => !s.locked && !s.isHidden && s.category === sub);
            const hasScripts = subScripts.length > 0;

            return `
                <div class="category-card ${!hasScripts ? 'is-locked' : ''}" 
                     ${hasScripts ? `onclick="filterByCategory('${sub}')"` : ''}>
                    <div class="cat-card-icon">${hasScripts ? '📁' : '🔒'}</div>
                    <h3>${sub}</h3>
                    ${hasScripts ? `<div class="cat-pill">Contiene ${subScripts.length} ${subScripts.length === 1 ? 'script navegable' : 'scripts navegables'}</div>` : ''}
                    <span class="cat-card-link">${hasScripts ? 'Explorar scripts →' : 'Próximamente'}</span>
                </div>
            `;
        }).join('');
        return;
    }



    scriptCount.textContent = filteredScripts.filter(s => !s.locked).length;

    if (filteredScripts.length === 0) {
        scriptsGrid.innerHTML = `
            <div class="no-results">
                <p>No se encontraron scripts.</p>
                <button class="reset-btn" onclick="filterByCategory('all')">Ver todo</button>
            </div>
        `;
        return;
    }

    // Direct linear rendering
    scriptsGrid.innerHTML = filteredScripts.map(script => {
        if (searchQuery) {
            return renderSearchResult(script, searchQuery);
        }
        return renderScriptCard(script);
    }).join('');
}

// Strip HTML tags helper
function stripHtml(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

// Get snippet helper
function getSnippet(text, query) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return null;

    const start = Math.max(0, index - 60);
    const end = Math.min(text.length, index + query.length + 60);

    let snippet = text.substring(start, end);

    // Add ellipsis
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';

    // Highlight match
    const regex = new RegExp(`(${query})`, 'gi');
    return snippet.replace(regex, '<mark>$1</mark>');
}

// Helper to construct full breadcrumb path
function getBreadcrumbPath(script) {
    const conectividadSubs = ['Dinámico', 'Simétrico', 'xDSL', 'FTTH', 'GPON Corporativo', 'Internet Plus', 'Enlace Fibra', 'Satelital', 'VPN', 'SD-Wan', 'SD-Branch', 'VVIP', 'Fibertel Zone', 'Servicios Adicionales', 'LTE'];

    if (conectividadSubs.includes(script.category)) {
        return `Inicio > Conectividad > ${script.category}`;
    }
    return `Inicio > ${script.category}`;
}

// Render a search result card with snippet
function renderSearchResult(script, query) {
    const textContent = script.content ? stripHtml(script.content) : '';
    const snippet = getSnippet(textContent, query) || script.summary;
    const breadcrumbPath = getBreadcrumbPath(script);

    return `
        <div class="result-card" onclick="openScript(${script.id})">
            ${script.originalScriptId ? `<span class="script-id-badge">#${script.originalScriptId}</span>` : ''}
            <div class="result-header">
                <span class="card-category" style="text-transform: none; letter-spacing: normal;">${breadcrumbPath}</span>
                <h3>${script.title}</h3>
            </div>
            <p class="result-snippet">${snippet}</p>
        </div>
    `;
}

// Helper function to scroll to first match
function scrollToFirstMatch(query) {
    if (!query || query.length < 2) return;

    const contentView = document.getElementById('script-content-view');
    if (!contentView) return;

    const walker = document.createTreeWalker(
        contentView,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    const regex = new RegExp(query, 'i');

    while (node = walker.nextNode()) {
        if (regex.test(node.nodeValue)) {
            // Found a match, scroll to its parent element
            const parent = node.parentElement;
            parent.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Add a brief highlight effect to the parent
            const originalBackground = parent.style.backgroundColor;
            parent.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
            parent.style.transition = 'background-color 0.3s ease';

            setTimeout(() => {
                parent.style.backgroundColor = originalBackground;
            }, 2000);

            return;
        }
    }
}

// Highlight matches in DOM nodes
function highlightMatches(container, query) {
    if (!query || query.length < 2) return;

    const walk = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    let node;
    while (node = walk.nextNode()) {
        nodes.push(node);
    }

    const regex = new RegExp(`(${query})`, 'gi');

    nodes.forEach(textNode => {
        const text = textNode.nodeValue;
        if (regex.test(text)) {
            const wrapper = document.createElement('span');
            wrapper.innerHTML = text.replace(regex, '<mark>$1</mark>');
            textNode.parentNode.replaceChild(wrapper, textNode);
        }
    });
}

// Helper to render a single script card
function renderScriptCard(script) {
    const childCount = script.childScripts ? script.childScripts.length : 0;
    let extraFooter = '';

    if (script.locked) {
        extraFooter = '<div class="card-footer"><span class="tag">Próximamente</span></div>';
    } else {
        const text = childCount === 1 ? 'Contiene 1 script navegable' : `Contiene ${childCount} scripts navegables`;
        extraFooter = `<div class="card-footer" style="margin-top: 0.5rem;"><span class="tag" style="background: rgba(59, 130, 246, 0.1); color: var(--accent-primary); border: 1px solid rgba(59, 130, 246, 0.2);">${text}</span></div>`;
    }

    return `
        <div class="script-card ${script.locked ? 'is-locked' : ''}" 
             ${script.locked ? '' : `onclick="openScript(${script.id})"`}>
            <span class="card-category">${script.category} ${script.locked ? '• 🔒' : ''}</span>
            <h3>${script.title}</h3>
            <p class="card-preview">${script.locked ? '' : script.summary}</p>
            ${extraFooter}
        </div>
    `;
}

// Open Script Detail
window.openScript = function (id) {
    const script = scripts.find(s => s.id === id);
    if (script) {
        if (currentScriptId !== id) {
            clearUnlockState(); // User changed scripts, clear password
        }
        currentScriptId = id;

        // Clear Search Query
        searchQuery = '';
        if (searchInput) searchInput.value = '';

        // Update Filter to match script category
        currentFilter = script.category;

        // Update URL
        const catSlug = slugify(script.category);
        const scriptSlug = slugify(script.title);
        const path = `/conectividad/${catSlug}/${scriptSlug}`;
        window.history.pushState({ filter: script.category, scriptId: id }, '', path);

        // Collapse all category groups before re-evaluating
        document.querySelectorAll('.category-group').forEach(group => group.classList.remove('expanded'));

        // Update sidebar UI active state
        document.querySelectorAll('.cat-btn').forEach(btn => {
            const isScriptBtn = btn.classList.contains('script-level-btn');
            const isActive = isScriptBtn
                ? btn.dataset.scriptId === id.toString()
                : btn.dataset.category === script.category;

            if (isActive) {
                btn.classList.add('active');

                // Expand all parent category groups iteratively
                let group = btn.closest('.category-group');
                while (group) {
                    group.classList.add('expanded');
                    group = group.parentElement ? group.parentElement.closest('.category-group') : null;
                }
            } else {
                btn.classList.remove('active');
            }
        });

        // Save to browsing history
        saveToHistory(script);

        renderScripts();
    }
}
const openScript = window.openScript;

// Sidebar Lock Logic
function updateSidebarLock() {
    const conectividadSubs = ['Dinámico', 'Simétrico', 'xDSL', 'FTTH', 'GPON Corporativo', 'Internet Plus', 'Enlace Fibra', 'Satelital', 'VPN', 'SD-Wan', 'SD-Branch', 'VVIP', 'Fibertel Zone', 'Servicios Adicionales', 'LTE'];

    categoryButtons.forEach(btn => {
        const cat = btn.dataset.category;
        if (cat === 'all') return;

        const hasScripts = scripts.some(s => s.category === cat ||
            (cat === 'Conectividad' && conectividadSubs.includes(s.category)));

        if (!hasScripts) {
            btn.classList.add('is-locked');
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.5';
        } else {
            btn.classList.remove('is-locked');
            btn.style.pointerEvents = 'auto';
            btn.style.opacity = '1';
        }
    });
}

// Redundant - Logic handled by renderScripts fluid navigation
function closeModal() { }


// Event Listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const isLocalSearch = searchLocalCheck && searchLocalCheck.checked;

        // Sync search query to URL for global searches
        if (!isLocalSearch) {
            if (searchQuery) {
                // Reset to root context for global search
                currentScriptId = null;
                currentFilter = 'all';
                window.history.replaceState({ filter: 'all', scriptId: null }, '', `/?q=${encodeURIComponent(searchQuery)}`);
            } else {
                window.history.replaceState({ filter: currentFilter, scriptId: null }, '', '/');
            }
        }

        renderScripts();

        // If local search is enabled and we're in a script, scroll to first match
        if (isLocalSearch && currentScriptId && searchQuery.length >= 2) {
            setTimeout(() => {
                scrollToFirstMatch(searchQuery);
            }, 100);
        }
    });

    if (searchLocalCheck) {
        searchLocalCheck.addEventListener('change', () => {
            if (!searchLocalCheck.checked) {
                // Switching from local to global search
                currentScriptId = null;
                currentFilter = 'all';
                if (searchQuery) {
                    window.history.replaceState({ filter: 'all', scriptId: null }, '', `/?q=${encodeURIComponent(searchQuery)}`);
                } else {
                    window.history.replaceState({ filter: 'all', scriptId: null }, '', '/');
                }
                renderScripts();
                return;
            }

            renderScripts();

            // If search was enabled and there's a query, scroll to first match
            if (searchLocalCheck.checked && currentScriptId && searchQuery.length >= 2) {
                setTimeout(() => {
                    scrollToFirstMatch(searchQuery);
                }, 100);
            }
        });
    }

    // Hotkeys
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Category Buttons and Accordion
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.classList.contains('has-sub')) {
                const group = btn.closest('.category-group');
                group.classList.toggle('expanded');
            }

            filterByCategory(btn.dataset.category);
        });
    });

    // Modal Close
    closeModalBtn.addEventListener('click', closeModal);

    // Lightbox Close
    const closeLightboxFn = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeLightbox.addEventListener('click', closeLightboxFn);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxImg) closeLightboxFn();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightboxFn();
            closeModal();
        }
    });
}

// Global helper for copy to clipboard (injected into window for HTML access)
window.copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '¡Copiado!';
        btn.style.backgroundColor = '#10b981';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
};


// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
        const isLight = theme === 'light';
        themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        themeIcon.style.color = isLight ? '#f59e0b' : 'inherit';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// Init Theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

init();

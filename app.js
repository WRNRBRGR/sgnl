// State Management
let State;
try {
    State = {
        theme: localStorage.getItem('cls_theme') || 'dark',
        categories: JSON.parse(localStorage.getItem('cls_categories')) || [
            { id: '1', name: 'Unreal Engine 5' },
            { id: '2', name: 'Houdini' },
            { id: '3', name: 'Rive' }
        ],
        videos: JSON.parse(localStorage.getItem('cls_videos')) || [],
        calendar: JSON.parse(localStorage.getItem('cls_calendar')) || {}, 
        selectedCategoryId: localStorage.getItem('cls_selectedCategory') || '1',
        dailyGoal: parseInt(localStorage.getItem('cls_dailyGoal')) || 60,
        playbackSpeed: parseFloat(localStorage.getItem('cls_playbackSpeed')) || 1.0,
        playingVideoId: null,
        youtubeApiKey: localStorage.getItem('cls_youtubeApiKey') || '',
        geminiApiKey: localStorage.getItem('cls_geminiApiKey') || '',
        viewMode: localStorage.getItem('cls_viewMode') || 'grid',
        sortBy: localStorage.getItem('cls_sortBy') || 'default',
        groupByPlaylist: localStorage.getItem('cls_groupByPlaylist') === 'true',
        activeTags: [],
        searchQuery: '',
        collapsedPlaylists: JSON.parse(localStorage.getItem('cls_collapsedPlaylists')) || [],
        activeView: 'library',
        currentCalendarDate: new Date(),
        assigningDate: null,
        isLoading: false,
        user: null, // Supabase User
        isEnvLoaded: false
    };
} catch (e) {
    console.error("Failed to load state from localStorage:", e);
    State = {
        theme: 'dark',
        categories: [{ id: '1', name: 'Unreal Engine 5' }],
        videos: [],
        calendar: {},
        selectedCategoryId: '1',
        dailyGoal: 60,
        playbackSpeed: 1.0,
        playingVideoId: null,
        youtubeApiKey: '',
        geminiApiKey: '',
        viewMode: 'grid',
        sortBy: 'default',
        groupByPlaylist: false,
        activeTags: [],
        searchQuery: '',
        collapsedPlaylists: [],
        activeView: 'library',
        currentCalendarDate: new Date(),
        assigningDate: null,
        isLoading: false
    };
}

// DOM Elements
const DOM = {
    body: document.body,
    themeToggle: document.getElementById('btn-theme-toggle'),
    iconSun: document.getElementById('icon-sun'),
    iconMoon: document.getElementById('icon-moon'),
    
    // Navigation
    navToday: document.getElementById('nav-today'),
    navCalendar: document.getElementById('nav-calendar'),
    navAnalytics: document.getElementById('nav-analytics'),
    navWatched: document.getElementById('nav-watched'),
    categoryList: document.getElementById('category-list'),
    
    // Confirm Modal
    confirmModal: document.getElementById('confirm-modal'),
    confirmTitle: document.getElementById('confirm-title'),
    confirmMessage: document.getElementById('confirm-message'),
    confirmIcon: document.getElementById('confirm-icon'),
    btnConfirmProceed: document.getElementById('btn-confirm-proceed'),
    btnConfirmCancel: document.getElementById('btn-confirm-cancel'),

    // Containers
    feedContainer: document.getElementById('feed-container'),
    toastContainer: document.getElementById('toast-container'),
    calendarContainer: document.getElementById('calendar-container'),
    analyticsContainer: document.getElementById('analytics-container'),
    videoGrid: document.getElementById('video-grid'),
    tagBar: document.getElementById('tag-bar'),
    navIndicator: document.getElementById('nav-indicator'),
    
    // Analytics
    statStreak: document.getElementById('stat-streak'),
    statTotalTime: document.getElementById('stat-total-time'),
    statVideosWatched: document.getElementById('stat-videos-watched'),
    analyticsBalance: document.getElementById('analytics-balance'),
    
    // Headers & Controls
    currentCategoryTitle: document.getElementById('current-category-title'),
    dailyGoalInput: document.getElementById('daily-goal'),
    playbackSpeedSelect: document.getElementById('playback-speed'),
    libraryControls: document.getElementById('library-controls'),
    
    sortBySelect: document.getElementById('sort-by'),
    librarySearch: document.getElementById('library-search'),
    toggleGroupPlaylist: document.getElementById('toggle-group-playlist'),
    btnViewGrid: document.getElementById('btn-view-grid'),
    btnViewList: document.getElementById('btn-view-list'),
    btnHamburger: document.getElementById('btn-hamburger'),
    sidebar: document.querySelector('.sidebar'),
    
    // Calendar specific
    calendarMonthYear: document.getElementById('calendar-month-year'),
    calendarGrid: document.getElementById('calendar-grid'),
    btnCalPrev: document.getElementById('btn-cal-prev'),
    btnCalNext: document.getElementById('btn-cal-next'),
    
    // Modals
    backdrop: document.getElementById('modal-backdrop'),
    addCategoryModal: document.getElementById('add-category-modal'),
    addVideoModal: document.getElementById('add-video-modal'),
    playerModal: document.getElementById('player-modal'),
    settingsModal: document.getElementById('settings-modal'),
    manageLibrariesList: document.getElementById('manage-libraries-list'),
    assignCalendarModal: document.getElementById('assign-calendar-modal'),
    aiArchitectModal: document.getElementById('ai-architect-modal'),
    
    // Assign Modal internals
    assignCalendarTitle: document.getElementById('assign-calendar-title'),
    assignCalendarOptions: document.getElementById('assign-calendar-options'),
    assignCalendarHistory: document.getElementById('assign-calendar-history'),
    assignCalendarHistoryContent: document.getElementById('assign-calendar-history-content'),
    
    // Buttons
    btnAddCategory: document.getElementById('btn-add-category'),
    btnAddVideo: document.getElementById('btn-add-video'),
    btnSaveCategory: document.getElementById('btn-save-category'),
    btnSaveVideo: document.getElementById('btn-save-video'),
    btnMarkComplete: document.getElementById('btn-mark-complete'),
    btnSettings: document.getElementById('btn-settings'),
    btnSaveSettings: document.getElementById('btn-save-settings'),
    btnSaveCalendar: document.getElementById('btn-save-calendar'),
    btnAiArchitect: document.getElementById('btn-ai-architect'),
    btnBuildSyllabus: document.getElementById('btn-build-syllabus'),
    btnCloseAi: document.getElementById('btn-close-ai'),
    btnLogin: document.getElementById('btn-login'),
    
    // Spoilers/Spinners
    btnSaveVideoText: document.getElementById('btn-save-video-text'),
    btnSaveVideoSpinner: document.getElementById('btn-save-video-spinner'),
    
    // Inputs
    inputCategoryName: document.getElementById('input-category-name'),
    inputVideoUrl: document.getElementById('input-video-url'),
    inputVideoCategory: document.getElementById('input-video-category'),
    inputVideoTags: document.getElementById('input-video-tags'),
    inputApiKey: document.getElementById('input-api-key'),
    inputGeminiKey: document.getElementById('input-gemini-key'),
    inputAiPrompt: document.getElementById('ai-prompt'),
    aiStatus: document.getElementById('ai-status'),
    aiStatusText: document.getElementById('ai-status-text'),
    
    // Data Management
    btnExportData: document.getElementById('btn-export-data'),
    btnImportData: document.getElementById('btn-import-data'),
    inputImportData: document.getElementById('input-import-data'),
    
    // Player
    youtubePlayer: document.getElementById('youtube-player'),
    playerTitle: document.getElementById('player-title'),
    videoNotes: document.getElementById('video-notes'),
    videoNotesPreview: document.getElementById('video-notes-preview'),
    btnNotesEdit: document.getElementById('btn-notes-edit'),
    btnNotesPreview: document.getElementById('btn-notes-preview'),
    playerPlaylistItems: document.getElementById('player-playlist-items'),
    focusHub: document.getElementById('focus-hub')
};

// YouTube API Globals
let ytPlayer = null;
let progressInterval = null;
let draggingVideoId = null;
let confirmCallback = null;

let playerReady = false;
window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        playerVars: { 'autoplay': 1, 'playsinline': 1, 'rel': 0 },
        events: {
            'onReady': () => { playerReady = true; },
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        if (progressInterval) clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (State.playingVideoId && ytPlayer && ytPlayer.getCurrentTime) {
                const video = State.videos.find(v => v.id === State.playingVideoId);
                if (video) {
                    video.progressTimestamp = ytPlayer.getCurrentTime();
                    saveState();
                }
            }
        }, 5000);
    } else {
        if (progressInterval) clearInterval(progressInterval);
    }
}

// Utility: Date to String (YYYY-MM-DD)
function toDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const TODAY_STR = toDateString(new Date());

// Theme Management
function setTheme(theme) {
    State.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        DOM.iconSun.style.display = 'block';
        DOM.iconMoon.style.display = 'none';
    } else {
        DOM.iconSun.style.display = 'none';
        DOM.iconMoon.style.display = 'block';
    }
    saveState();
}

function toggleTheme() {
    const newTheme = State.theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Utility: Save state with debounce
let saveTimeout = null;
        localStorage.setItem('cls_collapsedPlaylists', JSON.stringify(State.collapsedPlaylists));
    }, 200);

    // Also sync to Supabase if logged in
    if (State.user) {
        saveToSupabase();
    }
}

// Supabase Syncing
async function saveToSupabase() {
    if (!State.user || !window.supabaseClient) return;
    
    const { data, error } = await window.supabaseClient
        .from('profiles')
        .upsert({ 
            id: State.user.id, 
            app_state: {
                categories: State.categories,
                videos: State.videos,
                calendar: State.calendar,
                dailyGoal: State.dailyGoal,
                playbackSpeed: State.playbackSpeed,
                youtubeApiKey: State.youtubeApiKey,
                geminiApiKey: State.geminiApiKey,
                theme: State.theme,
                viewMode: State.viewMode,
                sortBy: State.sortBy,
                groupByPlaylist: State.groupByPlaylist
            },
            updated_at: new Date()
        });

    if (error) console.error("Supabase Save Error:", error);
}

async function loadFromSupabase() {
    if (!State.user || !window.supabaseClient) return;
    
    const { data, error } = await window.supabaseClient
        .from('profiles')
        .select('app_state')
        .eq('id', State.user.id)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error("Supabase Load Error:", error);
        return;
    }

    if (data && data.app_state) {
        const s = data.app_state;
        if (s.categories) State.categories = s.categories;
        if (s.videos) State.videos = s.videos;
        if (s.calendar) State.calendar = s.calendar;
        if (s.dailyGoal) State.dailyGoal = s.dailyGoal;
        if (s.playbackSpeed) State.playbackSpeed = s.playbackSpeed;
        if (s.youtubeApiKey && !State.youtubeApiKey) State.youtubeApiKey = s.youtubeApiKey;
        if (s.geminiApiKey && !State.geminiApiKey) State.geminiApiKey = s.geminiApiKey;
        if (s.theme) State.theme = s.theme;
        if (s.viewMode) State.viewMode = s.viewMode;
        if (s.sortBy) State.sortBy = s.sortBy;
        if (s.groupByPlaylist !== undefined) State.groupByPlaylist = s.groupByPlaylist;
        
        renderSidebar();
        renderActiveView();
    }
}

// Environment Config
async function fetchEnvironment() {
    try {
        const res = await fetch('/api/get-env');
        const config = await res.json();
        
        if (config.youtubeApiKey) {
            State.youtubeApiKey = config.youtubeApiKey;
            DOM.inputApiKey.placeholder = "Loaded from Environment";
            DOM.inputApiKey.disabled = true;
        }
        if (config.geminiApiKey) {
            State.geminiApiKey = config.geminiApiKey;
            DOM.inputGeminiKey.placeholder = "Loaded from Environment";
            DOM.inputGeminiKey.disabled = true;
        }
        
        // Re-initialize Supabase if keys came from Env
        if (config.supabaseUrl && config.supabaseKey && window.supabase) {
            window.supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseKey);
        }
        
        State.isEnvLoaded = true;
    } catch (e) {
        console.warn("Could not load environment variables:", e);
    }
}

// Auth UI Logic
async function handleLogin() {
    const email = prompt("Enter your email:");
    if (!email) return;
    
    const { error } = await window.supabaseClient.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin }
    });
    
    if (error) {
        showToast("Login error: " + error.message, "error");
    } else {
        showToast("Check your email for the login link!", "success");
    }
}

async function handleLogout() {
    await window.supabaseClient.auth.signOut();
    location.reload();
}

// UI Utilities: Toasts & Confirmations
function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'info') icon = 'ℹ️';
    
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showConfirm(title, message, callback, icon = '❓') {
    DOM.confirmTitle.textContent = title;
    DOM.confirmMessage.textContent = message;
    DOM.confirmIcon.textContent = icon;
    confirmCallback = callback;
    openModal(DOM.confirmModal);
}

// Data Management: Export & Import
function exportData() {
    const backup = {
        cls_theme: localStorage.getItem('cls_theme'),
        cls_categories: localStorage.getItem('cls_categories'),
        cls_videos: localStorage.getItem('cls_videos'),
        cls_calendar: localStorage.getItem('cls_calendar'),
        cls_selectedCategory: localStorage.getItem('cls_selectedCategory'),
        cls_dailyGoal: localStorage.getItem('cls_dailyGoal'),
        cls_playbackSpeed: localStorage.getItem('cls_playbackSpeed'),
        cls_youtubeApiKey: localStorage.getItem('cls_youtubeApiKey'),
        cls_viewMode: localStorage.getItem('cls_viewMode'),
        cls_sortBy: localStorage.getItem('cls_sortBy'),
        cls_groupByPlaylist: localStorage.getItem('cls_groupByPlaylist')
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "cls_backup_" + toDateString(new Date()) + ".json");
    document.body.appendChild(downloadAnchorNode); 
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    showConfirm("Restore Backup", "Are you sure you want to restore from this backup? Your current syllabus will be completely overwritten.", () => {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const backup = JSON.parse(e.target.result);
                Object.keys(backup).forEach(key => {
                    if (backup[key] !== null && backup[key] !== undefined) {
                        localStorage.setItem(key, backup[key]);
                    }
                });
                alert("Backup restored successfully! The app will now reload.");
                location.reload();
            } catch (err) {
                alert("Failed to read backup file. Make sure it is a valid JSON backup.");
                console.error(err);
            }
        };
        reader.readAsText(file);
    });
    DOM.inputImportData.value = '';
}

// Utility: Extract YT ID
function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function getYouTubePlaylistId(url) {
    const regExp = /[?&]list=([^#&?]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

function parseISODuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 1;
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    
    let totalMins = (hours * 60) + minutes;
    if (seconds >= 30) totalMins += 1;
    
    return totalMins === 0 ? 1 : totalMins;
}

// Theme Handling
function setTheme(theme) {
    State.theme = theme;
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        DOM.iconSun.style.display = 'block';
        DOM.iconMoon.style.display = 'none';
    } else {
        document.documentElement.removeAttribute('data-theme');
        DOM.iconSun.style.display = 'none';
        DOM.iconMoon.style.display = 'block';
    }
    saveState();
}

function toggleTheme() {
    setTheme(State.theme === 'dark' ? 'light' : 'dark');
}

// Modals
function openModal(modal) {
    DOM.backdrop.classList.add('active');
    modal.classList.add('active');
    if (modal === DOM.settingsModal) {
        renderManageLibraries();
    }
}

function closeAllModals() {
    DOM.backdrop.classList.remove('active');
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    DOM.inputCategoryName.value = '';
    DOM.inputVideoUrl.value = '';
    if (DOM.inputVideoTags) DOM.inputVideoTags.value = '';
    
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        try { ytPlayer.pauseVideo(); } catch(e){}
    }
    if (progressInterval) clearInterval(progressInterval);
}

// Sidebar Navigation
function renderSidebar() {
    DOM.navToday.className = `nav-item ${State.activeView === 'today' ? 'active' : ''}`;
    DOM.navCalendar.className = `nav-item ${State.activeView === 'calendar' ? 'active' : ''}`;
    if (DOM.navAnalytics) DOM.navAnalytics.className = `nav-item ${State.activeView === 'analytics' ? 'active' : ''}`;
    if(DOM.navWatched) DOM.navWatched.className = `nav-item ${State.activeView === 'watched' ? 'active' : ''}`;
    
    DOM.categoryList.innerHTML = '';
    State.categories.forEach(category => {
        const li = document.createElement('li');
        li.className = `nav-item ${(State.activeView === 'library' && category.id === State.selectedCategoryId) ? 'active' : ''}`;
        
        const count = State.videos.filter(v => v.categoryId === category.id && !v.watched).length;
        
        li.innerHTML = `
            <div class="nav-link-content">
                <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <span>${category.name}</span>
            </div>
            ${count > 0 ? `<span class="time-badge">${count}</span>` : ''}
        `;
        
        li.addEventListener('click', () => {
            State.activeView = 'library';
            State.selectedCategoryId = category.id;
            State.activeTags = [];
            saveState();
            renderSidebar();
            renderActiveView();
        });
        
        DOM.categoryList.appendChild(li);
    });

    // Update indicator after DOM is updated
    setTimeout(updateNavIndicator, 0);
}

function updateNavIndicator() {
    const activeItem = document.querySelector('.nav-item.active');
    const indicator = DOM.navIndicator;
    const sidebar = document.querySelector('.sidebar');
    
    if (!activeItem || !indicator || !sidebar) {
        if (indicator) indicator.classList.remove('visible');
        return;
    }

    const itemRect = activeItem.getBoundingClientRect();
    const sidebarRect = sidebar.getBoundingClientRect();

    // Center the pill vertically relative to the item
    const pillHeight = 24; 
    const itemCenter = (itemRect.top - sidebarRect.top) + (itemRect.height / 2);
    
    indicator.style.top = `${itemCenter - (pillHeight / 2)}px`;
    indicator.style.height = `${pillHeight}px`;
    indicator.classList.add('visible');
}

function addCategory() {
    const name = DOM.inputCategoryName.value.trim();
    if (!name) return;
    
    const newCategory = {
        id: Date.now().toString(),
        name
    };
    
    State.categories.push(newCategory);
    State.selectedCategoryId = newCategory.id;
    State.activeView = 'library';
    State.activeTags = [];
    saveState();
    renderSidebar();
    renderActiveView();
    closeAllModals();
}

function deleteLibrary(categoryId) {
    if (!categoryId) return;
    
    const cat = State.categories.find(c => c.id === categoryId);
    if (!cat) return;
    
    showConfirm("Delete Library", `Are you sure you want to delete "${cat.name}"? This will permanently remove all videos and notes.`, () => {
        // Remove category
        State.categories = State.categories.filter(c => c.id !== categoryId);
        State.videos = State.videos.filter(v => v.categoryId !== categoryId);
        Object.keys(State.calendar).forEach(date => {
            State.calendar[date] = State.calendar[date].filter(a => a.categoryId !== categoryId);
            if (State.calendar[date].length === 0) delete State.calendar[date];
        });
        
        if (State.selectedCategoryId === categoryId) {
            State.selectedCategoryId = State.categories.length > 0 ? State.categories[0].id : null;
            if (!State.selectedCategoryId) State.activeView = 'today';
        }
        
        saveState();
        renderSidebar();
        renderActiveView();
        renderManageLibraries();
        showToast(`Library "${cat.name}" deleted`, "info");
    }, '🗑️');
}

function renderManageLibraries() {
    if (!DOM.manageLibrariesList) return;
    DOM.manageLibrariesList.innerHTML = '';
    
    if (State.categories.length === 0) {
        DOM.manageLibrariesList.innerHTML = `<span style="font-size: 13px; color: var(--text-secondary);">No libraries found.</span>`;
        return;
    }
    
    State.categories.forEach(cat => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.padding = '8px 12px';
        row.style.background = 'var(--glass-bg)';
        row.style.border = '1px solid var(--glass-border)';
        row.style.borderRadius = '8px';
        
        row.innerHTML = `
            <span style="font-size: 14px; font-weight: 500;">${cat.name}</span>
            <button class="icon-btn" style="color: #ff453a; width: 32px; height: 32px;" title="Delete Library">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
        
        const btnDelete = row.querySelector('.icon-btn');
        btnDelete.addEventListener('click', () => deleteLibrary(cat.id));
        
        DOM.manageLibrariesList.appendChild(row);
    });
}

function populateCategoryDropdown() {
    DOM.inputVideoCategory.innerHTML = '';
    State.categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        if (cat.id === State.selectedCategoryId) option.selected = true;
        DOM.inputVideoCategory.appendChild(option);
    });
}

// YouTube API Fetchers
async function fetchVideoDetails(videoData, categoryId, playlistContext = null, tags = []) {
    if (!State.youtubeApiKey) throw new Error("API Key missing");
    
    // videoData can be an array of IDs or an array of {id, index}
    const isPlaylist = playlistContext !== null;
    const videoIds = videoData.map(v => typeof v === 'string' ? v : v.id);
    const indexMap = isPlaylist ? Object.fromEntries(videoData.map(v => [v.id, v.index])) : {};

    const chunks = [];
    for (let i = 0; i < videoIds.length; i += 50) {
        chunks.push(videoIds.slice(i, i + 50));
    }
    
    const addedVideos = [];
    
    for (const chunk of chunks) {
        const ids = chunk.join(',');
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${State.youtubeApiKey}`);
        const data = await res.json();
        
        if (data.error) throw new Error(data.error.message);
        
        data.items.forEach(item => {
            const durationMins = parseISODuration(item.contentDetails.duration);
            addedVideos.push({
                id: Date.now().toString() + Math.random().toString(36).substring(7),
                ytId: item.id,
                title: item.snippet.title,
                duration: durationMins,
                categoryId: categoryId,
                watched: false,
                dateWatched: null,
                publishedAt: item.snippet.publishedAt || null,
                playlistId: playlistContext ? playlistContext.id : null,
                playlistTitle: playlistContext ? playlistContext.title : null,
                playlistIndex: isPlaylist ? indexMap[item.id] : 0,
                progressTimestamp: 0,
                notes: '',
                tags: [...tags]
            });
        });
    }
    
    // Sort by playlist index if it's a playlist to ensure the fetch order didn't scramble them
    if (isPlaylist) {
        addedVideos.sort((a, b) => a.playlistIndex - b.playlistIndex);
    }
    
    return addedVideos;
}

async function fetchPlaylistVideos(playlistId) {
    if (!State.youtubeApiKey) throw new Error("API Key missing");
    
    let playlistTitle = "Unknown Playlist";
    try {
        const plRes = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${State.youtubeApiKey}`);
        const plData = await plRes.json();
        if (plData.items && plData.items.length > 0) {
            playlistTitle = plData.items[0].snippet.title;
        }
    } catch(e) { console.warn("Could not fetch playlist title"); }
    
    let videoData = []; // Array of {id, index}
    let nextPageToken = '';
    let currentIndex = 0;
    
    do {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${State.youtubeApiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.error) throw new Error(data.error.message);
        
        data.items.forEach(item => {
            if (item.contentDetails.videoId) {
                videoData.push({
                    id: item.contentDetails.videoId,
                    index: currentIndex++
                });
            }
        });
        
        nextPageToken = data.nextPageToken || '';
    } while (nextPageToken);
    
    return { title: playlistTitle, videoData };
}

async function addVideoOrPlaylist() {
    const url = DOM.inputVideoUrl.value.trim();
    const categoryId = DOM.inputVideoCategory.value;
    
    let tags = [];
    if (DOM.inputVideoTags && DOM.inputVideoTags.value) {
        tags = DOM.inputVideoTags.value.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0);
    }
    
    if (!url) return showToast("Please enter a URL.", "error");
    if (!State.youtubeApiKey) return showToast("Please enter a YouTube Data API Key in Settings first.", "error");
    
    DOM.btnSaveVideo.disabled = true;
    DOM.btnSaveVideoText.style.display = 'none';
    DOM.btnSaveVideoSpinner.style.display = 'inline-block';
    
    try {
        const playlistId = getYouTubePlaylistId(url);
        let videoData = [];
        let plContext = null;
        
        if (playlistId) {
            const plResult = await fetchPlaylistVideos(playlistId);
            videoData = plResult.videoData;
            plContext = { id: playlistId, title: plResult.title };
        } else {
            const ytId = getYouTubeVideoId(url);
            if (!ytId) throw new Error("Invalid YouTube URL");
            videoData = [ytId];
        }
        
        if (videoData.length === 0) throw new Error("No videos found.");
        
        const newVideos = await fetchVideoDetails(videoData, categoryId, plContext, tags);
        State.videos.push(...newVideos);
        saveState();
        
        renderSidebar();
        renderActiveView();
        closeAllModals();
        
    } catch (err) {
        console.error(err);
        alert(`Error fetching data: ${err.message}`);
    } finally {
        DOM.btnSaveVideo.disabled = false;
        DOM.btnSaveVideoText.style.display = 'inline-block';
        DOM.btnSaveVideoSpinner.style.display = 'none';
    }
}

function removeVideo(videoId) {
    showConfirm("Remove Video", "Are you sure you want to remove this video?", () => {
        State.videos = State.videos.filter(v => v.id !== videoId);
        saveState();
        renderSidebar();
        renderActiveView();
        showToast("Video removed");
    }, '🗑️');
}

function unwatchVideo(videoId) {
    const videoIndex = State.videos.findIndex(v => v.id === videoId);
    if (videoIndex > -1) {
        State.videos[videoIndex].watched = false;
        State.videos[videoIndex].dateWatched = null;
        saveState();
        renderSidebar();
        renderActiveView();
    }
}

// View Management
function renderActiveView() {
    // Context-aware controls
    if (DOM.libraryControls) {
        DOM.libraryControls.style.display = (State.activeView === 'library' || State.activeView === 'today') ? 'flex' : 'none';
    }
    if (DOM.sortBySelect) {
        DOM.sortBySelect.parentElement.style.display = (State.activeView === 'library') ? 'flex' : 'none';
    }

    if (State.activeView === 'calendar') {
        DOM.feedContainer.style.display = 'none';
        DOM.calendarContainer.style.display = 'block';
        if (DOM.analyticsContainer) DOM.analyticsContainer.style.display = 'none';
        DOM.currentCategoryTitle.textContent = "Calendar";
        renderCalendar();
    } else if (State.activeView === 'analytics') {
        DOM.feedContainer.style.display = 'none';
        DOM.calendarContainer.style.display = 'none';
        if (DOM.analyticsContainer) DOM.analyticsContainer.style.display = 'block';
        DOM.currentCategoryTitle.textContent = "Analytics Dashboard";
        renderAnalytics();
    } else {
        DOM.feedContainer.style.display = 'block';
        DOM.calendarContainer.style.display = 'none';
        if (DOM.analyticsContainer) DOM.analyticsContainer.style.display = 'none';
        
        if (State.activeView === 'watched') {
            DOM.currentCategoryTitle.textContent = "Watched History";
        } else if (State.activeView === 'today') {
            DOM.currentCategoryTitle.textContent = "Today's Schedule";
        } else {
            const category = State.categories.find(c => c.id === State.selectedCategoryId);
            DOM.currentCategoryTitle.textContent = category ? category.name : "Library";
        }
        
        renderFeed();
    }
}

function toggleTagFilter(tag) {
    const idx = State.activeTags.indexOf(tag);
    if (idx > -1) {
        State.activeTags.splice(idx, 1);
    } else {
        State.activeTags.push(tag);
    }
    renderActiveView();
}

function togglePlaylistCollapse(playlistId) {
    if (!playlistId) return;
    const idx = State.collapsedPlaylists.indexOf(playlistId);
    if (idx > -1) {
        State.collapsedPlaylists.splice(idx, 1);
    } else {
        State.collapsedPlaylists.push(playlistId);
    }
    saveState();
    renderActiveView();
}

// Feed Rendering
function renderFeed() {
    DOM.videoGrid.innerHTML = '';
    
    if (State.isLoading) {
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton-card';
            skeleton.innerHTML = `
                <div class="skeleton-thumb"></div>
                <div class="skeleton-info">
                    <div class="skeleton-text" style="width: 80%"></div>
                    <div class="skeleton-text" style="width: 40%"></div>
                </div>
            `;
            DOM.videoGrid.appendChild(skeleton);
        }
        return;
    }

    let targetAssignments = []; // Objects: {categoryId, tag}
    let filteredVideos = [];
    
    // Tag Bar Management
    if (State.activeView === 'library') {
        DOM.tagBar.style.display = 'flex';
        DOM.tagBar.innerHTML = '';
        
        const categoryVideos = State.videos.filter(v => v.categoryId === State.selectedCategoryId && !v.watched);
        const uniqueTags = new Set();
        categoryVideos.forEach(v => {
            if (v.tags) v.tags.forEach(t => uniqueTags.add(t));
        });
        
        if (uniqueTags.size > 0) {
            const sortedTags = Array.from(uniqueTags).sort();
            sortedTags.forEach(tag => {
                const chip = document.createElement('div');
                chip.className = `tag-chip ${State.activeTags.includes(tag) ? 'active' : ''}`;
                chip.textContent = `#${tag}`;
                chip.addEventListener('click', () => toggleTagFilter(tag));
                DOM.tagBar.appendChild(chip);
            });
        } else {
            DOM.tagBar.style.display = 'none';
        }
    } else {
        DOM.tagBar.style.display = 'none';
    }
    
    // Filtering Logic
    if (State.activeView === 'watched') {
        filteredVideos = State.videos.filter(v => v.watched);
        filteredVideos.sort((a, b) => new Date(b.dateWatched || 0) - new Date(a.dateWatched || 0));
    } else {
        if (State.activeView === 'today') {
            targetAssignments = State.calendar[TODAY_STR] || [];
            if (targetAssignments.length === 0) {
                renderEmptyState("No scheduled tasks", "Take a break or add a library to your schedule.", "☕");
                updateProgress(targetAssignments);
                return;
            }
            filteredVideos = State.videos.filter(v => {
                if (v.watched) return false;
                for (const assign of targetAssignments) {
                    if (assign.categoryId === v.categoryId) {
                        if (assign.tag === null) return true;
                        if (v.tags && v.tags.includes(assign.tag)) return true;
                    }
                }
                return false;
            });
        } else {
            const category = State.categories.find(c => c.id === State.selectedCategoryId);
            if (!category) return;
            filteredVideos = State.videos.filter(v => v.categoryId === State.selectedCategoryId && !v.watched);
            if (State.activeTags.length > 0) {
                filteredVideos = filteredVideos.filter(v => {
                    if (!v.tags) return false;
                    return State.activeTags.some(t => v.tags.includes(t));
                });
            }
        }
        
        if (State.searchQuery) {
            const query = State.searchQuery.toLowerCase();
            filteredVideos = filteredVideos.filter(v => 
                v.title.toLowerCase().includes(query) || 
                (v.playlistTitle && v.playlistTitle.toLowerCase().includes(query)) ||
                (v.tags && v.tags.some(t => t.toLowerCase().includes(query)))
            );
        }

        filteredVideos.sort((a, b) => {
            if (State.sortBy === 'length-asc') return a.duration - b.duration;
            if (State.sortBy === 'length-desc') return b.duration - a.duration;
            if (State.sortBy === 'date-desc') return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
            if (State.sortBy === 'date-asc') return new Date(a.publishedAt || 0) - new Date(b.publishedAt || 0);
            return 0; 
        });
    }
    
    // View mode toggles update
    if (State.viewMode === 'list') {
        DOM.videoGrid.className = 'video-grid list-view';
        DOM.btnViewGrid.classList.remove('active');
        DOM.btnViewList.classList.add('active');
    } else {
        DOM.videoGrid.className = 'video-grid';
        DOM.btnViewGrid.classList.add('active');
        DOM.btnViewList.classList.remove('active');
    }
    
    if (State.activeView !== 'watched') {
        let accumulatedTime = 0;
        filteredVideos.forEach(video => {
            video.isGoal = false;
            if (accumulatedTime < State.dailyGoal) {
                video.isGoal = true;
                accumulatedTime += (video.duration / State.playbackSpeed);
            }
        });
    }
    
    if (State.activeView === 'library' && State.selectedCategoryId) {
        renderFocusHub();
    } else {
        DOM.focusHub.style.display = 'none';
    }

    if (filteredVideos.length === 0) {
        if (State.searchQuery) {
            renderEmptyState("No search results", `No videos found for "${State.searchQuery}"`, "🔍");
        } else if (State.activeView === 'watched') {
            renderEmptyState("No history", "Finish some lessons to see them here.", "📜");
        } else if (State.activeView === 'library') {
            renderEmptyState("Library empty", "Add content to get started.", "📥");
        }
    } else {
        const createVideoCard = (video) => {
            const card = document.createElement('div');
            card.className = `video-card ${video.watched ? 'is-watched' : ''}`;
            const effectiveTime = Math.round(video.duration / State.playbackSpeed);
            const progress = (!video.watched && video.progressTimestamp > 0 && video.duration > 0) ? Math.min((video.progressTimestamp / (video.duration * 60)) * 100, 100) : 0;

            const thumb = document.createElement('div');
            thumb.className = 'video-thumbnail';
            const img = document.createElement('img');
            img.src = `https://img.youtube.com/vi/${video.ytId}/maxresdefault.jpg`;
            img.onerror = () => { img.src = `https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`; };
            thumb.appendChild(img);
            if (progress > 0) {
                const pb = document.createElement('div');
                pb.className = 'video-progress-bar';
                pb.style.width = `${progress}%`;
                thumb.appendChild(pb);
            }
            if (video.isGoal) {
                const goal = document.createElement('div');
                goal.className = 'badge-goal';
                goal.textContent = "🎯 Today's Goal";
                thumb.appendChild(goal);
            }
            card.appendChild(thumb);

            const info = document.createElement('div');
            info.className = 'video-info';
            const title = document.createElement('div');
            title.className = 'video-title';
            title.textContent = video.title;
            info.appendChild(title);
            
            const meta = document.createElement('div');
            meta.className = 'video-meta';
            meta.innerHTML = `
                <span>${video.duration} min</span>
                ${video.watched ? '<span class="status-badge">Watched</span>' : ''}
            `;
            info.appendChild(meta);
            card.appendChild(info);

            const btnRemove = document.createElement('button');
            btnRemove.className = 'btn-remove-video';
            btnRemove.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
            btnRemove.onclick = (e) => { e.stopPropagation(); removeVideo(video.id); };
            card.appendChild(btnRemove);

            card.onclick = () => playVideo(video);
            return card;
        };

        if (State.groupByPlaylist && State.activeView !== 'watched') {
            const groups = {};
            filteredVideos.forEach(v => {
                const pid = v.playlistId || 'no-playlist';
                if (!groups[pid]) groups[pid] = { title: v.playlistTitle || 'Individual Videos', videos: [] };
                groups[pid].videos.push(v);
            });

            Object.entries(groups).forEach(([pid, group]) => {
                const isCollapsed = State.collapsedPlaylists.includes(pid);
                const header = document.createElement('div');
                header.className = `playlist-group-header ${isCollapsed ? 'collapsed' : ''}`;
                header.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span class="collapse-icon">▸</span>
                        <span>${group.title}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span class="playlist-stats">${group.videos.length} videos</span>
                    </div>
                `;
                header.onclick = () => {
                    if (isCollapsed) State.collapsedPlaylists = State.collapsedPlaylists.filter(id => id !== pid);
                    else State.collapsedPlaylists.push(pid);
                    saveState();
                    renderFeed();
                };
                DOM.videoGrid.appendChild(header);

                if (!isCollapsed) {
                    group.videos.forEach(v => DOM.videoGrid.appendChild(createVideoCard(v)));
                }
            });
        } else {
            filteredVideos.forEach(v => DOM.videoGrid.appendChild(createVideoCard(v)));
        }
    }
    
    if (State.activeView !== 'watched') updateProgress(targetAssignments);
}

function renderEmptyState(title, subtitle, icon) {
    const el = document.createElement('div');
    el.className = 'empty-state-visual';
    el.innerHTML = `<div class="empty-icon" style="font-size: 48px;">${icon}</div><h3>${title}</h3><p>${subtitle}</p>`;
    DOM.videoGrid.appendChild(el);
}

// Calendar Logic
function renderCalendar() {
    const year = State.currentCalendarDate.getFullYear();
    const month = State.currentCalendarDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    DOM.calendarMonthYear.textContent = `${monthNames[month]} ${year}`;
    DOM.calendarGrid.innerHTML = '';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const d = document.createElement('div');
        d.className = 'calendar-day-header';
        d.textContent = day;
        DOM.calendarGrid.appendChild(d);
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) DOM.calendarGrid.appendChild(document.createElement('div'));
    
    for (let i = 1; i <= daysInMonth; i++) {
        const dateObj = new Date(year, month, i);
        const dateStr = toDateString(dateObj);
        const cell = document.createElement('div');
        cell.className = 'calendar-cell';
        if (dateStr === TODAY_STR) cell.classList.add('is-today');
        
        let assignmentsHtml = '';
        const assignments = State.calendar[dateStr] || [];
        if (assignments.length > 0) {
            assignmentsHtml = '<div class="calendar-tags">';
            assignments.forEach(a => {
                const cat = State.categories.find(c => c.id === a.categoryId);
                const label = a.tag ? `${cat?.name || 'Lib'}: ${a.tag}` : (cat?.name || 'Library');
                assignmentsHtml += `<div class="calendar-tag" title="${label}">${label}</div>`;
            });
            assignmentsHtml += '</div>';
        }
        
        cell.innerHTML = `
            <div class="calendar-date-num">${i}</div>
            ${assignmentsHtml}
        `;
        cell.addEventListener('click', () => openAssignModal(dateStr));
        DOM.calendarGrid.appendChild(cell);
    }
}

function openAssignModal(dateStr) {
    State.assigningDate = dateStr;
    const dateObj = new Date(dateStr);
    DOM.assignCalendarTitle.textContent = `Schedule for ${dateObj.toLocaleDateString()}`;
    const assignedCats = State.calendar[dateStr] || [];
    DOM.assignCalendarOptions.innerHTML = '';
    
    State.categories.forEach(cat => {
        const catVideos = State.videos.filter(v => v.categoryId === cat.id);
        const tags = [...new Set(catVideos.flatMap(v => v.tags || []))];
        
        const isWholeCatChecked = assignedCats.some(a => a.categoryId === cat.id && a.tag === null);
        
        const catGroup = document.createElement('div');
        catGroup.className = 'assign-group';
        catGroup.style.marginBottom = '20px';
        
        catGroup.innerHTML = `
            <label style="font-weight: 600; display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <input type="checkbox" class="modal-cb-cat" data-type="ALL" value="${cat.id}" ${isWholeCatChecked ? 'checked' : ''}>
                ${cat.name}
            </label>
            <div class="assign-tags" style="margin-left: 24px; display: flex; flex-wrap: wrap; gap: 8px;">
                ${tags.map(tag => {
                    const isTagChecked = assignedCats.some(a => a.categoryId === cat.id && a.tag === tag);
                    return `
                        <label style="font-size: 12px; background: var(--bg-secondary); padding: 4px 10px; border-radius: 12px; border: 1px solid var(--glass-border); cursor: pointer; display: flex; align-items: center; gap: 4px;">
                            <input type="checkbox" class="modal-cb-cat" data-type="TAG" data-tag="${tag}" value="${cat.id}" ${isTagChecked ? 'checked' : ''}>
                            ${tag}
                        </label>
                    `;
                }).join('')}
            </div>
        `;
        DOM.assignCalendarOptions.appendChild(catGroup);
    });
    openModal(DOM.assignCalendarModal);
}

function saveCalendarAssignment() {
    const selected = [];
    DOM.assignCalendarOptions.querySelectorAll('.modal-cb-cat:checked').forEach(cb => {
        const type = cb.getAttribute('data-type');
        if (type === 'ALL') {
            selected.push({ categoryId: cb.value, tag: null });
        } else {
            selected.push({ categoryId: cb.value, tag: cb.getAttribute('data-tag') });
        }
    });
    
    if (selected.length > 0) {
        State.calendar[State.assigningDate] = selected;
    } else {
        delete State.calendar[State.assigningDate];
    }
    
    saveState();
    closeAllModals();
    if (State.activeView === 'calendar') renderCalendar();
    else if (State.activeView === 'today') renderActiveView();
    
    showToast("Schedule updated", "success");
}

function playVideo(video) {
    State.playingVideoId = video.id;
    video.lastWatchedAt = Date.now();
    saveState();
    DOM.playerTitle.textContent = video.title;
    DOM.videoNotes.value = video.notes || '';
    
    // Reset to Edit Mode
    if(DOM.btnNotesEdit && DOM.btnNotesPreview) {
        DOM.btnNotesEdit.classList.add('active');
        DOM.btnNotesPreview.classList.remove('active');
        DOM.videoNotes.style.display = 'block';
        DOM.videoNotesPreview.style.display = 'none';
    }
    
    if (window.YT && ytPlayer && playerReady) {
        try {
            ytPlayer.loadVideoById({ 
                videoId: video.ytId, 
                startSeconds: video.progressTimestamp || 0 
            });
        } catch (e) {
            console.error("Player load error", e);
        }
    } else {
        // Retry logic if player not ready
        setTimeout(() => playVideo(video), 500);
        return;
    }
    
    renderPlayerPlaylist(video);
    openModal(DOM.playerModal);
}

function renderPlayerPlaylist(currentVideo) {
    if (!DOM.playerPlaylistItems) return;
    DOM.playerPlaylistItems.innerHTML = '';
    
    // Show videos from the same category
    const playlistVideos = State.videos.filter(v => v.categoryId === currentVideo.categoryId && !v.watched);
    
    playlistVideos.forEach(v => {
        const item = document.createElement('div');
        item.className = `sidebar-item ${v.id === currentVideo.id ? 'active' : ''}`;
        item.innerHTML = `
            <img src="https://img.youtube.com/vi/${v.ytId}/default.jpg" class="sidebar-thumb">
            <div class="sidebar-info">
                <div class="sidebar-title">${v.title}</div>
                <div class="sidebar-meta">${v.duration}m</div>
            </div>
        `;
        item.onclick = () => playVideo(v);
        DOM.playerPlaylistItems.appendChild(item);
    });
}

function markComplete() {
    if (!State.playingVideoId) return;
    const video = State.videos.find(v => v.id === State.playingVideoId);
    if (video) {
        video.watched = true;
        video.dateWatched = TODAY_STR;
        saveState();
    }
    closeAllModals();
    renderSidebar();
    renderActiveView();
}

function updateProgress(targetAssignments) {
    const watchedToday = State.videos.filter(v => v.watched && v.dateWatched === TODAY_STR);
    let timeWatched = Math.round(watchedToday.reduce((acc, v) => acc + (v.duration / State.playbackSpeed), 0));
    const progressEl = document.getElementById('goal-progress');
    if (progressEl) progressEl.textContent = `${timeWatched}/${State.dailyGoal}m`;
}

function renderAnalytics() {
    if (!DOM.analyticsContainer) return;
    const watchedVideos = State.videos.filter(v => v.watched);
    DOM.statVideosWatched.textContent = watchedVideos.length;
    
    let totalMinutes = watchedVideos.reduce((acc, v) => acc + (v.duration / State.playbackSpeed), 0);
    DOM.statTotalTime.textContent = `${Math.floor(totalMinutes / 60)}h ${Math.round(totalMinutes % 60)}m`;

    // Streak calculation
    let streak = 0;
    let checkDate = new Date(); // Start from today
    
    // Group watch time by date
    const timeByDate = {};
    watchedVideos.forEach(v => {
        if (v.dateWatched) {
            timeByDate[v.dateWatched] = (timeByDate[v.dateWatched] || 0) + (v.duration / State.playbackSpeed);
        }
    });

    if (State.dailyGoal > 0) {
        while (true) {
            const checkDateStr = toDateString(checkDate);
            const timeOnDay = timeByDate[checkDateStr] || 0;
            
            if (timeOnDay >= State.dailyGoal) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                // If checking today and goal not met, continue to yesterday to see if streak is still alive
                if (checkDateStr === TODAY_STR) {
                    checkDate.setDate(checkDate.getDate() - 1);
                    continue; 
                }
                break;
            }
            // Safety break
            if (streak > 3650) break;
        }
    }
    DOM.statStreak.textContent = streak;
    
    DOM.analyticsBalance.innerHTML = '';
    if (watchedVideos.length === 0) {
        renderEmptyState("No data yet", "Complete lessons to see study distribution.", `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`);
    } else {
        const timeByCategory = {};
        watchedVideos.forEach(v => {
            const cat = State.categories.find(c => c.id === v.categoryId);
            const name = cat ? cat.name : 'Unknown';
            timeByCategory[name] = (timeByCategory[name] || 0) + (v.duration / State.playbackSpeed);
        });
        
        const maxTime = Math.max(...Object.values(timeByCategory));
        
        Object.entries(timeByCategory).forEach(([name, time]) => {
            const percentage = (time / maxTime) * 100;
            const bar = document.createElement('div');
            bar.className = 'balance-item';
            bar.innerHTML = `
                <div class="balance-bar-label">
                    <span>${name}</span>
                    <span>${Math.round(time)}m</span>
                </div>
                <div class="balance-bar-track">
                    <div class="balance-bar-fill" style="width: ${percentage}%"></div>
                </div>
            `;
            DOM.analyticsBalance.appendChild(bar);
        });
    }
}

async function buildSyllabusWithAI() {
    const prompt = DOM.inputAiPrompt.value.trim();
    if (!prompt) return showToast("Please describe what you want to learn.", "error");
    if (!State.geminiApiKey) return showToast("Please add a Gemini API Key in Settings.", "error");
    if (!State.youtubeApiKey) return showToast("Please add a YouTube Data API Key in Settings.", "error");

    DOM.aiStatus.style.display = 'block';
    DOM.aiStatusText.textContent = "Architecting curriculum...";
    DOM.btnBuildSyllabus.disabled = true;
    State.isLoading = true;
    renderActiveView();

    try {
        // 1. Generate Curriculum with Gemini
        const aiPrompt = `
            You are an expert learning architect. Create a structured 5-10 step syllabus for: "${prompt}".
            Return ONLY a JSON array of objects with "title" and "searchQuery" fields.
            "searchQuery" should be a precise YouTube search term to find the best tutorial for that step.
            Example: [{"title": "Basics", "searchQuery": "unreal engine 5 beginner tutorial"}]
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${State.geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: aiPrompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        
        const curriculum = JSON.parse(data.candidates[0].content.parts[0].text);
        
        // 2. Create Library
        const categoryId = Date.now().toString();
        State.categories.push({ id: categoryId, name: prompt.substring(0, 30) });
        
        // 3. Find Videos
        DOM.aiStatusText.textContent = "Finding best videos...";
        for (const step of curriculum) {
            const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(step.searchQuery)}&type=video&key=${State.youtubeApiKey}`);
            const ytData = await ytRes.json();
            
            if (ytData.items && ytData.items.length > 0) {
                const videoId = ytData.items[0].id.videoId;
                await addVideoById(videoId, categoryId, [prompt.split(' ')[0].toLowerCase()]);
            }
        }

        State.selectedCategoryId = categoryId;
        State.activeView = 'library';
        saveState();
        renderSidebar();
        renderActiveView();
        closeAllModals();
        showToast("Syllabus built successfully!", "success");

    } catch (err) {
        console.error(err);
        showToast("Architect Error: " + err.message, "error");
    } finally {
        DOM.aiStatus.style.display = 'none';
        DOM.btnBuildSyllabus.disabled = false;
        State.isLoading = false;
        renderActiveView();
    }
}

async function addVideoById(ytId, categoryId, tags = []) {
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ytId}&key=${State.youtubeApiKey}`);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
            const item = data.items[0];
            const durationMins = parseISODuration(item.contentDetails.duration);
            State.videos.push({
                id: Date.now().toString() + Math.random().toString(36).substring(7),
                ytId: item.id,
                title: item.snippet.title,
                duration: durationMins,
                categoryId: categoryId,
                watched: false,
                dateWatched: null,
                publishedAt: item.snippet.publishedAt || null,
                progressTimestamp: 0,
                notes: '',
                tags: [...tags]
            });
        }
    } catch(e) { console.warn("Failed to add video by ID", ytId); }
}

function renderFocusHub() {
    if (!DOM.focusHub) return;
    const resumeVideo = State.videos.filter(v => v.categoryId === State.selectedCategoryId && !v.watched && v.progressTimestamp > 0)[0];
    if (!resumeVideo) { DOM.focusHub.style.display = 'none'; return; }
    DOM.focusHub.style.display = 'block';
    DOM.focusHub.innerHTML = `
        <div class="hero-card glass-panel">
            <div class="hero-content">
                <span class="hero-label">CONTINUE LEARNING</span>
                <h2>${resumeVideo.title}</h2>
                <button class="primary-btn">Resume Lesson</button>
            </div>
            <div class="hero-visual" style="background-image: url('https://img.youtube.com/vi/${resumeVideo.ytId}/maxresdefault.jpg')"></div>
        </div>
    `;
    DOM.focusHub.querySelector('.primary-btn').onclick = () => playVideo(resumeVideo);
}

function init() {
    setTheme(State.theme);
    
    // Fetch Env Variables first
    fetchEnvironment().then(() => {
        // Data Migration for Calendar (Strings to Objects)
        let migrated = false;
        Object.keys(State.calendar).forEach(date => {
            State.calendar[date] = State.calendar[date].map(assign => {
                if (typeof assign === 'string') {
                    migrated = true;
                    return { categoryId: assign, tag: null };
                }
                return assign;
            });
        });
        if (migrated) saveState();

        // Handle Auth State
        if (window.supabaseClient) {
            window.supabaseClient.auth.onAuthStateChange((event, session) => {
                State.user = session?.user || null;
                if (State.user) {
                    loadFromSupabase();
                    if (DOM.btnLogin) DOM.btnLogin.textContent = "Sign Out";
                } else {
                    if (DOM.btnLogin) DOM.btnLogin.textContent = "Sync Online";
                }
            });
        }
    });

    // Global Listeners
    DOM.backdrop.addEventListener('click', closeAllModals);
    document.querySelectorAll('.close-btn, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    DOM.btnConfirmProceed.addEventListener('click', () => {
        if (confirmCallback) confirmCallback();
        closeAllModals();
    });
    DOM.btnConfirmCancel.addEventListener('click', closeAllModals);

    // Sidebar View Switching
    DOM.navToday.addEventListener('click', () => { State.activeView = 'today'; renderSidebar(); renderActiveView(); });
    DOM.navCalendar.addEventListener('click', () => { State.activeView = 'calendar'; renderSidebar(); renderActiveView(); });
    DOM.navAnalytics.addEventListener('click', () => { State.activeView = 'analytics'; renderSidebar(); renderActiveView(); });
    DOM.navWatched.addEventListener('click', () => { State.activeView = 'watched'; renderSidebar(); renderActiveView(); });

    // Header Controls
    DOM.playbackSpeedSelect.value = State.playbackSpeed;
    DOM.playbackSpeedSelect.addEventListener('change', (e) => {
        State.playbackSpeed = parseFloat(e.target.value);
        saveState();
        renderActiveView();
    });

    DOM.dailyGoalInput.value = State.dailyGoal;
    DOM.dailyGoalInput.addEventListener('input', (e) => {
        State.dailyGoal = parseInt(e.target.value) || 0;
        saveState();
        renderActiveView();
    });

    DOM.btnSettings.addEventListener('click', () => openModal(DOM.settingsModal));
    DOM.themeToggle.addEventListener('click', toggleTheme);

    // Search
    DOM.librarySearch.addEventListener('input', (e) => {
        State.searchQuery = e.target.value;
        renderFeed();
    });

    // Sidebar Actions
    DOM.btnAddCategory.addEventListener('click', () => openModal(DOM.addCategoryModal));
    DOM.btnAiArchitect.addEventListener('click', () => openModal(DOM.aiArchitectModal));
    DOM.btnBuildSyllabus.addEventListener('click', buildSyllabusWithAI);
    DOM.btnSaveCategory.addEventListener('click', addCategory);
    
    // Auth Actions
    DOM.btnLogin.addEventListener('click', () => {
        if (State.user) handleLogout();
        else handleLogin();
    });
    
    // Library Actions
    DOM.btnAddVideo.addEventListener('click', () => {
        populateCategoryDropdown();
        openModal(DOM.addVideoModal);
    });
    DOM.btnSaveVideo.addEventListener('click', addVideoOrPlaylist);
    
    // Grouping Toggle
    DOM.toggleGroupPlaylist.checked = State.groupByPlaylist;
    DOM.toggleGroupPlaylist.addEventListener('change', (e) => {
        State.groupByPlaylist = e.target.checked;
        saveState();
        renderFeed();
    });

    // Calendar Actions
    DOM.btnCalPrev.addEventListener('click', () => {
        State.currentCalendarDate.setMonth(State.currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });
    DOM.btnCalNext.addEventListener('click', () => {
        State.currentCalendarDate.setMonth(State.currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });
    DOM.btnSaveCalendar.addEventListener('click', saveCalendarAssignment);

    // Player Actions
    DOM.btnMarkComplete.addEventListener('click', markComplete);
    DOM.videoNotes.addEventListener('input', (e) => {
        const video = State.videos.find(v => v.id === State.playingVideoId);
        if (video) {
            video.notes = e.target.value;
            saveState();
        }
    });

    // Notes Toggle
    if(DOM.btnNotesEdit && DOM.btnNotesPreview) {
        DOM.btnNotesEdit.addEventListener('click', () => {
            DOM.btnNotesEdit.classList.add('active');
            DOM.btnNotesPreview.classList.remove('active');
            DOM.videoNotes.style.display = 'block';
            DOM.videoNotesPreview.style.display = 'none';
        });
        
        DOM.btnNotesPreview.addEventListener('click', () => {
            DOM.btnNotesPreview.classList.add('active');
            DOM.btnNotesEdit.classList.remove('active');
            DOM.videoNotes.style.display = 'none';
            DOM.videoNotesPreview.style.display = 'block';
            
            // Parse Markdown
            const rawText = DOM.videoNotes.value;
            if (window.marked) {
                DOM.videoNotesPreview.innerHTML = marked.parse(rawText || '*No notes yet.*');
            } else {
                DOM.videoNotesPreview.innerHTML = `<p>${rawText.replace(/\\n/g, '<br>')}</p>`;
            }
        });
    }

    // Settings Actions
    DOM.btnSaveSettings.addEventListener('click', () => {
        State.youtubeApiKey = DOM.inputApiKey.value.trim();
        State.geminiApiKey = DOM.inputGeminiKey.value.trim();
        saveState();
        showToast("Settings saved", "success");
        closeAllModals();
    });
    DOM.inputApiKey.value = State.youtubeApiKey;
    DOM.inputGeminiKey.value = State.geminiApiKey;

    DOM.btnExportData.addEventListener('click', exportData);
    DOM.btnImportData.addEventListener('click', () => DOM.inputImportData.click());
    DOM.inputImportData.addEventListener('change', importData);

    // View Toggles
    DOM.btnViewGrid.addEventListener('click', () => {
        State.viewMode = 'grid';
        saveState();
        renderFeed();
    });
    DOM.btnViewList.addEventListener('click', () => {
        State.viewMode = 'list';
        saveState();
        renderFeed();
    });

    // Mobile Hamburger
    DOM.btnHamburger.addEventListener('click', () => {
        DOM.sidebar.classList.toggle('active');
        DOM.backdrop.classList.toggle('active');
    });

    // Global Keydown
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
        if (e.key === ' ' && DOM.playerModal.classList.contains('active')) {
            if (e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                if (ytPlayer && ytPlayer.getPlayerState) {
                    const s = ytPlayer.getPlayerState();
                    if (s === 1) ytPlayer.pauseVideo();
                    else ytPlayer.playVideo();
                }
            }
        }
        if (e.key === 'f' && !DOM.backdrop.classList.contains('active')) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                DOM.librarySearch.focus();
            }
        }
    });

    // Initial Render
    renderSidebar();
    renderActiveView();
}

// Start
document.addEventListener('DOMContentLoaded', init);

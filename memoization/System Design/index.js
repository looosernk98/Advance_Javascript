// --- src/app.js ---
import { Conversation } from '@11labs/client';

let conversation = null;

async function requestMicrophonePermission() {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true;
    } catch (error) {
        console.error('Microphone permission denied:', error);
        return false;
    }
}

async function getSignedUrl() {
    try {
        const response = await fetch('/api/signed-url');
        if (!response.ok) throw new Error('Failed to get signed URL');
        const data = await response.json();
        return data.signedUrl;
    } catch (error) {
        console.error('Error getting signed URL:', error);
        throw error;
    }
}

async function getAgentId() {
    const response = await fetch('/api/getAgentId');
    const { agentId } = await response.json();
    return agentId;
}

function updateStatus(isConnected) {
    const statusElement = document.getElementById('connectionStatus');
    statusElement.textContent = isConnected ? 'Connected' : 'Disconnected';
    statusElement.classList.toggle('connected', isConnected);
}

// function updateSpeakingStatus(mode) {
//     const statusElement = document.getElementById('speakingStatus');
//     // Update based on the exact mode string we receive
//     const isSpeaking = mode.mode === 'speaking';
//     statusElement.textContent = isSpeaking ? 'Agent Speaking, Talk to interrupt' : 'Agent Silent'; 
//     statusElement.classList.toggle('speaking', isSpeaking);
//     console.log('Speaking status updated:', { mode, isSpeaking }); // Debug log
// }

let lastMode = null; // Track previous mode
const st = []
function updateSpeakingStatus(mode) {
    const statusElement = document.getElementById('speakingStatus');

    const currentMode = mode.mode;
    const isSameMode = currentMode === lastMode;

    if (isSameMode) {
        // If the same button is clicked again, show 'Agent Silent'
        statusElement.textContent = 'Call AVA';
        statusElement.classList.remove('speaking', 'listening');
        statusElement.classList.add('statusElement');
        lastMode = 'idle'; // reset the mode to idle
        return;
    }

    const isSpeaking = currentMode === 'speaking';
    const isListening = currentMode === 'listening';

    if (isSpeaking) {
        statusElement.textContent = 'AVA is Speaking, Talk to interrupt';
        statusElement.classList.add('speaking');
        statusElement.classList.remove('listening');
    } else if (isListening) {
        statusElement.textContent = 'AVA is Listening...';
        statusElement.classList.add('listening');
        statusElement.classList.remove('speaking');
    } else {
        statusElement.textContent = 'Call AVA';
        statusElement.classList.add('statusElement');
        statusElement.classList.remove('speaking', 'listening');
    }

    lastMode = currentMode; // Update the lastMode
    console.log('Speaking status updated:', { mode, currentMode, isSpeaking, isListening });
}



async function addTranscriptEntry(text, sender) {
    const transcriptEl = document.getElementById('transcript');
    if (!transcriptEl) return;

    const entry = document.createElement('div');
    entry.classList.add('transcript-entry');

    if (sender === 'user') {
        entry.classList.add('user');
        entry.textContent = 'User: ';
    } else {
        entry.classList.add('agent');
        entry.textContent = 'Ava: ';
    }

    transcriptEl.appendChild(entry);
    transcriptEl.scrollTop = transcriptEl.scrollHeight;

    const chars = text.split('');
    for (let i = 0; i < chars.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 40)); // slower = more realistic
        entry.textContent += chars[i];
        transcriptEl.scrollTop = transcriptEl.scrollHeight;
    }



    // Save to history
    if (currentConversationId && conversationHistory[currentConversationId]) {
        conversationHistory[currentConversationId].push({ sender, text });
    }

    // if(mode === 'listening'){
    //     await new Promise(resolve => setTimeout(resolve, 40));        
    // }
}





const conversationHistory = {}; // { conversationId: [ {sender, text}, ... ] }
let currentConversationId = null;


async function startConversation() {
    try {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) {
            alert('Microphone permission is required for the conversation.');
            return;
        }

        const signedUrl = await getSignedUrl();

        conversation = await Conversation.startSession({
            signedUrl: signedUrl,
            onConnect: () => {
                console.log('Connected');
                updateStatus(true);
                toggleButtonState(true);
            },
            onDisconnect: () => {
                console.log('Disconnected');
                updateStatus(false);
                toggleButtonState(false);
                updateSpeakingStatus({ mode: 'listening' }); // Reset to listening mode on disconnect
            },
            onError: (error) => {
                console.error('Conversation error:', error);
                alert('An error occurred during the conversation.');
            },
            onModeChange: (mode) => {
                console.log('Mode changed:', mode);
                const msg = st.shift()
                addTranscriptEntry(msg.message, msg.sender);
                // updateSpeakingStatus(mode);
            },
            onMessage: (msg) => {
                console.log('Received message:', msg);
                const { source, message } = msg;
                st.push(msg)
                // if (message) {
                //     console.log('addTranscriptEntry : message: ', message);
                //     const sender = source === 'ai' ? 'agent' : 'user';
                //     // console.log(`[${type}]`, text);
                //     addTranscriptEntry(message, sender);
                // }
            },
            
            

            
        });
        currentConversationId = `conv-${Date.now()}`;
        conversationHistory[currentConversationId] = [];

    } catch (error) {
        console.error('Error starting conversation:', error);
        alert('Failed to start conversation. Please try again.');
    }
}


function clearTranscript() {
    const transcriptEl = document.getElementById('transcript');
    if (transcriptEl) {
        transcriptEl.innerHTML = '';
    }
}


document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('sidebarMenu').classList.toggle('open');
});


async function loadTranscriptById(id) {
    console.log("4. loading transcript by Id")
    if (!conversationHistory[id] || conversationHistory[id].length === 0) {
        const res = await fetch(`/api/load-transcript/${id}`);
        const data = await res.json();
        conversationHistory[id] = data.transcript;
        console.log('data.transcript: ', data.transcript);
    }

    const transcriptEl = document.getElementById('transcript');
    transcriptEl.innerHTML = '';

    conversationHistory[id].forEach(({ sender, text }) => {
        const entry = document.createElement('div');
        entry.classList.add('transcript-entry', sender);
        entry.textContent = sender === 'user' ? `User: ${text}` : `Ava: ${text}`;
        transcriptEl.appendChild(entry);
    });
}

function renderConversationList() {
    console.log("3. rendering conversation")
    const listEl = document.getElementById('conversationList');
    listEl.innerHTML = '';

    Object.keys(conversationHistory).forEach(id => {
        const item = document.createElement('li');
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';

        const label = document.createElement('span');
        label.textContent = id;
        label.style.cursor = 'pointer';
        label.onclick = () => {
            loadTranscriptById(id);
            document.getElementById('sidebarMenu').classList.remove('open');
        };

        const del = document.createElement('button');
        del.textContent = '🗑️';
        del.style.marginLeft = '10px';
        del.onclick = async (e) => {
            e.stopPropagation();
            await fetch(`/api/delete-transcript/${id}`, { method: 'DELETE' });
            delete conversationHistory[id];
            renderConversationList();
            clearTranscript();
        };

        item.appendChild(label);
        item.appendChild(del);
        listEl.appendChild(item);
    });
}


async function endConversation() {
    if (conversation) {
        await conversation.endSession();
        conversation = null;
        if (currentConversationId && conversationHistory[currentConversationId]) {
            fetch('/api/save-transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                conversation_id: currentConversationId,
                transcript: conversationHistory[currentConversationId]
        })
    });
}

        toggleButtonState(false);
        clearTranscript();
        renderConversationList();
    }
}


async function fetchAndRenderConversations() {
    console.log("2. getting all transcript list");
    const res = await fetch('/api/list-transcripts');
    const data = await res.json();
    console.log('data: ', data);
    data.conversations.forEach(id => {
        if (!conversationHistory[id]) {
            conversationHistory[id] = []; // init empty, will fill on click
        }
    });
    renderConversationList();
}





// Function to toggle button states and images
function toggleButtonState(isConversationActive) {
    const startButton = document.getElementById('startButton');
    const endButton = document.getElementById('endButton');

    if (isConversationActive) {
        startButton.style.display = 'none';
        endButton.style.display = 'inline-block';
    } else {
        startButton.style.display = 'inline-block';
        endButton.style.display = 'none';
    }
}

document.getElementById('startButton').addEventListener('click', startConversation);
document.getElementById('endButton').addEventListener('click', endConversation);
document.getElementById('transcript').innerHTML = '';

document.addEventListener("DOMContentLoaded", () => {
    console.log("1. DOM Content Loaded");
  fetchAndRenderConversations();
});

document.getElementById('deleteAllBtn').addEventListener('click', async () => {
    await fetch('/api/delete-all-transcripts', { method: 'DELETE' });
    for (let id in conversationHistory) delete conversationHistory[id];
    clearTranscript();
    renderConversationList();
});



window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});


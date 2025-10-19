// DOM elements
const video = document.getElementById("video");
const startButton = document.getElementById("start-recording");
const stopButton = document.getElementById("stop-recording");
const pipButton = document.getElementById("pip-button");
const statusDiv = document.getElementById("status");
const log = document.getElementById("log");

// Recording state
let mediaRecorder = null;
let recordedChunks = [];
let stream = null;

// Check browser support
function checkBrowserSupport() {
    const support = {
        getDisplayMedia: navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia,
        mediaRecorder: window.MediaRecorder,
        pictureInPicture: document.pictureInPictureEnabled
    };
    
    console.log('Browser support:', support);
    
    if (!support.getDisplayMedia) {
        updateStatus("❌ Screen capture not supported in this browser");
        startButton.disabled = true;
        return false;
    }
    
    if (!support.mediaRecorder) {
        updateStatus("❌ MediaRecorder not supported in this browser");
        startButton.disabled = true;
        return false;
    }
    
    let supportMessage = "✅ Recording supported";
    if (support.pictureInPicture) {
        supportMessage += " | PiP supported ✓";
    } else {
        supportMessage += " | PiP not supported";
    }
    
    statusDiv.innerHTML = supportMessage;
    return true;
}

// Check support on load
checkBrowserSupport();

// Update status function
function updateStatus(message) {
    statusDiv.innerText = message;
    console.log(message);
}

// Start screen recording
async function startRecording() {
    try {
        console.log('Starting recording...');
        updateStatus("Requesting screen access...");
        
        // Check if already recording
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            updateStatus("Already recording!");
            return;
        }
        
        // Request screen capture with simpler options first
        console.log('Requesting display media...');
        
        const constraints = {
            video: {
                width: { ideal: 1920, max: 1920 },
                height: { ideal: 1080, max: 1080 },
                frameRate: { ideal: 30, max: 30 }
            },
            audio: true
        };
        
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
        console.log('Got display media stream:', stream);
        console.log('Video tracks:', stream.getVideoTracks());
        console.log('Audio tracks:', stream.getAudioTracks());

        // Show live preview
        video.srcObject = stream;
        video.play();
        
        // Enable PiP for live preview
        pipButton.disabled = false;
        
        // Set up MediaRecorder
        const options = {
            mimeType: 'video/webm;codecs=vp9,opus'
        };
        
        // Fallback MIME types if VP9 is not supported
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options.mimeType = 'video/webm;codecs=vp8,opus';
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options.mimeType = 'video/webm';
            }
        }
        
        mediaRecorder = new MediaRecorder(stream, options);
        recordedChunks = [];

        // Handle recorded data
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        // Handle recording stop
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);
            
            // Stop live stream
            stream.getTracks().forEach(track => track.stop());
            
            // Show recorded video
            video.srcObject = null;
            video.src = videoUrl;
            video.load();
            
            // Enable PiP for recorded video
            pipButton.disabled = false;
            
            updateStatus(`Recording completed! File size: ${(blob.size / 1024 / 1024).toFixed(2)} MB`);
            
            // Reset UI
            startButton.disabled = false;
            stopButton.disabled = true;
        };

        // Handle stream ending (user stops sharing)
        stream.getVideoTracks()[0].onended = () => {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                stopRecording();
                updateStatus("Screen sharing stopped by user");
            }
        };

        // Start recording
        mediaRecorder.start(1000); // Collect data every second
        
        updateStatus("Recording started! Screen sharing in progress...");
        startButton.disabled = true;
        stopButton.disabled = false;

    } catch (error) {
        console.error('Error starting recording:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
        let errorMessage = "Recording failed: ";
        
        switch (error.name) {
            case 'NotAllowedError':
                errorMessage += "Permission denied. Please allow screen sharing.";
                break;
            case 'NotFoundError':
                errorMessage += "No screen available to capture.";
                break;
            case 'NotSupportedError':
                errorMessage += "Screen recording not supported in this browser.";
                break;
            case 'AbortError':
                errorMessage += "Screen sharing was cancelled.";
                break;
            case 'NotReadableError':
                errorMessage += "Could not start screen capture.";
                break;
            default:
                errorMessage += error.message || "Unknown error occurred.";
        }
        
        updateStatus(errorMessage);
        
        // Reset UI on error
        startButton.disabled = false;
        stopButton.disabled = true;
        pipButton.disabled = true;
        
        // Clean up any partial stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    }
}

// Stop recording
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        updateStatus("Stopping recording...");
    }
}

// Picture-in-Picture functionality
async function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture()
            .then(() => {
                updateStatus("Exited Picture-in-Picture mode");
            })
            .catch(error => {
                console.error('Error exiting PiP:', error);
                updateStatus(`PiP exit error: ${error.message}`);
            });
    } else {
        console.log('video:', video);
        console.log('Video readyState:', video.readyState);
        if (video.readyState >= 2) { // Video has enough data to play
            

            // setTimeout(() => {
            //      console.log("time")
            // }, 5000)

            await video.requestPictureInPicture()
                // .then(() => {
                //     updateStatus("Entered Picture-in-Picture mode");
                // })
                // .catch(error => {
                //     console.error('Error entering PiP:', error);
                //     updateStatus(`PiP error: ${error.message}`);
                // });

                await fetch('www.google.com').then((res) => {
                    console.log("res:", res)
                }).catch((err) => {
                    console.log('err: ', err);
                   
                })
        } else {
            updateStatus("Video not ready for Picture-in-Picture");
        }
    }
}

// Handle PiP events
video.addEventListener('enterpictureinpicture', () => {
    pipButton.textContent = 'Exit PiP';
    updateStatus("Picture-in-Picture mode active");
});

video.addEventListener('leavepictureinpicture', () => {
    pipButton.textContent = 'Enter PiP';
    updateStatus("Picture-in-Picture mode deactivated");
});

// Handle video load events
video.addEventListener('loadstart', () => {
    pipButton.disabled = true;
});

video.addEventListener('loadeddata', () => {
    pipButton.disabled = false;
});

video.addEventListener('error', (e) => {
    console.error('Video error:', e);
    updateStatus("Video error occurred");
    pipButton.disabled = true;
});

// Event listeners
startButton.addEventListener("click", () => {
    console.log('Start button clicked!');
    startRecording();
});

stopButton.addEventListener("click", () => {
    console.log('Stop button clicked!');
    stopRecording();
});

pipButton.addEventListener("click", () => {
    console.log('PiP button clicked!');
    togglePictureInPicture();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + R to start recording
    if ((e.ctrlKey || e.metaKey) && e.key === 'r' && !startButton.disabled) {
        e.preventDefault();
        startRecording();
    }
    // Ctrl/Cmd + S to stop recording
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && !stopButton.disabled) {
        e.preventDefault();
        stopRecording();
    }
    // Ctrl/Cmd + P to toggle PiP
    if ((e.ctrlKey || e.metaKey) && e.key === 'p' && !pipButton.disabled) {
        e.preventDefault();
        togglePictureInPicture();
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Verify all elements exist
    console.log('Elements found:', {
        video: !!video,
        startButton: !!startButton,
        stopButton: !!stopButton,
        pipButton: !!pipButton,
        statusDiv: !!statusDiv,
        log: !!log
    });
    
    // Initialize
    updateStatus("Ready to record. Click 'Start Recording' or use Ctrl+R");
    console.log('Initialization complete');
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM is still loading, event listener will handle it
} else {
    // DOM is already loaded
    console.log('DOM already loaded, initializing immediately...');
    updateStatus("Ready to record. Click 'Start Recording' or use Ctrl+R");
}
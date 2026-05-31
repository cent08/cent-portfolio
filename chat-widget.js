// Chat Widget Script
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .back-button {
            position: absolute;
            right: 52px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .back-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn,
        .n8n-chat-widget .new-voice-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .n8n-chat-widget .new-chat-btn:hover,
        .n8n-chat-widget .new-voice-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .typing-indicator {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .n8n-chat-widget .typing-indicator span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--chat--color-primary);
            opacity: 0.4;
            animation: typing 1.4s infinite;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typing {
            0%, 60%, 100% {
                opacity: 0.4;
                transform: translateY(0);
            }
            30% {
                opacity: 1;
                transform: translateY(-8px);
            }
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        /* Voice Call Styles */
        .n8n-chat-widget .voice-interface {
            display: none;
            flex-direction: column;
            height: 100%;
            background: var(--chat--color-background);
        }

        .n8n-chat-widget .voice-interface.active {
            display: flex;
        }

        .n8n-chat-widget .voice-call-content {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 14px 16px 16px;
            gap: 6px;
        }

        .n8n-chat-widget .voice-animation {
            width: 52px;
            height: 52px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .n8n-chat-widget .voice-animation.listening::before {
            content: '🎧';
            font-size: 30px;
            animation: glow-pulse 2s ease-in-out infinite;
        }

        .n8n-chat-widget .voice-animation.listening::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: var(--chat--color-primary);
            opacity: 0.2;
            animation: ripple 2s ease-out infinite;
        }

        .n8n-chat-widget .voice-animation.talking {
            display: flex;
            gap: 4px;
            align-items: flex-end;
        }

        .n8n-chat-widget .voice-animation.talking span {
            width: 5px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            border-radius: 4px;
            animation: wave 1.2s ease-in-out infinite;
        }

        .n8n-chat-widget .voice-animation.talking span:nth-child(1) {
            height: 14px;
            animation-delay: 0s;
        }

        .n8n-chat-widget .voice-animation.talking span:nth-child(2) {
            height: 26px;
            animation-delay: 0.2s;
        }

        .n8n-chat-widget .voice-animation.talking span:nth-child(3) {
            height: 20px;
            animation-delay: 0.4s;
        }

        .n8n-chat-widget .voice-animation.talking span:nth-child(4) {
            height: 30px;
            animation-delay: 0.6s;
        }

        .n8n-chat-widget .voice-animation.talking span:nth-child(5) {
            height: 16px;
            animation-delay: 0.8s;
        }

        .n8n-chat-widget .voice-animation.thinking::before {
            content: '🤔';
            font-size: 30px;
            animation: thinking-pulse 1.5s ease-in-out infinite;
        }

        .n8n-chat-widget .voice-animation.thinking::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: var(--chat--color-primary);
            opacity: 0.15;
            animation: thinking-ripple 1.5s ease-out infinite;
        }

        @keyframes thinking-pulse {
            0%, 100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.05) rotate(5deg);
                opacity: 0.9;
            }
        }

        @keyframes thinking-ripple {
            0% {
                transform: scale(0.9);
                opacity: 0.2;
            }
            100% {
                transform: scale(1.8);
                opacity: 0;
            }
        }

        @keyframes glow-pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.8;
            }
        }

        @keyframes ripple {
            0% {
                transform: scale(0.8);
                opacity: 0.3;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }

        @keyframes wave {
            0%, 100% {
                transform: scaleY(0.5);
            }
            50% {
                transform: scaleY(1);
            }
        }

        .n8n-chat-widget .voice-status-text {
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.02em;
            color: var(--chat--color-font);
            text-align: center;
            flex-shrink: 0;
        }

        .n8n-chat-widget .voice-call-btn {
            margin-top: auto;
            flex-shrink: 0;
            padding: 13px 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 500;
            font-family: inherit;
            transition: transform 0.2s;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
        }

        .n8n-chat-widget .voice-call-btn:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .voice-call-btn.end-call {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .n8n-chat-widget .voice-icon {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            vertical-align: middle;
        }

        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: 100%;
                height: 100%;
                bottom: 0;
                right: 0;
                border-radius: 0;
            }

            .n8n-chat-widget .voice-call-content {
                padding: 16px 18px 18px;
            }
        }
    `;

    // Load Geist font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Extra styles for the live voice transcript, connecting spinner, lead chip
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        .n8n-chat-widget .voice-transcript { width: 100%; flex: 1; min-height: 0; overflow-y: auto; margin-top: 6px; padding: 0 4px; display: flex; flex-direction: column; gap: 8px; }
        .n8n-chat-widget .voice-transcript:empty { display: none; }
        .n8n-chat-widget .voice-animation.connecting::after { content: ''; display: block; width: 30px; height: 30px; border: 3px solid rgba(0,0,0,0.12); border-top-color: var(--n8n-chat-primary-color); border-radius: 50%; animation: cw-spin 0.8s linear infinite; }
        @keyframes cw-spin { to { transform: rotate(360deg); } }
        .n8n-chat-widget .chat-message.bot a { color: var(--n8n-chat-primary-color); text-decoration: underline; }
        .n8n-chat-widget .chat-message.bot ul { margin: 6px 0 6px 18px; }
        .n8n-chat-widget .lead-chip { align-self: center; font-size: 12px; font-weight: 600; color: #157a4c; background: rgba(33,195,115,0.14); padding: 5px 12px; border-radius: 20px; margin: 4px 0; }
    `;
    document.head.appendChild(extraStyles);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: {
                text: 'Powered by n8n',
                link: 'https://n8n.partnerlinks.io/m8a94i19zhqq?utm_source=nocodecreative.io'
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        },
        retell: {
            tokenUrl: '',
            agentId: ''
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ?
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style },
            retell: { ...defaultConfig.retell, ...(window.ChatWidgetConfig.retell || {}) }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    const newConversationHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <h2 class="welcome-text">${config.branding.welcomeText}</h2>
            <button class="new-chat-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Send us a message
            </button>
            <button class="new-voice-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
                </svg>
                Let's have a talk
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
        </div>
    `;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <button class="back-button">←</button>
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="close-button">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="Type your message here..." rows="1"></textarea>
                <button type="submit">Send</button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;

    const voiceInterfaceHTML = `
        <div class="voice-interface">
            <div class="brand-header">
                <button class="back-button">←</button>
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="close-button">×</button>
            </div>
            <div class="voice-call-content">
                <div class="voice-animation" id="voice-animation"></div>
                <div class="voice-status-text" id="voice-status">Ready to talk</div>
                <div class="voice-transcript" id="voice-transcript"></div>
                <button class="voice-call-btn" id="voice-call-btn">
                    <svg class="voice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Start Call
                </button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    chatContainer.innerHTML = newConversationHTML + chatInterfaceHTML + voiceInterfaceHTML;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const newVoiceBtn = chatContainer.querySelector('.new-voice-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const voiceInterface = chatContainer.querySelector('.voice-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    // Voice call variables
    const N8N_VOICE_WEBHOOK_URL = 'https://s6n4a0zu.rpcld.net/webhook/ee0b4868-a8a6-4357-baf3-3d5638723ddc';
    let mediaRecorder = null;
    let audioChunks = [];
    let isCallActive = false;
    let isListening = false;
    let isTalking = false;
    let retellClient = null;

    function generateUUID() {
        return crypto.randomUUID();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        typingDiv.id = 'typing-indicator';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async function startNewConversation() {
        if (!currentSessionId) currentSessionId = generateUUID();

        // Hide welcome screen and show chat interface
        chatContainer.querySelector('.brand-header').style.display = 'none';
        chatContainer.querySelector('.new-conversation').style.display = 'none';
        chatInterface.classList.add('active');

        // Display initial message locally without API call
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        botMessageDiv.textContent = "Hi, How can I assist you today?";
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage(message) {
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: ""
            }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Show typing indicator
        showTypingIndicator();

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            const data = await response.json();
            
            // Hide typing indicator
            hideTypingIndicator();

            const out = Array.isArray(data) ? (data[0] && data[0].output) : data.output;
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.innerHTML = renderMarkdown(out || "Sorry, I didn't catch that. Could you rephrase?");
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
            hideTypingIndicator();
            const errDiv = document.createElement('div');
            errDiv.className = 'chat-message bot';
            errDiv.textContent = "I'm having trouble reaching the server right now. Please try again, or email centrobles@gmail.com.";
            messagesContainer.appendChild(errDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Voice call functions
    function updateVoiceUI(state) {
        const voiceAnimation = document.getElementById('voice-animation');
        const voiceStatus = document.getElementById('voice-status');
        const voiceCallBtn = document.getElementById('voice-call-btn');

        voiceAnimation.className = 'voice-animation';
        voiceAnimation.innerHTML = '';

        switch(state) {
            case 'connecting':
                voiceAnimation.classList.add('connecting');
                voiceStatus.textContent = 'Connecting...';
                voiceCallBtn.innerHTML = `
                    <svg class="voice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Cancel
                `;
                voiceCallBtn.classList.add('end-call');
                break;
            case 'listening':
                voiceAnimation.classList.add('listening');
                voiceStatus.textContent = 'Listening...';
                voiceCallBtn.innerHTML = `
                    <svg class="voice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    End Call
                `;
                voiceCallBtn.classList.add('end-call');
                break;
            case 'thinking':
                voiceAnimation.classList.add('thinking');
                voiceAnimation.innerHTML = '';
                voiceStatus.textContent = 'Thinking...';
                voiceCallBtn.innerHTML = `
                    <svg class="voice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    End Call
                `;
                voiceCallBtn.classList.add('end-call');
                break;
            case 'talking':
                voiceAnimation.classList.add('talking');
                voiceAnimation.innerHTML = '<span></span><span></span><span></span><span></span><span></span>';
                voiceStatus.textContent = 'Talking...';
                voiceCallBtn.innerHTML = `
                    <svg class="voice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    End Call
                `;
                voiceCallBtn.classList.add('end-call');
                break;
            case 'idle':
                voiceAnimation.innerHTML = '';
                voiceStatus.textContent = 'Ready to talk';
                voiceCallBtn.innerHTML = `
                    <svg class="voice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Start Call
                `;
                voiceCallBtn.classList.remove('end-call');
                break;
        }
    }

    // ── Live voice transcript helpers ──
    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    // Collapse a spoken email ("name at gmail dot com") into real format for display only.
    function prettifyEmail(text) {
        const numWord = { zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9' };
        const squash = s => s.toLowerCase()
            .replace(/\b(zero|one|two|three|four|five|six|seven|eight|nine)\b/g, w => numWord[w])
            .replace(/\bunderscore\b/g, '_')
            .replace(/\b(dash|hyphen)\b/g, '-')
            .replace(/\bdot\b/g, '.')
            .replace(/[\s]+/g, '');
        return String(text == null ? '' : text).replace(
            /\b([a-z0-9][a-z0-9 ._-]*?)\s+at\s+([a-z0-9 ._-]+?)\s+dot\s+(com|net|org|io|co|ph|me|email|gov|edu|app|dev|info|biz)\b/gi,
            (m, local, domain, tld) => {
                // drop lead-in words so only the actual address remains
                const l = local.replace(/^.*\b(?:e-?mail|mail|address|is|it'?s|it\s+is|contact|reach|send|write|message)\s+/i, '');
                return squash(l) + '@' + squash(domain) + '.' + tld.toLowerCase();
            }
        );
    }
    // Minimal, safe markdown -> HTML (escape first, then a few inline patterns)
    function renderMarkdown(text) {
        let s = escapeHtml(text);
        s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
        s = s.replace(/(?:^|\n)((?:[-•] .+(?:\n|$))+)/g, (m, list) => {
            const items = list.trim().split(/\n/).map(li => '<li>' + li.replace(/^[-•]\s+/, '') + '</li>').join('');
            return '<ul>' + items + '</ul>';
        });
        s = s.replace(/\n/g, '<br>');
        return s;
    }
    function clearVoiceTranscript() {
        const t = document.getElementById('voice-transcript');
        if (t) t.innerHTML = '';
    }
    function renderVoiceTranscript(turns) {
        const t = document.getElementById('voice-transcript');
        if (!t || !Array.isArray(turns)) return;
        t.innerHTML = turns
            .filter(x => x && x.content)
            .map(x => `<div class="chat-message ${x.role === 'agent' ? 'bot' : 'user'}">${escapeHtml(prettifyEmail(x.content))}</div>`)
            .join('');
        t.scrollTop = t.scrollHeight;
    }
    function addVoiceNote(text) {
        const t = document.getElementById('voice-transcript');
        if (!t) return;
        const d = document.createElement('div');
        d.className = 'chat-message bot';
        d.textContent = text;
        t.appendChild(d);
        t.scrollTop = t.scrollHeight;
    }

    // ── Voice call via Retell Web SDK (real-time) ──
    async function startVoiceCall() {
        if (!config.retell || !config.retell.tokenUrl) {
            updateVoiceUI('idle');
            addVoiceNote('Voice is not configured yet. You can use text instead.');
            return;
        }
        try {
            updateVoiceUI('connecting');
            if (!currentSessionId) currentSessionId = generateUUID();

            // 1) Get a short-lived web-call access token from n8n (keeps the Retell key server-side)
            const tokenResp = await fetch(config.retell.tokenUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId: currentSessionId })
            });
            const tokenData = await tokenResp.json();
            const accessToken = tokenData.access_token;
            if (!accessToken) throw new Error('No access token returned');

            // 2) Lazy-load the Retell Web SDK and start the call
            const { RetellWebClient } = await import('https://cdn.jsdelivr.net/npm/retell-client-js-sdk/+esm');
            retellClient = new RetellWebClient();
            clearVoiceTranscript();

            retellClient.on('call_started', () => { isCallActive = true; updateVoiceUI('listening'); });
            retellClient.on('call_ended', () => { isCallActive = false; updateVoiceUI('idle'); });
            retellClient.on('agent_start_talking', () => updateVoiceUI('talking'));
            retellClient.on('agent_stop_talking', () => { if (isCallActive) updateVoiceUI('listening'); });
            retellClient.on('update', (update) => { if (update && update.transcript) renderVoiceTranscript(update.transcript); });
            retellClient.on('error', (err) => {
                console.error('Retell error:', err);
                addVoiceNote('Sorry, the call dropped. Please try again.');
                endVoiceCall();
            });

            await retellClient.startCall({ accessToken });
        } catch (error) {
            console.error('Error starting voice call:', error);
            updateVoiceUI('idle');
            const denied = error && (error.name === 'NotAllowedError' || /permission|denied|microphone/i.test(error.message || ''));
            addVoiceNote(denied
                ? 'I need microphone access to talk. Please allow it in your browser and try again.'
                : 'Could not start the call. Please try again, or switch to text.');
        }
    }

    function playAudioResponse(base64Audio) {
        return new Promise((resolve) => {
            const audio = new Audio('data:audio/mp3;base64,' + base64Audio);
            audio.onended = resolve;
            audio.onerror = resolve;
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
                resolve();
            });
        });
    }

    function playAudioBlob(blob) {
        return new Promise((resolve) => {
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.onended = () => { URL.revokeObjectURL(url); resolve(); };
            audio.onerror = () => { URL.revokeObjectURL(url); resolve(); };
            audio.play().catch(error => {
                console.error('Error playing audio blob:', error);
                URL.revokeObjectURL(url);
                resolve();
            });
        });
    }

    function endVoiceCall() {
        isCallActive = false;
        isListening = false;
        isTalking = false;

        if (retellClient) {
            try { retellClient.stopCall(); } catch (e) { /* noop */ }
            retellClient = null;
        }
        updateVoiceUI('idle');
    }

    function startNewVoiceSession() {
        if (!currentSessionId) currentSessionId = generateUUID();

        // Hide welcome screen and show voice interface
        chatContainer.querySelector('.brand-header').style.display = 'none';
        chatContainer.querySelector('.new-conversation').style.display = 'none';
        voiceInterface.classList.add('active');
    }

    // Function to go back to initial window
    function goBackToInitial() {
        // Hide chat and voice interfaces
        chatInterface.classList.remove('active');
        voiceInterface.classList.remove('active');
        
        // End voice call if active
        if (isCallActive) {
            endVoiceCall();
        }
        
        // Clear messages
        messagesContainer.innerHTML = '';
        
        // Show initial welcome screen
        chatContainer.querySelector('.brand-header').style.display = 'flex';
        chatContainer.querySelector('.new-conversation').style.display = 'block';
        
        // Reset session
        currentSessionId = '';
    }

    // Event listeners
    newChatBtn.addEventListener('click', startNewConversation);
    
    newVoiceBtn.addEventListener('click', startNewVoiceSession);

    // Add back button listeners
    const backButtons = chatContainer.querySelectorAll('.back-button');
    backButtons.forEach(btn => {
        btn.addEventListener('click', goBackToInitial);
    });

    document.getElementById('voice-call-btn').addEventListener('click', () => {
        if (isCallActive) {
            endVoiceCall();
        } else {
            startVoiceCall();
        }
    });
    
    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
        }
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
            }
        }
    });
    
    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
    });

    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });
})();

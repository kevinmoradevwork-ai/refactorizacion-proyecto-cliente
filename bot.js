/**
 * @file bot.js
 * @description Script del lado del cliente que inyecta un widget de chat flotante.
 * Gestiona la interfaz de usuario y la comunicación con la API de IA.
 */

document.addEventListener("DOMContentLoaded", () => {

    // --- CONFIGURACIÓN ---
    // ¡PELIGRO DE SEGURIDAD! 
    // NUNCA debes exponer tu API KEY en el frontend en un entorno de producción real.
    // asegúrate de borrarla antes de entregar
    // advierte al cliente que esto debe moverse al Backend (index.js).
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "PON_AQUI_TU_API_KEY";

    // --- ELEMENTOS DOM ---
    let chatContainer = null;
    let messagesArea = null;

    /**
     * Inicializa el widget construyendo el HTML y asignando eventos.
     */
    function initChatWidget() {
        // 1. Crear Botón Flotante
        const toggleButton = document.createElement("button");
        toggleButton.id = "chatButton";
        toggleButton.innerHTML = "💬";
        toggleButton.title = "Abrir soporte IA";
        // Estilos básicos inline para asegurar visibilidad (puedes moverlos a CSS)
        toggleButton.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:1000; padding:10px 15px; border-radius:50%; border:none; background:#007bff; color:white; cursor:pointer; font-size:20px;";
        document.body.appendChild(toggleButton);

        // 2. Crear Ventana de Chat (Oculta por defecto)
        chatContainer = document.createElement("div");
        chatContainer.id = "chatWindow";
        chatContainer.style.display = "none"; // Oculto inicialmente
        chatContainer.innerHTML = `
            <div id='chatHeader' style="background:#007bff; color:white; padding:10px; border-radius:10px 10px 0 0;">
                Soporte IA
            </div>
            <div id='chatMessages' style="height:300px; overflow-y:auto; padding:10px; background:#f9f9f9; border-bottom:1px solid #ccc;"></div>
            <div id='chatInputArea' style="padding:10px; display:flex;">
                <input id='chatInput' placeholder='Escribe tu duda...' style="flex:1; padding:5px; border-radius:5px; border:1px solid #ccc;" />
                <button id='sendBtn' style="margin-left:5px; padding:5px 10px; background:#28a745; color:white; border:none; border-radius:5px; cursor:pointer;">Enviar</button>
            </div>
        `;
        // Estilos del contenedor
        chatContainer.style.cssText = "position:fixed; bottom:80px; right:20px; width:300px; background:white; border:1px solid #ccc; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.1); z-index:1000; display:none; flex-direction:column;";
        document.body.appendChild(chatContainer);

        // Referencias a elementos internos
        messagesArea = document.getElementById("chatMessages");
        const chatInput = document.getElementById("chatInput");
        const sendBtn = document.getElementById("sendBtn");

        // --- EVENTOS ---

        // Abrir/Cerrar Chat
        toggleButton.onclick = () => {
            const isHidden = chatContainer.style.display === 'none';
            chatContainer.style.display = isHidden ? 'flex' : 'none';
        };

        // Enviar mensaje al hacer clic
        sendBtn.onclick = () => handleUserMessage(chatInput);

        // Enviar mensaje al presionar Enter
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleUserMessage(chatInput);
        });
    }

    /**
     * Procesa el mensaje del usuario y llama a la IA.
     * @param {HTMLInputElement} inputElement - El campo de texto.
     */
    function handleUserMessage(inputElement) {
        const question = inputElement.value.trim();
        if (!question) return;

        // Limpiar input y mostrar mensaje de usuario
        inputElement.value = "";
        appendMessage("user-msg", question);

        // Llamar a la IA
        fetchAIResponse(question);
    }

    /**
     * Añade un mensaje visualmente al área de chat.
     * @param {string} cssClass - Clase CSS para diferenciar usuario vs IA.
     * @param {string} text - El texto a mostrar.
     */
    function appendMessage(cssClass, text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = cssClass;
        msgDiv.textContent = text;
        // Estilos básicos para diferenciar (puedes mover a CSS externo)
        msgDiv.style.cssText = cssClass === 'user-msg'
            ? "text-align:right; margin:5px 0; color:#333; font-weight:bold;"
            : "text-align:left; margin:5px 0; color:#0056b3;";

        messagesArea.appendChild(msgDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight; // Auto-scroll al fondo
    }

    /**
     * Realiza la petición asíncrona a OpenAI.
     * @param {string} userQuery - La pregunta del usuario.
     */
    async function fetchAIResponse(userQuery) {
        try {
            // Mostrar indicador de carga (opcional)
            const loadingMsg = document.createElement("div");
            loadingMsg.textContent = "Escribiendo...";
            loadingMsg.id = "loadingIndicator";
            loadingMsg.style.fontStyle = "italic";
            loadingMsg.style.fontSize = "12px";
            messagesArea.appendChild(loadingMsg);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini", // O el modelo que prefieras
                    messages: [{ role: "user", content: userQuery }]
                })
            });

            // Eliminar indicador de carga
            messagesArea.removeChild(loadingMsg);

            if (!response.ok) {
                throw new Error(`Error API: ${response.status}`);
            }

            const data = await response.json();
            const aiText = data.choices?.[0]?.message?.content || "No pude entender eso.";
            appendMessage("ai-msg", aiText);

        } catch (error) {
            console.error("Error al conectar con IA:", error);
            const loadingMsg = document.getElementById("loadingIndicator");
            if (loadingMsg) messagesArea.removeChild(loadingMsg);
            appendMessage("error-msg", "Lo siento, hubo un error de conexión.");
        }
    }

    // Arrancar el widget
    initChatWidget();
});

document.addEventListener("DOMContentLoaded",()=>{

    // Create button
    let btn=document.createElement("button");
    btn.id="chatButton";
    btn.innerHTML="💬";
    document.body.appendChild(btn);

    // Create window
    let win=document.createElement("div");
    win.id="chatWindow";
    win.innerHTML=`
        <div id='chatHeader'>Soporte IA</div>
        <div id='chatMessages'></div>
        <div id='chatInputArea'>
            <input id='chatInput' placeholder='Escribe...' />
            <button id='sendBtn'>Enviar</button>
        </div>
    `;
    document.body.appendChild(win);

    const chatMessages=document.getElementById("chatMessages");
    const chatInput=document.getElementById("chatInput");
    const sendBtn=document.getElementById("sendBtn");

    btn.onclick=()=>{ win.style.display = win.style.display==='flex'?'none':'flex'; win.style.flexDirection='column'; };

    function addMsg(cls,txt){
        let d=document.createElement("div");
        d.className=cls;
        d.textContent=txt;
        chatMessages.appendChild(d);
        chatMessages.scrollTop=chatMessages.scrollHeight;
    }

    async function askAI(q){
        addMsg("user-msg", q);

        const res = await fetch("https://api.openai.com/v1/chat/completions",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer PON_AQUI_TU_API_KEY"
            },
            body: JSON.stringify({
                model:"gpt-4o-mini",
                messages:[{role:"user", content:q}]
            })
        });

        const data = await res.json();
        addMsg("ai-msg", data.choices?.[0]?.message?.content || "Error en respuesta IA");
    }

    sendBtn.onclick=()=>{
        let q=chatInput.value.trim();
        if(!q) return;
        chatInput.value="";
        askAI(q);
    };
});

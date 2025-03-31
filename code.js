document.addEventListener("DOMContentLoaded", function() {
    const addNoteButton = document.getElementById("addNote");
    const notesContainer = document.getElementById("notesContainer");
    const minimizedNotesContainer = document.getElementById("minimizedNotes");
    const savedNotesContainer = document.getElementById("savedNotes");
    
    // Configuración del contenedor de notas minimizadas
    minimizedNotesContainer.style.display = "flex";
    minimizedNotesContainer.style.flexWrap = "nowrap";
    minimizedNotesContainer.style.position = "fixed";
    minimizedNotesContainer.style.bottom = "10px";
    minimizedNotesContainer.style.left = "10px";
    minimizedNotesContainer.style.right = "10px";
    minimizedNotesContainer.style.gap = "10px";
    
    addNoteButton.addEventListener("click", function() {
        const note = document.createElement("div");
        note.classList.add("note");
        note.style.position = "absolute";
        note.style.left = "50px";
        note.style.top = "50px";
        
        // Creación del contenido de la nota
        note.innerHTML = `
            <div class="toolbar" style="cursor: grab; background-color: #ddd; padding: 5px; border-bottom: 2px solid #aaa; display: flex; gap: 10px; align-items: center;">
                <select class="fontSize">
                    <option value="12px">12</option>
                    <option value="16px">16</option>
                    <option value="20px">20</option>
                </select>
                <select class="fontFamily">
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                </select>
                <button class="bold">B</button>
                <button class="italic">I</button>
                <button class="underline">U</button>
                <button class="save">💾</button>
                <button class="minimize">🗕</button>
                <button class="close">❌</button>
            </div>
            <textarea></textarea>
        `;
        
        notesContainer.appendChild(note);
        
        const textarea = note.querySelector("textarea");
        
        // Guardar el contenido al minimizar o guardar
        function storeNoteContent() {
            note.dataset.content = textarea.value;
        }
        
        // Eventos para modificar el estilo del texto
        note.querySelector(".bold").addEventListener("click", () => {
            textarea.style.fontWeight = textarea.style.fontWeight === "bold" ? "normal" : "bold";
        });
        note.querySelector(".italic").addEventListener("click", () => {
            textarea.style.fontStyle = textarea.style.fontStyle === "italic" ? "normal" : "italic";
        });
        note.querySelector(".underline").addEventListener("click", () => {
            textarea.style.textDecoration = textarea.style.textDecoration === "underline" ? "none" : "underline";
        });
        note.querySelector(".fontSize").addEventListener("change", (e) => {
            textarea.style.fontSize = e.target.value;
        });
        note.querySelector(".fontFamily").addEventListener("change", (e) => {
            textarea.style.fontFamily = e.target.value;
        });
        
        // Evento para guardar la nota
        note.querySelector(".save").addEventListener("click", () => {
            storeNoteContent();
            note.classList.add("saved");
            note.style.width = "80%";
            note.style.height = "50px";
            note.style.backgroundColor = "green";
            note.innerHTML = "Nota guardada (clic para abrir)";
            savedNotesContainer.appendChild(note);
        });

        // Evento para minimizar la nota
        note.querySelector(".minimize").addEventListener("click", () => {
            storeNoteContent();
            note.classList.add("minimized");
            note.style.width = "150px";
            note.style.height = "40px";
            note.style.backgroundColor = "green";
            note.innerHTML = "Nota minimizada (clic para abrir)";
            minimizedNotesContainer.appendChild(note);
        });

        // Evento para restaurar la nota minimizada o guardada
        note.addEventListener("click", () => {
            if (note.classList.contains("minimized") || note.classList.contains("saved")) {
                note.classList.remove("minimized");
                note.classList.remove("saved");
                note.innerHTML = `
                    <div class="toolbar" style="cursor: grab; background-color: #ddd; padding: 5px; border-bottom: 2px solid #aaa; display: flex; gap: 10px; align-items: center;">
                        <select class="fontSize">
                            <option value="12px">12</option>
                            <option value="16px">16</option>
                            <option value="20px">20</option>
                        </select>
                        <select class="fontFamily">
                            <option value="Arial">Arial</option>
                            <option value="Verdana">Verdana</option>
                        </select>
                        <button class="bold">B</button>
                        <button class="italic">I</button>
                        <button class="underline">U</button>
                        <button class="save">💾</button>
                        <button class="minimize">🗕</button>
                        <button class="close">❌</button>
                    </div>
                    <textarea>${note.dataset.content || ""}</textarea>
                `;
                notesContainer.appendChild(note);
            }
        });

        // Evento para cerrar la nota
        note.querySelector(".close").addEventListener("click", () => {
            note.remove();
        });

        // Funcionalidad para mover la nota
        let isDragging = false;
        let offsetX, offsetY;

        note.querySelector(".toolbar").addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - note.offsetLeft;
            offsetY = e.clientY - note.offsetTop;
            note.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                note.style.left = `${e.clientX - offsetX}px`;
                note.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            note.style.cursor = "grab";
        });
    });
});

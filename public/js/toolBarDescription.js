/*
function formatText(command) {
    document.execCommand(command, false, null);
}
function formatText(command, event) {
    event.preventDefault(); // Evita que el botón recargue la página
    document.execCommand(command, false, null);
}
function applyStyle(style) {
    let textarea = document.getElementById('editor');
    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;
    let selectedText = textarea.value.substring(start, end);
    
    if (selectedText) {
        let styledText = '';
        
        if (style === 'bold') {
            styledText = `**${selectedText}**`; // Markdown-like bold
        } else if (style === 'italic') {
            styledText = `*${selectedText}*`; // Markdown-like italic
        } else if (style === 'underline') {
            styledText = `<u>${selectedText}</u>`; // HTML underline
        }

        textarea.value = textarea.value.substring(0, start) + styledText + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start, start + styledText.length);
    }
}
*/
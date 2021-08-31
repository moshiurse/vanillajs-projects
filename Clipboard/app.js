

function copy() {
    let text = document.getElementById('text-to-copy');
    text.select();
    let successMsg = document.getElementById('success-msg');
    navigator.clipboard.writeText(text.value);
    successMsg.textContent = "Text Copied paste anywhere!!";
}


function copySelectedText() { 
    let text = window.getSelection().anchorNode;
    console.log(text);
    let successMsg = document.getElementById('success-msg2');
    navigator.clipboard.writeText(text);
    successMsg.textContent = "Text Copied paste anywhere!!";
}
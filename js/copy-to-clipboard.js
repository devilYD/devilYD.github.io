// copy-to-clipboard.js
// 使用 ClipboardJS 实现代码块复制功能
// 页面加载完成后遍历所有 code 元素，为每个 code 块添加一个复制按钮，并绑定复制事件
document.addEventListener('DOMContentLoaded', function () {
    var codeBlocks = document.getElementsByTagName('code');

    for (var i = 0; i < codeBlocks.length; i++) {
        var codeBlock = codeBlocks[i];

        var button = document.createElement('button');
        button.textContent = 'Copy';
        button.classList.add('copy-button'); // add CSS class
        codeBlock.parentNode.insertBefore(button, codeBlock.nextSibling);

        copyToClipboard(button);
    }

    function copyToClipboard(button) {
        var clipboard = new ClipboardJS(button, {
            target: function (trigger) {
                return trigger.previousSibling;
            }
        });
        clipboard.on('success', function (e) {
            e.clearSelection();
            button.textContent = 'Copied!';

            setTimeout(() => {
                button.textContent = 'Copy';
            }, 1000);
        });
        clipboard.on('error', function (e) {
            console.error('复制失败:', e.action);
        });
    }
});
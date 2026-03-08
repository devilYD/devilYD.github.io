document.addEventListener('DOMContentLoaded', function () {
    var codeBlocks = document.getElementsByTagName('code');

    for (var i = 0; i < codeBlocks.length; i++) {
        var codeBlock = codeBlocks[i];

        var button = document.createElement('button');
        button.textContent = 'Copy';
        button.classList.add('copy-button'); // add CSS class
        codeBlock.parentNode.insertBefore(button, codeBlock.nextSibling);

        var clipboard = new ClipboardJS(button, {
            target: function (trigger) {
                return trigger.previousSibling;
            }
        });
        clipboard.on('success', function (e) {
            e.clearSelection();
            // var notification = document.createElement('div');
            // notification.textContent = 'Copied!';
            // notification.classList.add('notification');
            // document.body.appendChild(notification);
            // setTimeout(function () {
            // 	notification.style.opacity = '0';
            // 	setTimeout(function () {
            // 		document.body.removeChild(notification);
            // 	}, 1000);
            // }, 1000);
            // console.log('已复制到剪贴板:', e.text);
            // 阻止事件冒泡，避免影响其他逻辑
            // e.stopPropagation();

            codeBlocks[i].button.textContent = 'Copied!';

            setTimeout(() => {
                codeBlocks[i].button.textContent = 'Copy';
            }, 3000);
            e.stopPropagation();
        });
        clipboard.on('error', function (e) {
            console.error('复制失败:', e.action);
        });
    }
});
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

            // 1. 获取按钮的位置和尺寸（相对于视口）
            const buttonRect = button.getBoundingClientRect();

            // 2. 获取/创建通知框元素
            let notification = document.querySelector('.notification');
            if (!notification) {
                notification = document.createElement('div');
                notification.className = 'notification';
                document.body.appendChild(notification);
            }

            // 3. 计算通知框位置：按钮正上方，水平居中，向上偏移10px避免重叠
            const notificationTop = buttonRect.top - notification.offsetHeight - 10;
            const notificationLeft = buttonRect.left + (buttonRect.width - notification.offsetWidth) / 2;

            // 设置通知框位置（基于视口的绝对定位）
            notification.style.left = `${notificationLeft}px`;
            notification.style.top = `${notificationTop}px`;
            notification.textContent = '复制成功！';

            // 4. 显示动画：重置样式 + 触发过渡
            notification.style.opacity = 1;
            notification.style.transform = 'translateY(0)';

            // 5. 2秒后隐藏通知框（配合过渡动画）
            setTimeout(() => {
                notification.style.opacity = 0;
                notification.style.transform = 'translateY(5px)'; // 轻微下沉消失
                // 动画结束后重置样式
                setTimeout(() => {
                    notification.style.transform = 'translateY(5px)';
                }, 500);
            }, 2000);
        });
        clipboard.on('error', function (e) {
            console.error('复制失败:', e.action);
        });
    }
});
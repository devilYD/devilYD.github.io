// copy-to-clipboard.js
// 使用 ClipboardJS 实现代码块复制功能
// 页面加载完成后遍历所有 code 元素，为每个 code 块添加一个复制按钮，并绑定复制事件
document.addEventListener('DOMContentLoaded', function () {
    var codeBlocks = document.getElementsByTagName('pre code');

    for (var i = 0; i < codeBlocks.length; i++) {
        var codeBlock = codeBlocks[i];
        
        var button = document.createElement('button');
        button.textContent = 'Copy';
        button.classList.add('copy-button-yd'); // add CSS class
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

document.addEventListener('DOMContentLoaded', function() {
  // 查找所有代码块
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    // 创建复制按钮
    const button = document.createElement('button');
    button.className = 'copy-button-yd';
    button.textContent = 'Copy';
    
    // 创建按钮容器
    const pre = block.parentNode;
    const container = document.createElement('div');
    container.className = 'code-block-container';
    
    // 重组DOM结构
    pre.parentNode.insertBefore(container, pre);
    container.appendChild(pre);
    container.appendChild(button);
    
    // 添加点击事件
    button.addEventListener('click', () => {
      // 获取代码文本
      const code = block.textContent;
      
      // 使用Clipboard API复制文本
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        }).catch(err => {
          console.error('无法复制: ', err);
        });
      } else {
        console.error('无法复制: ', err);
      }
    });
  });
});
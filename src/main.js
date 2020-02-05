const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hs = xObject || [
    { logo: 'G', url: 'https://github.com' },
    { logo: 'J', url: 'https://juejin.im' },
]
const simplifyUrl = (url) => {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hs.forEach((node, index) => {
        const $li = $(` <li>
       
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon" >
                   <use xlink:href="#icon-close"></use>
                </svg>
                </div>
            </div>
       
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hs.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton').on('click', () => {
    let url = window.prompt('请输入要添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'http://' + url
    }
    hs.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hs)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hs.length; i++) {
        if (hs[i].logo.toLowerCase() === key) {
            window.open(hs[i].url)
        }
    }
})
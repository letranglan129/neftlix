import { Html, Head, Main, NextScript } from 'next/document'

export default function _document() {
    return (
        <Html>
            <Head>
                <title>Neftlix</title>
                <meta property="og:title" content="Neftlix" key="title" />   
        
                <link
                    rel="shortcut icon"
                    href="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico"
                />
                <link
                    rel="stylesheet"
                    href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css"
                />
                <meta
                    property="og:description"
                    content="Xem trực tuyến các bộ phim và chương trình truyền hình của Netflix hoặc phát trực tuyến ngay trên TV thông minh, máy chơi game, máy tính, Mac, di động, máy tính bảng và nhiều thiết bị khác nữa."
                />
                <meta
                    content="Xem trực tuyến các bộ phim và chương trình truyền hình của Netflix hoặc phát trực tuyến ngay trên TV thông minh, máy chơi game, máy tính, Mac, di động, máy tính bảng và nhiều thiết bị khác nữa."
                    name="description"
                />
                <meta name="google-site-verification" content="rDYVY2V_0jzc128EnEkJLBd6PcBoDXYaSVrGWezTpyY" />
                <meta
                    content="xem phim, phim trực tuyến, xem TV, TV trực tuyến, chương trình truyền hình trực tuyến, xem chương trình truyền hình, phim phát trực tuyến, TV phát trực tuyến, phát trực tuyến tức thì, xem trực tuyến, phim, xem phim Việt Nam, xem TV trực tuyến, không cần tải xuống, phim trọn bộ"
                    name="keywords"
                />
            </Head>
            <body>
                <Main />
                <div id="myportal" />
                <NextScript />
            </body>
        </Html>
    )
}

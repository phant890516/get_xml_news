// Yahoo RSS url：https://news.yahoo.co.jp/rss

console.log("script.js");
/////////////////////////// 日付変換 ////////////////////////////
function formatDate(pubDate){
    const date = new Date(pubDate);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    return `${year}年${month}月${day}日${hours}時${minutes}分${seconds}秒`
}

$("input[name='rss-select']").on("change",function(e){
    console.log("radio change");
    console.log(e);
    $("#output").empty();
    $("#radio_error").empty();

    let selectVal = $("input[name='rss-select']:checked").val();
    console.log(selectVal);
    
    let dataTosend={
        val:selectVal,
    }

    $.ajax({
        url:'/get_rss_xml',
        type:"GET",
        data:dataTosend,
        dataType:'xml'
        
    })//ajax
    .done(function(xml){
        console.log("success");
        console.log(xml);
        //取得したxmlを画面に表示する
        $(xml).find("item").each(function(){
            //タイトルを取得する
            let titleText = $(this).find("title").text();
            let linkText = $(this).find("link").text();
            let pubDate = formatDate($(this).find("pubDate").text());
            let imgSrc = $(this).find("image").text();
            //出力
            $("#output").append(
                `<div class="news">
                <h2>${titleText}</h2>
                <p class="pubDate">${pubDate}</p>
                <div class="img-container">
                    <img src="${imgSrc}"></img>
                </div>
                <li><a href="${linkText}" target="_blank">記事へ（別タグで表示します）</a><li>
               
                </div>`
            )

        })//each
    })//done
    .fail(function(){
        console.log("fail");
        $("#radio_error").append(`<p class="error_mes">ラジオボタンを押してください</p>`)
        
    })//fail
});//on

//////////////////////////////////////////////////////////////////scrollToTopボタン//////////////////////////////////////////////////////////////////////////
const scrollToTop = $("#scrollToTop");
$(window).on('scroll',function(){
    if($(window).scrollTop()>500){
        scrollToTop.addClass('show');
    }
    else{
        scrollToTop.removeClass('show');
    }
});

scrollToTop.on('click',function(){
    $('html,body').animate({
        scrollTop:0,
    },'smooth');
});